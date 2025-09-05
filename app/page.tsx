'use client';

import { useState } from 'react';
import Image from 'next/image';
import UnifiedModal, { ModalType } from '../components/UnifiedModal';

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<ModalType>('contact');

  const openModal = (type: ModalType) => {
    setModalType(type);
    setModalOpen(true);
  };
  return (
    <>
    <div className="min-h-screen bg-white relative">
      <div 
        className="absolute inset-[10px] md:inset-[20px] rounded-[32px] bg-cover bg-no-repeat bg-[70%_center] md:bg-center"
        style={{ 
          backgroundImage: "url('/bg-synthwave.png')"
        }}
      >
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
                  className="h-[50px] w-[25px] md:h-[62px] md:w-[31px]"
                />
                <Image 
                  src="/logo-right.svg" 
                  alt="" 
                  width={31}
                  height={62}
                  className="h-[50px] w-[25px] md:h-[62px] md:w-[31px] scale-x-[-1]"
                />
              </div>
              {/* Text part */}
              <div 
                className="text-white font-bold text-[35px] md:text-[44px]"
                style={{
                  fontFamily: '"Satoshi Variable", sans-serif',
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
          
          {/* Headline with responsive classes */}
          <div 
            className="flex flex-col justify-center text-center text-white headline-container"
            style={{
              marginLeft: '5% !important',
              marginRight: '5% !important'
            }}
          >
            <h1 
              className="text-[43px] leading-[52px] md:text-[61px] md:leading-[75px] font-normal"
              style={{
                fontFamily: '"Playfair Display", serif'
              }}
            >
              <span className="block md:hidden animate-fade-in-up animate-delay-300">Unlocking human potential with</span>
              <span className="block font-bold italic md:hidden animate-fade-in-up animate-delay-600">Smart Apps</span>
              <span className="hidden md:block animate-fade-in-up animate-delay-300">Unlocking human potential</span>
              <span className="hidden md:block animate-fade-in-up animate-delay-600">
                <span>with </span>
                <span className="font-bold italic">Smart Apps</span>
              </span>
            </h1>
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
              onClick={() => openModal('contact')}
              className="footer-link"
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
            <button 
              onClick={() => openModal('privacy')}
              className="footer-link"
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
              Privacy Policy
            </button>
            <button 
              onClick={() => openModal('terms')}
              className="footer-link"
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
              Terms of Service
            </button>
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
    
    <UnifiedModal 
      isOpen={modalOpen} 
      onClose={() => setModalOpen(false)} 
      type={modalType}
    />
    </>
  );
}