'use client';

import { db } from '@/lib/firebase';
import { Guest } from '@/types';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
  updateDoc,
} from 'firebase/firestore';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

export default function GuestList() {
  const t = useTranslations('guestList');
  const [guests, setGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [newGuestName, setNewGuestName] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [copiedButton, setCopiedButton] = useState<{
    guestId: string;
    locale: 'en' | 'vi';
  } | null>(null);

  useEffect(() => {
    const q = query(collection(db, 'guests'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const guestData: Guest[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        guestData.push({
          id: doc.id,
          name: data.name,
          status: data.status,
          receivedAt: data.receivedAt?.toDate(),
          createdAt: data.createdAt?.toDate(),
        } as Guest);
      });
      setGuests(guestData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const filteredGuests = guests.filter((guest) =>
    guest.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddGuest = async () => {
    if (!newGuestName.trim()) return;

    try {
      await addDoc(collection(db, 'guests'), {
        name: newGuestName.trim(),
        status: 0,
        createdAt: Timestamp.now(),
      });
      setNewGuestName('');
      setIsAdding(false);
    } catch (error) {
      console.error('Error adding guest:', error);
      alert(t('error'));
    }
  };

  const handleUpdateGuest = async (id: string) => {
    if (!editName.trim()) return;

    try {
      await updateDoc(doc(db, 'guests', id), {
        name: editName.trim(),
      });
      setEditingId(null);
      setEditName('');
    } catch (error) {
      console.error('Error updating guest:', error);
      alert(t('error'));
    }
  };

  const handleDeleteGuest = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'guests', id));
      setDeleteConfirmId(null);
    } catch (error) {
      console.error('Error deleting guest:', error);
      alert(t('error'));
    }
  };

  const copyGuestLink = async (guestId: string, locale: 'en' | 'vi') => {
    const baseUrl = window.location.origin;
    const url = `${baseUrl}/${locale}?guestId=${guestId}`;

    try {
      await navigator.clipboard.writeText(url);
      setCopiedButton({ guestId, locale });

      // Reset after 3 seconds
      setTimeout(() => {
        setCopiedButton(null);
      }, 3000);
    } catch (error) {
      console.error('Error copying link:', error);
      alert(t('error'));
    }
  };

  const stats = {
    total: guests.length,
    notSent: guests.filter((g) => g.status === 0).length,
    opened: guests.filter((g) => g.status === 1).length,
  };

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='text-xl'>{t('loading')}</div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50 py-8 px-4'>
      <div className='max-w-7xl mx-auto'>
        <h1 className='text-4xl font-bold mb-8 text-center'>{t('title')}</h1>

        {/* Statistics */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-8'>
          <div className='bg-white rounded-lg shadow p-6'>
            <div className='text-3xl font-bold text-blue-600'>
              {stats.total}
            </div>
            <div className='text-gray-600 mt-2'>{t('totalGuests')}</div>
          </div>
          <div className='bg-white rounded-lg shadow p-6'>
            <div className='text-3xl font-bold text-gray-600'>
              {stats.notSent}
            </div>
            <div className='text-gray-600 mt-2'>{t('notSent')}</div>
          </div>
          <div className='bg-white rounded-lg shadow p-6'>
            <div className='text-3xl font-bold text-green-600'>
              {stats.opened}
            </div>
            <div className='text-gray-600 mt-2'>{t('opened')}</div>
          </div>
        </div>

        {/* Add Guest Section */}
        <div className='bg-white rounded-lg shadow p-6 mb-6'>
          {!isAdding ? (
            <button
              onClick={() => setIsAdding(true)}
              className='w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors'
            >
              {t('addGuest')}
            </button>
          ) : (
            <div className='flex gap-2'>
              <input
                type='text'
                placeholder={t('guestNamePlaceholder')}
                value={newGuestName}
                onChange={(e) => setNewGuestName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddGuest()}
                className='flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:border-blue-500'
                autoFocus
              />
              <button
                onClick={handleAddGuest}
                className='px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors'
              >
                {t('add')}
              </button>
              <button
                onClick={() => {
                  setIsAdding(false);
                  setNewGuestName('');
                }}
                className='px-6 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors'
              >
                {t('cancel')}
              </button>
            </div>
          )}
        </div>

        {/* Search */}
        <div className='bg-white rounded-lg shadow p-6 mb-6'>
          <input
            type='text'
            placeholder={t('searchPlaceholder')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:border-blue-500'
          />
        </div>

        {/* Guest List */}
        <div className='bg-white rounded-lg shadow overflow-hidden'>
          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead className='bg-gray-100'>
                <tr>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    {t('name')}
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    {t('status')}
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    {t('receivedAt')}
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    {t('actions')}
                  </th>
                </tr>
              </thead>
              <tbody className='bg-white divide-y divide-gray-200'>
                {filteredGuests.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      className='px-6 py-4 text-center text-gray-500'
                    >
                      {t('noGuests')}
                    </td>
                  </tr>
                ) : (
                  filteredGuests.map((guest) => (
                    <tr key={guest.id} className='hover:bg-gray-50'>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        {editingId === guest.id ? (
                          <input
                            type='text'
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                handleUpdateGuest(guest.id);
                              } else if (e.key === 'Escape') {
                                setEditingId(null);
                                setEditName('');
                              }
                            }}
                            className='px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:border-blue-500'
                            autoFocus
                          />
                        ) : (
                          <div className='text-sm font-medium text-gray-900'>
                            {guest.name}
                          </div>
                        )}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        {guest.status ? t('statusOpened') : t('statusNotSent')}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                        {guest.receivedAt
                          ? guest.receivedAt.toLocaleDateString() +
                            ' ' +
                            guest.receivedAt.toLocaleTimeString()
                          : '-'}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <div className='flex items-center gap-2'>
                          {editingId === guest.id ? (
                            <>
                              <button
                                onClick={() => handleUpdateGuest(guest.id)}
                                className='flex items-center gap-1.5 px-3 py-1.5 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700 transition-colors'
                              >
                                <svg
                                  className='w-4 h-4'
                                  fill='none'
                                  stroke='currentColor'
                                  viewBox='0 0 24 24'
                                >
                                  <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth={2}
                                    d='M5 13l4 4L19 7'
                                  />
                                </svg>
                                {t('save')}
                              </button>
                              <button
                                onClick={() => {
                                  setEditingId(null);
                                  setEditName('');
                                }}
                                className='flex items-center gap-1.5 px-3 py-1.5 bg-gray-200 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-300 transition-colors'
                              >
                                <svg
                                  className='w-4 h-4'
                                  fill='none'
                                  stroke='currentColor'
                                  viewBox='0 0 24 24'
                                >
                                  <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth={2}
                                    d='M6 18L18 6M6 6l12 12'
                                  />
                                </svg>
                                {t('cancel')}
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() => {
                                  setEditingId(guest.id);
                                  setEditName(guest.name);
                                }}
                                className='flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors'
                              >
                                <svg
                                  className='w-4 h-4'
                                  fill='none'
                                  stroke='currentColor'
                                  viewBox='0 0 24 24'
                                >
                                  <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth={2}
                                    d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
                                  />
                                </svg>
                              </button>
                              <div className='flex items-center gap-1'>
                                <button
                                  onClick={() => copyGuestLink(guest.id, 'en')}
                                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                                    copiedButton?.guestId === guest.id &&
                                    copiedButton?.locale === 'en'
                                      ? 'bg-green-600 text-white'
                                      : 'bg-green-100 text-green-700 hover:bg-green-200'
                                  }`}
                                >
                                  {copiedButton?.guestId === guest.id &&
                                  copiedButton?.locale === 'en' ? (
                                    <svg
                                      className='w-4 h-4'
                                      fill='none'
                                      stroke='currentColor'
                                      viewBox='0 0 24 24'
                                    >
                                      <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth={2}
                                        d='M5 13l4 4L19 7'
                                      />
                                    </svg>
                                  ) : (
                                    <svg
                                      className='w-4 h-4'
                                      fill='none'
                                      stroke='currentColor'
                                      viewBox='0 0 24 24'
                                    >
                                      <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth={2}
                                        d='M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z'
                                      />
                                    </svg>
                                  )}
                                  {t('copyENLink')}
                                </button>
                                <button
                                  onClick={() => copyGuestLink(guest.id, 'vi')}
                                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                                    copiedButton?.guestId === guest.id &&
                                    copiedButton?.locale === 'vi'
                                      ? 'bg-green-600 text-white'
                                      : 'bg-green-100 text-green-700 hover:bg-green-200'
                                  }`}
                                >
                                  {copiedButton?.guestId === guest.id &&
                                  copiedButton?.locale === 'vi' ? (
                                    <svg
                                      className='w-4 h-4'
                                      fill='none'
                                      stroke='currentColor'
                                      viewBox='0 0 24 24'
                                    >
                                      <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth={2}
                                        d='M5 13l4 4L19 7'
                                      />
                                    </svg>
                                  ) : (
                                    <svg
                                      className='w-4 h-4'
                                      fill='none'
                                      stroke='currentColor'
                                      viewBox='0 0 24 24'
                                    >
                                      <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth={2}
                                        d='M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z'
                                      />
                                    </svg>
                                  )}
                                  {t('copyVILink')}
                                </button>
                              </div>
                              <button
                                onClick={() => setDeleteConfirmId(guest.id)}
                                className='flex items-center gap-1.5 px-3 py-1.5 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700 transition-colors'
                              >
                                <svg
                                  className='w-4 h-4'
                                  fill='none'
                                  stroke='currentColor'
                                  viewBox='0 0 24 24'
                                >
                                  <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth={2}
                                    d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                                  />
                                </svg>
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteConfirmId && (
          <>
            <motion.div
              className='fixed inset-0 bg-black bg-opacity-50 z-50'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDeleteConfirmId(null)}
            />
            <motion.div
              className='fixed inset-0 flex items-center justify-center z-50 p-4'
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className='bg-white rounded-lg shadow-xl max-w-md w-full p-6'>
                <h3 className='text-lg font-semibold text-gray-900 mb-2'>
                  {t('confirmDeleteTitle')}
                </h3>
                <p className='text-gray-600 mb-6'>{t('confirmDelete')}</p>
                <div className='flex gap-3 justify-end'>
                  <button
                    onClick={() => setDeleteConfirmId(null)}
                    className='px-4 py-2 bg-gray-200 text-gray-700 rounded-md font-medium hover:bg-gray-300 transition-colors'
                  >
                    {t('cancel')}
                  </button>
                  <button
                    onClick={() => handleDeleteGuest(deleteConfirmId!)}
                    className='px-4 py-2 bg-red-600 text-white rounded-md font-medium hover:bg-red-700 transition-colors'
                  >
                    {t('delete')}
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
