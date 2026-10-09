import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ChevronDown,
  Send,
} from 'lucide-react';
import { api } from '../../services/api';
import { ContactMessage } from '../../types';

export const ContactPage: React.FC = () => {
  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Order Enquiry');
  const [message, setMessage] = useState('');

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedMsg, setSubmittedMsg] = useState<ContactMessage | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // FAQ state
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setErrorMsg('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      const result = await api.submitContact({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim() || undefined,
        subject,
        message: message.trim(),
      });
      setSubmittedMsg(result);
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    } catch (err: any) {
      setErrorMsg(err.message || 'Submission failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const faqs = [
    {
      q: 'Where do I collect my order?',
      a: 'If you selected Counter Pickup, your order will be waiting at the Campus Bite Canteen Counter inside Silver Oak University. Just show your Order ID to the staff.',
    },
    {
      q: 'What is the delivery time across campus blocks?',
      a: 'Average preparation and delivery time across Silver Oak University academic blocks and hostel premises is 10 to 15 minutes.',
    },
    {
      q: 'Can I pay via UPI or Cash on delivery?',
      a: 'Yes! Both Cash on Pickup and UPI (Google Pay, PhonePe, Paytm QR code) are supported.',
    },
    {
      q: 'Do you cater for college club events or student fests?',
      a: 'Yes, we take bulk meal and snack combo orders for student workshops, symposiums, and college fests. Submit the contact form or call +91 97128 71557 for bulk catering.',
    },
  ];

  return (
    <div className="py-8 md:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="max-w-2xl mb-12">
        <span className="text-xs font-bold uppercase tracking-wider text-[#FF6B35]">
          Get in Touch
        </span>
        <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-[#202124] mt-1 tracking-tight">
          Let's Talk About Your Next Bite.
        </h1>
        <p className="text-base text-[#777777] mt-3 leading-relaxed">
          Questions about an order, a suggestion for our menu, or an idea to share? We'd love to hear from you.
        </p>
      </div>

      {/* Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Verified Contact Information */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAEAEA] shadow-xs space-y-6">
            <h2 className="font-display text-xl font-bold text-[#202124]">
              Campus Contact Details
            </h2>

            {/* Phone */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#FFF8F1] border border-[#FF6B35]/20 flex items-center justify-center text-[#FF6B35] shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-[#777777] block font-medium">Telephone</span>
                <a
                  href="tel:+919712871557"
                  className="font-bold text-base text-[#202124] hover:text-[#FF6B35] transition-colors"
                >
                  +91 97128 71557
                </a>
                <span className="block text-[11px] text-[#777777] mt-0.5">
                  Available during canteen operating hours
                </span>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#FFF8F1] border border-[#FF6B35]/20 flex items-center justify-center text-[#FF6B35] shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-[#777777] block font-medium">Email Address</span>
                <a
                  href="mailto:2202021000377@silveroakuni.ac.in"
                  className="font-bold text-sm text-[#202124] hover:text-[#FF6B35] transition-colors break-all"
                >
                  2202021000377@silveroakuni.ac.in
                </a>
                <span className="block text-[11px] text-[#777777] mt-0.5">
                  Official student coordinator contact
                </span>
              </div>
            </div>

            {/* Campus Address */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#FFF8F1] border border-[#FF6B35]/20 flex items-center justify-center text-[#FF6B35] shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-[#777777] block font-medium">Campus Location</span>
                <p className="text-sm font-semibold text-[#202124]">
                  Silver Oak University
                </p>
                <p className="text-xs text-[#777777] leading-relaxed mt-0.5">
                  Near Gota Cross Road, S.G. Highway, Ahmedabad, Gujarat 382481
                </p>
              </div>
            </div>

            {/* Operating Hours */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#FFF8F1] border border-[#FF6B35]/20 flex items-center justify-center text-[#FF6B35] shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-[#777777] block font-medium">Service Hours</span>
                <p className="text-sm font-semibold text-[#202124]">
                  Monday – Saturday: 9:00 AM – 7:30 PM
                </p>
                <p className="text-xs text-[#777777] mt-0.5">
                  Closed on Sundays and University holidays
                </p>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <div className="pt-2 border-t border-[#EAEAEA]">
              <a
                href="https://wa.me/919712871557"
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 px-4 bg-[#238636] hover:bg-[#1f732e] text-white font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Message on WhatsApp (+91 97128 71557)</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAEAEA] shadow-sm">
            <h2 className="font-display text-xl font-bold text-[#202124] mb-1">
              Send Us a Message
            </h2>
            <p className="text-xs text-[#777777] mb-6">
              Fill out the form below and our team will get back to you shortly.
            </p>

            {errorMsg && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {submittedMsg ? (
              <div className="p-8 text-center bg-emerald-50 rounded-2xl border border-emerald-200 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-[#238636] mx-auto" />
                <h3 className="font-display text-lg font-bold text-[#202124]">
                  Message Received!
                </h3>
                <p className="text-xs text-[#777777] max-w-sm mx-auto leading-relaxed">
                  Thank you, {submittedMsg.name}. Your enquiry reference ID is{' '}
                  <strong className="font-mono text-[#202124]">{submittedMsg.id}</strong>. We will contact you at {submittedMsg.email}.
                </p>
                <button
                  onClick={() => setSubmittedMsg(null)}
                  className="mt-3 px-4 py-2 bg-[#202124] text-white text-xs font-bold rounded-lg cursor-pointer hover:bg-neutral-800"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#202124] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Priyansh Shah"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs border border-[#EAEAEA] rounded-xl focus:outline-none focus:border-[#FF6B35]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#202124] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="student@silveroakuni.ac.in"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs border border-[#EAEAEA] rounded-xl focus:outline-none focus:border-[#FF6B35]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#202124] mb-1">
                      Phone Number (optional)
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 97128 71557"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs border border-[#EAEAEA] rounded-xl focus:outline-none focus:border-[#FF6B35]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#202124] mb-1">
                      Enquiry Topic *
                    </label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs border border-[#EAEAEA] rounded-xl focus:outline-none focus:border-[#FF6B35] bg-white cursor-pointer"
                    >
                      <option value="Order Enquiry">Order Status or Query</option>
                      <option value="Menu Suggestion">Menu Item Suggestion</option>
                      <option value="Campus Catering">Club / Event Bulk Catering</option>
                      <option value="General Feedback">General Feedback</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#202124] mb-1">
                    Your Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="How can we help make your campus dining experience better?"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs border border-[#EAEAEA] rounded-xl focus:outline-none focus:border-[#FF6B35]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-[#FF6B35] hover:bg-[#E95420] text-white font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Sending Enquiry...</span>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-16 max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#FF6B35]">
            <HelpCircle className="w-4 h-4" />
            <span>Common Questions</span>
          </div>
          <h2 className="font-display text-2xl font-extrabold text-[#202124] mt-1">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openFaq === i;
            return (
              <div
                key={i}
                className="bg-white rounded-2xl border border-[#EAEAEA] overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="font-bold text-sm text-[#202124]">{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#777777] transition-transform ${
                      isOpen ? 'rotate-180 text-[#FF6B35]' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-[#777777] leading-relaxed border-t border-[#EAEAEA]/50 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
