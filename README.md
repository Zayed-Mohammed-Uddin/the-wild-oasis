# The Wild Oasis 🏕️

A modern, fully responsive hotel management application for boutique hotels and cabin rentals. Built with React and Supabase for seamless operations management.

## ✨ Features

### 🏠 **Cabin Management**

-   Complete CRUD operations for cabins
-   Image upload and management
-   Cabin pricing and capacity settings
-   Discount management

### 📅 **Booking Management**

-   View all bookings with filtering and sorting
-   Booking status tracking (unconfirmed, checked-in, checked-out)
-   Guest information management
-   Payment status monitoring

### 🚪 **Check-in/Check-out System**

-   Streamlined guest check-in process
-   Breakfast add-on options
-   Payment confirmation
-   Guest check-out management

### 📊 **Analytics Dashboard**

-   Real-time statistics and KPIs
-   Revenue charts and booking trends
-   Occupancy rates
-   Recent activity feed
-   Interactive data visualizations

### 👤 **User Management**

-   Secure authentication system
-   User profile management
-   Password updates
-   Avatar upload

### ⚙️ **Settings & Configuration**

-   Hotel settings management
-   Pricing configuration
-   Breakfast pricing
-   Guest limits per booking

### 📱 **Responsive Design**

-   Fully responsive across all devices
-   Mobile-first approach
-   Collapsible sidebar navigation
-   Touch-friendly interface
-   Optimized modal forms

### 🌙 **Dark Mode**

-   Toggle between light and dark themes
-   Persistent theme preferences
-   Smooth transitions

## 🚀 Getting Started

### Prerequisites

-   Node.js (v14 or higher)
-   npm or yarn
-   Supabase account

### Installation

1. **Clone the repository**

    ```bash
    git clone https://github.com/Zayed-Mohammed-Uddin/the-wild-oasis.git
    cd the-wild-oasis
    ```

2. **Install dependencies**

    ```bash
    npm install
    ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:

    ```env
    VITE_SUPABASE_URL=your_supabase_url
    VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```

4. **Start the development server**

    ```bash
    npm run dev
    ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 🛠️ Tech Stack

### **Frontend**

-   **React 18** - Modern React with hooks and concurrent features
-   **Vite** - Fast build tool and development server
-   **React Router v6** - Client-side routing
-   **React Query (TanStack Query)** - Server state management
-   **React Hook Form** - Performant form handling
-   **Styled Components** - CSS-in-JS styling
-   **React Icons** - Icon library
-   **Recharts** - Data visualization
-   **React Error Boundary** - Error handling
-   **Date-fns** - Date utility library

### **Backend & Database**

-   **Supabase** - Backend-as-a-Service
    -   PostgreSQL database
    -   Real-time subscriptions
    -   Authentication
    -   File storage
    -   Row Level Security (RLS)

### **Development Tools**

-   **ESLint** - Code linting
-   **Prettier** - Code formatting
-   **Git** - Version control

## 📁 Project Structure

```
src/
├── context/          # React context providers
├── data/            # Static data and assets
├── features/        # Feature-based modules
│   ├── authentication/
│   ├── bookings/
│   ├── cabins/
│   ├── check-in-out/
│   ├── dashboard/
│   └── settings/
├── hooks/           # Custom React hooks
├── pages/           # Page components
├── services/        # API services
├── styles/          # Global styles
├── ui/              # Reusable UI components
└── utils/           # Utility functions
```

## 🔧 Available Scripts

-   `npm run dev` - Start development server
-   `npm run build` - Build for production
-   `npm run preview` - Preview production build
-   `npm run lint` - Run ESLint

## 🌟 Key Features Breakdown

### **Responsive Design**

-   **Mobile Navigation**: Collapsible sidebar with overlay
-   **Adaptive Layouts**: Components adjust to screen size
-   **Touch Optimized**: Larger touch targets for mobile
-   **Flexible Grids**: CSS Grid and Flexbox layouts

### **State Management**

-   **React Query**: Server state caching and synchronization
-   **React Context**: Global state (dark mode, authentication)
-   **Local Storage**: Persistent user preferences

### **Performance Optimizations**

-   **Code Splitting**: Lazy-loaded routes
-   **Image Optimization**: Efficient image loading
-   **Caching**: Intelligent data caching with React Query
-   **Error Boundaries**: Graceful error handling

## 🔐 Authentication & Security

-   Secure user registration and login
-   Email-based authentication
-   Protected routes
-   Row Level Security (RLS) in Supabase
-   Secure file uploads

## 📱 Mobile Experience

The application is fully optimized for mobile devices:

-   Responsive navigation with hamburger menu
-   Touch-friendly form controls
-   Optimized modal dialogs
-   Swipe gestures support
-   Mobile-first responsive breakpoints

## 🚀 Deployment

The application can be deployed to various platforms:

### **Netlify** (Recommended)

1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify
3. Configure environment variables in Netlify dashboard

### **Vercel**

1. Connect your GitHub repository
2. Configure build settings
3. Add environment variables

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 🙏 Acknowledgments

-   Built as part of "The Ultimate React Course" by Jonas Schmedtmann
-   Design inspiration from modern hotel management systems
-   Icons provided by React Icons library

---

**Made with ❤️ by [Zayed Mohammed Uddin](https://github.com/Zayed-Mohammed-Uddin)**
