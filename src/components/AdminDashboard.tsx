'use client';

import { db } from '@/lib/firebase';
import { RSVP } from '@/types';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

export default function AdminDashboard() {
  const t = useTranslations('admin');
  const [rsvps, setRsvps] = useState<RSVP[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'yes' | 'no'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const q = query(collection(db, 'rsvps'), orderBy('submittedAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const rsvpData: RSVP[] = [];
      snapshot.forEach((doc) => {
        rsvpData.push({
          id: doc.id,
          ...doc.data(),
          submittedAt: doc.data().submittedAt?.toDate() || new Date(),
        } as RSVP);
      });
      setRsvps(rsvpData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const filteredRsvps = rsvps.filter((rsvp) => {
    const matchesFilter =
      filter === 'all' ||
      (filter === 'yes' && rsvp.attending === 'yes') ||
      (filter === 'no' && rsvp.attending === 'no');
    const matchesSearch =
      searchTerm === '' ||
      rsvp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rsvp.message?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const stats = {
    total: rsvps.length,
    attending: rsvps.filter((r) => r.attending === 'yes').length,
    notAttending: rsvps.filter((r) => r.attending === 'no').length,
    totalGuests: rsvps
      .filter((r) => r.attending === 'yes')
      .reduce((sum, r) => sum + (r.guests || 1), 0),
    vegan: rsvps.filter((r) => r.vegan === 'yes').length,
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
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8'>
          <div className='bg-white rounded-lg shadow p-6'>
            <div className='text-3xl font-bold text-blue-600'>
              {stats.total}
            </div>
            <div className='text-gray-600 mt-2'>{t('totalRSVPs')}</div>
          </div>
          <div className='bg-white rounded-lg shadow p-6'>
            <div className='text-3xl font-bold text-green-600'>
              {stats.attending}
            </div>
            <div className='text-gray-600 mt-2'>{t('attending')}</div>
          </div>
          <div className='bg-white rounded-lg shadow p-6'>
            <div className='text-3xl font-bold text-red-600'>
              {stats.notAttending}
            </div>
            <div className='text-gray-600 mt-2'>{t('notAttending')}</div>
          </div>
          <div className='bg-white rounded-lg shadow p-6'>
            <div className='text-3xl font-bold text-purple-600'>
              {stats.totalGuests}
            </div>
            <div className='text-gray-600 mt-2'>{t('totalGuests')}</div>
          </div>
          <div className='bg-white rounded-lg shadow p-6'>
            <div className='text-3xl font-bold text-orange-600'>
              {stats.vegan}
            </div>
            <div className='text-gray-600 mt-2'>{t('vegan')}</div>
          </div>
        </div>

        {/* Filters */}
        <div className='bg-white rounded-lg shadow p-6 mb-6'>
          <div className='flex flex-col md:flex-row gap-4'>
            <div className='flex-1'>
              <input
                type='text'
                placeholder={t('searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:border-blue-500'
              />
            </div>
            <div className='flex gap-2'>
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {t('all')}
              </button>
              <button
                onClick={() => setFilter('yes')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === 'yes'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {t('attending')}
              </button>
              <button
                onClick={() => setFilter('no')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === 'no'
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {t('notAttending')}
              </button>
            </div>
          </div>
        </div>

        {/* RSVP List */}
        <div className='bg-white rounded-lg shadow overflow-hidden'>
          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead className='bg-gray-100'>
                <tr>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    {t('name')}
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    {t('attending')}
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    {t('guests')}
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    {t('vegan')}
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    {t('message')}
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    {t('submittedAt')}
                  </th>
                </tr>
              </thead>
              <tbody className='bg-white divide-y divide-gray-200'>
                {filteredRsvps.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className='px-6 py-4 text-center text-gray-500'
                    >
                      {t('noRSVPs')}
                    </td>
                  </tr>
                ) : (
                  filteredRsvps.map((rsvp) => (
                    <tr key={rsvp.id} className='hover:bg-gray-50'>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <div className='text-sm font-medium text-gray-900'>
                          {rsvp.name}
                        </div>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            rsvp.attending === 'yes'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {rsvp.attending === 'yes' ? t('yes') : t('no')}
                        </span>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                        {rsvp.attending === 'yes' ? rsvp.guests || 1 : '-'}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            rsvp.vegan === 'yes'
                              ? 'bg-orange-100 text-orange-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {rsvp.vegan === 'yes' ? t('yes') : t('no')}
                        </span>
                      </td>
                      <td className='px-6 py-4'>
                        <div className='text-sm text-gray-500 max-w-xs'>
                          {rsvp.message || '-'}
                        </div>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                        {rsvp.submittedAt.toLocaleDateString()}{' '}
                        {rsvp.submittedAt.toLocaleTimeString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
