"use client"

import ParticlesBackground from '@/components/ParticlesBackground';
import MobileBlocker from '@/components/MobileBlocker';
import DiaryBook from '@/components/DiaryBook';
import DiaryContent from '@/components/DiaryContent';

export default function TomRiddleDiary() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background and particles */}
      <ParticlesBackground />

      {/* Mobile blocker */}
      <MobileBlocker />

      {/* Desktop diary */}
      <DiaryBook>
        <DiaryContent />
      </DiaryBook>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 2s ease-out;
        }
        @keyframes ink-reveal {
          0% {
            clip-path: inset(0 0 100% 0);
            opacity: 0.5;
          }
          100% {
            clip-path: inset(0 0 0% 0);
            opacity: 1;
          }
        }
        .animate-ink-reveal {
          animation: ink-reveal 7s ease-in-out forwards;
        }
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </div>
  );
}