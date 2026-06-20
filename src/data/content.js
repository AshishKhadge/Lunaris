export const websiteContent = {
  navigation: [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Showcase', href: '#showcase' },
    { name: 'Why Us', href: '#why-us' },
    { name: 'Contact', href: '#contact' }
  ],
  hero: {
    title: 'Designing Next-Gen Digital Experiences',
    subtitle: 'We blend state-of-the-art aesthetics with cutting-edge front-end technology to build responsive, fast-loading websites that captivate your audience and scale your business.',
    ctaPrimary: 'Explore Showcase',
    ctaPrimaryHref: '#showcase',
    ctaSecondary: 'Get In Touch',
    ctaSecondaryHref: '#contact',
    image: '/assets/hero_showcase.png'
  },
  about: {
    badge: 'ABOUT LUNARIS',
    title: 'We are architects of digital elegance',
    description1: 'At Lunaris Digital, we believe a website is more than just a digital brochure; it is the virtual home of your brand. We design with an eye for premium aesthetics—sleek layouts, glassmorphic accents, and fluid interactions—crafted to leave a lasting first impression.',
    description2: 'Founded in 2024, our small but agile team of designers and engineers works closely with startups and established businesses to deliver lightweight, lightning-fast web applications. We handle everything from brand identity to full-stack frontend engineering.',
    image: '/assets/about_workspace.png',
    stats: [
      { value: '150+', label: 'Projects Completed' },
      { value: '99%', label: 'Client Satisfaction' },
      { value: '4.9★', label: 'Average Rating' },
      { value: '24hr', label: 'Response Time' }
    ]
  },
  services: {
    badge: 'OUR CAPABILITIES',
    title: 'Services tailored to elevate your business',
    items: [
      {
        icon: 'Layout',
        title: 'Web Design & Branding',
        description: 'Creating custom, brand-focused web interfaces with a premium visual design system, matching typography, and harmonized color palettes.'
      },
      {
        icon: 'Code2',
        title: 'Frontend Development',
        description: 'Building blazing-fast, mobile-first websites using modern frontend stacks (React, Vite, Tailwind CSS) optimized for SEO and load speeds.'
      },
      {
        icon: 'Cpu',
        title: 'Interactive Interfaces',
        description: 'Implementing custom interactive layouts and smooth micro-animations using Framer Motion to engage users and elevate UX.'
      },
      {
        icon: 'Sparkles',
        title: 'SEO & Performance Opt',
        description: 'Ensuring your website scores 100 on Google PageSpeed Insights through optimized asset loading, structural HTML5, and responsive design.'
      },
      {
        icon: 'TrendingUp',
        title: 'Growth Consulting',
        description: 'Providing analytics, A/B testing setup, and conversion rate optimization to help translate web traffic into measurable business growth.'
      },
      {
        icon: 'Shield',
        title: 'Support & Maintenance',
        description: 'Ongoing technical optimization, hosting setup, domain routing, and routine security updates to keep your website running 24/7.'
      }
    ]
  },
  showcase: {
    badge: 'SELECTED WORKS',
    title: 'Stunning designs, engineered to perform',
    categories: ['All', 'Web', 'UI/UX', 'Branding'],
    projects: [
      {
        title: 'SaaS Analytics Dashboard',
        category: 'Web',
        image: '/assets/project_web.png',
        tags: ['React', 'Tailwind', 'Recharts'],
        link: '#'
      },
      {
        title: 'Vesper Mobile App Design',
        category: 'UI/UX',
        image: '/assets/project_uiux.png',
        tags: ['Figma', 'Prototyping', 'Dark UI'],
        link: '#'
      },
      {
        title: 'Aura Corporate Stationery',
        category: 'Branding',
        image: '/assets/project_brand.png',
        tags: ['Identity', 'Logo', 'Minimalist'],
        link: '#'
      },
      {
        title: 'Neo-Commerce Platform',
        category: 'Web',
        image: '/assets/project_web.png',
        tags: ['Next.js', 'Tailwind', 'Stripe'],
        link: '#'
      },
      {
        title: 'Quantum Fintech App',
        category: 'UI/UX',
        image: '/assets/project_uiux.png',
        tags: ['iOS App', 'Design System', 'Fintech'],
        link: '#'
      },
      {
        title: 'Apex Studio Identity',
        category: 'Branding',
        image: '/assets/project_brand.png',
        tags: ['Logo Design', 'Guidelines', 'Print'],
        link: '#'
      }
    ]
  },
  whyUs: {
    badge: 'WHY WORK WITH US',
    title: 'We design for the future of the web',
    pillars: [
      {
        title: 'Attention to Detail',
        description: 'We do not build templates. Every grid line, transition speed, and hover effect is custom crafted.'
      },
      {
        title: 'Performance Obsessed',
        description: 'We construct lightweight DOM structures and optimize script loading to achieve perfect performance marks.'
      },
      {
        title: 'Direct Collaboration',
        description: 'Work directly with the designers and developers building your project, avoiding corporate layers.'
      }
    ],
    testimonials: [
      {
        quote: 'Lunaris completely transformed our online presence. Our conversion rate increased by 40% in the first month alone, and clients keep complimenting the smooth animation layout.',
        author: 'Elena Rostova',
        role: 'CEO & Founder',
        company: 'Vortex Media'
      },
      {
        quote: 'Working with this team was an absolute breeze. They took our vague ideas and spun them into a gorgeous, high-performance web experience. Highly recommended!',
        author: 'Marcus Vance',
        role: 'Lead Architect',
        company: 'Apex Tech'
      },
      {
        quote: 'The level of responsiveness and modern design capability Lunaris brings to the table is unmatched. They built a clean, lightning-fast portfolio site for my design studio.',
        author: 'Sophia Chen',
        role: 'Creative Director',
        company: 'Aura Studios'
      }
    ]
  },
  contact: {
    badge: 'GET IN TOUCH',
    title: 'Let us build something incredible together',
    subtitle: 'Have a project in mind, or just want to chat? Fill out the form, or reach out to us directly through any of our channels.',
    info: {
      email: 'hello@lunarisdigital.com',
      phone: '+1 (555) 902-8831',
      address: '100 Pine Street, Suite 240, San Francisco, CA 94111',
      workingHours: 'Mon - Fri, 9:00 AM - 6:00 PM PST'
    }
  },
  footer: {
    brandName: 'LUNARIS',
    tagline: 'Premium digital experiences, engineered with performance in mind.',
    socials: [
      { name: 'Twitter', href: '#' },
      { name: 'GitHub', href: '#' },
      { name: 'LinkedIn', href: '#' },
      { name: 'Dribbble', href: '#' }
    ]
  }
};
