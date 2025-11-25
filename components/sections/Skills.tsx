'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { portfolioData } from '@/lib/portfolio-data';
import { Zap } from 'lucide-react';

export function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { skills } = portfolioData;

  const getLevelColor = (level?: string) => {
    switch (level) {
      case 'Expert':
        return 'text-green-400 border-green-400';
      case 'Advanced':
        return 'text-blue-400 border-blue-400';
      case 'Intermediate':
        return 'text-yellow-400 border-yellow-400';
      case 'Beginner':
        return 'text-gray-400 border-gray-400';
      default:
        return 'text-gray-400 border-gray-400';
    }
  };

  return (
    <section
      id="skills"
      ref={ref}
      className="flex min-h-screen items-center bg-gray-900/30 px-[1.15rem] py-[4.6rem] sm:px-[1.725rem] lg:px-[2.3rem]"
    >
      <div className="mx-auto w-full max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Section Header */}
          <div className="mb-[3.45rem] flex items-center gap-[1.15rem]">
            <Zap className="h-8 w-8 text-accent-400" />
            <h2 className="quantum-heading text-4xl font-bold text-white">Skills & Technologies</h2>
            <div className="h-[2px] flex-1 bg-gradient-to-r from-accent-400 to-transparent" />
          </div>

          {/* Skills Grid */}
          <div className="grid gap-[1.725rem] md:grid-cols-3">
            {skills.map((category, catIndex) => (
              <motion.div
                key={catIndex}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: catIndex * 0.15 }}
                className="glass-flash flex h-[750px] flex-col overflow-hidden rounded-lg border border-gray-700/50 bg-gray-800/30 transition-all hover:border-accent-400/30 md:h-[840px]"
              >
                <div className="p-[1.725rem] pb-[1.15rem]">
                  <h3 className="mb-[1.15rem] flex items-center gap-2 text-xl font-bold text-accent-400">
                    <span className="bg-matrix-500 h-2 w-2 rounded-full" />
                    {category.category}
                  </h3>
                </div>

                <div className="flex-1 space-y-3 overflow-y-auto px-[1.725rem] pb-[1.725rem]">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skillIndex}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      whileHover={{ x: 5, transition: { duration: 0.2 } }}
                      transition={{ duration: 0.4, delay: catIndex * 0.15 + skillIndex * 0.05 }}
                      className="flex cursor-pointer items-center justify-between"
                    >
                      <span className="font-medium text-gray-200">{skill.name}</span>
                      <div className="flex items-center gap-2">
                        {skill.level && (
                          <span
                            className={`rounded-full border px-2 py-0.5 text-xs ${getLevelColor(skill.level)}`}
                          >
                            {skill.level}
                          </span>
                        )}
                        {skill.years && (
                          <span className="text-sm text-gray-500">{skill.years}y</span>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Legend */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-[2.3rem] flex flex-wrap items-center justify-center gap-[1.15rem] text-sm"
          >
            <span className="text-gray-500">Skill Level:</span>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-green-400" />
              <span className="text-gray-400">Expert</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-blue-400" />
              <span className="text-gray-400">Advanced</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-yellow-400" />
              <span className="text-gray-400">Intermediate</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-gray-400" />
              <span className="text-gray-400">Beginner</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
