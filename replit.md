# Moto0 - Moroccan Vehicle Marketplace

## Overview

Moto0 is a bilingual (French/Arabic) vehicle marketplace web application for buying and selling used cars and motorcycles in Morocco. Built with Next.js 16 and React 19, it features a premium dark automotive theme, RTL language support, and a mobile-first responsive design.

The platform connects buyers and sellers across Morocco, providing vehicle listings with filtering, featured reels, and direct WhatsApp contact integration.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Framework
- **Next.js 16** with App Router for server-side rendering and routing
- **React 19** for component-based UI development
- **TypeScript** for type safety throughout the codebase

### UI Component System
- **shadcn/ui** component library with Radix UI primitives
- **Tailwind CSS** for utility-first styling
- **Class Variance Authority (CVA)** for component variants
- Custom premium dark theme with OKLCH color space

### Internationalization
- Custom `LanguageContext` provider for French/Arabic language switching
- RTL (right-to-left) support for Arabic text direction
- Bilingual text rendering using `t(frenchText, arabicText)` helper function
- Locale-aware price formatting (DH/درهم)

### Page Structure
- `/` - Homepage with hero, categories, featured reels, and listings grid
- `/about` - About page explaining the platform
- `/contact` - Contact information
- `/privacy` - Privacy policy
- `/terms` - Terms and conditions
- `/safety` - Safety tips with WhatsApp redirect countdown feature

### Key Components
- `Header` - Navigation with search, language toggle, and user actions
- `HeroSection` - Hero banner with search functionality
- `CategoryNav` - Sticky category filter (Citadine, Berline, SUV, etc.)
- `FeaturedReels` - TikTok-style vertical video thumbnails
- `ListingsGrid` - Vehicle listings with filtering and WhatsApp contact
- `Footer` - Site links and social media

### State Management
- React Context for language/locale state
- Local component state for UI interactions
- Custom events for cross-component communication (search)

### WhatsApp Integration
- Safety interstitial page with 5-second countdown before redirect
- Skip button for immediate WhatsApp access
- URL-encoded message prefilling

## External Dependencies

### Third-Party Services
- **Vercel Analytics** - Usage tracking and analytics
- **WhatsApp API** - Direct messaging via wa.me links

### UI Libraries
- **Radix UI** - Accessible component primitives (accordion, dialog, dropdown, etc.)
- **Lucide React** - Icon library
- **Embla Carousel** - Carousel/slider functionality
- **cmdk** - Command palette component
- **Vaul** - Drawer component
- **react-day-picker** - Calendar/date picker
- **Recharts** - Charting library
- **react-hook-form** with Zod resolvers - Form handling and validation
- **sonner** - Toast notifications

### Styling
- **Tailwind CSS** with custom configuration
- **tw-animate-css** - Animation utilities
- **next-themes** - Theme management (dark mode forced)

### Fonts
- Inter - Primary Latin font
- Geist Mono - Monospace font
- Noto Sans Arabic - Arabic script support

### Build Tools
- **autoprefixer** - CSS vendor prefixing
- **ESLint** - Code linting