'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { portfolioData } from '@/lib/portfolio-data';
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  ExternalLink,
  Download,
  FileText,
} from 'lucide-react';

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { personal, social } = portfolioData;

  return (
    <section
      id="contact"
      ref={ref}
      className="flex items-center px-[1.15rem] py-[1.725rem] sm:px-[1.725rem] lg:px-[2.3rem]"
    >
      <div className="mx-auto w-full max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Section Header */}
          <div className="mb-[3.45rem]">
            <div className="mb-[3.45rem] flex items-center gap-[1.15rem]">
              <Mail className="h-8 w-8 text-accent-400" />
              <h2 className="quantum-heading text-4xl font-bold text-white">Get In Touch</h2>
              <div className="h-[2px] flex-1 bg-gradient-to-r from-accent-400 to-transparent" />
            </div>
            <p className="max-w-3xl text-lg text-gray-400">
              I&apos;m always open to new opportunities and interesting projects. Feel free to reach
              out if you&apos;d like to connect!
            </p>
          </div>

          {/* Contact Cards - Responsive Grid: Mobile(1col) Tablet(2col) Desktop(3col) */}
          <div className="mb-[2.3rem] grid grid-cols-1 gap-[1.725rem] sm:grid-cols-2 lg:grid-cols-3">
            {/* Email */}
            <motion.a
              href={`mailto:${personal.email}`}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass-card-hover glass-flash hover:border-matrix-500/50 group rounded-lg p-[1.725rem] transition-all"
            >
              <div className="flex items-start gap-[1.15rem]">
                <div className="bg-matrix-500/10 group-hover:bg-matrix-500/20 rounded-lg p-3 transition-colors">
                  <Mail className="h-6 w-6 text-accent-400" />
                </div>
                <div className="flex-1">
                  <h3 className="mb-1 font-semibold text-white">Email</h3>
                  <p className="mb-2 text-sm text-gray-400">Send me a message</p>
                  <p className="group-hover:text-matrix-400 text-accent-400 transition-colors">
                    {personal.email}
                  </p>
                </div>
              </div>
            </motion.a>

            {/* Phone */}
            {personal.phone && (
              <motion.a
                href={`tel:${personal.phone}`}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="glass-card-hover glass-flash hover:border-matrix-500/50 group rounded-lg p-[1.725rem] transition-all"
              >
                <div className="flex items-start gap-[1.15rem]">
                  <div className="bg-matrix-500/10 group-hover:bg-matrix-500/20 rounded-lg p-3 transition-colors">
                    <Phone className="h-6 w-6 text-accent-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-1 font-semibold text-white">Phone</h3>
                    <p className="mb-2 text-sm text-gray-400">Give me a call</p>
                    <p className="group-hover:text-matrix-400 text-accent-400 transition-colors">
                      {personal.phone}
                    </p>
                  </div>
                </div>
              </motion.a>
            )}

            {/* Location */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="glass-card-hover glass-flash rounded-lg p-[1.725rem]"
            >
              <div className="flex items-start gap-[1.15rem]">
                <div className="bg-matrix-500/10 rounded-lg p-3">
                  <MapPin className="h-6 w-6 text-accent-400" />
                </div>
                <div className="flex-1">
                  <h3 className="mb-1 font-semibold text-white">Location</h3>
                  <p className="mb-2 text-sm text-gray-400">Based in</p>
                  <p className="text-accent-400">{personal.location}</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="glass-card-hover glass-flash rounded-lg p-[1.725rem]"
          >
            <h3 className="mb-[1.15rem] text-center font-semibold text-white">Connect With Me</h3>
            <div className="flex flex-wrap items-center justify-center gap-[1.15rem]">
              {social.github && (
                <a
                  href={social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:bg-matrix-500/20 hover:border-matrix-500 flex items-center gap-2 rounded-lg border border-gray-600 bg-gray-700/50 px-4 py-2 text-gray-300 transition-all hover:text-accent-400"
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5" />
                  <span>GitHub</span>
                </a>
              )}
              {social.linkedin && (
                <a
                  href={social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:bg-matrix-500/20 hover:border-matrix-500 flex items-center gap-2 rounded-lg border border-gray-600 bg-gray-700/50 px-4 py-2 text-gray-300 transition-all hover:text-accent-400"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                  <span>LinkedIn</span>
                </a>
              )}
              {social.twitter && (
                <a
                  href={social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:bg-matrix-500/20 hover:border-matrix-500 flex items-center gap-2 rounded-lg border border-gray-600 bg-gray-700/50 px-4 py-2 text-gray-300 transition-all hover:text-accent-400"
                  aria-label="Twitter"
                >
                  <ExternalLink className="h-5 w-5" />
                  <span>Twitter</span>
                </a>
              )}
              {social.website && (
                <a
                  href={social.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:bg-matrix-500/20 hover:border-matrix-500 flex items-center gap-2 rounded-lg border border-gray-600 bg-gray-700/50 px-4 py-2 text-gray-300 transition-all hover:text-accent-400"
                  aria-label="Experimental Portfolio"
                >
                  <ExternalLink className="h-5 w-5" />
                  <span>Experimental Portfolio</span>
                </a>
              )}
            </div>
          </motion.div>

          {/* Resume Download */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-[2.3rem] text-center"
          >
            <a
              href="/resume.pdf"
              download
              className="bg-matrix-500/10 hover:bg-matrix-500/20 border-matrix-500/50 hover:border-matrix-500 hover:text-matrix-400 group inline-flex items-center gap-3 rounded-lg border-2 px-8 py-4 font-semibold text-accent-400 transition-all"
            >
              <FileText className="h-5 w-5" />
              <span>Download My Resume</span>
              <Download className="h-5 w-5 transition-transform group-hover:translate-y-0.5" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
