# The Flex - Vacation Rental Property Management Platform

## Tech Stack

### Core
- **Next.js 15.5.2** - React framework with App Router
- **React 19.1.0** - UI library  
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Styling

### UI Components
- **Radix UI** - Headless UI primitives
- **shadcn/ui** - Component system
- **Lucide React** - Icons

### Data & Analytics
- **Recharts** - Charts and data visualization

### Development
- **Turbopack** - Fast development builds
- **ESLint** - Code linting

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Run development server**
```bash
npm run dev
```

4. **Open your browser**
```
http://localhost:3000
```

### Available Scripts

```bash
npm run dev    # Start development server with Turbopack
npm run build  # Build for production  
npm run start  # Start production server
npm run lint   # Run ESLint
```

## Project Structure

```
src/
├── app/
│   ├── (pages)/
│   │   ├── dashboard/           # Property manager dashboard
│   │   └── property/           # Property listings & details
│   ├── api/reviews/hostaway/   # API endpoints
│   └── components/             # Reusable components
├── lib/
│   ├── api/                    # API utilities
│   └── types/                  # TypeScript definitions
└── services/                   # Business logic & mock data
```

## Key Features

- **Property Portfolio Management** - View and manage multiple properties
- **Review Management** - Approve/reject reviews from booking platforms  
- **Analytics Dashboard** - Performance metrics and insights
- **Multi-channel Support** - Airbnb, Booking.com, Vrbo integration
- **Responsive Design** - Mobile-friendly interface

## API Integration

Currently uses mock Hostaway API data for development. The app simulates:
- Review fetching and filtering
- Review approval workflows  
- Property data aggregation
- Performance analytics

Ready for real Hostaway API integration by replacing the mock service in `src/services/hostaway.tsx`.