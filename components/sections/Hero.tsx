'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ExternalLink, Download, Sparkles, Bot } from 'lucide-react';
import { portfolioData } from '@/lib/portfolio-data';
import { useAssistantStore } from '@/lib/store';
import { useMouseParallax } from '@/lib/hooks';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';

const FloatingGeometry = dynamic(
  () => import('@/components/3D/FloatingGeometry').then(mod => ({ default: mod.FloatingGeometry })),
  {
    ssr: false,
    loading: () => null,
  }
);

const GradientMesh = dynamic(
  () => import('@/components/effects/GradientMesh').then(mod => ({ default: mod.GradientMesh })),
  {
    ssr: false,
    loading: () => null,
  }
);

const LightBeams = dynamic(
  () => import('@/components/effects/LightBeams').then(mod => ({ default: mod.LightBeams })),
  {
    ssr: false,
    loading: () => null,
  }
);

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

export function Hero() {
  const { personal, social } = portfolioData;
  const { setIsOpen, setMode, addMessage } = useAssistantStore();

  // Parallax effects with different intensities for depth
  const parallaxBg = useMouseParallax(15);
  const parallaxFg = useMouseParallax(35);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // ZARVIS introduction handler - Simple and guaranteed to work
  const handleZarvisClick = () => {
    // Switch to chat mode
    setMode('chat');
    setIsOpen(true);

    // Add initial welcome message from ZARVIS
    setTimeout(() => {
      addMessage(
        'assistant',
        `Hey there! 👋 I'm ZARVIS - Zachary's AI Research & Virtual Intelligence System - and I'm stoked you clicked to meet me!\n\nI'm Zac's AI clone with complete knowledge about him - his 7 years crushing it with Salesforce across 22 countries, his FAA-licensed drone photography business, his digital art, music production... everything! I can answer any questions about his background, projects, skills, or career goals.\n\nBut here's where it gets FUN - I'm also a Dungeon Master! Would you like to embark on an epic D&D quest? I can run a thrilling ZORK-style text adventure for you! 🐉\n\nSo what'll it be? Want to learn about Zac's enterprise tech wizardry, explore his creative work, or shall we roll some dice and go on an adventure? I'm game for whatever! 🎲✨`
      );
    }, 500);
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Background Effects */}
      <div
        className="absolute inset-0 z-0 transition-transform duration-200 ease-out"
        style={
          isMounted
            ? {
                transform: `translate(${parallaxBg.x}px, ${parallaxBg.y}px)`,
              }
            : undefined
        }
      >
        <GradientMesh />
        <LightBeams />
        <AmbientParticles />
      </div>

      {/* 3D Floating Elements */}
      <div
        className="pointer-events-none absolute inset-0 z-10 transition-transform duration-200 ease-out"
        style={
          isMounted
            ? {
                transform: `translate(${parallaxFg.x}px, ${parallaxFg.y}px)`,
              }
            : undefined
        }
      >
        <FloatingGeometry />
      </div>

      {/* Content */}
      <div className="relative z-20 mx-auto max-w-7xl px-[1.725rem] py-[9.2rem]">
        <div className="space-y-[2.3rem] text-center">
          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-gradient quantum-text glitch-on-load pb-2 text-6xl font-bold tracking-tight sm:text-7xl lg:text-8xl"
            style={{ overflow: 'visible' }}
          >
            {personal.name}
          </motion.h1>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-2xl font-semibold text-accent-400 sm:text-3xl lg:text-4xl"
          >
            {personal.title}
          </motion.h2>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-300 sm:text-xl"
          >
            {personal.tagline}
          </motion.p>

          {/* ZARVIS - Prominent Glowing Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8, type: 'spring' }}
            className="flex items-center justify-center pt-[1.725rem]"
          >
            <button
              onClick={handleZarvisClick}
              className="btn-zarvis inline-flex cursor-pointer items-center gap-3 rounded-2xl border-2 border-white/30 px-10 py-5 text-xl font-bold text-white transition-all hover:scale-110"
            >
              <Bot className="h-7 w-7" />
              <span className="relative z-10">Meet ZARVIS</span>
              <Sparkles className="h-6 w-6" />
            </button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mx-auto mt-3 max-w-md text-center text-sm text-gray-400"
          >
            My AI clone - Ask me anything, explore my portfolio, or play D&D!
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="flex flex-wrap items-center justify-center gap-[1.15rem] pt-[2.3rem]"
          >
            <a
              href="#contact"
              className="glass-button glass-flash rounded-xl px-8 py-4 font-semibold transition-all hover:scale-105"
            >
              <Mail className="mr-2 inline h-5 w-5" />
              Get in Touch
            </a>
            <a
              href="https://github.com/Zacsluss?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-button glass-flash rounded-xl px-8 py-4 font-semibold transition-all hover:scale-105"
            >
              <ExternalLink className="mr-2 inline h-5 w-5" />
              View Projects
            </a>
            <a
              href="/resume.pdf"
              download
              className="glass-button glass-flash rounded-xl px-8 py-4 font-semibold transition-all hover:scale-105"
            >
              <Download className="mr-2 inline h-5 w-5" />
              Download Resume
            </a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="flex items-center justify-center gap-[1.725rem] pt-[2.3rem]"
          >
            {social.github && (
              <a
                href={social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 transition-colors hover:text-accent-400"
                aria-label="GitHub"
              >
                <Github className="h-6 w-6" />
              </a>
            )}
            {social.linkedin && (
              <a
                href={social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 transition-colors hover:text-accent-400"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-6 w-6" />
              </a>
            )}
            {personal.email && (
              <a
                href={`mailto:${personal.email}`}
                className="text-gray-400 transition-colors hover:text-accent-400"
                aria-label="Email"
              >
                <Mail className="h-6 w-6" />
              </a>
            )}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 transform"
      >
        <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-accent-400/50 p-2">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="h-1.5 w-1.5 rounded-full bg-accent-400"
          />
        </div>
      </motion.div>
    </section>
  );
}
