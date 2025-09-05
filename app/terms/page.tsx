'use client';

import { useState } from 'react';
import Link from "next/link";
import ContactModal from "../../components/ContactModal";

export default function TermsPage() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <>
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
            className="text-white hover:text-white/80 transition-colors duration-300 flex items-center gap-2 footer-link"
            style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: '16px',
              fontWeight: 500,
              color: '#FFFFFF'
            }}
          >
            ← Back to Home
          </Link>
        </div>

        {/* Main content container */}
        <div 
          className="relative flex flex-col mx-4 md:mx-auto pt-20"
          style={{ 
            marginTop: '74px',
            maxWidth: '100%',
            paddingBottom: '120px'
          }}
        >
          {/* Logo */}
          <div className="flex items-start justify-center">
            <div className="flex flex-col items-center animate-scale-in">
              {/* Icon part */}
              <div className="flex items-center mb-2">
                <img 
                  src="/logo-left.svg" 
                  alt="" 
                  className="h-[62px] w-[31px]"
                />
                <img 
                  src="/logo-right.svg" 
                  alt="" 
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
          
          {/* Content */}
          <div className="flex justify-center px-5 md:px-0" style={{ marginTop: 'calc(4rem + 20px)', marginBottom: '30px' }}>
            <div className="w-[910px] max-w-[910px] md:px-6">
              {/* Title Section */}
              <div className="mb-20" style={{ marginBottom: '30px' }}>
                <h1 
                  className="text-white text-[32px] md:text-[42px] font-normal mb-16 animate-fade-in-up animate-delay-300"
                  style={{
                    fontFamily: '"Playfair Display", serif',
                    textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                    textAlign: 'left'
                  }}
                >
                  Terms of Service
                </h1>
                <p 
                  className="text-white/80 animate-fade-in-up animate-delay-600"
                  style={{ 
                    fontFamily: '"Inter", sans-serif',
                    textShadow: '0 1px 2px rgba(0,0,0,0.5)',
                    textAlign: 'left'
                  }}
                >
                  Effective Date: January 2025
                </p>
              </div>
            
              <div 
                className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 max-h-[680px] overflow-y-auto space-y-8 animate-fade-in-up animate-delay-900 shadow-lg"
                style={{
                  scrollbarWidth: 'auto',
                  scrollbarColor: 'rgba(255,255,255,0.5) rgba(255,255,255,0.1)',
                  padding: '20px 24px 50px 24px'
                }}
              >
              <section className="space-y-4">
                <h2 
                  className="text-white text-2xl font-semibold"
                  style={{ 
                    fontFamily: '"Inter", sans-serif',
                    textShadow: '0 1px 2px rgba(0,0,0,0.5)',
                    textAlign: 'left',
                    marginTop: '24px'
                  }}
                >
                  1. Acceptance of Terms
                </h2>
                <p 
                  className="text-white/90 leading-relaxed"
                  style={{ 
                    fontFamily: '"Inter", sans-serif',
                    textShadow: '0 1px 2px rgba(0,0,0,0.5)',
                    textAlign: 'left'
                  }}
                >
                  By accessing or using the services provided by Lucidcraft Studio, Inc. ("Company," "we," "our," or "us"), 
                  you agree to be bound by these Terms of Service ("Terms").
                </p>
              </section>
              
              <section className="space-y-4">
                <h2 
                  className="text-white text-2xl font-semibold"
                  style={{ 
                    fontFamily: '"Inter", sans-serif',
                    textShadow: '0 1px 2px rgba(0,0,0,0.5)',
                    textAlign: 'left',
                    marginTop: '24px'
                  }}
                >
                  2. Use of Services
                </h2>
                <p 
                  className="text-white/90 leading-relaxed"
                  style={{ 
                    fontFamily: '"Inter", sans-serif',
                    textShadow: '0 1px 2px rgba(0,0,0,0.5)',
                    textAlign: 'left'
                  }}
                >
                  You may use our services only in compliance with these Terms and all applicable laws and regulations. 
                  You must not misuse our services or help anyone else do so.
                </p>
              </section>
              
              <section className="space-y-4">
                <h2 
                  className="text-white text-2xl font-semibold"
                  style={{ 
                    fontFamily: '"Inter", sans-serif',
                    textShadow: '0 1px 2px rgba(0,0,0,0.5)',
                    textAlign: 'left',
                    marginTop: '24px'
                  }}
                >
                  3. Intellectual Property
                </h2>
                <p 
                  className="text-white/90 leading-relaxed"
                  style={{ 
                    fontFamily: '"Inter", sans-serif',
                    textShadow: '0 1px 2px rgba(0,0,0,0.5)',
                    textAlign: 'left'
                  }}
                >
                  All content, features, and functionality of our services are owned by Lucidcraft Studio, Inc. 
                  and are protected by international copyright, trademark, patent, trade secret, and other 
                  intellectual property laws.
                </p>
              </section>
              
              <section className="space-y-4">
                <h2 
                  className="text-white text-2xl font-semibold"
                  style={{ 
                    fontFamily: '"Inter", sans-serif',
                    textShadow: '0 1px 2px rgba(0,0,0,0.5)',
                    textAlign: 'left',
                    marginTop: '24px'
                  }}
                >
                  4. User Content
                </h2>
                <p 
                  className="text-white/90 leading-relaxed"
                  style={{ 
                    fontFamily: '"Inter", sans-serif',
                    textShadow: '0 1px 2px rgba(0,0,0,0.5)',
                    textAlign: 'left'
                  }}
                >
                  You retain ownership of any content you submit to our services. By submitting content, 
                  you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, and 
                  distribute your content in connection with our services.
                </p>
              </section>
              
              <section className="space-y-4">
                <h2 
                  className="text-white text-2xl font-semibold"
                  style={{ 
                    fontFamily: '"Inter", sans-serif',
                    textShadow: '0 1px 2px rgba(0,0,0,0.5)',
                    textAlign: 'left',
                    marginTop: '24px'
                  }}
                >
                  5. Limitation of Liability
                </h2>
                <p 
                  className="text-white/90 leading-relaxed"
                  style={{ 
                    fontFamily: '"Inter", sans-serif',
                    textShadow: '0 1px 2px rgba(0,0,0,0.5)',
                    textAlign: 'left'
                  }}
                >
                  To the fullest extent permitted by law, Lucidcraft Studio, Inc. shall not be liable for any 
                  indirect, incidental, special, consequential, or punitive damages arising out of or relating 
                  to your use of our services.
                </p>
              </section>
              
              <section className="space-y-4">
                <h2 
                  className="text-white text-2xl font-semibold"
                  style={{ 
                    fontFamily: '"Inter", sans-serif',
                    textShadow: '0 1px 2px rgba(0,0,0,0.5)',
                    textAlign: 'left',
                    marginTop: '24px'
                  }}
                >
                  6. Indemnification
                </h2>
                <p 
                  className="text-white/90 leading-relaxed"
                  style={{ 
                    fontFamily: '"Inter", sans-serif',
                    textShadow: '0 1px 2px rgba(0,0,0,0.5)',
                    textAlign: 'left'
                  }}
                >
                  You agree to indemnify and hold harmless Lucidcraft Studio, Inc. and its officers, directors, 
                  employees, and agents from any claims, damages, losses, liabilities, and expenses arising 
                  from your use of our services or violation of these Terms.
                </p>
              </section>
              
              <section className="space-y-4">
                <h2 
                  className="text-white text-2xl font-semibold"
                  style={{ 
                    fontFamily: '"Inter", sans-serif',
                    textShadow: '0 1px 2px rgba(0,0,0,0.5)',
                    textAlign: 'left',
                    marginTop: '24px'
                  }}
                >
                  7. Governing Law
                </h2>
                <p 
                  className="text-white/90 leading-relaxed"
                  style={{ 
                    fontFamily: '"Inter", sans-serif',
                    textShadow: '0 1px 2px rgba(0,0,0,0.5)',
                    textAlign: 'left'
                  }}
                >
                  These Terms shall be governed by and construed in accordance with the laws of the State of Delaware, 
                  without regard to its conflict of law provisions.
                </p>
              </section>
              
              <section className="space-y-4">
                <h2 
                  className="text-white text-2xl font-semibold"
                  style={{ 
                    fontFamily: '"Inter", sans-serif',
                    textShadow: '0 1px 2px rgba(0,0,0,0.5)',
                    textAlign: 'left',
                    marginTop: '24px'
                  }}
                >
                  8. Changes to Terms
                </h2>
                <p 
                  className="text-white/90 leading-relaxed"
                  style={{ 
                    fontFamily: '"Inter", sans-serif',
                    textShadow: '0 1px 2px rgba(0,0,0,0.5)',
                    textAlign: 'left'
                  }}
                >
                  We reserve the right to modify these Terms at any time. We will notify you of any changes 
                  by posting the new Terms on our website.
                </p>
              </section>
              
              <section className="space-y-4">
                <h2 
                  className="text-white text-2xl font-semibold"
                  style={{ 
                    fontFamily: '"Inter", sans-serif',
                    textShadow: '0 1px 2px rgba(0,0,0,0.5)',
                    textAlign: 'left',
                    marginTop: '24px'
                  }}
                >
                  9. Contact Information
                </h2>
                <p 
                  className="text-white/90 leading-relaxed"
                  style={{ 
                    fontFamily: '"Inter", sans-serif',
                    textShadow: '0 1px 2px rgba(0,0,0,0.5)',
                    textAlign: 'left'
                  }}
                >
                  If you have any questions about these Terms, please contact us at:<br />
                  Email: legal@lucidcraft.studio<br />
                  Address: 1111B S Governors Ave STE 39519 Dover, DE 19904
                </p>
              </section>
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
            <button 
              onClick={() => setIsContactModalOpen(true)}
              className="footer-link md:hidden"
              style={{
                color: '#FFFFFF',
                fontFamily: '"Inter", sans-serif',
                fontSize: '16px',
                fontWeight: 500,
                lineHeight: '20px',
                textDecoration: 'none',
                background: 'none',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Contact
            </button>
            <a 
              href="/contact"
              className="footer-link hidden md:block"
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
    
    <ContactModal 
      isOpen={isContactModalOpen} 
      onClose={() => setIsContactModalOpen(false)} 
    />
    </>
  );
}