"use client"

import React, { FormEvent, MouseEvent, useState, KeyboardEvent, useEffect } from 'react';

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
  const [isWriting, setIsWriting] = useState(false);
  const [showNotFound, setShowNotFound] = useState(false);
  const [inkText, setInkText] = useState('');

  // Visual state to prevent re-renders on every keystroke
  const [greenParticles, setGreenParticles] = useState<Particle[]>([]);
  const [redParticles, setRedParticles] = useState<Particle[]>([]);
  const [purpleParticles, setPurpleParticles] = useState<Particle[]>([]);
  const [marbleParticles, setMarbleParticles] = useState<Particle[]>([]); // New marble particles
  const [scratches, setScratches] = useState<Scratch[]>([]);
  const [agingSpots, setAgingSpots] = useState<AgingSpot[]>([]);

  useEffect(() => {
    // Generate Green Particles
    setGreenParticles([...Array(25)].map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      width: 3 + Math.random() * 6,
      height: 3 + Math.random() * 6,
      delay: Math.random() * 4,
      duration: 3 + Math.random() * 4
    })));

    // Generate Purple Particles (Now Priority: Larger and more than red)
    setPurpleParticles([...Array(20)].map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      width: 2 + Math.random() * 5,
      height: 2 + Math.random() * 5,
      delay: Math.random() * 5,
      duration: 4 + Math.random() * 5
    })));

    // Generate Red Particles (Now Secondary: Smaller and fewer)
    setRedParticles([...Array(10)].map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      width: 2 + Math.random() * 3,
      height: 2 + Math.random() * 3,
      delay: Math.random() * 6,
      duration: 5 + Math.random() * 6
    })));

    // Generate Marble Particles (New: Very small, white/silver)
    setMarbleParticles([...Array(15)].map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      width: 1 + Math.random() * 3,
      height: 1 + Math.random() * 3,
      delay: Math.random() * 3,
      duration: 2 + Math.random() * 4
    })));

    // Generate Scratches
    setScratches([...Array(8)].map((_, i) => ({
      id: i,
      left: 20 + Math.random() * 60,
      top: 20 + Math.random() * 60,
      width: 30 + Math.random() * 80,
      transform: Math.random() * 180
    })));

    // Generate Aging Spots
    setAgingSpots([...Array(25)].map((_, i) => ({
      id: i,
      left: 10 + Math.random() * 80,
      top: 10 + Math.random() * 80,
      width: 4 + Math.random() * 12,
      height: 4 + Math.random() * 12
    })));
  }, []);

  // Тут додай свої коди та повідомлення
  const messages: Record<string, string> = {
    'PATRONUS': 'Твоя магія сильніша ніж ти думаєш. Продовжуй вірити.',
    'LUMOS': 'Світло завжди перемагає темряву. Ти на правильному шляху.',
    'EXPECTO': 'Щастя можна знайти навіть у найтемніші часи, якщо не забувати запалювати світло.',
  };

  const handleSubmit = (e?: React.FormEvent<HTMLFormElement> | React.MouseEvent | React.KeyboardEvent<HTMLInputElement>) => {
    e?.preventDefault();
    const foundMessage = messages[code.toUpperCase()];

    if (foundMessage) {
      setIsWriting(true);
      setShowNotFound(false);
      setInkText('');

      let i = 0;
      const interval = setInterval(() => {
        if (i < foundMessage.length) {
          setInkText(foundMessage.substring(0, i + 1));
          i++;
        } else {
          clearInterval(interval);
          setMessage(foundMessage);
          setIsWriting(false);
        }
      }, 100); // Speed increased from 150ms to 100ms
    } else {
      setShowNotFound(true);
      setIsWriting(false);
      setMessage('');
      setInkText('');
    }
  };

  const reset = () => {
    setCode('');
    setMessage('');
    setIsWriting(false);
    setShowNotFound(false);
    setInkText('');
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Dark atmospheric background */}
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
      </div>

      {/* Mobile/Small Screen Optimized Message */}
      <div className="md:hidden relative w-full h-[90vh] flex flex-col items-center justify-center z-20">
        <div className="relative bg-gradient-to-br from-slate-800 via-slate-900 to-black rounded-sm shadow-2xl border border-gray-900 overflow-hidden w-full max-w-sm p-8 text-center bg-opacity-90 backdrop-blur-sm">
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
            Щоденник не відкривається на таких маленьких екранах...
          </p>
          <p className="text-amber-500/60 text-sm font-serif italic">
            Будь ласка, спробуй відкрити на комп'ютері.
          </p>
        </div>
      </div>

      {/* Desktop Book View */}
      <div className="hidden md:block relative w-full max-w-[700px] h-[850px]">
        {/* Book - NO ROTATION as requested */}
        <div className="relative w-full h-full">
          {/* Deep shadow under book */}
          <div className="absolute inset-0 bg-black opacity-70 blur-3xl transform translate-y-8 scale-95"></div>

          {/* Book cover - dark leather with metal corners */}
          <div className="relative w-full h-full bg-gradient-to-br from-slate-800 via-slate-900 to-black rounded-sm shadow-2xl border border-gray-900 overflow-hidden flex flex-col">
            {/* Leather texture overlay */}
            <div className="absolute inset-0 opacity-40" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`,
              mixBlendMode: 'overlay'
            }}></div>

            {/* Scratches and wear on cover */}
            <div className="absolute inset-0 opacity-20">
              {scratches.map((s) => (
                <div
                  key={`scratch-${s.id}`}
                  className="absolute bg-gray-600 opacity-30"
                  style={{
                    left: `${s.left}%`,
                    top: `${s.top}%`,
                    width: `${s.width}px`,
                    height: '1px',
                    transform: `rotate(${s.transform}deg)`
                  }}
                />
              ))}
            </div>

            <div className="p-6 md:p-10 h-full flex flex-col">
              {/* Metal corner decorations - ornate style */}
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
                <div className="inline-block bg-black bg-opacity-40 border-2 border-amber-900 px-12 py-4 shadow-inner">
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
                    key={`spot-${s.id}`}
                    className="absolute rounded-full bg-yellow-800 opacity-20 blur-sm"
                    style={{
                      left: `${s.left}%`,
                      top: `${s.top}%`,
                      width: `${s.width}px`,
                      height: `${s.height}px`,
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
                  {!message && !showNotFound && !isWriting && (
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
                        className="group relative px-8 py-3 overflow-hidden rounded-full font-serif text-base transition-all duration-300 hover:scale-105"
                      >
                        {/* Slytherin-ish styled button */}
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950 to-green-900 opacity-90 group-hover:opacity-100 transition-opacity"></div>
                        <div className="relative flex items-center justify-center space-x-3 text-emerald-100 group-hover:text-white">
                          {/* Snake-like icon (SVG) */}
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z" />
                          </svg>
                          <span className="tracking-[0.2em] uppercase font-bold">Спитати</span>
                        </div>
                      </button>
                    </div>
                  )}

                  {isWriting && (
                    <div className="w-full h-full flex items-center justify-center">
                      <p
                        className="text-gray-900 text-2xl leading-loose whitespace-pre-wrap"
                        style={{
                          fontFamily: 'Brush Script MT, cursive',
                          color: '#1a1a2e'
                        }}
                      >
                        {inkText}
                        <span className="inline-block w-1 h-8 bg-gray-900 animate-pulse ml-1"></span>
                      </p>
                    </div>
                  )}

                  {message && !isWriting && (
                    <div className="w-full h-full flex flex-col items-center justify-center space-y-12 animate-fade-in">
                      <div className="w-full">
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
                    <div className="w-full h-full flex flex-col items-center justify-center space-y-12 animate-fade-in">
                      <div className="w-full flex flex-col justify-center">
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
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </div>
  );
}