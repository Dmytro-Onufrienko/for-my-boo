"use client"

import React, { FormEvent, MouseEvent, useState, KeyboardEvent, useEffect, useRef } from 'react';

interface Particle {
  id: number;
  left: number;
  top: number;
  width: number;
  height: number;
  delay: number;
  duration: number;
}

interface Scratch {
  id: number;
  left: number;
  top: number;
  width: number;
  transform: number;
}

interface AgingSpot {
  id: number;
  left: number;
  top: number;
  width: number;
  height: number;
}

export default function TomRiddleDiary() {
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');
  const [showNotFound, setShowNotFound] = useState(false);

  // Visual state to prevent re-renders on every keystroke
  const [greenParticles, setGreenParticles] = useState<Particle[]>([]);
  const [redParticles, setRedParticles] = useState<Particle[]>([]);
  const [purpleParticles, setPurpleParticles] = useState<Particle[]>([]);
  const [marbleParticles, setMarbleParticles] = useState<Particle[]>([]);
  const [turquoiseParticles, setTurquoiseParticles] = useState<Particle[]>([]); // New turquoise particles
  const [scratches, setScratches] = useState<Scratch[]>([]);
  const [agingSpots, setAgingSpots] = useState<AgingSpot[]>([]);

  useEffect(() => {
    // Generate Green Particles (Reduced count, smaller size)
    setGreenParticles([...Array(10)].map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      width: 2 + Math.random() * 3, // Smaller size (was 3-9)
      height: 2 + Math.random() * 3,
      delay: Math.random() * 4,
      duration: 3 + Math.random() * 4
    })));

    // Generate Purple Particles (Priority: Still largest relative count, but smaller absolute count)
    setPurpleParticles([...Array(15)].map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      width: 2 + Math.random() * 3, // Normalized size
      height: 2 + Math.random() * 3,
      delay: Math.random() * 5,
      duration: 4 + Math.random() * 5
    })));

    // Generate Red Particles (Reduced count)
    setRedParticles([...Array(5)].map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      width: 2 + Math.random() * 3, // Normalized size
      height: 2 + Math.random() * 3,
      delay: Math.random() * 6,
      duration: 5 + Math.random() * 6
    })));

    // Generate Marble Particles (Increased size, reduced count)
    setMarbleParticles([...Array(8)].map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      width: 2 + Math.random() * 3, // Increased from 1-4 to match others
      height: 2 + Math.random() * 3,
      delay: Math.random() * 3,
      duration: 2 + Math.random() * 4
    })));

    // Generate Turquoise Particles (New: similar count/size to others)
    setTurquoiseParticles([...Array(8)].map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      width: 2 + Math.random() * 3,
      height: 2 + Math.random() * 3,
      delay: Math.random() * 4,
      duration: 3 + Math.random() * 5
    })));

    // Generate Scratches
    setScratches([...Array(6)].map((_, i) => ({
      id: i,
      left: 20 + Math.random() * 60,
      top: 20 + Math.random() * 60,
      width: 30 + Math.random() * 80,
      transform: Math.random() * 180
    })));

    // Generate Aging Spots
    setAgingSpots([...Array(15)].map((_, i) => ({
      id: i,
      left: 10 + Math.random() * 80,
      top: 10 + Math.random() * 80,
      width: 4 + Math.random() * 12,
      height: 4 + Math.random() * 12
    })));
  }, []);

  // Тут додай свої коди та повідомлення
  const messages: Record<string, string> = {
    'плейсхолдер': 'Твоя магія сильніша ніж ти думаєш. Продовжуй вірити.',
  };

  const handleSubmit = (e?: React.FormEvent<HTMLFormElement> | React.MouseEvent | React.KeyboardEvent<HTMLInputElement>) => {
    e?.preventDefault();
    const foundMessage = messages[code.toUpperCase()];

    if (foundMessage) {
      setShowNotFound(false);
      setMessage(foundMessage);
    } else {
      setShowNotFound(true);
      setMessage('');
    }
  };

  const reset = () => {
    setCode('');
    setMessage('');
    setShowNotFound(false);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Dark atmospheric background (Reverted for particle visibility) */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-black to-gray-900"></div>

      {/* Particles Layer */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Green Particles */}
        {greenParticles.map((p) => (
          <div
            key={`green-${p.id}`}
            className="absolute rounded-full bg-emerald-500 opacity-5 animate-pulse"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: `${p.width}px`,
              height: `${p.height}px`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`
            }}
          />
        ))}

        {/* Purple Particles (Priority) */}
        {purpleParticles.map((p) => (
          <div
            key={`purple-${p.id}`}
            className="absolute rounded-full bg-violet-600 opacity-15 animate-pulse"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: `${p.width}px`,
              height: `${p.height}px`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`
            }}
          />
        ))}

        {/* Red Particles (Secondary) */}
        {redParticles.map((p) => (
          <div
            key={`red-${p.id}`}
            className="absolute rounded-full bg-rose-600 opacity-10 animate-pulse"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: `${p.width}px`,
              height: `${p.height}px`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`
            }}
          />
        ))}

        {/* Marble Particles (New) */}
        {marbleParticles.map((p) => (
          <div
            key={`marble-${p.id}`}
            className="absolute rounded-full bg-slate-200 opacity-10 animate-pulse"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: `${p.width}px`,
              height: `${p.height}px`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`
            }}
          />
        ))}

        {/* Turquoise Particles (New) */}
        {turquoiseParticles.map((p) => (
          <div
            key={`turquoise-${p.id}`}
            className="absolute rounded-full bg-teal-500 opacity-10 animate-pulse"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: `${p.width}px`,
              height: `${p.height}px`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`
            }}
          />
        ))}
      </div>

      {/* Mobile/Small Screen Optimized Message */}
      <div className="md:hidden relative w-full h-[90vh] flex flex-col items-center justify-center z-20">
        <div className="relative bg-black rounded-sm shadow-2xl border border-gray-900 overflow-hidden w-full max-w-sm p-8 text-center bg-opacity-95 backdrop-blur-sm">
          <div className="mb-6">
            <div className="inline-block bg-black bg-opacity-40 border-2 border-amber-900 px-6 py-2 shadow-inner">
              <h1 className="text-lg font-serif tracking-widest text-amber-600" style={{
                fontFamily: 'Georgia, serif',
                textShadow: '1px 1px 2px rgba(0,0,0,0.8), 0 0 1px rgba(180,140,80,0.5)'
              }}>
                TOM MARVOLO RIDDLE
              </h1>
            </div>
          </div>

          <p className="text-amber-100 text-lg font-serif italic mb-6 opacity-80 decoration-amber-700">
            І ти називаєш це екраном?
          </p>
          <p className="text-amber-100 text-lg font-serif italic mb-6 opacity-80 decoration-amber-700">
            Щоденник не відкривається на таких маленьких...
          </p>
        </div>
      </div>

      {/* Desktop Book View */}
      <div className="hidden md:block relative w-full max-w-[700px] h-[850px]">
        {/* Book */}
        <div className="relative w-full h-full">
          {/* Deep shadow under book */}
          <div className="absolute inset-0 bg-black opacity-70 blur-3xl transform translate-y-8 scale-95"></div>

          {/* Book cover - NOW BLACK with White Glow Shadow */}
          <div className="relative w-full h-full bg-black rounded-sm border border-gray-900 overflow-hidden flex flex-col" style={{
            boxShadow: '0 0 15px rgba(255, 255, 255, 0.1), 0 0 30px rgba(255, 255, 255, 0.05)'
          }}>
            {/* Leather texture overlay - Improved for leather look */}
            <div className="absolute inset-0 opacity-60" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='leather'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.45' numOctaves='3' result='noise'/%3E%3CfeDiffuseLighting in='noise' lighting-color='%23333333' surfaceScale='2'%3E%3CfeDistantLight azimuth='45' elevation='60'/%3E%3C/feDiffuseLighting%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23leather)' opacity='0.5'/%3E%3C/svg%3E")`,
              mixBlendMode: 'overlay',
              filter: 'contrast(1.2)'
            }}></div>

            {/* Subtle Gradient for depth (Dark gray to black) */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-950 opacity-90"></div>

            {/* Scratches and wear on cover */}
            <div className="absolute inset-0 opacity-20">
              {scratches.map((s) => (
                <div
                  key={`scratch - ${s.id} `}
                  className="absolute bg-gray-700 opacity-30"
                  style={{
                    left: `${s.left}% `,
                    top: `${s.top}% `,
                    width: `${s.width} px`,
                    height: '1px',
                    transform: `rotate(${s.transform}deg)`
                  }}
                />
              ))}
            </div>

            <div className="p-6 md:p-10 h-full flex flex-col relative z-10">
              {/* Metal corner decorations */}
              {/* Top Left Corner */}
              <div className="absolute top-0 left-0 w-24 h-24 opacity-70">
                <div className="absolute top-3 left-3 w-20 h-20">
                  <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-amber-700 via-amber-600 to-transparent"></div>
                  <div className="absolute top-0 left-0 w-0.5 h-full bg-gradient-to-b from-amber-700 via-amber-600 to-transparent"></div>
                  <div className="absolute top-0 left-0 w-3 h-3 bg-amber-700 rounded-sm"></div>
                  <div className="absolute top-1 left-4 w-10 h-0.5 bg-amber-800"></div>
                  <div className="absolute top-4 left-1 w-0.5 h-10 bg-amber-800"></div>
                  <div className="absolute top-2 left-2 w-2 h-2 border border-amber-600 rotate-45"></div>
                </div>
              </div>

              {/* Top Right Corner */}
              <div className="absolute top-0 right-0 w-24 h-24 opacity-70">
                <div className="absolute top-3 right-3 w-20 h-20">
                  <div className="absolute top-0 right-0 w-full h-0.5 bg-gradient-to-l from-amber-700 via-amber-600 to-transparent"></div>
                  <div className="absolute top-0 right-0 w-0.5 h-full bg-gradient-to-b from-amber-700 via-amber-600 to-transparent"></div>
                  <div className="absolute top-0 right-0 w-3 h-3 bg-amber-700 rounded-sm"></div>
                  <div className="absolute top-1 right-4 w-10 h-0.5 bg-amber-800"></div>
                  <div className="absolute top-4 right-1 w-0.5 h-10 bg-amber-800"></div>
                  <div className="absolute top-2 right-2 w-2 h-2 border border-amber-600 rotate-45"></div>
                </div>
              </div>

              {/* Bottom Left Corner */}
              <div className="absolute bottom-0 left-0 w-24 h-24 opacity-70">
                <div className="absolute bottom-3 left-3 w-20 h-20">
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-amber-700 via-amber-600 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 w-0.5 h-full bg-gradient-to-t from-amber-700 via-amber-600 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 w-3 h-3 bg-amber-700 rounded-sm"></div>
                  <div className="absolute bottom-1 left-4 w-10 h-0.5 bg-amber-800"></div>
                  <div className="absolute bottom-4 left-1 w-0.5 h-10 bg-amber-800"></div>
                  <div className="absolute bottom-2 left-2 w-2 h-2 border border-amber-600 rotate-45"></div>
                </div>
              </div>

              {/* Bottom Right Corner */}
              <div className="absolute bottom-0 right-0 w-24 h-24 opacity-70">
                <div className="absolute bottom-3 right-3 w-20 h-20">
                  <div className="absolute bottom-0 right-0 w-full h-0.5 bg-gradient-to-l from-amber-700 via-amber-600 to-transparent"></div>
                  <div className="absolute bottom-0 right-0 w-0.5 h-full bg-gradient-to-t from-amber-700 via-amber-600 to-transparent"></div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-amber-700 rounded-sm"></div>
                  <div className="absolute bottom-1 right-4 w-10 h-0.5 bg-amber-800"></div>
                  <div className="absolute bottom-4 right-1 w-0.5 h-10 bg-amber-800"></div>
                  <div className="absolute bottom-2 right-2 w-2 h-2 border border-amber-600 rotate-45"></div>
                </div>
              </div>

              {/* Title label on cover - ALWAYS VISIBLE now */}
              <div className="text-center mb-10 relative z-10 shrink-0">
                <div className="inline-block bg-black bg-opacity-70 border-2 border-amber-900 px-12 py-4 shadow-inner transform hover:scale-[1.02] transition-transform duration-700">
                  <h1 className="text-2xl md:text-3xl font-serif tracking-widest text-amber-600" style={{
                    fontFamily: 'Georgia, serif',
                    textShadow: '1px 1px 2px rgba(0,0,0,0.8), 0 0 1px rgba(180,140,80,0.5)'
                  }}>
                    TOM MARVOLO RIDDLE
                  </h1>
                </div>
              </div>

              {/* Open pages - old yellowed paper */}
              <div className="relative flex-grow bg-gradient-to-br from-amber-100 via-yellow-50 to-amber-200 shadow-2xl overflow-hidden flex flex-col" style={{
                boxShadow: 'inset 0 0 60px rgba(0,0,0,0.15), inset 20px 0 40px rgba(0,0,0,0.1)'
              }}>
                {/* Aged paper texture */}
                <div className="absolute inset-0 opacity-40" style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='300' height='300' viewBox='0 0 300 300' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='paper'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='5' /%3E%3CfeColorMatrix values='0 0 0 0 0.5, 0 0 0 0 0.4, 0 0 0 0 0.3, 0 0 0 0.8 0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23paper)' /%3E%3C/svg%3E")`,
                  mixBlendMode: 'multiply'
                }}></div>

                {/* Large water damage stain */}
                <div className="absolute top-1/4 right-12 w-48 h-48 bg-yellow-700 opacity-10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/3 left-16 w-40 h-40 bg-amber-800 opacity-15 rounded-full blur-2xl"></div>

                {/* Multiple coffee/tea stains */}
                <div className="absolute top-12 right-20 w-28 h-28 bg-amber-900 opacity-15 rounded-full blur-lg"></div>
                <div className="absolute bottom-16 right-24 w-32 h-32 bg-yellow-900 opacity-10 rounded-full blur-xl"></div>

                {/* Small aging spots scattered */}
                {agingSpots.map((s) => (
                  <div
                    key={`spot - ${s.id} `}
                    className="absolute rounded-full bg-yellow-800 opacity-20 blur-sm"
                    style={{
                      left: `${s.left}% `,
                      top: `${s.top}% `,
                      width: `${s.width} px`,
                      height: `${s.height} px`,
                    }}
                  />
                ))}

                {/* Fold/crease marks */}
                <div className="absolute inset-x-0 top-1/2 h-px bg-amber-800 opacity-15 blur-sm"></div>
                <div className="absolute left-1/3 inset-y-0 w-px bg-amber-700 opacity-10 blur-sm"></div>

                {/* Burnt/darkened edges */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-amber-900 opacity-20 pointer-events-none"></div>
                <div className="absolute inset-0 bg-gradient-to-tl from-transparent via-transparent to-yellow-900 opacity-15 pointer-events-none"></div>

                {/* Ink splatters */}
                <div className="absolute top-16 left-20 w-2 h-2 bg-gray-800 rounded-full opacity-40"></div>
                <div className="absolute top-24 left-28 w-3 h-3 bg-blue-900 rounded-full opacity-30 blur-sm"></div>
                <div className="absolute bottom-32 right-28 w-2 h-2 bg-gray-900 rounded-full opacity-35"></div>
                <div className="absolute top-40 right-16 w-4 h-4 bg-slate-800 rounded-full opacity-25 blur-sm"></div>

                {/* Content area */}
                <div className="relative p-12 md:p-16 flex-grow flex flex-col justify-center items-center text-center">
                  {!message && !showNotFound && (
                    <div className="w-full space-y-12">
                      <div className="space-y-4">
                        <p className="text-gray-700 text-lg font-serif italic mb-6 opacity-70">
                          Напиши щось у щоденник...
                        </p>
                        <input
                          type="text"
                          value={code}
                          onChange={(e) => setCode(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)}
                          placeholder=""
                          className="w-full bg-transparent border-b-2 border-gray-500 px-2 py-4 text-gray-900 text-2xl font-serif focus:outline-none focus:border-gray-800 placeholder-gray-400"
                          style={{ fontFamily: 'Brush Script MT, cursive' }}
                        />
                      </div>

                      <button
                        onClick={handleSubmit}
                        className="text-gray-600 font-serif text-base hover:text-gray-900 transition-colors italic opacity-70 hover:opacity-100"
                      >
                        Спитати
                      </button>
                    </div>
                  )}

                  {message && (
                    <div className="w-full h-full flex flex-col items-center justify-center space-y-12">
                      <div className="w-full animate-ink-reveal">
                        <p
                          className="text-gray-900 text-2xl leading-loose mb-16"
                          style={{
                            fontFamily: 'Brush Script MT, cursive',
                            color: '#1a1a2e'
                          }}
                        >
                          {message}
                        </p>
                      </div>
                      <button
                        onClick={reset}
                        className="text-gray-600 font-serif text-base hover:text-gray-900 transition-colors italic opacity-70 hover:opacity-100"
                      >
                        Написати ще...
                      </button>
                    </div>
                  )}

                  {showNotFound && (
                    <div className="w-full h-full flex flex-col items-center justify-center space-y-12">
                      <div className="w-full flex flex-col justify-center animate-ink-reveal">
                        {/* Default response text */}
                        <p
                          className="text-gray-800 text-3xl leading-loose italic mb-10"
                          style={{
                            fontFamily: 'Brush Script MT, cursive',
                            color: '#2d2d3a'
                          }}
                        >
                          Я не можу відповісти на це зараз.
                        </p>
                        <p
                          className="text-gray-700 text-2xl leading-loose italic opacity-80"
                          style={{
                            fontFamily: 'Brush Script MT, cursive'
                          }}
                        >
                          Спробуй пізніше...<br />
                          Можливо ввечері...<br />
                          Можливо завтра...<br />
                          <br />
                          І тоді отримаєш бажану відповідь.
                        </p>
                      </div>
                      <button
                        onClick={reset}
                        className="text-gray-600 font-serif text-base hover:text-gray-900 transition-colors italic opacity-70 hover:opacity-100"
                      >
                        Спробувати знову...
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
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
          animation: ink-reveal 6s ease-in-out forwards;
        }
        .perspective-1000 {
          perspective: 1000px;
}
`}</style>
    </div>
  );
}