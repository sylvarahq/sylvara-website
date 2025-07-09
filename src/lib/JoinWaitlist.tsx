"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function JoinWaitlist() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Supabase credentials from environment
  const supabaseUrl = "https://bkocujroynyjvpyjrefn.supabase.co"!;
  const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJrb2N1anJveW55anZweWpyZWZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIwNDA4NTEsImV4cCI6MjA2NzYxNjg1MX0.9E34O8vPkrip_seiUjvO4L8Ac1zCL7xxBtH6QN2yilg"!;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Derive username from email local-part
    const username = email.split('@')[0];

    try {
      const res = await fetch(
        `${supabaseUrl}/rest/v1/waitlist`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            apikey: supabaseAnonKey,
            Authorization: `Bearer ${supabaseAnonKey}`,
          },
          body: JSON.stringify({ username, email }),
        }
      );

      if (!res.ok) throw new Error('Failed to join waitlist');
      setSubmitted(true);
      setEmail("");
    } catch (error) {
      console.error("Error adding to waitlist:", error);
      // TODO: display error feedback to the user
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="waitlist"
      className="relative w-full min-h-screen flex items-center justify-center bg-white"
    >
      <h2 className="absolute top-8 left-8 text-3xl md:text-4xl font-bold mb-8 text-left">
        Join Our Waitlist
      </h2>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true, amount: 0.3 }}
        className="flex flex-col items-center w-full max-w-lg mt-24"
      >
        <p className="text-gray-600 mb-6 text-center max-w-lg">
          Be the first to know when Smart Plant launches. Enter your email below to join our exclusive waitlist!
        </p>

        {submitted ? (
          <div className="text-green-600 font-semibold">
            Thank you for joining the waitlist!
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
            <input
              type="email"
              required
              placeholder="Your email address"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="flex-1 px-4 py-2 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-base"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 rounded bg-green-600 text-white font-semibold hover:bg-green-700 transition disabled:opacity-50"
            >
              {loading ? 'Joining...' : 'Join'}
            </button>
          </form>
        )}
      </motion.div>
    </section>
  );
}
