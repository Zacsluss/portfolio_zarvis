'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { portfolioData } from '@/lib/portfolio-data';
import { formatDate, calculateDuration } from '@/lib/utils';
import { Briefcase, Calendar } from 'lucide-react';

// Client-only duration calculator to prevent hydration mismatches
function Duration({ startDate, endDate }: { startDate: string; endDate?: string }) {
  const [duration, setDuration] = useState<string>('');

  useEffect(() => {
    setDuration(calculateDuration(startDate, endDate));
  }, [startDate, endDate]);

  return <span>{duration}</span>;
}

export function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { experience } = portfolioData;

  return (
    <section
      id="experience"
      ref={ref}
      className="flex min-h-screen items-center bg-gray-900/30 px-[1.15rem] py-[4.6rem] sm:px-[1.725rem] lg:px-[2.3rem]"
    >
      <div className="mx-auto w-full max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Section Header */}
          <div className="mb-[3.45rem] flex items-center gap-[1.15rem]">
            <Briefcase className="h-8 w-8 text-accent-400" />
            <h2 className="quantum-heading text-4xl font-bold text-white">Experience</h2>
            <div className="h-[2px] flex-1 bg-gradient-to-r from-accent-400 to-transparent" />
          </div>

          {/* Timeline */}
          <div className="space-y-[2.3rem]">
            {experience.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative border-l-2 border-accent-500/30 pb-[2.3rem] pl-[2.3rem] last:pb-0"
              >
                {/* Timeline dot */}
                <div className="absolute left-[-9px] top-0 h-4 w-4 rounded-full border-4 border-black bg-accent-400 ring-2 ring-accent-400/20" />

                {/* Content */}
                <div className="glass-card-hover glass-flash p-[1.725rem]">
                  <div className="mb-[1.15rem] flex flex-wrap items-start justify-between gap-[1.15rem]">
                    <div>
                      <h3 className="text-xl font-bold text-white">{exp.position}</h3>
                      <p className="font-semibold text-accent-400">{exp.company}</p>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Calendar className="h-4 w-4" />
                      <span suppressHydrationWarning>
                        {formatDate(exp.startDate)} -{' '}
                        {exp.endDate ? formatDate(exp.endDate) : 'Present'}
                      </span>
                      <span className="text-gray-600">•</span>
                      <Duration startDate={exp.startDate} endDate={exp.endDate} />
                    </div>
                  </div>

                  <p className="mb-[1.15rem] text-gray-300">{exp.description}</p>

                  {/* Achievements */}
                  <ul className="mb-[1.15rem] space-y-2">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                        <span className="text-matrix-500 mt-1">▹</span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech, i) => (
                      <motion.span
                        key={i}
                        whileHover={{ y: -3, transition: { duration: 0.2 } }}
                        className="bg-matrix-500/10 text-matrix-500 border-matrix-500/30 cursor-pointer rounded-full border px-3 py-1 text-xs"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
