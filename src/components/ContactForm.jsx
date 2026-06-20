import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';

const FORMSPREE_ENDPOINT = ""; // Paste your Formspree endpoint URL here, e.g. "https://formspree.io/f/mqkvwzoe"

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters long';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    // Clear validation error when user types
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    // If Formspree endpoint is configured, submit to it
    if (FORMSPREE_ENDPOINT) {
      try {
        const response = await fetch(FORMSPREE_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
          body: JSON.stringify(formData)
        });

        if (response.ok) {
          setSubmitStatus('success');
          setFormData({ name: '', email: '', message: '' });
        } else {
          setSubmitStatus('error');
        }
      } catch (err) {
        setSubmitStatus('error');
      } finally {
        setIsSubmitting(false);
      }
    } else {
      // Simulation mode if endpoint is not set
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      }, 1500);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      {submitStatus === 'success' && (
        <div className="mb-6 p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-start gap-3 animate-fade-in">
          <CheckCircle2 className="w-5 h-5 mt-0.5 shrink-0" />
          <div>
            <h4 className="font-semibold text-white">Message sent successfully!</h4>
            <p className="text-sm mt-1">Thank you for reaching out. We will get back to you within 24 hours.</p>
          </div>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="mb-6 p-4 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" />
          <div>
            <h4 className="font-semibold text-white">Submission failed</h4>
            <p className="text-sm mt-1">
              There was an error delivering your message. Please try again or email us directly.
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="form-name" className="block text-sm font-medium text-slate-300 mb-2">
            Your Name
          </label>
          <input
            type="text"
            id="form-name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            className={`w-full px-4 py-3 rounded-lg bg-slate-900/60 border ${
              errors.name ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-800 focus:ring-brand-cyan'
            } text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:border-transparent transition-all`}
          />
          {errors.name && (
            <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="form-email" className="block text-sm font-medium text-slate-300 mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="form-email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john@example.com"
            className={`w-full px-4 py-3 rounded-lg bg-slate-900/60 border ${
              errors.email ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-800 focus:ring-brand-cyan'
            } text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:border-transparent transition-all`}
          />
          {errors.email && (
            <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="form-message" className="block text-sm font-medium text-slate-300 mb-2">
            Your Message
          </label>
          <textarea
            id="form-message"
            name="message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us about your project or inquiry..."
            className={`w-full px-4 py-3 rounded-lg bg-slate-900/60 border ${
              errors.message ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-800 focus:ring-brand-cyan'
            } text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:border-transparent transition-all resize-none`}
          ></textarea>
          {errors.message && (
            <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-4 px-6 rounded-lg bg-gradient-to-r from-brand-cyan to-brand-purple hover:opacity-95 text-white font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-brand-cyan/15 disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {isSubmitting ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Send Message</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
