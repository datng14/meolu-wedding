import Calendar from '@/components/Calendar';
import CoupleInfo from '@/components/CoupleInfo';
import Gallery from '@/components/Gallery';
import GiftIcon from '@/components/GiftIcon';
import Guestbook from '@/components/Guestbook';
import Hero from '@/components/Hero';
import Invitation from '@/components/Invitation';
import InvitationPopup from '@/components/InvitationPopup';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import Location from '@/components/Location';
import OurStory from '@/components/OurStory';
import RSVP from '@/components/RSVP';
import Timeline from '@/components/Timeline';
import { Suspense } from 'react';

export default function Home() {
  return (
    <main className='min-h-screen'>
      <Suspense fallback={null}>
        <InvitationPopup />
      </Suspense>
      <LanguageSwitcher />
      <Hero />
      <CoupleInfo />
      <OurStory />
      <Invitation />
      <Location />
      <Calendar />
      <Timeline />
      <Gallery />
      <RSVP />
      <Guestbook />
      <GiftIcon />
    </main>
  );
}
