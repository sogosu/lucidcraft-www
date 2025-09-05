# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
Lucidcraft Studio website - A pixel-perfect implementation of the Figma design with automated visual testing and responsive validation.

## Commands

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

## Architecture

### Tech Stack
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Fonts**: Inter and Playfair Display via next/font/google
- **Email**: Nodemailer for contact form submissions
- **Testing**: Playwright for E2E and visual regression testing
- **Deployment**: Vercel

### Project Structure
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

### Testing Strategy
1. **Visual Regression Testing**: Captures screenshots and compares against baseline
2. **Responsive Testing**: Validates layout across multiple devices:
   - Desktop Chrome & Safari
   - Mobile Chrome (Pixel 5) & Safari (iPhone 12)
   - Tablet (iPad gen 7)
3. **Accessibility Testing**: Ensures WCAG compliance using axe-core
4. **Performance Testing**: Validates Core Web Vitals

### Playwright Configuration
- Tests run with `fullyParallel: true` for faster execution
- Dev server auto-starts via `webServer` config
- HTML reporter for detailed test results
- Screenshots captured on failure
- Trace enabled on first retry

### MCP Servers Integration

#### Figma MCP Server
- **Purpose**: Access "Lucidcraft - Website" design file for pixel-perfect implementation
- **Setup**: 
  1. Ensure Figma desktop app is running
  2. Start the MCP server: `claude mcp add figma-dev-mode-mcp-server -s local`
  3. Verify connection: `claude mcp list` (should show ✓ Connected)
  4. Check server status: `claude mcp get figma-dev-mode-mcp-server`
- **Usage**: The server runs locally at http://127.0.0.1:3845/mcp
- **Troubleshooting**: If disconnected, restart Figma desktop app and run `claude mcp list` to reconnect

#### Vercel MCP Server (To be configured)
- **Purpose**: Deploy and manage production website
- **Setup**: Run `claude mcp add vercel-mcp-server` when ready to deploy

### Contact Form API
- **Endpoint**: `/api/contact` (POST)
- **Email Service**: Nodemailer with SMTP configuration
- **Environment Variables**: Requires `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`
- **Development Mode**: Form submissions logged to console when SMTP not configured
- **Validation**: Email format validation and required field checks
- **Destination**: Emails sent to `jerome@lucidcraft.studio`

### Important Notes
- Always run visual tests after UI changes: `npx playwright test tests/visual.spec.ts`
- Update screenshot baselines when design changes are intentional: `npx playwright test --update-snapshots`
- Ensure all pages pass responsive tests before deployment
- Contact form must include proper validation and error handling
- Privacy Policy and Terms of Service pages required for Apple Developer compliance