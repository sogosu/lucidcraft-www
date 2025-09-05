# Lucidcraft Studio Website

A pixel-perfect implementation of the Figma design with automated visual testing and responsive validation.

## Overview

This is the official website for Lucidcraft Studio, Inc. - a digital studio that builds apps to unlock human potential. The site features a modern, responsive design with a synthwave aesthetic and modal-based navigation.

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Fonts**: Inter and Playfair Display via next/font/google
- **Email**: Nodemailer for contact form submissions
- **Testing**: Playwright for E2E and visual regression testing
- **Deployment**: Vercel

## Architecture

### Core Files Required for Page Load

#### App Router Structure
1. **`app/layout.tsx`** - Root layout component
   - `RootLayout` function component
   - `metadata` export object
   - Font configurations: `inter` and `playfairDisplay`

2. **`app/page.tsx`** - Homepage component  
   - `Home` function component (default export)
   - `openModal` function
   - State management via `useState` hooks

3. **`app/globals.css`** - Global styles
   - CSS custom properties and animations
   - Tailwind CSS utilities
   - Animation keyframes and classes

#### Components
4. **`components/UnifiedModal.tsx`** - Modal system
   - `UnifiedModal` function component (default export)
   - `ContactForm` function component  
   - `PrivacyPolicyContent` function component
   - `TermsOfServiceContent` function component
   - `ModalType` type export
   - `UnifiedModalProps` interface

#### API Routes
5. **`app/api/contact/route.ts`** - Contact form handler
   - `POST` async function export
   - Email validation and sending functionality

### Static Assets (in `/public/`)
- **`bg-synthwave.png`** - Background image
- **`logo-left.svg`** - Left logo component  
- **`logo-right.svg`** - Right logo component
- **`favicon.svg`** - Site favicon

### Dependencies

#### Runtime Dependencies
- **`next`** (15.5.2) - Framework
- **`react`** (19.1.0) - UI library
- **`react-dom`** (19.1.0) - React DOM renderer
- **`nodemailer`** (^7.0.6) - Email functionality
- **`@types/nodemailer`** (^7.0.1) - TypeScript types
- **`@fontsource/inter`** - Inter font family
- **`@fontsource/playfair-display`** - Playfair Display font family

#### Development Dependencies
- **`@playwright/test`** - End-to-end testing
- **`@axe-core/playwright`** - Accessibility testing
- **`tailwindcss`** - CSS framework
- **`typescript`** - Type checking
- **`eslint`** - Code linting

## Key Functions and State

- **Font loading**: `Inter()` and `Playfair_Display()` from next/font/google
- **Modal state management**: `modalOpen`, `modalType`, `setModalOpen`, `setModalType`
- **Form handling**: Contact form submission with validation
- **Event handlers**: `openModal`, `handleClose`, `handleSubmit`, `handleInputChange`

## External Resources

- **Google Fonts API** - For Inter and Playfair Display fonts
- **SMTP server** (optional) - For email sending in production

## Development Commands

### Development
- `npm run dev` - Start development server with Turbopack at http://localhost:3000
- `npm run build` - Build production version with Turbopack
- `npm run start` - Run production server
- `npm run lint` - Run ESLint

### Testing
- `npm run test` - Run all Playwright tests
- `npm run test:ui` - Run tests with UI mode for debugging
- `npm run test:visual` - Run visual regression tests only
- `npm run test:responsive` - Run responsive design tests only
- `npm run test:a11y` - Run accessibility tests only
- `npm run test:update-snapshots` - Update visual test baselines when design changes are intentional
- `npm run test:report` - View HTML test report after test run
- `npx playwright test <test-file>` - Run specific test file
- `npx playwright test --project="Desktop Chrome"` - Run tests for specific browser/device

## Project Structure

```
/
├── app/                    # Next.js app router pages
│   ├── layout.tsx         # Root layout with font configuration
│   ├── page.tsx           # Home page
│   ├── contact/           # Contact page
│   ├── privacy/           # Privacy policy page
│   ├── terms/             # Terms of service page
│   └── api/contact/       # Contact form API endpoint
├── components/            # Reusable React components
├── tests/                 # Playwright test suites
│   ├── visual.spec.ts     # Visual regression tests
│   ├── responsive.spec.ts # Responsive design tests
│   ├── accessibility.spec.ts # Accessibility tests
│   ├── contact-form.spec.ts # Contact form functionality tests
│   └── screenshots/       # Reference screenshots
├── public/               # Static assets (logos, backgrounds)
└── lib/                  # Utility functions and helpers
```

## Testing Strategy

1. **Visual Regression Testing**: Captures screenshots and compares against baseline
2. **Responsive Testing**: Validates layout across multiple devices:
   - Desktop Chrome & Safari
   - Mobile Chrome (Pixel 5) & Safari (iPhone 12)
   - Tablet (iPad gen 7)
3. **Accessibility Testing**: Ensures WCAG compliance using axe-core
4. **Performance Testing**: Validates Core Web Vitals

## Contact Form API

- **Endpoint**: `/api/contact` (POST)
- **Email Service**: Nodemailer with SMTP configuration
- **Environment Variables**: Requires `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`
- **Development Mode**: Form submissions logged to console when SMTP not configured
- **Validation**: Email format validation and required field checks
- **Destination**: Emails sent to `jerome@lucidcraft.studio`

## Environment Setup

Create a `.env.local` file for email configuration:

```
SMTP_HOST=your-smtp-host
SMTP_PORT=587
SMTP_USER=your-email@domain.com
SMTP_PASS=your-app-password
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Company Information

**Lucidcraft Studio, Inc.**  
1111B S Governors Ave  
STE 39519  
Dover, DE 19904

- Website: https://lucidcraft.studio
- Email: jerome@lucidcraft.studio
- Privacy: privacy@lucidcraft.studio
- Legal: legal@lucidcraft.studio

## License

© Copyright 2025 Lucidcraft Studio, Inc. All Rights Reserved.