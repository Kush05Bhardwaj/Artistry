# Artistry AI - AI-Powered Interior Design

Transform your living space with AI-powered interior design. Upload a photo of your room and get instant, personalized design suggestions. Fast, affordable, and DIY-friendly.

## 🚀 Features

### Core Features
- **AI-Powered Design Analysis**: Upload room photos and get instant design suggestions
- **Personalized Recommendations**: Tailored suggestions based on room type, size, and style preferences
- **Visual Redesign**: See your room transformed with AI-generated redesigns
- **Product Catalog**: Curated furniture and decor from trusted brands
- **User Authentication**: Secure login with email verification
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile

### Technical Features
- **Performance Optimized**: Fast loading with image compression and lazy loading
- **Security Enhanced**: Rate limiting, input validation, and secure authentication
- **Accessibility**: WCAG compliant with keyboard navigation and screen reader support
- **SEO Optimized**: Meta tags, structured data, and performance optimization
- **Error Handling**: Comprehensive error boundaries and user-friendly error messages

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + shadcn/ui
- **Authentication**: Firebase Auth
- **AI Integration**: Google AI (Gemini)
- **State Management**: React Hooks + Context
- **Form Handling**: React Hook Form + Zod
- **Testing**: Jest + React Testing Library
- **Code Quality**: ESLint + Prettier + Husky

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm 8+
- Firebase project
- Google AI API key

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/artistry-ai.git
   cd artistry-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   ```bash
   cp env.example .env.local
   ```
   
   Update `.env.local` with your configuration:
   ```env
   # Firebase Configuration
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
   NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
   FIREBASE_API_KEY=your-api-key

   # Google AI Configuration
   GOOGLE_AI_API_KEY=your-google-ai-api-key

   # Application Configuration
   NEXT_PUBLIC_APP_URL=http://localhost:9002
   NEXT_PUBLIC_APP_NAME=Artistry AI

   # Rate Limiting
   RATE_LIMIT_MAX_REQUESTS=10
   RATE_LIMIT_WINDOW_MS=60000

   # File Upload
   MAX_FILE_SIZE=10485760
   ALLOWED_FILE_TYPES=image/jpeg,image/png,image/webp

   # Analytics
   NEXT_PUBLIC_GA_MEASUREMENT_ID=your-ga-id
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:9002](http://localhost:9002)

## 🧪 Testing

### Run Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Test Structure
- Unit tests for components and utilities
- Integration tests for AI flows
- E2E tests for critical user journeys

## 🔧 Development

### Available Scripts
```bash
# Development
npm run dev              # Start development server
npm run build           # Build for production
npm run start           # Start production server

# Code Quality
npm run lint            # Run ESLint
npm run lint:fix        # Fix ESLint issues
npm run typecheck       # Run TypeScript checks
npm run format          # Format code with Prettier
npm run format:check    # Check code formatting

# Testing
npm run test            # Run tests
npm run test:watch      # Run tests in watch mode
npm run test:coverage   # Run tests with coverage

# Analysis
npm run analyze         # Analyze bundle size

# AI Development
npm run genkit:dev      # Start Genkit development server
npm run genkit:watch    # Start Genkit in watch mode
```

### Project Structure
```
src/
├── app/                 # Next.js App Router pages
│   ├── design/         # Design upload and analysis
│   ├── redesign/       # AI redesign visualization
│   ├── products/       # Product catalog
│   └── login/          # Authentication
├── components/         # Reusable UI components
│   ├── ui/            # Base UI components
│   └── layout/        # Layout components
├── hooks/             # Custom React hooks
├── lib/               # Utilities and configurations
├── ai/                # AI integration and flows
└── types/             # TypeScript type definitions
```

### Code Style
- Follow TypeScript best practices
- Use functional components with hooks
- Implement proper error handling
- Write comprehensive tests
- Follow accessibility guidelines

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms
The app is configured for standalone output and can be deployed to:
- Netlify
- AWS Amplify
- Google Cloud Run
- Docker containers

## 🔒 Security

### Implemented Security Measures
- Environment variable validation
- Input sanitization and validation
- Rate limiting for API endpoints
- Secure authentication with Firebase
- XSS protection headers
- CSRF protection
- Content Security Policy

### Security Best Practices
- Never commit sensitive data to version control
- Regularly update dependencies
- Monitor for security vulnerabilities
- Implement proper error handling
- Use HTTPS in production

## 📊 Performance

### Optimizations
- Image compression and optimization
- Lazy loading for components
- Code splitting and tree shaking
- Bundle size optimization
- Caching strategies
- CDN integration

### Monitoring
- Core Web Vitals tracking
- Performance monitoring
- Error tracking and logging
- User analytics

## 🤝 Contributing

### Development Workflow
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

### Code Review Process
- All changes require review
- Tests must pass
- Code must follow style guidelines
- Documentation must be updated

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

### Getting Help
- Check the [documentation](docs/)
- Search existing [issues](https://github.com/your-username/artistry-ai/issues)
- Create a new issue for bugs or feature requests

### Community
- Join our [Discord server](https://discord.gg/artistry-ai)
- Follow us on [Twitter](https://twitter.com/artistryai)
- Subscribe to our [newsletter](https://artistry-ai.com/newsletter)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS
- [Radix UI](https://www.radix-ui.com/) for accessible components
- [Firebase](https://firebase.google.com/) for authentication and hosting
- [Google AI](https://ai.google/) for AI capabilities

---

Made with ❤️ by the Artistry AI Team 
