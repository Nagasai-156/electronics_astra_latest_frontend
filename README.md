# Electronics Astra 🚀⚡

A bold, playful, and vibrant gamified learning platform for electronics engineers and students. Designed like an interactive sticker book with funky colors and dynamic animations!

## 🎨 Design Features

### Visual Style
- **Sticker-Style Cards**: Bold 4px black borders with unique shadow effects (6px 6px solid black)
- **Vibrant Colors**: Bright pastels and neon accents
  - Primary: `#FF6B6B` (Coral Red)
  - Secondary: `#4ECDC4` (Turquoise)
  - Accent: `#FFE66D` (Sunny Yellow)
  - Plus: Mint, Lavender, Pink, Orange, and more!
- **Bold Typography**: Ultra-black fonts (Poppins + Inter) for maximum impact
- **Playful Elements**: Emojis, doodles, floating shapes, and blob animations

### Interaction Design
- **Hover Effects**: Cards lift and rotate slightly
- **Sticker Peel**: Buttons translate on hover (shadow changes)
- **Smooth Animations**: Framer Motion powered transitions
- **Floating Shapes**: Animated geometric elements in backgrounds
- **High Contrast**: Black text on bright backgrounds for readability

### Layout Structure
- **Hero Section**: Vibrant gradient with floating shapes and bold CTA buttons
- **Feature Cards**: Each with unique color, icon, and sticker-style design
- **Stats Display**: Colorful metric cards with icons
- **Community Section**: Gradient background with achievement showcases
- **Problem Cards**: Color-coded by difficulty with tags and metadata

## 🚀 Features

- **Practice Circuits**: Solve real-world electronics problems
- **Real-Time Simulation**: Test designs instantly
- **Compete & Win**: Join competitions and climb leaderboards
- **Track Progress**: Detailed analytics and achievement badges
- **Code Editor**: Syntax-highlighted editor with test results
- **Profile Dashboard**: Stats, submissions, and achievements

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🏗️ Project Structure

```
electronics-astra/
├── app/
│   ├── page.tsx              # Home page with hero & features
│   ├── problems/
│   │   ├── page.tsx          # Problems listing with filters
│   │   └── [id]/page.tsx     # Problem solving interface
│   ├── profile/page.tsx      # User profile & achievements
│   ├── signin/page.tsx       # Authentication page
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles & animations
├── components/
│   ├── Navbar.tsx            # Navigation with sticker style
│   └── Footer.tsx            # Colorful footer
├── public/                   # Static assets
└── tailwind.config.js        # Tailwind configuration
```

## 🎯 Pages

1. **Home** - Hero with floating shapes, feature cards, stats, and community
2. **Problems** - Filterable grid of coding challenges with sticker cards
3. **Problem Solving** - Split-screen editor with colorful test results
4. **Profile** - Dashboard with stats, submissions, and achievements
5. **Sign In/Up** - Playful auth page with social login options

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with custom sticker-style utilities
- **Animations**: Framer Motion for smooth interactions
- **Icons**: Lucide React
- **Language**: TypeScript
- **Fonts**: Poppins (display) + Inter (body)

## 🎨 Design System

### Colors
```css
Primary: #FF6B6B (Coral)
Secondary: #4ECDC4 (Turquoise)
Accent: #FFE66D (Yellow)
Purple: #A8E6CF
Pink: #FFB6D9
Mint: #B4F8C8
Lavender: #C7CEEA
Orange: #FFA07A
```

### Shadows
```css
Sticker: 6px 6px 0px 0px rgba(0, 0, 0, 1)
Sticker Hover: 8px 8px 0px 0px rgba(0, 0, 0, 1)
Button: 3px 3px 0px 0px rgba(0, 0, 0, 1)
```

### Animations
- Float: Gentle up/down movement with rotation
- Wiggle: Subtle rotation oscillation
- Blob: Organic shape morphing
- Bounce: Playful bouncing effect

## 🎯 Key Features

### Sticker Cards
Every card has:
- Bold 4px black border
- Unique bright background color
- Drop shadow for depth
- Rounded corners (rounded-3xl)
- Hover effects (lift + rotate)

### Typography
- Headlines: font-black (900 weight)
- Body: font-bold or font-semibold
- High contrast for accessibility
- Large, readable sizes

### Interactions
- Hover: scale(1.05) + rotate(2deg)
- Click: scale(0.98)
- Buttons: translate on hover (sticker peel effect)
- Smooth transitions (0.2-0.3s)

## 📱 Responsive Design

Fully responsive and optimized for:
- Mobile devices (320px+)
- Tablets (768px+)
- Desktops (1024px+)
- Large screens (1440px+)

## 🌟 Design Philosophy

**"An interactive sticker book for electronics"**

The design combines:
- **Playful**: Fun colors, emojis, and animations
- **Professional**: Clear hierarchy and structure
- **Energetic**: Bold typography and vibrant palette
- **Friendly**: Approachable and welcoming
- **Modern**: Contemporary design trends
- **Accessible**: High contrast and readable

## 🎨 Inspiration

Drawing from:
- Modern SaaS landing pages (Figma, Notion)
- Sticker/badge design aesthetics
- Neo-brutalism design trend
- Retro-pop color palettes
- Playful illustration styles

## 📄 License

MIT License - feel free to use this project for your own purposes.

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

---

Built with ❤️ for electronics engineers and students
Made with Next.js, Tailwind CSS, and Framer Motion 🚀
