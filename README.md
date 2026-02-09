# dev.dxvil.com

Personal portfolio website showcasing software engineering work, projects, and technical approach. Built with modern web technologies and deployed with continuous integration.

## 🚀 Features

- **Custom Cursor** - Smooth, interactive cursor with invert blend mode
- **Parallax Effects** - Mouse-reactive gradient orbs with smooth animations
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Dark/Light Mode** - System preference detection with smooth transitions
- **Interactive Resume** - Dynamic resume page with structured experience data
- **Contact Form** - Functional email form with validation and multiple integration options
- **Smooth Animations** - Typing effects, fade-ins, and scroll-based interactions
- **Production-Ready** - CI/CD pipeline with automated testing and deployment

## 🛠️ Tech Stack

**Framework & Libraries**
- [Next.js 16.1.6](https://nextjs.org/) - React framework with Turbopack
- [React 19.2.3](https://react.dev/) - UI library with latest features
- [TypeScript 5](https://www.typescriptlang.org/) - Type-safe development

**Styling**
- [Tailwind CSS 4](https://tailwindcss.com/) - Utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - Reusable component library
- Custom animations and transitions

**Testing**
- [Jest 29.7.0](https://jestjs.io/) - Test runner
- [React Testing Library 16.0.1](https://testing-library.com/react) - Component testing
- 156 passing tests with comprehensive coverage on all features

**DevOps & CI/CD**
- GitHub Actions - Automated testing and deployment
- Vercel - Hosting and preview deployments
- ESLint & TypeScript - Code quality checks

## 📦 Prerequisites

- **Node.js 20.x** or higher
- **npm** or **yarn** or **pnpm**

## 🏃 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/automataevox/dev.dxvil.com.git
   cd dev.dxvil.com
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   http://localhost:3000
   ```

## ✉️ Email Configuration

**Status: ✅ Working in Testing Mode**

The contact form automatically sends emails via Resend! Currently configured to send to **dev@dxvil.com** (testing mode).

**Quick Test:**
```bash
npm run dev
# Go to http://localhost:3000, fill the form, check musicbyblakk@gmail.com
```

**For Production Setup:**
See [RESEND_SETUP.md](./RESEND_SETUP.md) for instructions on:
- Verifying your domain at Resend
- Sending to dev@dxvil.com or any email address
- Production deployment configuration

## 📜 Available Scripts

```bash
# Development
npm run dev          # Start development server with hot reload
npm run build        # Build for production
npm start            # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler

# Testing
npm test             # Run tests in watch mode
npm run test:coverage # Generate coverage report
```

## 🧪 Testing

The project includes comprehensive test coverage:

```bash
# Run all tests
npm test -- --watchAll=false

# Run with coverage
npm run test:coverage

# Run specific test suite
npm test -- navigation.test.tsx
```

**Test Coverage:**
- 13 test suites
- 156 passing tests
- Comprehensive coverage including:
  - Hooks, components, and utilities
  - API routes and email service
  - Input validation and XSS prevention
  - Email template generation
  - Integration tests

## 🚢 Deployment

### Branch Strategy

- **`main`** → Deploys to Vercel Preview environment
- **`prod`** → Deploys to Production (https://dev.dxvil.com)

### CI/CD Pipeline

On every push and PR:
1. ✅ Lint code with ESLint
2. ✅ Run test suite (156 tests)
3. ✅ Build Next.js application
4. ✅ Deploy to Vercel (main/prod branches only)

### Manual Deployment

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

For detailed CI/CD setup instructions, see [CI-CD-SETUP.md](CI-CD-SETUP.md).

## 📁 Project Structure

```
dev.dxvil.com/
├── app/                      # Next.js app directory
│   ├── page.tsx              # Main landing page
│   ├── resume/               # Resume page route
│   ├── layout.tsx            # Root layout with metadata
│   └── globals.css           # Global styles
├── components/               # React components
│   ├── __tests__/            # Component tests
│   ├── custom-cursor.tsx     # Custom cursor component
│   ├── navigation.tsx        # Navigation bar
│   ├── background-effects.tsx # Parallax backgrounds
│   ├── resume.tsx            # Resume component
│   └── ui/                   # shadcn/ui components
├── lib/                      # Utility functions and hooks
│   ├── hooks/                # Custom React hooks
│   │   ├── useMouseTracking.ts
│   │   ├── useTypingAnimation.ts
│   │   └── useScrollTracking.ts
│   ├── utils/                # Helper functions
│   └── constants.ts          # App-wide constants
├── data/                     # JSON data files
│   ├── resume.json           # Resume content
│   └── work.json             # Project data
├── .github/
│   └── workflows/
│       └── ci-cd.yml         # GitHub Actions workflow
└── public/                   # Static assets
```

## 🎨 Key Features Explained

### Custom Cursor
- Inverted blend mode for visual contrast
- Smooth mouse position tracking with velocity damping
- Responsive to viewport changes

### Background Effects
- 3 gradient orbs with parallax mouse tracking
- Different parallax factors for depth effect
- Smooth animations with CSS transitions

### Type Safety
- Strict TypeScript configuration
- Comprehensive type definitions
- Zero `any` types in production code

### Performance
- Static page generation (SSG)
- Optimized bundle size
- Lazy loading for components

## 📝 License

This project is open source and available for reference. Please don't copy it directly for your own portfolio.

## 👤 Author

**Jaroslav Maša**
- Website: [dev.dxvil.com](https://dev.dxvil.com)
- GitHub: [@automataevox](https://github.com/automataevox)
- LinkedIn: [jaroslavmasa](https://linkedin.com/in/jaroslavmasa)
- Email: dev@dxvil.com

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing framework
- [shadcn/ui](https://ui.shadcn.com/) for the component library
- [Vercel](https://vercel.com/) for hosting and deployment
- [HugeIcons](https://hugeicons.com/) for the icon set

---

Built with ❤️ and ☕ by Jaroslav Maša

