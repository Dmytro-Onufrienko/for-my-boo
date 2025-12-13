"use client"

import React from 'react';

export default function MobileBlocker() {
    return (
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
    );
}
