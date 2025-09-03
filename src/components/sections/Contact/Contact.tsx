"use client";

import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { GlassCard } from '@/components/ui/GlassCard';
import './Contact.css';
import emailjs from '@emailjs/browser';

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  // Form state
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  // EmailJS config (NEXT_PUBLIC_ vars come from .env.local; fallbacks for dev)
  const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '';
  const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ||'' ;
  const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '' ;

  if (process.env.NODE_ENV === 'development' && (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY)) {
    console.warn('EmailJS env variables are missing. Check .env.local.');
  }

  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const resetStatus = () => {
    setTimeout(() => {
      setSuccess(null);
      setError(null);
    }, 5000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(null);
    setError(null);

    if (!formData.name || !formData.email || !formData.message) {
      setError('Please fill required fields.');
      resetStatus();
      return;
    }

    setLoading(true);
    try {
      const customBody = `
        Name: ${formData.name}
        Email: ${formData.email}
        Subject: ${formData.subject}
        Message: ${formData.message}
      `;
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: customBody,
          to_name: 'kasrsugeeshwara',
          to_email: 'kasrsugeeshwara@gmail.com'
        },
        { publicKey: PUBLIC_KEY }
      );
      setSuccess('Message sent successfully.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch {
      setError('Failed to send. Try again later.');
    } finally {
      setLoading(false);
      resetStatus();
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className="py-20 px-4 bg-transparent"
    >
      <div className="container mx-auto">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4 text-gray-200"
            variants={itemVariants}
          >
            Get In <span className="text-purple-500">Touch</span>
          </motion.h2>
          <motion.div 
            className="w-20 h-1 bg-purple-600 mx-auto mb-6"
            variants={itemVariants}
          ></motion.div>
          <motion.p 
            className="text-lg text-gray-300 max-w-3xl mx-auto"
            variants={itemVariants}
          >
            Interested in working together? Feel free to reach out for collaborations or just a friendly hello.
          </motion.p>
        </motion.div>

        <div className="contact-grid">
          {/* Contact Form */}
          <motion.div 
            className="contact-form-wrapper"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <GlassCard intensity="high" color="purple" className="overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-6 text-gray-100">Send Me a Message</h3>
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-4" noValidate>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-200 mb-1">Name *</label>
                      <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-600 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-800 text-gray-100"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-1">Email *</label>
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-600 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-800 text-gray-100"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-200 mb-1">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-600 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-800 text-gray-100"
                      placeholder="Subject"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-200 mb-1">Message *</label>
                    <textarea
                      id="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-600 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-800 text-gray-100"
                      placeholder="Your message"
                    ></textarea>
                  </div>
                  <div className="space-y-2">
                    <Button 
                      variant="primary" 
                      className="w-full disabled:opacity-60"
                      whileHover={{ scale: loading ? 1 : 1.02 }}
                      whileTap={{ scale: loading ? 1 : 0.98 }}
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? 'Sending...' : 'Send Message'}
                    </Button>
                    <div aria-live="polite" className="min-h-[1.25rem] text-sm">
                      {success && <p className="text-green-400">{success}</p>}
                      {error && <p className="text-red-400">{error}</p>}
                    </div>
                  </div>
                </form>
              </div>
            </GlassCard>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            className="contact-info-wrapper"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <GlassCard intensity="medium" color="blue" className="h-full">
              <div className="p-6 h-full flex flex-col">
                <h3 className="text-xl font-bold mb-6 text-gray-100">Contact Information</h3>
                
                <div className="space-y-6 flex-grow">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 bg-purple-900/30 rounded-full flex items-center justify-center text-purple-400 mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-100">Location</h4>
                      <p className="text-gray-400 mt-1">14, Moses Lane, Koralawella, Moratuwa </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 bg-purple-900/30 rounded-full flex items-center justify-center text-purple-400 mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-100">Email</h4>
                      <p className="text-gray-400 mt-1">kasrsugeeshwara@gmail.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 bg-purple-900/30 rounded-full flex items-center justify-center text-purple-400 mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-100">Phone</h4>
                      <p className="text-gray-400 mt-1">+94 751 800 804</p>
                    </div>
                  </div>
                </div>
                
                {/* Social Links */}
                <div className="mt-8">
                  <h4 className="font-medium text-gray-100 mb-4">Connect with me</h4>
                  <div className="flex space-x-3">
                    <a href="#" className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                      </svg>
                    </a>
                    <a href="https://github.com/kasrsu" className="w-10 h-10 bg-blue-800 rounded-full flex items-center justify-center text-white hover:bg-blue-900 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    </a>
                    <a href="https://www.linkedin.com/in/anusara-sugeeshwara/" className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white hover:bg-gray-800 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
