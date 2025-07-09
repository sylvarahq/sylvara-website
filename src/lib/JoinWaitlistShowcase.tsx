"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function JoinWaitlistShowcase() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "" });

  // Supabase REST API credentials from environment
  const supabaseUrl = "https://bkocujroynyjvpyjrefn.supabase.co"!;
  const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJrb2N1anJveW55anZweWpyZWZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIwNDA4NTEsImV4cCI6MjA2NzYxNjg1MX0.9E34O8vPkrip_seiUjvO4L8Ac1zCL7xxBtH6QN2yilg"!;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${supabaseUrl}/rest/v1/waitlist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: supabaseAnonKey,
          Authorization: `Bearer ${supabaseAnonKey}`,
        },
        body: JSON.stringify({ username: form.name, email: form.email }),
      });

      if (!response.ok) {
        throw new Error('Failed to join waitlist');
      }

      setSubmitted(true);
    } catch (error) {
      console.error('Error adding to waitlist:', error);
      // TODO: show user-friendly error message
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative w-full bg-gradient-to-br from-background to-muted/50 py-16 px-4 sm:px-6 lg:px-8 overflow-hidden" id="waitlist">
      {/* Header */}
      <div className="max-w-4xl mx-auto">
        <motion.header
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            Join the Waitlist
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Be the first to experience the future of smart plant care
          </p>
        </motion.header>

        {/* Centered Form */}
        <div className="flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
                onSubmit={handleSubmit}
                className="bg-card border border-border rounded-xl shadow-xl p-6 sm:p-8 w-full max-w-md"
              >
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      Full Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      className="w-full border border-input rounded-lg px-3 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      className="w-full border border-input rounded-lg px-3 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                      placeholder="Enter your email address"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary text-primary-foreground font-semibold py-3 px-4 rounded-lg hover:bg-primary/90 transition-colors duration-200 mt-6 disabled:opacity-50"
                    whileHover={{ scale: !loading ? 1.02 : 1 }}
                    whileTap={{ scale: !loading ? 0.98 : 1 }}
                  >
                    {loading ? 'Joining...' : 'Join Waitlist'}
                  </motion.button>
                </div>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
                className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl shadow-xl p-6 sm:p-8 w-full max-w-md text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.5, ease: "backOut" }}
                  className="w-16 h-16 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
                <h2 className="text-2xl font-semibold text-green-800 dark:text-green-200 mb-2">Welcome to the waitlist!</h2>
                <p className="text-green-700 dark:text-green-300 mb-4">
                  Thank you for joining! We'll notify you as soon as Sylvara is ready.
                </p>
                <p className="text-sm text-green-600 dark:text-green-400">
                  Expected launch: Early 2025
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
