'use client';

export type ModalType = 'contact' | 'privacy' | 'terms';

interface UnifiedModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: ModalType;
}

// Contact information component
function ContactForm() {
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

      {/* Contact Information */}
      <div className="space-y-6" style={{ marginTop: '40px' }}>
        <div className="text-center">
          <h4 
            className="text-white text-lg font-medium mb-4"
            style={{ 
              fontFamily: '"Inter", sans-serif',
              textShadow: '0 1px 2px rgba(0,0,0,0.5)'
            }}
          >
            Ready to start your project?
          </h4>
          
          <a
            href="mailto:contact@lucidcraft.studio?subject=Project Inquiry&body=Hi! I'd like to discuss a project with Lucidcraft Studio."
            className="inline-block bg-white/30 hover:bg-white/40 text-white font-semibold rounded-lg backdrop-blur-md border border-white/50 transition-all duration-300 hover-lift shadow-lg hover:shadow-xl"
            style={{ 
              fontFamily: '"Inter", sans-serif',
              textShadow: '0 1px 2px rgba(0,0,0,0.3)',
              padding: '16px 32px',
              textDecoration: 'none',
              marginBottom: '20px'
            }}
          >
            Email Us: contact@lucidcraft.studio
          </a>
        </div>
        
        <div className="text-center mt-6">
          <p 
            className="text-white/80 text-sm"
            style={{ 
              fontFamily: '"Inter", sans-serif',
              textShadow: '0 1px 2px rgba(0,0,0,0.5)'
            }}
          >
            Click the button above to open your email client with a pre-filled message,<br />
            or send us an email directly at contact@lucidcraft.studio
          </p>
        </div>
      </div>
      
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