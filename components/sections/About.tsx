'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { portfolioData } from '@/lib/portfolio-data';
import { MapPin, User } from 'lucide-react';
import { useMouseParallax } from '@/lib/hooks';
import dynamic from 'next/dynamic';

const AmbientParticles = dynamic(
  () =>
    import('@/components/effects/AmbientParticles').then(mod => ({
      default: mod.AmbientParticles,
    })),
  {
    ssr: false,
    loading: () => null,
  }
);

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { personal } = portfolioData;

  // Reduced parallax effect for secondary sections
  const parallax = useMouseParallax(8);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section
      id="about"
      ref={ref}
      className="relative flex items-center overflow-hidden px-[1.15rem] py-[2.76rem] sm:px-[1.725rem] lg:px-[2.3rem]"
    >
      {/* Ambient particles */}
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <AmbientParticles />
      </div>

      {/* Parallax grid - more visible */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#38bdf810_1px,transparent_1px),linear-gradient(to_bottom,#38bdf810_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-30 transition-transform duration-200 ease-out"
        style={
          isMounted
            ? {
                transform: `translate(${parallax.x * 1.5}px, ${parallax.y * 1.5}px)`,
              }
            : undefined
        }
      />

      {/* Light beams */}
      <div
        className="pointer-events-none absolute inset-0 transition-transform duration-300 ease-out"
        style={{
          transform: `translate(${parallax.x}px, ${parallax.y}px)`,
        }}
      >
        <div className="absolute left-0 top-1/4 h-px w-full bg-gradient-to-r from-transparent via-accent-400/10 to-transparent" />
        <div className="absolute bottom-1/3 left-0 h-px w-full bg-gradient-to-r from-transparent via-accent-400/10 to-transparent" />
      </div>
      <div className="mx-auto w-full max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Section Header */}
          <div className="mb-[3.45rem] flex items-center gap-[1.15rem]">
            <User className="h-8 w-8 text-accent-400" />
            <h2 className="quantum-heading text-4xl font-bold text-white">About Me</h2>
            <div className="h-[2px] flex-1 bg-gradient-to-r from-accent-400 to-transparent" />
          </div>

          {/* Three Column Layout: Profile, Bio, Quick Facts */}
          <div className="grid items-stretch gap-[1.725rem] md:grid-cols-10">
            {/* Profile Image Column */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass-card-hover glass-flash flex h-full flex-col items-center justify-center p-[1.725rem] md:col-span-3"
            >
              <div className="group relative mb-4">
                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-accent-400 to-accent-600 opacity-75 blur transition duration-300 group-hover:opacity-100"></div>
                <img
                  src="/headshot.jpeg"
                  alt="Zachary Sluss"
                  className="relative h-48 w-48 rounded-full border-4 border-gray-800 object-cover shadow-2xl"
                />
              </div>
              <h3 className="mb-2 text-2xl font-bold text-white">{personal.name}</h3>
            </motion.div>

            {/* Bio Column */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="glass-card-hover glass-flash h-full p-[1.725rem] md:col-span-4"
            >
              <p className="mb-4 text-base leading-relaxed text-gray-300">{personal.bio}</p>

              <div className="flex items-center gap-2 text-gray-400">
                <MapPin className="h-4 w-4 text-accent-400" />
                <span>{personal.location}</span>
              </div>
            </motion.div>

            {/* Quick Facts Column */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="glass-card-hover glass-flash h-full p-[1.725rem] md:col-span-3"
            >
              <h3 className="mb-6 text-xl font-semibold text-accent-400">Quick Facts</h3>

              <div className="space-y-4">
                <div>
                  <p className="mb-1 text-xs uppercase tracking-wider text-gray-400">
                    Current Role
                  </p>
                  <p className="font-medium text-white">{personal.title}</p>
                </div>

                <div>
                  <p className="mb-1 text-xs uppercase tracking-wider text-gray-400">Location</p>
                  <p className="font-medium text-white">{personal.location}</p>
                </div>

                <div>
                  <p className="mb-1 text-xs uppercase tracking-wider text-gray-400">Email</p>
                  <a
                    href={`mailto:${personal.email}`}
                    className="font-medium text-accent-400 transition-colors hover:text-accent-300"
                  >
                    {personal.email}
                  </a>
                </div>

                {personal.phone && (
                  <div>
                    <p className="mb-1 text-xs uppercase tracking-wider text-gray-400">Phone</p>
                    <a
                      href={`tel:${personal.phone}`}
                      className="font-medium text-accent-400 transition-colors hover:text-accent-300"
                    >
                      {personal.phone}
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
