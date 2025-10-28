# 🎛️ ElectronicsAstra Admin Panel

Professional admin panel for managing ElectronicsAstra problems, testcases, and content.

![Admin Panel](https://img.shields.io/badge/Status-Production%20Ready-success)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Port](https://img.shields.io/badge/Port-3071-orange)

## ✨ Features

### 🔐 Authentication
- Secure login system
- JWT token management
- Auto-redirect based on auth status
- Logout functionality

### 📊 Dashboard
- Statistics cards (Total, Published, Drafts, This Week)
- Problem list with real-time search
- Filter by difficulty (Easy/Medium/Hard)
- Filter by status (Published/Draft)
- Quick actions (Edit, Delete, Preview)

### 📝 Problem Management
- **Create/Edit Problems** with comprehensive form:
  - Metadata (title, slug, tags, difficulty)
  - Description with rich text
  - Image upload (URL or local file)
  - Input/Output signal definitions with descriptions
  - Examples with explanations
  - Testcases (JSON editor with validation)
  - Solution code
  - Progressive hints (max 3)
- **Draft/Publish System**
- **Version Control** (backend integration)
- **Bulk Operations**

### ⚙️ Settings
- Profile management (name, email)
- Notification preferences
- Password change
- Settings persistence

### 🎨 UI/UX
- Matches ElectronicsAstra branding perfectly
- Smooth animations with Framer Motion
- Fully responsive (mobile, tablet, desktop)
- Professional design with custom shadows
- Accessible (WCAG compliant)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone repository
git clone https://github.com/YOUR_USERNAME/electronics-astra-admin.git
cd electronics-astra-admin

# Install dependencies
npm install

# Run development server
npm run dev
```

**Open:** http://localhost:3071

### Default Login (Development)
- **Email:** Any email
- **Password:** Any password
- (Mock authentication - replace with real API)

## 🔧 Configuration

### Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
```

### Port Configuration

Default port: **3071** (configured in `package.json`)

To change:
```json
{
  "scripts": {
    "dev": "next dev -p YOUR_PORT"
  }
}
```

## 📁 Project Structure

```
adminfrontend/
├── app/
│   ├── dashboard/
│   │   ├── page.tsx              # Main dashboard
│   │   ├── problems/
│   │   │   ├── page.tsx          # Problems list
│   │   │   └── create/
│   │   │       └── page.tsx      # Create problem
│   │   └── settings/
│   │       └── page.tsx          # Settings
│   ├── login/
│   │   └── page.tsx              # Login page
│   ├── globals.css               # Global styles
│   └── layout.tsx                # Root layout
├── components/
│   ├── AdminLayout.tsx           # Layout with sidebar
│   ├── ProblemForm.tsx           # Main form
│   └── form/                     # Form sections
│       ├── MetadataSection.tsx
│       ├── DescriptionSection.tsx
│       ├── SignalsSection.tsx
│       ├── ExamplesSection.tsx
│       ├── TestcasesSection.tsx
│       ├── SolutionSection.tsx
│       └── HintsSection.tsx
└── public/                       # Static assets
```

## 🎨 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Validation:** Built-in form validation

## 🔌 Backend Integration

### Connect to Backend API

1. Update `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
```

2. Backend endpoints used:
- `POST /auth/login` - Authentication
- `GET /problems` - List problems
- `POST /problems` - Create problem
- `PUT /problems/:id` - Update problem
- `DELETE /problems/:id` - Delete problem

See backend repository for API documentation.

## 🎯 Usage

### Creating a Problem

1. Click "Create Problem" button
2. Fill in all sections:
   - **Metadata:** Title, slug, difficulty, tags
   - **Description:** Problem statement, constraints
   - **Signals:** Define inputs/outputs with descriptions
   - **Examples:** Add sample test cases
   - **Testcases:** JSON format for grading
   - **Solution:** Reference solution
   - **Hints:** Up to 3 progressive hints
3. Click "Save as Draft" or "Save & Publish"

### Managing Problems

- **Search:** Type in search bar
- **Filter:** Use difficulty and status filters
- **Edit:** Click edit icon on any problem
- **Delete:** Click delete icon (with confirmation)
- **Preview:** Click eye icon to preview

## 🔒 Security

- JWT token authentication
- Secure password handling
- CSRF protection
- XSS prevention
- Input sanitization

## 📱 Responsive Design

- **Mobile:** < 640px - Collapsible sidebar, stacked layout
- **Tablet:** 640px - 1024px - Optimized spacing
- **Desktop:** > 1024px - Full sidebar, multi-column

## 🎨 Branding

### Colors
```css
Primary:   #003845  /* Dark Teal */
Secondary: #00999e  /* Bright Teal */
Accent:    #f5c542  /* Yellow */
Neutral:   #e6f4f1  /* Light Mint */
```

### Typography
- **Display:** Poppins (Bold, Black)
- **Body:** Inter (Regular, Semibold)
- **Code:** Monaco, Menlo (Monospace)

## 🚀 Deployment

### Vercel (Recommended)

```bash
npm run build
vercel
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3071
CMD ["npm", "start"]
```

### Traditional Server

```bash
npm run build
npm start
```

## 📊 Performance

- Optimized bundle size
- Code splitting
- Image optimization
- Lazy loading
- Server-side rendering

## 🧪 Testing

```bash
npm run lint
```

## 📝 Scripts

```bash
npm run dev      # Development server
npm run build    # Production build
npm start        # Start production server
npm run lint     # Lint code
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support

For issues and questions:
- **Email:** support@electronicsastra.com
- **Issues:** GitHub Issues
- **Docs:** See HOW-TO-USE.txt

## 🎉 Acknowledgments

Built with ❤️ for ElectronicsAstra

---

**Version:** 1.0.0  
**Status:** Production Ready  
**Port:** 3071
