# Notes

## Project Folder Structure

```
.
├── .git/                          # Git repository files
├── .next/                         # Next.js build output
│   ├── cache/                     # Build cache
│   ├── server/                    # Server-side files
│   ├── static/                    # Static assets
│   └── types/                     # TypeScript definitions
├── .vercel/                       # Vercel deployment config
├── public/                        # Public static files
│   └── assets/
│       └── images/                # Image assets
├── src/                           # Source code
│   ├── app/                       # Next.js App Router pages
│   │   ├── [id]/                  # Dynamic route
│   │   ├── about-us/              # About page
│   │   ├── admin-data/            # Admin data page
│   │   ├── our-services/          # Services page
│   │   ├── post-your-car/         # Car posting page
│   │   ├── privacy-policy/        # Privacy policy page
│   │   ├── terms-conditions/      # Terms page
│   │   ├── favicon.ico
│   │   ├── globals.css            # Global styles
│   │   ├── layout.js              # Root layout
│   │   └── page.js                # Home page
│   ├── components/                # React components
│   │   ├── about-us/              # About page components
│   │   ├── common/                # Shared components
│   │   ├── home/                  # Home page components
│   │   └── pages/                 # Page-specific components
│   └── utils/
│       └── helper.js              # Utility functions
├── .gitignore                     # Git ignore rules
├── eslint.config.mjs              # ESLint configuration
├── jsconfig.json                  # JavaScript config
├── next.config.mjs                # Next.js configuration
├── notes.md                       # This file
├── package.json                   # Dependencies
├── package-lock.json              # Lock file
├── postcss.config.mjs             # PostCSS config
├── README.md                      # Project documentation
└── tailwind.config.mjs            # Tailwind CSS config
```

## Folder Types & Data Explanation

### Core Application Folders

**`src/app/`** - Next.js App Router Pages

- **Data Type**: React components, page layouts, route handlers
- **Contains**: JSX/JS files that define routes and pages
- **Functionality**: File-based routing system where each folder becomes a URL route

**`src/components/`** - Reusable React Components

- **Data Type**: React functional components, UI elements
- **Contains**: JSX files with component logic and styling
- **Functionality**: Modular UI pieces used across multiple pages

**`src/utils/`** - Utility Functions

- **Data Type**: JavaScript helper functions, constants, configurations
- **Contains**: Pure functions for data manipulation, API calls, formatting
- **Functionality**: Shared business logic and helper methods

### Static & Asset Folders

**`public/`** - Static Assets

- **Data Type**: Images, icons, fonts, static files
- **Contains**: Files served directly by the web server
- **Functionality**: Publicly accessible assets (SEO images, favicons, etc.)

**`public/assets/images/`** - Image Assets

- **Data Type**: Image files (JPG, PNG, WebP, SVG)
- **Contains**: Product images, UI graphics, backgrounds
- **Functionality**: Visual content for the car marketplace

### Build & Deployment Folders

**`.next/`** - Next.js Build Output

- **Data Type**: Compiled JavaScript, optimized assets, server files
- **Contains**: Production-ready code generated during build
- **Functionality**: Optimized files for fast loading and performance

**`.vercel/`** - Vercel Deployment Config

- **Data Type**: JSON configuration files
- **Contains**: Deployment settings and project metadata
- **Functionality**: Manages hosting and deployment on Vercel platform

**`.git/`** - Version Control

- **Data Type**: Git objects, commit history, branch data
- **Contains**: Repository history and version control metadata
- **Functionality**: Tracks code changes and collaboration

### Configuration Files

**`package.json`** - Project Dependencies

- **Data Type**: JSON metadata
- **Contains**: NPM packages, scripts, project info
- **Functionality**: Manages project dependencies and build commands

**`tailwind.config.mjs`** - Tailwind CSS Config

- **Data Type**: JavaScript configuration object
- **Contains**: Custom colors, fonts, breakpoints, plugins
- **Functionality**: Customizes Tailwind CSS framework

**`next.config.mjs`** - Next.js Configuration

- **Data Type**: JavaScript configuration object
- **Contains**: Build settings, redirects, environment variables
- **Functionality**: Configures Next.js framework behavior

**`eslint.config.mjs`** - Code Quality Rules

- **Data Type**: JavaScript configuration object
- **Contains**: Linting rules and code style guidelines
- **Functionality**: Enforces consistent code quality and formatting

## Component Architecture Breakdown

### `src/components/about-us/` - About Page Components

**Purpose**: Components specific to the About Us page

- **`HowWeWork.jsx`** - Section explaining company processes and methodology
- **`WhyChoose.jsx`** - Benefits and reasons to choose this car service

### `src/components/common/` - Shared/Reusable Components

**Purpose**: Components used across multiple pages for consistency

**Layout & Navigation:**

- **`Header.jsx`** - Top navigation bar with menu, logo, and user actions
- **`Footer.jsx`** - Bottom page footer with links and company info
- **`BackToTop.jsx`** - Scroll-to-top button for better UX

**Forms & Inputs:**

- **`CarDetailsForm.jsx`** - Form for entering/editing car information
- **`CommonInput.jsx`** - Reusable input field component with validation
- **`CommonSelect.jsx`** - Dropdown/select component for form fields
- **`ContactUs.jsx`** - Contact form component

**UI Elements:**

- **`Icons.jsx`** - SVG icon components library
- **`CustomPopup.jsx`** - Modal/popup component for overlays
- **`Cta.jsx`** - Call-to-action buttons and sections
- **`Faq.jsx`** - Frequently asked questions component
- **`Preloader.jsx`** - Loading spinner/animation component
- **`NotFoundData.jsx`** - Empty state component when no data is available

### `src/components/home/` - Homepage Components

**Purpose**: Components specific to the main landing page

- **`Hero.jsx`** - Main banner/hero section with primary messaging
- **`CardsData.jsx`** - Car listing cards/grid display
- **`DetailsPages.jsx`** - Car detail view components
- **`ThemeSlider.jsx`** - Image carousel/slider for showcasing cars

### `src/components/pages/` - Page-Level Components

**Purpose**: Main page components that combine smaller components

- **`HomePage.jsx`** - Complete homepage layout and structure
- **`About.jsx`** - About page main component
- **`Services.jsx`** - Services page component
- **`CarDetailsPage.jsx`** - Individual car detail page
- **`AdminList.jsx`** - Admin dashboard for managing car listings
- **`PolicyConditions.jsx`** - Privacy policy and terms content

## Component Organization Strategy

**Hierarchical Structure:**

1. **Page Components** (`pages/`) - Top-level page layouts
2. **Feature Components** (`home/`, `about-us/`) - Feature-specific UI
3. **Common Components** (`common/`) - Reusable across the app

**Component Types:**

- **Layout Components** - Header, Footer, page structure
- **Form Components** - Input fields, forms, validation
- **Display Components** - Cards, lists, detail views
- **Interactive Components** - Buttons, modals, sliders
- **Utility Components** - Icons, loaders, empty states

## General Notes

- This appears to be a Next.js project with App Router
- Uses Tailwind CSS for styling
- Deployed on Vercel
- Car-related application (based on routes)

## Ideas

- Capture ideas and inspiration

## Tasks

- [ ] Task 1
- [ ] Task 2
- [ ] Task 3

## Resources

- Links and references
- Useful documentation

---

_Created: 8/22/2025_
