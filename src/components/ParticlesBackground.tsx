"use client"

import React, { useEffect, useState } from 'react';

interface Particle {
    id: number;
    left: number;
    top: number;
    width: number;
    height: number;
    delay: number;
    duration: number;
}

export default function ParticlesBackground() {
    const [greenParticles, setGreenParticles] = useState<Particle[]>([]);
    const [redParticles, setRedParticles] = useState<Particle[]>([]);
    const [purpleParticles, setPurpleParticles] = useState<Particle[]>([]);
    const [marbleParticles, setMarbleParticles] = useState<Particle[]>([]);
    const [turquoiseParticles, setTurquoiseParticles] = useState<Particle[]>([]);

    useEffect(() => {
        // Generate Green Particles
        setGreenParticles([...Array(10)].map((_, i) => ({
            id: i,
            left: Math.random() * 100,
            top: Math.random() * 100,
            width: 2 + Math.random() * 3,
            height: 2 + Math.random() * 3,
            delay: Math.random() * 4,
            duration: 3 + Math.random() * 4
        })));

        // Generate Purple Particles
        setPurpleParticles([...Array(15)].map((_, i) => ({
            id: i,
            left: Math.random() * 100,
            top: Math.random() * 100,
            width: 2 + Math.random() * 3,
            height: 2 + Math.random() * 3,
            delay: Math.random() * 5,
            duration: 4 + Math.random() * 5
        })));

        // Generate Red Particles
        setRedParticles([...Array(5)].map((_, i) => ({
            id: i,
            left: Math.random() * 100,
            top: Math.random() * 100,
            width: 2 + Math.random() * 3,
            height: 2 + Math.random() * 3,
            delay: Math.random() * 6,
            duration: 5 + Math.random() * 6
        })));

        // Generate Marble Particles
        setMarbleParticles([...Array(8)].map((_, i) => ({
            id: i,
            left: Math.random() * 100,
            top: Math.random() * 100,
            width: 2 + Math.random() * 3,
            height: 2 + Math.random() * 3,
            delay: Math.random() * 3,
            duration: 2 + Math.random() * 4
        })));

        // Generate Turquoise Particles
        setTurquoiseParticles([...Array(8)].map((_, i) => ({
            id: i,
            left: Math.random() * 100,
            top: Math.random() * 100,
            width: 2 + Math.random() * 3,
            height: 2 + Math.random() * 3,
            delay: Math.random() * 4,
            duration: 3 + Math.random() * 5
        })));
    }, []);

    const renderParticle = (p: Particle, color: string, opacity: string, prefix: string) => (
        <div
            key={`${prefix}-${p.id}`}
            className={`absolute rounded-full ${color} ${opacity} animate-pulse`}
            style={{
                left: `${p.left}%`,
                top: `${p.top}%`,
                width: `${p.width}px`,
                height: `${p.height}px`,
                animationDelay: `${p.delay}s`,
                animationDuration: `${p.duration}s`
            }}
        />
    );

    return (
        <>
            {/* Dark atmospheric background */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-black to-gray-900"></div>

            {/* Particles Layer */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {greenParticles.map((p) => renderParticle(p, 'bg-emerald-500', 'opacity-5', 'green'))}
                {purpleParticles.map((p) => renderParticle(p, 'bg-violet-600', 'opacity-15', 'purple'))}
                {redParticles.map((p) => renderParticle(p, 'bg-rose-600', 'opacity-10', 'red'))}
                {marbleParticles.map((p) => renderParticle(p, 'bg-slate-200', 'opacity-10', 'marble'))}
                {turquoiseParticles.map((p) => renderParticle(p, 'bg-teal-500', 'opacity-10', 'turquoise'))}
            </div>
        </>
    );
}
