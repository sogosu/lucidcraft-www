import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service - Lucidcraft Studio',
  description: 'Terms of Service for Lucidcraft Studio, Inc. Review our terms and conditions for using our services. Effective date: January 2025.',
  keywords: 'terms of service, terms and conditions, service agreement, Lucidcraft Studio',
  openGraph: {
    title: 'Terms of Service - Lucidcraft Studio',
    description: 'Terms of Service for Lucidcraft Studio, Inc. Review our terms and conditions for using our services.',
    type: 'website',
  },
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}