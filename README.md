# Jay Kamble — Full Stack Developer Portfolio 🚀

![Next.js](https://img.shields.io/badge/Next.js-16.2.10-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-Latest-black?style=for-the-badge&logo=framer)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

A premium, recruiter-focused Full Stack Developer portfolio built with **Next.js 16**, **React 19**, **TypeScript**, and **Tailwind CSS**. Designed with Vercel and Linear design aesthetics, glassmorphism visual tokens, dynamic micro-animations, and live GitHub integration.

---

## ✨ Key Features

- **🎯 Recruiter-Focused Hero Section**: Full-width intro with scramble text animation, Open To Work status badge, and an interactive 3D VS Code IDE mockup.
- **📚 Evidence-Based About & Education**: Academic background (B.Sc. in Information Technology, Deogiri College, BAMU, Graduated June 2026, CGPA 7.1/10) with clean layout hierarchy.
- **🚀 Featured Projects Showcase**:
  - **PDFino**: AI PDF Editor SaaS (`https://pdfino.online`)
  - **Next Class Quiz**: EdTech Exam Portal
  - **EventHub**: Event Management Platform
- **📊 Live GitHub Activity Dashboard**: Dynamic GraphQL integration fetching real repositories, metrics, and contribution charts.
- **✉️ Dual Contact Pipeline**: Integrates EmailJS client-side dispatch with Resend server fallback for 100% reliable email delivery.
- **🤖 Portfolio AI Copilot Widget**: Floating interactive assistant widget to answer recruiter questions.
- **⚡ Performance & SEO Optimized**: Pre-rendered static pages, zero layout shifts, lighthouse target >95.

---

## 🛠️ Tech Stack

| Domain | Technologies |
| :--- | :--- |
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router), [React 19](https://react.dev/) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/), [Glassmorphism Tokens](https://ui.shadcn.com/) |
| **Animations** | [Framer Motion](https://www.framer.com/motion/), Lucide Icons |
| **Form Handling** | [React Hook Form](https://react-hook-form.com/), [Zod](https://zod.dev/) Validation |
| **Email Service** | [EmailJS](https://www.emailjs.com/) & [Resend API](https://resend.com/) |
| **Deployment** | [Vercel](https://vercel.com/) |

---

## 📁 Folder Structure

```bash
├── app/                  # Next.js App Router pages & API routes
│   ├── api/contact/      # Serverless Contact Route Handler
│   ├── projects/[slug]/  # Dynamic Project Detail pages
│   ├── globals.css       # Global CSS design tokens
│   ├── layout.tsx        # Root Layout & Metadata
│   └── page.tsx          # Portfolio Home Page
├── components/           # UI Components
│   ├── hero-section.tsx  # Hero Section & 3D Workspace
│   ├── about-section.tsx # About & Academic Credentials
│   ├── projects-section.tsx # Project Cards Grid
│   ├── github-dashboard.tsx # Live GitHub Metrics
│   ├── skills-section.tsx   # Categorized Tech Stack
│   └── contact-section.tsx  # Contact Form & Email Pipeline
├── data/                 # JSON Content Files
│   ├── projects.json     # Project Metadata & Details
│   ├── about.json        # Profile & Education Data
│   └── hero.json         # Hero Info & Social Links
├── lib/                  # Utilities & Zod Validations
├── public/               # Static Assets & Project Cover Images
├── .env.example          # Environment Variables Template
└── package.json          # Dependencies & Scripts
```

---

## 🚀 Getting Started

Follow these steps to set up the project locally:

### 1. Clone the Repository
```bash
git clone https://github.com/jaykamble009/jay-portfolio.git
cd jay-portfolio
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Environment Variables
Create a `.env.local` file in the root directory (refer to `.env.example`):
```env
# GitHub Credentials (Optional)
GITHUB_TOKEN=your_github_token_here
GITHUB_USERNAME=JayKamble009

# Contact Form EmailJS
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_emailjs_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
```

> 🔒 **Security Note**: Never push `.env.local` or private API keys to GitHub. `.env.local` is included in `.gitignore`.

### 4. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the portfolio.

---

## 👨‍💻 Author

**Jay Kamble**
- **Role**: Full Stack Developer
- **Degree**: B.Sc. in Information Technology (Deogiri College, BAMU)
- **GitHub**: [@JayKamble009](https://github.com/jaykamble009)
- **LinkedIn**: [Jay Kamble](https://linkedin.com/in/jaykamble)
- **Email**: [jk365242@gmail.com](mailto:jk365242@gmail.com)

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
