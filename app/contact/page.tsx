'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from "next/link";

export default function ContactPage() {
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

  return (
    <div className="min-h-screen bg-white relative">
      <div 
        className="absolute inset-[10px] md:inset-[20px] rounded-[32px] bg-cover bg-no-repeat bg-[70%_center] md:bg-center"
        style={{ 
          backgroundImage: "url('/bg-synthwave.png')"
        }}
      >
        {/* Back to Home Link */}
        <div className="absolute top-8 left-8 z-10 animate-fade-in">
          <Link 
            href="/" 
            className="text-white hover:text-gray-300 transition-colors duration-300 flex items-center gap-2 footer-link"
            style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: '16px',
              fontWeight: 500,
            }}
          >
            ← Back to Home
          </Link>
        </div>

        {/* Main content container */}
        <div 
          className="relative flex flex-col mx-4 md:mx-auto"
          style={{ 
            marginTop: '74px',
            maxWidth: '100%'
          }}
        >
          {/* Logo */}
          <div className="flex items-start justify-center">
            <div className="flex flex-col items-center animate-scale-in">
              {/* Icon part */}
              <div className="flex items-center mb-2">
                <Image 
                  src="/logo-left.svg" 
                  alt="" 
                  width={31}
                  height={62}
                  className="h-[62px] w-[31px]"
                />
                <Image 
                  src="/logo-right.svg" 
                  alt="" 
                  width={31}
                  height={62}
                  className="h-[62px] w-[31px] scale-x-[-1]"
                />
              </div>
              {/* Text part */}
              <div 
                className="text-white font-bold"
                style={{
                  fontFamily: '"Satoshi Variable", sans-serif',
                  fontSize: '43.717px',
                  fontStyle: 'normal',
                  fontWeight: 700,
                  lineHeight: 'normal',
                  letterSpacing: '-1.312px'
                }}
              >
                lucidcraft
              </div>
            </div>
          </div>
          
          {/* Contact Content - Two Column Layout */}
          <div className="flex justify-center px-5 md:px-0" style={{ marginTop: 'calc(4rem + 20px)' }}>
            <div className="w-[700px] max-w-[700px] md:px-0">
              {/* Centered Title */}
              <div className="text-center mb-12">
                <h1 
                  className="text-white text-[32px] md:text-[42px] font-normal mb-6 animate-fade-in-up animate-delay-300"
                  style={{
                    fontFamily: '"Playfair Display", serif',
                    textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                  }}
                >
                  Get in Touch
                </h1>
                <p 
                  className="text-white/90 leading-relaxed text-lg animate-fade-in-up animate-delay-600"
                  style={{ 
                    fontFamily: '"Inter", sans-serif',
                    textShadow: '0 1px 2px rgba(0,0,0,0.5)',
                    textAlign: 'center',
                    marginBottom: '60px'
                  }}
                >
                  If you have an idea for an app, or have a business opportunity you would like to explore with us, we&apos;d love to hear from you.
                </p>
              </div>

              {/* Two Column Container */}
              <div className="flex gap-6">
                {/* Left Column - Address */}
                <div className="flex-1 animate-fade-in-up animate-delay-600">
                  <h3 
                    className="text-white text-xl font-semibold mb-6"
                    style={{ 
                      fontFamily: '"Inter", sans-serif',
                      textShadow: '0 1px 2px rgba(0,0,0,0.5)',
                      textAlign: 'left'
                    }}
                  >
                    Lucidcraft Studio, Inc.
                  </h3>
                  
                  <div className="mb-8">
                    <p 
                      className="text-white/90 leading-relaxed"
                      style={{ 
                        fontFamily: '"Inter", sans-serif',
                        textShadow: '0 1px 2px rgba(0,0,0,0.5)',
                        textAlign: 'left'
                      }}
                    >
                      1111B S Governors Ave<br />
                      STE 39519<br />
                      Dover, DE 19904
                    </p>
                  </div>
                  
                </div>

                {/* Right Column - Contact Form */}
                <div className="flex-1 animate-fade-in-up animate-delay-600">
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div>
                      <label 
                        htmlFor="name" 
                        className="block text-white text-sm font-medium mb-2"
                        style={{ 
                          fontFamily: '"Inter", sans-serif',
                          textShadow: '0 1px 2px rgba(0,0,0,0.5)',
                          textAlign: 'left'
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
                          height: '48px',
                          marginTop: '8px',
                          marginBottom: '20px'
                        }}
                      />
                    </div>
                    
                    <div>
                      <label 
                        htmlFor="email" 
                        className="block text-white text-sm font-medium mb-2"
                        style={{ 
                          fontFamily: '"Inter", sans-serif',
                          textShadow: '0 1px 2px rgba(0,0,0,0.5)',
                          textAlign: 'left'
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
                          height: '48px',
                          marginTop: '8px',
                          marginBottom: '20px'
                        }}
                      />
                    </div>
                    
                    <div>
                      <label 
                        htmlFor="message" 
                        className="block text-white text-sm font-medium mb-2"
                        style={{ 
                          fontFamily: '"Inter", sans-serif',
                          textShadow: '0 1px 2px rgba(0,0,0,0.5)',
                          textAlign: 'left'
                        }}
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={6}
                        className="w-full bg-white/20 border border-white/40 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/60 focus:bg-white/30 backdrop-blur-md transition-all duration-300 resize-none shadow-lg"
                        placeholder="Tell us about your project..."
                        required
                        style={{ 
                          fontFamily: '"Inter", sans-serif',
                          padding: '12px 16px',
                          marginTop: '8px',
                          marginBottom: '20px'
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
        
        {/* Footer section */}
        <footer
          className="absolute bottom-0 left-0 right-0 flex flex-col md:flex-row justify-between items-center mx-[30px] p-8 md:px-[110px] md:py-[47px] gap-6 md:gap-0"
          style={{ padding: '47px 109px' }}
        >
          {/* Navigation Links */}
          <div 
            className="flex flex-wrap md:flex-row gap-4 md:gap-[50px] items-center justify-center md:justify-start text-center md:text-left animate-fade-in-up animate-delay-900"
          >
            <a 
              href="/contact"
              className="footer-link"
              style={{
                color: '#FFFFFF',
                fontFamily: '"Inter", sans-serif',
                fontSize: '16px',
                fontWeight: 500,
                lineHeight: '20px',
                textDecoration: 'none'
              }}
            >
              Contact
            </a>
            <a 
              href="/privacy"
              className="footer-link"
              style={{
                color: '#FFFFFF',
                fontFamily: '"Inter", sans-serif',
                fontSize: '16px',
                fontWeight: 500,
                lineHeight: '20px',
                textDecoration: 'none'
              }}
            >
              Privacy Policy
            </a>
            <a 
              href="/terms"
              className="footer-link"
              style={{
                color: '#FFFFFF',
                fontFamily: '"Inter", sans-serif',
                fontSize: '16px',
                fontWeight: 500,
                lineHeight: '20px',
                textDecoration: 'none'
              }}
            >
              Terms of Service
            </a>
          </div>
          
          {/* Copyright */}
          <div 
            className="text-white text-center md:text-left animate-fade-in animate-delay-900"
            style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: '16px',
              fontWeight: 500,
              lineHeight: '20px'
            }}
          >
            © Copyright 2025 Lucidcraft Studio, Inc. All Rights Reserved.
          </div>
        </footer>
      </div>
    </div>
  );
}