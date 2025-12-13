"use client"

import React, { useEffect, useState } from 'react';

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

interface DiaryBookProps {
    children: React.ReactNode;
}

export default function DiaryBook({ children }: DiaryBookProps) {
    const [scratches, setScratches] = useState<Scratch[]>([]);
    const [agingSpots, setAgingSpots] = useState<AgingSpot[]>([]);

    useEffect(() => {
        setScratches([...Array(6)].map((_, i) => ({
            id: i,
            left: 20 + Math.random() * 60,
            top: 20 + Math.random() * 60,
            width: 30 + Math.random() * 80,
            transform: Math.random() * 180
        })));

        setAgingSpots([...Array(15)].map((_, i) => ({
            id: i,
            left: 10 + Math.random() * 80,
            top: 10 + Math.random() * 80,
            width: 4 + Math.random() * 12,
            height: 4 + Math.random() * 12
        })));
    }, []);

    return (
        <div className="hidden md:block relative w-full max-w-[700px] h-[850px]">
            <div className="relative w-full h-full">
                {/* Deep shadow under book */}
                <div className="absolute inset-0 bg-black opacity-70 blur-3xl transform translate-y-8 scale-95"></div>

                {/* Book cover with White Glow Shadow */}
                <div className="relative w-full h-full bg-black rounded-sm border border-gray-900 overflow-hidden flex flex-col" style={{
                    boxShadow: '0 0 15px rgba(255, 255, 255, 0.1), 0 0 30px rgba(255, 255, 255, 0.05)'
                }}>
                    {/* Leather texture overlay */}
                    <div className="absolute inset-0 opacity-60" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='leather'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.45' numOctaves='3' result='noise'/%3E%3CfeDiffuseLighting in='noise' lighting-color='%23333333' surfaceScale='2'%3E%3CfeDistantLight azimuth='45' elevation='60'/%3E%3C/feDiffuseLighting%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23leather)' opacity='0.5'/%3E%3C/svg%3E")`,
                        mixBlendMode: 'overlay',
                        filter: 'contrast(1.2)'
                    }}></div>

                    {/* Subtle Gradient for depth */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-950 opacity-90"></div>

                    {/* Scratches and wear */}
                    <div className="absolute inset-0 opacity-20">
                        {scratches.map((s) => (
                            <div
                                key={`scratch-${s.id}`}
                                className="absolute bg-gray-700 opacity-30"
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

                    <div className="p-6 md:p-10 h-full flex flex-col relative z-10">
                        {/* Metal corner decorations */}
                        <CornerDecoration position="top-left" />
                        <CornerDecoration position="top-right" />
                        <CornerDecoration position="bottom-left" />
                        <CornerDecoration position="bottom-right" />

                        {/* Title label */}
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

                            {/* Water damage stains */}
                            <div className="absolute top-1/4 right-12 w-48 h-48 bg-yellow-700 opacity-10 rounded-full blur-3xl"></div>
                            <div className="absolute bottom-1/3 left-16 w-40 h-40 bg-amber-800 opacity-15 rounded-full blur-2xl"></div>

                            {/* Coffee/tea stains */}
                            <div className="absolute top-12 right-20 w-28 h-28 bg-amber-900 opacity-15 rounded-full blur-lg"></div>
                            <div className="absolute bottom-16 right-24 w-32 h-32 bg-yellow-900 opacity-10 rounded-full blur-xl"></div>

                            {/* Aging spots */}
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
                            <div className="relative p-12 md:p-16 flex-grow flex flex-col min-h-0">
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Corner decoration sub-component
function CornerDecoration({ position }: { position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' }) {
    const isTop = position.includes('top');
    const isLeft = position.includes('left');

    const posClasses = `absolute ${isTop ? 'top-0' : 'bottom-0'} ${isLeft ? 'left-0' : 'right-0'} w-24 h-24 opacity-70`;
    const innerPos = `absolute ${isTop ? 'top-3' : 'bottom-3'} ${isLeft ? 'left-3' : 'right-3'} w-20 h-20`;

    const gradientH = isLeft ? 'from-amber-700 via-amber-600 to-transparent' : 'from-amber-700 via-amber-600 to-transparent';
    const gradientV = isTop ? 'from-amber-700 via-amber-600 to-transparent' : 'from-amber-700 via-amber-600 to-transparent';
    const gradientDirH = isLeft ? 'bg-gradient-to-r' : 'bg-gradient-to-l';
    const gradientDirV = isTop ? 'bg-gradient-to-b' : 'bg-gradient-to-t';

    return (
        <div className={posClasses}>
            <div className={innerPos}>
                <div className={`absolute ${isTop ? 'top-0' : 'bottom-0'} ${isLeft ? 'left-0' : 'right-0'} w-full h-0.5 ${gradientDirH} ${gradientH}`}></div>
                <div className={`absolute ${isTop ? 'top-0' : 'bottom-0'} ${isLeft ? 'left-0' : 'right-0'} w-0.5 h-full ${gradientDirV} ${gradientV}`}></div>
                <div className={`absolute ${isTop ? 'top-0' : 'bottom-0'} ${isLeft ? 'left-0' : 'right-0'} w-3 h-3 bg-amber-700 rounded-sm`}></div>
                <div className={`absolute ${isTop ? 'top-1' : 'bottom-1'} ${isLeft ? 'left-4' : 'right-4'} w-10 h-0.5 bg-amber-800`}></div>
                <div className={`absolute ${isTop ? 'top-4' : 'bottom-4'} ${isLeft ? 'left-1' : 'right-1'} w-0.5 h-10 bg-amber-800`}></div>
                <div className={`absolute ${isTop ? 'top-2' : 'bottom-2'} ${isLeft ? 'left-2' : 'right-2'} w-2 h-2 border border-amber-600 rotate-45`}></div>
            </div>
        </div>
    );
}
