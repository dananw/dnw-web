# Portfolio Website

A modern, responsive portfolio website built with Next.js, Tailwind CSS, and shadcn/ui.

## Features

- **Modern Tech Stack**: Next.js 14, TypeScript, Tailwind CSS, shadcn/ui
- **Responsive Design**: Optimized for all devices
- **Dark Theme**: Beautiful dark theme with smooth transitions
- **Animations**: Smooth animations using Framer Motion
- **SEO Optimized**: Meta tags, structured data, and semantic HTML
- **Fast Performance**: Image optimization, code splitting, and lazy loading
- **Accessibility**: WCAG 2.1 AA compliant

## Pages

- **Home**: Hero section, about preview, projects showcase
- **About**: Detailed profile, experience timeline, skills breakdown
- **Projects**: Project gallery with filtering and search
- **Project Detail**: Individual project pages with detailed information
- **Contact**: Contact information and social links

## Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Font**: Inter

### Development
- **Package Manager**: npm
- **Code Formatter**: Prettier
- **Linter**: ESLint
- **Type Checking**: TypeScript

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
portfolio/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   ├── about/             # About page
│   ├── projects/          # Projects pages
│   └── contact/           # Contact page
├── components/            # React components
│   ├── layout/           # Layout components
│   ├── sections/         # Page sections
│   ├── common/           # Shared components
│   └── ui/               # shadcn/ui components
├── data/                 # Data files
│   ├── profile.ts        # Profile data
│   ├── projects.ts       # Projects data
│   └── skills.ts         # Skills data
├── lib/                  # Utility functions
├── public/               # Static assets
└── README.md
```

## Customization

### Profile Information

Update your profile information in `data/profile.ts`:

```typescript
export const profile: Profile = {
  name: "Your Name",
  title: "Your Title",
  bio: "Your bio",
  avatar: "/images/profile/avatar.jpg",
  social: {
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername",
    email: "your.email@example.com",
    twitter: "https://twitter.com/yourusername"
  }
};
```

### Projects

Add or modify projects in `data/projects.ts`:

```typescript
export const projects: Project[] = [
  {
    id: "project-slug",
    title: "Project Title",
    description: "Brief description",
    longDescription: "Detailed description",
    image: "/images/projects/project-thumb.jpg",
    images: ["/images/projects/project-1.jpg"],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS"],
    features: ["Feature 1", "Feature 2"],
    liveUrl: "https://your-project.com",
    githubUrl: "https://github.com/username/project",
    category: "fullstack",
    year: 2024
  }
];
```

### Skills

Update your skills in `data/skills.ts`:

```typescript
export const skills: Skill[] = [
  {
    name: "Next.js",
    level: 5, // 1-5 proficiency level
    category: "frontend"
  }
];
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically on every push

### Other Platforms

The app can be deployed to any platform that supports Next.js:

- Netlify
- AWS Amplify
- DigitalOcean
- Railway

## Environment Variables

Create a `.env.local` file for environment variables:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_GA_ID=your-analytics-id
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

If you have any questions or need support, please create an issue in the repository or contact me directly.

---

Built with ❤️ using Next.js and Tailwind CSS