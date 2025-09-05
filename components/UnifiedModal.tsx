'use client';

import { useState } from 'react';

export type ModalType = 'contact' | 'privacy' | 'terms';

interface UnifiedModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: ModalType;
}

// Contact form component
function ContactForm() {
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
    <div>
      {/* Company info */}
      <div className="mb-8" style={{ marginTop: '30px' }}>
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
      <form onSubmit={handleSubmit} className="space-y-6" style={{ marginTop: '20px' }}>
        <div style={{ marginTop: '20px' }}>
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
              height: '48px',
              marginTop: '10px'
            }}
          />
        </div>
        
        <div style={{ marginTop: '20px' }}>
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
              height: '48px',
              marginTop: '10px'
            }}
          />
        </div>
        
        <div style={{ marginTop: '20px' }}>
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
              padding: '12px 16px',
              marginTop: '10px'
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
            height: '56px',
            marginTop: '20px'
          }}
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
    
        {/* Status Messages */}
        {submitStatus === 'success' && (
          <div className="p-4 bg-green-500/20 border border-green-500/30 rounded-lg text-green-100 text-center animate-fade-in">
            Message sent successfully! We'll get back to you soon.
          </div>
        )}
        
        {submitStatus === 'error' && (
          <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-red-100 text-center animate-fade-in">
            There was an error sending your message. Please try again.
          </div>
        )}
      </form>
      
      {/* Extra bottom spacing for mobile */}
      <div className="h-16 md:h-0"></div>
    </div>
  );
}

// Privacy Policy content component
function PrivacyPolicyContent() {
  return (
    <div className="space-y-8">
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
          1. Information We Collect
        </h2>
        <p 
          className="text-white/90 leading-relaxed"
          style={{ 
            fontFamily: '"Inter", sans-serif',
            textShadow: '0 1px 2px rgba(0,0,0,0.5)',
            textAlign: 'left'
          }}
        >
          Lucidcraft Studio, Inc. (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) collects information you provide directly 
          to us, such as when you contact us, sign up for our services, or otherwise interact with us.
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
          2. How We Use Your Information
        </h2>
        <p 
          className="text-white/90 leading-relaxed"
          style={{ 
            fontFamily: '"Inter", sans-serif',
            textShadow: '0 1px 2px rgba(0,0,0,0.5)',
            textAlign: 'left'
          }}
        >
          We use the information we collect to provide, maintain, and improve our services, 
          communicate with you, and comply with legal obligations.
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
          3. Information Sharing
        </h2>
        <p 
          className="text-white/90 leading-relaxed"
          style={{ 
            fontFamily: '"Inter", sans-serif',
            textShadow: '0 1px 2px rgba(0,0,0,0.5)',
            textAlign: 'left'
          }}
        >
          We do not sell, trade, or otherwise transfer your personal information to third parties 
          without your consent, except as described in this privacy policy.
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
          4. Data Security
        </h2>
        <p 
          className="text-white/90 leading-relaxed"
          style={{ 
            fontFamily: '"Inter", sans-serif',
            textShadow: '0 1px 2px rgba(0,0,0,0.5)',
            textAlign: 'left'
          }}
        >
          We implement appropriate technical and organizational measures to protect your personal 
          information against unauthorized access, alteration, disclosure, or destruction.
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
          5. Your Rights
        </h2>
        <p 
          className="text-white/90 leading-relaxed"
          style={{ 
            fontFamily: '"Inter", sans-serif',
            textShadow: '0 1px 2px rgba(0,0,0,0.5)',
            textAlign: 'left'
          }}
        >
          You have the right to access, update, or delete your personal information. 
          Please contact us to exercise these rights.
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
          6. Contact Us
        </h2>
        <p 
          className="text-white/90 leading-relaxed"
          style={{ 
            fontFamily: '"Inter", sans-serif',
            textShadow: '0 1px 2px rgba(0,0,0,0.5)',
            textAlign: 'left'
          }}
        >
          If you have any questions about this Privacy Policy, please contact us at:<br />
          Email: privacy@lucidcraft.studio<br />
          Address: 1111B S Governors Ave STE 39519 Dover, DE 19904
        </p>
      </section>
    </div>
  );
}

// Terms of Service content component
function TermsOfServiceContent() {
  return (
    <div className="space-y-8">
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
          By accessing or using the services provided by Lucidcraft Studio, Inc. (&quot;Company,&quot; &quot;we,&quot; &quot;our,&quot; or &quot;us&quot;), 
          you agree to be bound by these Terms of Service (&quot;Terms&quot;).
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
          6. Contact Information
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
  );
}

export default function UnifiedModal({ isOpen, onClose, type }: UnifiedModalProps) {
  const handleClose = () => {
    onClose();
  };

  if (!isOpen) return null;

  const getTitleAndSubtitle = () => {
    switch (type) {
      case 'contact':
        return {
          title: 'Get in Touch',
          subtitle: "If you have an idea for an app, or have a business opportunity you would like to explore with us, we'd love to hear from you."
        };
      case 'privacy':
        return {
          title: 'Privacy Policy',
          subtitle: 'Last Updated: January 2025'
        };
      case 'terms':
        return {
          title: 'Terms of Service',
          subtitle: 'Effective Date: January 2025'
        };
      default:
        return { title: '', subtitle: '' };
    }
  };

  const renderContent = () => {
    switch (type) {
      case 'contact':
        return <ContactForm />;
      case 'privacy':
        return <PrivacyPolicyContent />;
      case 'terms':
        return <TermsOfServiceContent />;
      default:
        return null;
    }
  };

  const { title, subtitle } = getTitleAndSubtitle();

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm" 
        onClick={handleClose} 
      />
      
      {/* Modal fills entire viewport */}
      <div className="flex items-center justify-center h-screen md:min-h-screen p-0 md:p-4">
        <div className="relative w-full h-full md:max-w-4xl md:h-auto md:max-h-[85vh] rounded-none md:rounded-[32px] overflow-hidden">
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

          {/* Content container with scrolling inside */}
          <div className="flex flex-col h-full md:max-h-[85vh] px-0 md:px-6 md:px-10 py-0 md:py-2">
            <div 
              className="bg-white/10 backdrop-blur-md rounded-none md:rounded-[32px] border-0 md:border md:border-white/20 shadow-lg flex-1 flex flex-col min-h-0 h-full"
              style={{
                padding: '20px 24px 4px 24px'
              }}
            >
                {/* Title inside modal - fixed position */}
                <div 
                  className="text-center mb-3 modal-headline flex-shrink-0" 
                  style={{ 
                    marginTop: '12px'
                  }}
                >
                  <h1 
                    className="text-white text-[28px] md:text-[32px] font-normal mb-4"
                    style={{
                      fontFamily: '"Playfair Display", serif',
                      textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                    }}
                  >
                    {title}
                  </h1>
                  <p 
                    className="text-white/90 leading-relaxed"
                    style={{ 
                      fontFamily: '"Inter", sans-serif',
                      textShadow: '0 1px 2px rgba(0,0,0,0.5)',
                      fontSize: '16px'
                    }}
                  >
                    {subtitle}
                  </p>
                </div>

                {/* Scrollable content area */}
                <div 
                  className="flex-1 overflow-y-auto overflow-x-hidden min-h-0"
                  id="modal-content-scroll"
                  style={{
                    scrollbarWidth: 'thin',
                    scrollbarColor: 'rgba(255,255,255,0.5) transparent',
                    paddingBottom: '50px',
                    maxHeight: 'calc(100vh - 120px)',
                    WebkitOverflowScrolling: 'touch'
                  }}
                >
                  {renderContent()}
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}