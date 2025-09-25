"use client";
import { motion } from "framer-motion";

export function ContactSection() {
  return (
    <section className="relative z-10 bg-neutral-50 dark:bg-neutral-900 py-20">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <motion.h2
          className="text-3xl font-bold text-neutral-800 dark:text-neutral-100"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Get in Touch
        </motion.h2>
        <motion.p
          className="mt-4 text-neutral-600 dark:text-neutral-400"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Have questions or want to request a demo? Fill out the form below and
          our team will get back to you within 24 hours.
        </motion.p>

        <motion.form
          className="mt-10 grid grid-cols-1 gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="text"
            placeholder="Your Name"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-100 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-100 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <textarea
            placeholder="Your Message"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-100 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            rows={5}
            required
          />
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 px-6 py-3 text-white font-medium hover:bg-blue-700 transition"
          >
            Send Message
          </button>
        </motion.form>

        <motion.div
          className="mt-10 text-neutral-600 dark:text-neutral-400"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <p>
            Email:{" "}
            <a
              href="mailto:masoomehmokhtari693@gmail.com"
              className="text-blue-500"
            >
              masoomehmokhtari693@gmail.com
            </a>
          </p>
          <p>
            Phone:{" "}
            <a href="tel:+1234567890" className="text-blue-500">
              +1 234 567 890
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
