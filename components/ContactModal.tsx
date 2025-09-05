'use client';

import { useState } from 'react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setFormData({ name: '', email: '', message: '' });
    setSubmitStatus('idle');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={handleClose} />
      
      {/* Modal */}
      <div 
        className="absolute inset-[10px] rounded-[32px] bg-cover bg-no-repeat bg-[70%_center] overflow-hidden"
        style={{ 
          backgroundImage: "url('/bg-synthwave.png')"
        }}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-8 right-8 z-10 text-white hover:text-white/80 transition-colors duration-300"
          style={{
            fontSize: '24px',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          ×
        </button>

        {/* Scrollable content */}
        <div 
          className="h-full overflow-y-auto"
          style={{
            scrollbarWidth: 'auto',
            scrollbarColor: 'rgba(255,255,255,0.5) rgba(255,255,255,0.1)'
          }}
        >
          <div className="flex flex-col min-h-full px-6 py-16">
            {/* Title */}
            <div className="text-center mb-8">
              <h1 
                className="text-white text-[28px] font-normal mb-4"
                style={{
                  fontFamily: '"Playfair Display", serif',
                  textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                }}
              >
                Get in Touch
              </h1>
              <p 
                className="text-white/90 leading-relaxed"
                style={{ 
                  fontFamily: '"Inter", sans-serif',
                  textShadow: '0 1px 2px rgba(0,0,0,0.5)',
                  fontSize: '16px'
                }}
              >
                If you have an idea for an app, or have a business opportunity you would like to explore with us, we&apos;d love to hear from you.
              </p>
            </div>

            {/* Content container with same styling as privacy/terms */}
            <div 
              className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-lg flex-1"
              style={{
                padding: '24px',
                marginBottom: '20px'
              }}
            >
              {/* Company info */}
              <div className="mb-8">
                <h3 
                  className="text-white text-xl font-semibold mb-4"
                  style={{ 
                    fontFamily: '"Inter", sans-serif',
                    textShadow: '0 1px 2px rgba(0,0,0,0.5)'
                  }}
                >
                  Lucidcraft Studio, Inc.
                </h3>
                
                <p 
                  className="text-white/90 leading-relaxed mb-6"
                  style={{ 
                    fontFamily: '"Inter", sans-serif',
                    textShadow: '0 1px 2px rgba(0,0,0,0.5)'
                  }}
                >
                  1111B S Governors Ave<br />
                  STE 39519<br />
                  Dover, DE 19904
                </p>
              </div>

              {/* Contact Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label 
                    htmlFor="name" 
                    className="block text-white text-sm font-medium mb-2"
                    style={{ 
                      fontFamily: '"Inter", sans-serif',
                      textShadow: '0 1px 2px rgba(0,0,0,0.5)'
                    }}
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-white/20 border border-white/40 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/60 focus:bg-white/30 backdrop-blur-md transition-all duration-300 shadow-lg"
                    placeholder="Your name"
                    required
                    style={{ 
                      fontFamily: '"Inter", sans-serif',
                      padding: '12px 16px',
                      height: '48px'
                    }}
                  />
                </div>
                
                <div>
                  <label 
                    htmlFor="email" 
                    className="block text-white text-sm font-medium mb-2"
                    style={{ 
                      fontFamily: '"Inter", sans-serif',
                      textShadow: '0 1px 2px rgba(0,0,0,0.5)'
                    }}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-white/20 border border-white/40 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/60 focus:bg-white/30 backdrop-blur-md transition-all duration-300 shadow-lg"
                    placeholder="your@email.com"
                    required
                    style={{ 
                      fontFamily: '"Inter", sans-serif',
                      padding: '12px 16px',
                      height: '48px'
                    }}
                  />
                </div>
                
                <div>
                  <label 
                    htmlFor="message" 
                    className="block text-white text-sm font-medium mb-2"
                    style={{ 
                      fontFamily: '"Inter", sans-serif',
                      textShadow: '0 1px 2px rgba(0,0,0,0.5)'
                    }}
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full bg-white/20 border border-white/40 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/60 focus:bg-white/30 backdrop-blur-md transition-all duration-300 resize-none shadow-lg"
                    placeholder="Tell us about your project..."
                    required
                    style={{ 
                      fontFamily: '"Inter", sans-serif',
                      padding: '12px 16px'
                    }}
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-white/30 hover:bg-white/40 text-white font-semibold rounded-lg backdrop-blur-md border border-white/50 transition-all duration-300 hover-lift disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                  style={{ 
                    fontFamily: '"Inter", sans-serif',
                    textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                    padding: '16px 32px',
                    height: '56px'
                  }}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
            
                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <div className="p-4 bg-green-500/20 border border-green-500/30 rounded-lg text-green-100 text-center animate-fade-in">
                    Message sent successfully! We&apos;ll get back to you soon.
                  </div>
                )}
                
                {submitStatus === 'error' && (
                  <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-red-100 text-center animate-fade-in">
                    There was an error sending your message. Please try again.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}