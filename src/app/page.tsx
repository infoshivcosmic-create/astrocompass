'use client';

import Header from '@/components/compass-ui/Header';
import VastuCompass from '@/components/compass-ui/VastuCompass';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-20 pb-6 px-4">
        <VastuCompass />
      </main>
    </div>
  );
}
