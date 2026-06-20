# Lunaris Digital - Premium Single Page Website

A modern, responsive, and lightweight portfolio/business presentation website for **Lunaris Digital** (a creative agency). Built using **React**, **Vite**, **Tailwind CSS v4**, and **Framer Motion**.

---

## Features

- 📱 **Mobile-First & Fully Responsive**: Optimized for desktop, tablet, and mobile screens.
- 🎨 **Modern Design Language**: Features glassmorphism, dark-navy theme, ambient background gradients, and high-quality graphics.
- 📈 **Centralized Content**: Customize all text, metrics, services, and projects directly in one file (`src/data/content.js`).
- ⚡ **Tailwind CSS v4 (Latest)**: Styled using native CSS `@theme` controls with Vite's official Tailwind compiler.
- 🎬 **Reveal Animations**: Scroll animations and fluid sliders powered by Framer Motion.
- 📝 **Robust Contact Form**: Dynamic client-side validations, error alerts, sending spinners, success states, and out-of-the-box Formspree support.

---

## 🛠️ How to Run the Project Locally

Ensure you have [Node.js](https://nodejs.org/) installed (v18+ recommended).

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start the Local Development Server**:
   ```bash
   npm run dev
   ```
   *The site will load at `http://localhost:5173/` by default.*

3. **Compile a Production Build**:
   ```bash
   npm run build
   ```

---

## ✏️ How to Edit Text and Images

All the website text and layout definitions are completely decoupled from components. To edit them:

1. Open [src/data/content.js](file:///c:/Users/ashis/Desktop/Projects/Lunaris/src/data/content.js).
2. Edit key elements:
   - **Hero Text**: Update titles, subtitles, or button texts inside the `hero` object.
   - **Metrics**: Add or modify statistics inside `about.stats`.
   - **Services**: Change icons (using standard Lucide icon name strings) and text under `services.items`.
   - **Showcase Gallery**: Add/remove projects, tags, or links inside `showcase.projects`.
   - **Testimonials**: Update reviews and authors in `whyUs.testimonials`.
   - **Contact details**: Change address, email, or telephone numbers inside `contact.info`.
3. To replace images:
   - Save your new image inside the [public/assets/](file:///c:/Users/ashis/Desktop/Projects/Lunaris/public/assets/) folder.
   - Update the image path strings in `src/data/content.js` (e.g., `'/assets/new_image.png'`).

---

## ✉️ Connecting the Contact Form

The form comes pre-coded to work with **Formspree** or **EmailJS** API delivery pipelines.

### Option A: Using Formspree (Recommended & Simplest)
Formspree requires zero server code or custom npm packages.

1. Go to [Formspree](https://formspree.io/) and create a free account.
2. Create a new form project and copy the endpoint URL (it looks like `https://formspree.io/f/mqkvwzoe`).
3. Open [src/components/ContactForm.jsx](file:///c:/Users/ashis/Desktop/Projects/Lunaris/src/components/ContactForm.jsx).
4. Update the variable `FORMSPREE_ENDPOINT` at the top of the file:
   ```javascript
   const FORMSPREE_ENDPOINT = "https://formspree.io/f/your_form_id";
   ```
5. Save the file. Form submissions will now send directly to your Formspree dashboard!

### Option B: Using EmailJS
If you want to send emails directly using your personal/company SMTP:

1. Install the SDK package:
   ```bash
   npm install @emailjs/browser
   ```
2. Open `src/components/ContactForm.jsx`.
3. Import the SDK:
   ```javascript
   import emailjs from '@emailjs/browser';
   ```
4. Replace the submission block inside `handleSubmit` with the EmailJS snippet:
   ```javascript
   // Replace inside handleSubmit:
   emailjs.send(
     'YOUR_SERVICE_ID', 
     'YOUR_TEMPLATE_ID', 
     formData, 
     'YOUR_PUBLIC_KEY'
   ).then(() => {
     setSubmitStatus('success');
     setFormData({ name: '', email: '', message: '' });
   }).catch(() => {
     setSubmitStatus('error');
   }).finally(() => {
     setIsSubmitting(false);
   });
   ```

---

## 🚀 Deploying to Production

You can deploy this site in under 2 minutes for free.

### Deploying to Netlify

#### Drag & Drop (No Git required)
1. Run `npm run build` locally.
2. Log into [Netlify](https://www.netlify.com/).
3. Drag the generated `dist` folder directly onto the Netlify dashboard.

#### Git-Linked Continuous Deployment (Recommended)
1. Push your code repository to GitHub/GitLab.
2. In Netlify, click **Add New Site** -> **Import from Git**.
3. Select your repository.
4. Configure Build settings:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
5. Click **Deploy Site**. Every push to your main branch will trigger a rebuild automatically!

### Deploying to Vercel

1. Install the Vercel CLI or log into [Vercel Dashboard](https://vercel.com/).
2. Select **Add New** -> **Project** and select your GitHub repository.
3. Vercel automatically detects Vite framework settings:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Click **Deploy**.

### Deploying to GitHub Pages

This project is configured to build and deploy automatically via GitHub Actions to GitHub Pages on every push to the `main` branch.

