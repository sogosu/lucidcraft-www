import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Get in Touch - Lucidcraft Studio',
  description: "If you have an idea for an app, or have a business opportunity you would like to explore with us, we'd love to hear from you. Contact Lucidcraft Studio today.",
  keywords: 'contact, get in touch, app development, business opportunity, Lucidcraft Studio',
  openGraph: {
    title: 'Get in Touch - Lucidcraft Studio',
    description: "If you have an idea for an app, or have a business opportunity you would like to explore with us, we'd love to hear from you.",
    type: 'website',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}