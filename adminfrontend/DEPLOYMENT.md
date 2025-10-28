# 🚀 Deployment Guide

## GitHub Setup

### 1. Create GitHub Repository

```bash
# On GitHub, create a new repository named: electronics-astra-admin
```

### 2. Push to GitHub

```bash
cd adminfrontend

# Add remote
git remote add origin https://github.com/YOUR_USERNAME/electronics-astra-admin.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Deployment Options

### Option 1: Vercel (Recommended) ⭐

**Easiest and fastest deployment**

1. **Install Vercel CLI**
```bash
npm i -g vercel
```

2. **Deploy**
```bash
vercel
```

3. **Configure Environment Variables**
- Go to Vercel Dashboard
- Settings → Environment Variables
- Add: `NEXT_PUBLIC_API_URL=https://your-backend-api.com/api/v1`

4. **Deploy to Production**
```bash
vercel --prod
```

**Your admin panel will be live at:** `https://your-project.vercel.app`

---

### Option 2: Netlify

1. **Connect GitHub Repository**
- Go to Netlify Dashboard
- New site from Git
- Select your repository

2. **Build Settings**
```
Build command: npm run build
Publish directory: .next
```

3. **Environment Variables**
```
NEXT_PUBLIC_API_URL=https://your-backend-api.com/api/v1
```

4. **Deploy**
- Click "Deploy site"

---

### Option 3: Docker

1. **Create Dockerfile**
```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3071
CMD ["npm", "start"]
```

2. **Build & Run**
```bash
docker build -t admin-panel .
docker run -p 3071:3071 -e NEXT_PUBLIC_API_URL=https://api.com/api/v1 admin-panel
```

---

### Option 4: Traditional Server (VPS)

1. **Install Node.js**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

2. **Clone & Build**
```bash
git clone https://github.com/YOUR_USERNAME/electronics-astra-admin.git
cd electronics-astra-admin
npm install
npm run build
```

3. **Setup PM2**
```bash
npm install -g pm2
pm2 start npm --name "admin-panel" -- start
pm2 save
pm2 startup
```

4. **Nginx Configuration**
```nginx
server {
    listen 80;
    server_name admin.electronicsastra.com;

    location / {
        proxy_pass http://localhost:3071;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

5. **SSL with Let's Encrypt**
```bash
sudo certbot --nginx -d admin.electronicsastra.com
```

---

## Environment Variables

### Development
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
```

### Production
```env
NEXT_PUBLIC_API_URL=https://api.electronicsastra.com/api/v1
```

---

## Post-Deployment Checklist

- [ ] Environment variables configured
- [ ] Backend API connected
- [ ] SSL certificate installed
- [ ] Custom domain configured
- [ ] Login functionality tested
- [ ] Problem creation tested
- [ ] All pages accessible
- [ ] Mobile responsive verified
- [ ] Performance optimized
- [ ] Error tracking setup (optional)

---

## Monitoring

### Vercel Analytics
```bash
npm install @vercel/analytics
```

Add to `app/layout.tsx`:
```typescript
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

---

## Troubleshooting

### Build Fails
```bash
# Clear cache
rm -rf .next node_modules
npm install
npm run build
```

### Environment Variables Not Working
- Ensure variables start with `NEXT_PUBLIC_`
- Restart development server after changes
- Redeploy on production

### API Connection Issues
- Check CORS settings on backend
- Verify API URL is correct
- Check network tab in browser DevTools

---

## Rollback

### Vercel
```bash
vercel rollback
```

### PM2
```bash
pm2 restart admin-panel
```

### Docker
```bash
docker stop admin-panel
docker run -p 3071:3071 admin-panel:previous-tag
```

---

## Performance Optimization

1. **Enable Compression**
   - Already enabled in Next.js

2. **Image Optimization**
   - Use Next.js Image component
   - Optimize uploaded images

3. **Code Splitting**
   - Automatic in Next.js

4. **Caching**
   - Configure in `next.config.js`

---

## Security Checklist

- [ ] HTTPS enabled
- [ ] Environment variables secured
- [ ] API authentication working
- [ ] CORS configured properly
- [ ] Rate limiting on backend
- [ ] Input validation enabled
- [ ] XSS protection active
- [ ] CSRF tokens implemented

---

## Support

For deployment issues:
- Check logs: `pm2 logs` or Vercel logs
- Review documentation
- Contact support@electronicsastra.com

---

**Happy Deploying! 🚀**
