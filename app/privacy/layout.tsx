import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - Lucidcraft Studio',
  description: 'Privacy Policy for Lucidcraft Studio, Inc. Learn how we collect, use, and protect your personal information. Last updated January 2025.',
  keywords: 'privacy policy, data protection, personal information, Lucidcraft Studio',
  openGraph: {
    title: 'Privacy Policy - Lucidcraft Studio',
    description: 'Privacy Policy for Lucidcraft Studio, Inc. Learn how we collect, use, and protect your personal information.',
    type: 'website',
  },
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}