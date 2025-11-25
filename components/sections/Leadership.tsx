'use client';

import { motion } from 'framer-motion';
import { portfolioData } from '@/lib/portfolio-data';
import { ExternalLink, Target, Sparkles } from 'lucide-react';
import Image from 'next/image';

const principles = [
  {
    icon: '⚡',
    title: "Empower, Don't Bottleneck",
    description:
      'Build systems and people that scale beyond me. The best leaders create force multipliers, not dependencies.',
  },
  {
    icon: '🤖',
    title: 'Automate Relentlessly',
    description:
      "If it's manual, it's technical debt. Every repeated process is an opportunity to give someone hours of their day back.",
  },
  {
    icon: '🎯',
    title: 'Align to Business Outcomes',
    description:
      "Technology for technology's sake is waste. Every platform, every integration, every line of code must drive measurable business value.",
  },
  {
    icon: '📊',
    title: 'Lead with Data, Decide with Context',
    description:
      'Analytics inform strategy, but context drives decisions. Numbers tell you what happened — understanding why requires human insight.',
  },
  {
    icon: '🌱',
    title: 'Lead by Example',
    description:
      "If I'm asking my team to learn, I'm learning twice as hard. If I'm asking for innovation, I'm shipping personal projects at 60 FPS.",
  },
  {
    icon: '🔄',
    title: 'Change is the Only Constant',
    description:
      "Digital transformation isn't a project — it's a mindset. The enterprises that win are the ones that treat change as their competitive advantage.",
  },
];

export function Leadership() {
  const additionalLinks = portfolioData.additionalLinks || [];

  // Group links by category
  const groupedLinks = additionalLinks.reduce(
    (acc, link) => {
      if (!acc[link.category]) {
        acc[link.category] = [];
      }
      acc[link.category].push(link);
      return acc;
    },
    {} as Record<string, typeof additionalLinks>
  );

  return (
    <section id="leadership" className="relative px-[1.725rem] py-[5.52rem]">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-[3.45rem]"
        >
          <div className="mb-[3.45rem] flex items-center gap-[1.15rem]">
            <Target className="h-8 w-8 text-accent-400" />
            <h2 className="quantum-heading text-4xl font-bold text-white">Leadership & Passions</h2>
            <div className="h-[2px] flex-1 bg-gradient-to-r from-accent-400 to-transparent" />
          </div>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-white/70">
            I believe the best technology leaders are{' '}
            <span className="font-semibold text-accent-400">force multipliers</span> — not
            gatekeepers. Throughout my career driving enterprise transformations, I&apos;ve
            developed a philosophy that combines strategic vision with tactical execution,
            data-driven decision-making with human-centered design.
          </p>
        </motion.div>

        {/* Leadership Principles Grid */}
        <div className="mb-[4.6rem] grid gap-[1.725rem] md:grid-cols-2 lg:grid-cols-3">
          {principles.map((principle, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-card-hover glass-flash p-[1.725rem] text-center"
            >
              <div className="mb-[1.15rem] text-4xl">{principle.icon}</div>
              <h3 className="mb-[0.86rem] text-xl font-bold text-accent-400">{principle.title}</h3>
              <p className="text-sm leading-relaxed text-white/70">{principle.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Key Metrics */}
        <div className="mb-[4.6rem] grid gap-[1.725rem] md:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card-hover p-[2.3rem] text-center"
          >
            <div className="mb-3 text-6xl font-bold text-accent-400">40%</div>
            <div className="mb-2 text-sm font-bold uppercase tracking-wider text-white">
              PRODUCTIVITY GAINS
            </div>
            <div className="text-sm text-white/60">
              Through strategic automation & process redesign
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass-card-hover p-[2.3rem] text-center"
          >
            <div className="mb-3 text-6xl font-bold text-accent-400">1,000+</div>
            <div className="mb-2 text-sm font-bold uppercase tracking-wider text-white">
              HOURS AUTOMATED
            </div>
            <div className="text-sm text-white/60">Annually across 3,000+ global users</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card-hover p-[2.3rem] text-center"
          >
            <div className="mb-3 text-6xl font-bold text-accent-400">100%</div>
            <div className="mb-2 text-sm font-bold uppercase tracking-wider text-white">
              SOX COMPLIANCE
            </div>
            <div className="text-sm text-white/60">
              Zero breaches while enabling rapid innovation
            </div>
          </motion.div>
        </div>

        {/* Passions & Creative Work */}
        <motion.div
          id="beyond"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-[3.45rem] mt-[5.75rem]"
        >
          <div className="mb-[3.45rem] flex items-center gap-[1.15rem]">
            <Sparkles className="h-8 w-8 text-accent-400" />
            <h3 className="text-3xl font-bold text-white">Beyond the Enterprise</h3>
            <div className="h-[2px] flex-1 bg-gradient-to-r from-accent-400 to-transparent" />
          </div>
          <p className="mb-[3.45rem] max-w-3xl text-lg text-white/70">
            Multi-passionate about AI/ML, digital art, music production, and 360° drone photography
            — because curiosity makes better strategists.
          </p>

          <div className="space-y-[3.45rem]">
            {Object.entries(groupedLinks).map(([category, links], categoryIndex) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              >
                <h4 className="mb-[1.725rem] text-2xl font-bold text-accent-400">{category}</h4>

                <div className="grid grid-cols-1 gap-[1.725rem] md:grid-cols-2">
                  {links.map((link, index) => (
                    <motion.a
                      key={link.id}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ y: -5 }}
                      className="glass-card-hover glass-flash group overflow-hidden p-[1.725rem] transition-all hover:bg-white/10"
                    >
                      <div className="flex items-start gap-[1.15rem]">
                        {/* Image Thumbnail */}
                        {link.image && (
                          <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl ring-2 ring-accent-500/20 transition-all group-hover:ring-accent-400/50">
                            <Image
                              src={link.image}
                              alt={link.title}
                              fill
                              className="object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                          </div>
                        )}

                        {/* Content */}
                        <div className="min-w-0 flex-1">
                          <h5 className="mb-2 flex items-center gap-2 text-xl font-semibold transition-colors group-hover:text-accent-400">
                            {link.title}
                            <ExternalLink className="h-4 w-4 flex-shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
                          </h5>
                          <p className="text-sm leading-relaxed text-white/70">
                            {link.description}
                          </p>
                        </div>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
