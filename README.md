# MoWE-BIS Questionnaire

A comprehensive organizational wellness assessment tool that measures your organization across 6 critical dimensions: Belonging Intelligence, Leadership Climate, Talent Flow (AURA), Culture Maturity, Well-being Stability, and Inclusion & Identity Safety.

## Features

- **Anonymous Assessments**: 100% anonymous with no personal data collection
- **Flexible Plans**: Choose between Standard (60 questions) or Enterprise (80 questions)
- **Multi-dimensional Insights**: Assess across 6 key organizational wellness domains
- **Rich Analytics**: Visual dashboards for tracking trends by department, company, and demographics
- **Admin Dashboard**: Secure admin interface for managing assessments and viewing analytics
- **Responsive Design**: Built with modern UI components for optimal user experience

## Tech Stack

- **Framework**: Next.js 16 with TypeScript
- **Database**: Prisma with PostgreSQL (or configured database)
- **Styling**: Tailwind CSS with Radix UI components
- **Forms**: React Hook Form with Zod validation
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React
- **Analytics**: Vercel Analytics

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd mowe-bis-questionnaire
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   pnpm install
   ```

3. Set up the database:
   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

- **Public Assessment**: Visit the homepage and click "Start Assessment" to begin the questionnaire
- **Admin Access**: Navigate to `/admin/login` for administrative features including analytics and data management

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:studio` - Open Prisma Studio

## Project Structure

- `app/` - Next.js app router pages and layouts
- `components/` - Reusable UI components
- `lib/` - Utility functions and configurations
- `prisma/` - Database schema and migrations
- `types/` - TypeScript type definitions
- `hooks/` - Custom React hooks


## License

Private project - All rights reserved.