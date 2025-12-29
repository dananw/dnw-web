# Spesifikasi Teknis Website Portfolio

## Overview

Website portfolio statis untuk frontend & fullstack developer dengan tema gelap menggunakan Next.js, Tailwind CSS, dan shadcn/ui.

## Tech Stack

### Framework & Library

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS v3
- **UI Library**: shadcn/ui
- **Icons**: Lucide React
- **Animation**: Framer Motion
- **Typography**: Inter Font

### Development Tools

- **Package Manager**: npm/yarn
- **Code Formatter**: Prettier
- **Linter**: ESLint
- **Type Checking**: TypeScript

## Project Structure

```
portfolio/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   ├── about/
│   │   └── page.tsx
│   ├── projects/
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   ├── contact/
│   │   └── page.tsx
│   └── favicon.ico
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Navigation.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Skills.tsx
│   │   ├── Projects.tsx
│   │   └── Contact.tsx
│   └── common/
│       ├── ProjectCard.tsx
│       ├── TechBadge.tsx
│       └── Button.tsx
├── data/
│   ├── projects.ts
│   ├── skills.ts
│   └── profile.ts
├── lib/
│   ├── utils.ts
│   └── types.ts
├── public/
│   ├── images/
│   │   ├── projects/
│   │   └── profile/
│   └── icons/
├── tailwind.config.ts
├── next.config.js
├── tsconfig.json
└── package.json
```

## Design System

### Color Palette (Dark Theme)

```css
/* Primary Colors */
--background: #0a0a0a;
--foreground: #fafafa;
--muted: #1a1a1a;
--muted-foreground: #737373;

/* Accent Colors */
--primary: #ffffff;
--primary-foreground: #0a0a0a;
--secondary: #262626;
--secondary-foreground: #fafafa;

/* Border & Ring */
--border: #262626;
--ring: #404040;
```

### Typography

- **Font Family**: Inter
- **Headings**: Display, Bold (700-900)
- **Body**: Regular (400), Medium (500)
- **Code**: JetBrains Mono

### Breakpoints

- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

## Pages & Sections

### 1. Homepage (/)

- **Hero Section**: Nama, role, dan brief intro
- **About Section**: Ringkasan tentang diri
- **Skills Section**: Tech stack yang dikuasai
- **Projects Preview**: 3 project terbaru
- **Contact Section**: Social links dan CTA

### 2. About Page (/about)

- Detail profil dan pengalaman
- Timeline karir/pendidikan
- Skills breakdown dengan level proficiency

### 3. Projects Page (/projects)

- Grid semua projects
- Filter berdasarkan tech stack
- Search functionality

### 4. Project Detail Page (/projects/[slug])

- Project overview
- Screenshots/images
- Tech stack yang digunakan
- Challenges dan solutions
- Live demo & GitHub links

### 5. Contact Page (/contact)

- Contact information
- Social media links
- Email dan info kontak

## Data Structure

### Profile Data

```typescript
interface Profile {
  name: string;
  title: string;
  bio: string;
  avatar: string;
  social: {
    github: string;
    linkedin: string;
    email: string;
    twitter?: string;
  };
}
```

### Project Data

```typescript
interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  images: string[];
  techStack: string[];
  features: string[];
  liveUrl?: string;
  githubUrl: string;
  category: "frontend" | "fullstack" | "mobile";
  year: number;
}
```

### Skills Data

```typescript
interface Skill {
  name: string;
  level: number; // 1-5
  category: "frontend" | "backend" | "tools" | "other";
  icon?: string;
}
```

## Sample Projects

### 1. E-Commerce Platform

```typescript
{
  id: "ecommerce-platform",
  title: "E-Commerce Platform",
  description: "Full-stack e-commerce solution with payment integration",
  image: "/images/projects/ecommerce-thumb.jpg",
  techStack: ["Next.js", "TypeScript", "Stripe", "PostgreSQL", "Prisma"],
  liveUrl: "https://example-ecommerce.com",
  githubUrl: "https://github.com/username/ecommerce",
  category: "fullstack",
  year: 2024
}
```

### 2. Task Management Dashboard

```typescript
{
  id: "task-dashboard",
  title: "Task Management Dashboard",
  description: "Real-time collaborative task management tool",
  image: "/images/projects/dashboard-thumb.jpg",
  techStack: ["React", "Redux Toolkit", "Socket.io", "Express", "MongoDB"],
  liveUrl: "https://example-tasks.com",
  githubUrl: "https://github.com/username/task-dashboard",
  category: "fullstack",
  year: 2024
}
```

### 3. Weather App

```typescript
{
  id: "weather-app",
  title: "Weather Forecast App",
  description: "Modern weather app with location-based forecasts",
  image: "/images/projects/weather-thumb.jpg",
  techStack: ["Next.js", "Tailwind CSS", "OpenWeather API", "Geolocation API"],
  liveUrl: "https://example-weather.com",
  githubUrl: "https://github.com/username/weather-app",
  category: "frontend",
  year: 2023
}
```

## Features

### Core Features

- Responsive design (mobile-first)
- Dark theme (default)
- Smooth animations and transitions
- Fast loading (optimasi images & code)
- SEO friendly
- Accessibility (WCAG 2.1 AA)

### Interactive Elements

- Hover effects pada cards dan buttons
- Smooth scrolling
- Animated counters untuk stats
- Interactive tech stack display
- Project filtering dengan animation

### Performance Optimizations

- Next.js Image optimization
- Lazy loading untuk images
- Code splitting
- Static generation untuk pages
- Minimal bundle size

## Installation & Setup

```bash
# Clone repository
git clone <repository-url>
cd portfolio

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Deployment

### Recommended Platforms

1. **Vercel** (recommended untuk Next.js)
2. **Netlify**
3. **GitHub Pages** (dengan static export)

### Environment Variables

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_GA_ID=your-analytics-id
```

## Future Enhancements

### Version 2.0 Features

- Blog section dengan MDX
- Project categories yang lebih spesifik
- Testimonial section
- Downloadable resume (PDF)
- Newsletter subscription
- Dark/light theme toggle
- Multi-language support

### Performance

- Service Worker untuk offline support
- Progressive Web App (PWA) features
- Advanced image optimization
- Bundle analysis dan optimization

## Maintenance

### Content Updates

- Projects: Update di `data/projects.ts`
- Skills: Update di `data/skills.ts`
- Profile: Update di `data/profile.ts`
- Images: Add ke `public/images/`

### Regular Updates

- Dependencies update (quarterly)
- Performance monitoring
- Security updates
- SEO optimization checks
