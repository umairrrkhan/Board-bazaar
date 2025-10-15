# Board Bazaar - Firebase Deployment Guide

## 🚀 Deployment Instructions

### Prerequisites
1. Install Node.js and npm
2. Install Firebase CLI: `npm install -g firebase-tools`
3. Login to Firebase: `firebase login`

### Project Setup
The project is configured for Firebase hosting with the following files:

1. **firebase.json** - Hosting configuration
2. **.firebaserc** - Firebase project settings
3. **package.json** - Project dependencies and scripts

### Deployment Commands

#### 1. Build the project
```bash
npm run build
```

#### 2. Test locally
```bash
npm run serve
```
This will run the site locally at http://localhost:5000

#### 3. Deploy to Firebase
```bash
npm run deploy
```
Or using Firebase CLI directly:
```bash
firebase deploy
```

### Firebase Configuration
- **Project ID**: board-bazaar
- **Site URL**: https://board-bazaar.web.app
- **Alternate URL**: https://board-bazaar.firebaseapp.com

### Features Configured
- ✅ Single Page App (SPA) routing
- ✅ Static asset caching (1 year)
- ✅ Image optimization
- ✅ Analytics integration
- ✅ WhatsApp integration
- ✅ Responsive design

### Files Included in Deployment
- All HTML pages
- CSS and JavaScript files
- Image assets
- Font Awesome icons
- Firebase Analytics

### Post-Deployment Checklist
- [ ] Check website loads correctly
- [ ] Test WhatsApp button functionality
- [ ] Verify phone numbers are correct
- [ ] Test navigation on mobile
- [ ] Check Google Analytics tracking
- [ ] Test contact form (if implemented)

### Firebase Analytics
The site is configured with Firebase Analytics using:
- Measurement ID: G-SCYYD46HMR
- Automatic page tracking enabled

### Custom Domain Setup
To use a custom domain:
1. Go to Firebase Console → Hosting
2. Add custom domain
3. Update DNS records as instructed

### Emergency Rollback
If deployment fails:
```bash
firebase hosting:rollback
```

---

📞 **Contact**: +91 78008 08870 | +91 86527 37065