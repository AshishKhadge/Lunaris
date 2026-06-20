import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Icons from 'lucide-react';
import { 
  Menu, 
  X, 
  ChevronRight, 
  ArrowRight, 
  ChevronLeft, 
  ArrowUp,
  Mail,
  Phone,
  MapPin,
  Clock,
  Sparkles
} from 'lucide-react';
import { websiteContent } from './data/content';
import ContactForm from './components/ContactForm';

// Helper component for dynamic icon loading from content data
const DynamicIcon = ({ name, className }) => {
  const IconComponent = Icons[name];
  if (!IconComponent) return null;
  return <IconComponent className={className} />;
};

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Monitor scroll for sticky navbar active links & back-to-top button visibility
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      
      // Toggle back-to-top button
      setShowScrollTop(scrollPos > 800);

      // Section intersection detection
      const sections = websiteContent.navigation.map(link => link.href.substring(1));
      
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const offsetTop = el.offsetTop - 120;
          const offsetHeight = el.offsetHeight;
          if (scrollPos >= offsetTop && scrollPos < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filtered project list
  const filteredProjects = selectedCategory === 'All'
    ? websiteContent.showcase.projects
    : websiteContent.showcase.projects.filter(p => p.category === selectedCategory);

  // Testimonial Navigation
  const nextTestimonial = () => {
    setTestimonialIndex((prev) => (prev + 1) % websiteContent.whyUs.testimonials.length);
  };

  const prevTestimonial = () => {
    setTestimonialIndex((prev) => 
      prev === 0 ? websiteContent.whyUs.testimonials.length - 1 : prev - 1
    );
  };

  // Framer Motion Reveal Variants
  const revealVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const staggerItem = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-brand-dark text-white relative">
      
      {/* BACKGROUND ELEMENTS */}
      <div className="absolute top-0 left-0 w-full h-[800px] overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[60%] rounded-full bg-brand-cyan/10 blur-[150px]" />
        <div className="absolute top-[20%] right-[-10%] w-[50%] h-[60%] rounded-full bg-brand-purple/10 blur-[150px]" />
        <div className="absolute top-[80%] left-[20%] w-[60%] h-[30%] rounded-full bg-brand-purple/5 blur-[120px]" />
      </div>

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 w-full z-50 glass-panel border-t-0 border-x-0 border-b border-white/5 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="#home" className="flex items-center gap-2 font-extrabold text-2xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-purple hover:opacity-90 transition-opacity">
            <Sparkles className="w-6 h-6 text-brand-cyan inline" />
            {websiteContent.footer.brandName}
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {websiteContent.navigation.map((link) => {
              const sectionId = link.href.substring(1);
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-semibold tracking-wide transition-colors duration-200 relative py-1 ${
                    isActive ? 'text-brand-cyan' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div 
                      layoutId="activeIndicator"
                      className="absolute bottom-0 left-0 w-full h-[2px] bg-brand-cyan" 
                    />
                  )}
                </a>
              );
            })}
          </div>

          <div className="hidden md:block">
            <a 
              href="#contact" 
              className="px-5 py-2.5 rounded-lg border border-brand-cyan/40 text-brand-cyan hover:bg-brand-cyan/10 text-sm font-semibold transition-all duration-300"
            >
              Get Started
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-slate-300 hover:text-white cursor-pointer"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-brand-dark/80 backdrop-blur-sm z-50 md:hidden"
            />
            {/* Drawer */}
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 right-0 h-full w-80 bg-brand-slate border-l border-white/5 p-8 z-50 md:hidden flex flex-col"
            >
              <div className="flex items-center justify-between mb-12">
                <span className="font-extrabold text-xl text-brand-cyan">{websiteContent.footer.brandName}</span>
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-slate-300 hover:text-white cursor-pointer"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex flex-col gap-6">
                {websiteContent.navigation.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-lg font-medium text-slate-300 hover:text-brand-cyan transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
              </div>

              <div className="mt-auto">
                <a 
                  href="#contact" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-center w-full py-3 rounded-lg bg-gradient-to-r from-brand-cyan to-brand-purple text-white font-semibold shadow-lg shadow-brand-cyan/15"
                >
                  Get Started
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <main className="z-10 relative pt-20">
        
        {/* HERO SECTION */}
        <section id="home" className="min-h-[calc(100vh-80px)] flex items-center py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-12 gap-12 items-center">
            {/* Hero Details */}
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={revealVariants}
              className="md:col-span-7 space-y-6 text-left"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 text-brand-cyan text-xs font-bold tracking-wider uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                Crafting Digital Perfection
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-white">
                {websiteContent.hero.title.split(' ').map((word, i) => {
                  if (word.toLowerCase() === 'experiences' || word.toLowerCase() === 'digital') {
                    return <span key={i} className="text-gradient-cyan-purple">{word} </span>;
                  }
                  return word + ' ';
                })}
              </h1>
              <p className="text-slate-300 text-base sm:text-lg md:max-w-2xl leading-relaxed">
                {websiteContent.hero.subtitle}
              </p>
              
              <div className="pt-4 flex flex-wrap gap-4">
                <a 
                  href={websiteContent.hero.ctaPrimaryHref}
                  className="px-8 py-4 rounded-lg bg-gradient-to-r from-brand-cyan to-brand-purple hover:opacity-95 text-white font-semibold flex items-center gap-2 transition-all shadow-lg shadow-brand-cyan/15 hover:translate-y-[-2px] cursor-pointer"
                >
                  <span>{websiteContent.hero.ctaPrimary}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a 
                  href={websiteContent.hero.ctaSecondaryHref}
                  className="px-8 py-4 rounded-lg bg-slate-900 hover:bg-slate-800 text-white border border-white/10 font-semibold flex items-center transition-all hover:translate-y-[-2px]"
                >
                  {websiteContent.hero.ctaSecondary}
                </a>
              </div>
            </motion.div>

            {/* Hero Media Showcase */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="md:col-span-5 relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-brand-cyan to-brand-purple rounded-2xl blur-3xl opacity-20 pointer-events-none" />
              <div className="relative glass-panel rounded-2xl p-2.5 overflow-hidden shadow-2xl border border-white/10">
                <img 
                  src={websiteContent.hero.image} 
                  alt="Lunaris Dashboard Mockup" 
                  className="w-full h-auto rounded-xl shadow-lg border border-white/5 object-cover"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="py-24 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-12 gap-16 items-center">
              
              {/* About Media */}
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={revealVariants}
                className="md:col-span-5 relative order-2 md:order-1"
              >
                <div className="absolute inset-0 bg-brand-cyan/10 rounded-2xl blur-2xl pointer-events-none" />
                <div className="relative rounded-2xl overflow-hidden shadow-xl border border-white/5 bg-slate-900/40 p-2">
                  <img 
                    src={websiteContent.about.image} 
                    alt="Creative Workspace" 
                    className="w-full h-auto rounded-xl object-cover aspect-[4/3] sm:aspect-[16/10]"
                  />
                </div>
              </motion.div>

              {/* About Copy & Stats */}
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={revealVariants}
                className="md:col-span-7 space-y-6 text-left order-1 md:order-2"
              >
                <span className="text-xs font-bold tracking-widest text-brand-purple uppercase">{websiteContent.about.badge}</span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                  {websiteContent.about.title}
                </h2>
                <p className="text-slate-300 leading-relaxed">
                  {websiteContent.about.description1}
                </p>
                <p className="text-slate-400 leading-relaxed text-sm">
                  {websiteContent.about.description2}
                </p>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6">
                  {websiteContent.about.stats.map((stat, i) => (
                    <div key={i} className="p-4 rounded-xl glass-panel border border-white/5">
                      <div className="text-2xl sm:text-3xl font-extrabold text-brand-cyan">{stat.value}</div>
                      <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-semibold">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* SERVICES SECTION */}
        <section id="services" className="py-24 border-t border-white/5 bg-brand-slate/20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <span className="text-xs font-bold tracking-widest text-brand-cyan uppercase">{websiteContent.services.badge}</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                {websiteContent.services.title}
              </h2>
            </div>

            {/* Services Grid */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={staggerContainer}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {websiteContent.services.items.map((service, i) => (
                <motion.div 
                  key={i} 
                  variants={staggerItem}
                  className="glass-panel glass-panel-hover p-8 rounded-2xl text-left flex flex-col h-full"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-cyan/20 to-brand-purple/20 border border-brand-cyan/20 flex items-center justify-center mb-6 text-brand-cyan shrink-0">
                    <DynamicIcon name={service.icon} className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed flex-grow">
                    {service.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* GALLERY/SHOWCASE SECTION */}
        <section id="showcase" className="py-24 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6">
            
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div className="text-left space-y-4">
                <span className="text-xs font-bold tracking-widest text-brand-purple uppercase">{websiteContent.showcase.badge}</span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                  {websiteContent.showcase.title}
                </h2>
              </div>

              {/* Filter Pills */}
              <div className="flex flex-wrap gap-2.5">
                {websiteContent.showcase.categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4.5 py-2 rounded-full text-xs font-semibold tracking-wide border transition-all duration-300 cursor-pointer ${
                      selectedCategory === category
                        ? 'bg-brand-cyan border-brand-cyan text-slate-900 shadow-md shadow-brand-cyan/15'
                        : 'border-white/10 text-slate-300 hover:border-white/20 hover:text-white'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Showcase Grid with Animated Layouts */}
            <motion.div 
              layout
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project, idx) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    key={project.title + idx}
                    className="group relative rounded-2xl overflow-hidden glass-panel border border-white/5 h-80 cursor-pointer flex flex-col justify-end p-6"
                  >
                    {/* Project BG Image */}
                    <div className="absolute inset-0 z-0">
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-108"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/40 to-transparent opacity-90" />
                    </div>

                    {/* Project details overlay */}
                    <div className="relative z-10 space-y-3 text-left">
                      <span className="text-[10px] font-bold tracking-widest text-brand-cyan bg-brand-cyan/10 border border-brand-cyan/20 px-2.5 py-1 rounded-full uppercase">
                        {project.category}
                      </span>
                      <h3 className="text-xl font-bold text-white group-hover:text-brand-cyan transition-colors mt-2">
                        {project.title}
                      </h3>
                      
                      {/* Tech Tags */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {project.tags.map((tag) => (
                          <span key={tag} className="text-[10px] text-slate-400 bg-slate-900/60 px-2 py-0.5 rounded border border-white/5">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        {/* WHY CHOOSE US & TESTIMONIALS */}
        <section id="why-us" className="py-24 border-t border-white/5 bg-brand-slate/10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-12 gap-16 items-start">
              
              {/* Pillars (Why Us) */}
              <div className="md:col-span-6 text-left space-y-8">
                <div className="space-y-4">
                  <span className="text-xs font-bold tracking-widest text-brand-cyan uppercase">{websiteContent.whyUs.badge}</span>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                    {websiteContent.whyUs.title}
                  </h2>
                </div>

                <div className="space-y-6">
                  {websiteContent.whyUs.pillars.map((pillar, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="w-6 h-6 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 flex items-center justify-center text-brand-cyan shrink-0 mt-1">
                        <ChevronRight className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-white">{pillar.title}</h3>
                        <p className="text-slate-400 text-sm mt-1 leading-relaxed">{pillar.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Testimonial slider */}
              <div className="md:col-span-6 w-full">
                <div className="relative glass-panel p-8 md:p-12 rounded-2xl text-left border border-white/5 bg-gradient-to-b from-brand-slate/30 to-brand-dark/40 shadow-xl min-h-[320px] flex flex-col justify-between">
                  <div className="absolute top-6 right-8 text-6xl text-brand-cyan/10 font-serif leading-none select-none">“</div>
                  
                  {/* Review Text Container */}
                  <div className="relative z-10 flex-grow flex items-center">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={testimonialIndex}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p className="text-slate-300 text-base md:text-lg italic leading-relaxed">
                          "{websiteContent.whyUs.testimonials[testimonialIndex].quote}"
                        </p>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Reviewer Details & Nav */}
                  <div className="flex items-end justify-between pt-8 border-t border-white/5 mt-6 shrink-0">
                    <div className="text-left">
                      <h4 className="font-bold text-white">{websiteContent.whyUs.testimonials[testimonialIndex].author}</h4>
                      <p className="text-xs text-slate-400 mt-1">
                        {websiteContent.whyUs.testimonials[testimonialIndex].role} &middot; <span className="text-brand-cyan">{websiteContent.whyUs.testimonials[testimonialIndex].company}</span>
                      </p>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex gap-2">
                      <button 
                        onClick={prevTestimonial}
                        className="w-10 h-10 rounded-lg border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:border-white/20 transition-all cursor-pointer"
                        aria-label="Previous testimonial"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={nextTestimonial}
                        className="w-10 h-10 rounded-lg border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:border-white/20 transition-all cursor-pointer"
                        aria-label="Next testimonial"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="py-24 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-12 gap-16 items-start">
              
              {/* Contact Copy & Channels */}
              <div className="md:col-span-5 text-left space-y-8">
                <div className="space-y-4">
                  <span className="text-xs font-bold tracking-widest text-brand-purple uppercase">{websiteContent.contact.badge}</span>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                    {websiteContent.contact.title}
                  </h2>
                  <p className="text-slate-300 leading-relaxed text-sm">
                    {websiteContent.contact.subtitle}
                  </p>
                </div>

                {/* Direct info cards */}
                <div className="space-y-4">
                  <div className="flex gap-4 items-start p-4 rounded-xl glass-panel border border-white/5 hover:border-brand-cyan/20 transition-all duration-300">
                    <div className="w-10 h-10 rounded-lg bg-brand-cyan/10 border border-brand-cyan/20 flex items-center justify-center text-brand-cyan shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Email Us</h4>
                      <a href={`mailto:${websiteContent.contact.info.email}`} className="text-sm font-bold text-white hover:text-brand-cyan transition-colors mt-1 block">
                        {websiteContent.contact.info.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start p-4 rounded-xl glass-panel border border-white/5 hover:border-brand-cyan/20 transition-all duration-300">
                    <div className="w-10 h-10 rounded-lg bg-brand-purple/10 border border-brand-purple/20 flex items-center justify-center text-brand-purple shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Call Us</h4>
                      <a href={`tel:${websiteContent.contact.info.phone}`} className="text-sm font-bold text-white hover:text-brand-cyan transition-colors mt-1 block">
                        {websiteContent.contact.info.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start p-4 rounded-xl glass-panel border border-white/5 hover:border-brand-cyan/20 transition-all duration-300">
                    <div className="w-10 h-10 rounded-lg bg-slate-800/60 border border-white/5 flex items-center justify-center text-brand-cyan shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Office Address</h4>
                      <span className="text-sm font-bold text-white mt-1 block leading-relaxed">
                        {websiteContent.contact.info.address}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form Component */}
              <div className="md:col-span-7 w-full p-8 rounded-2xl glass-panel border border-white/5 bg-gradient-to-b from-brand-slate/20 to-brand-dark/20 shadow-2xl">
                <ContactForm />
              </div>

            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="border-t border-white/5 bg-slate-950/60 py-16 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            
            {/* Brand column */}
            <div className="md:col-span-5 text-left space-y-4">
              <a href="#home" className="flex items-center gap-2 font-extrabold text-2xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-purple">
                <Sparkles className="w-5 h-5 text-brand-cyan inline" />
                {websiteContent.footer.brandName}
              </a>
              <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
                {websiteContent.footer.tagline}
              </p>
            </div>

            {/* Quick Links Column */}
            <div className="md:col-span-4 text-left space-y-4">
              <h4 className="text-white font-bold text-sm uppercase tracking-wider">Quick Navigation</h4>
              <div className="grid grid-cols-2 gap-3">
                {websiteContent.navigation.map((link) => (
                  <a key={link.name} href={link.href} className="text-slate-400 text-sm hover:text-brand-cyan transition-colors">
                    {link.name}
                  </a>
                ))}
              </div>
            </div>

            {/* Social Connect Column */}
            <div className="md:col-span-3 text-left space-y-4">
              <h4 className="text-white font-bold text-sm uppercase tracking-wider">Connect Socially</h4>
              <div className="flex gap-3">
                {websiteContent.footer.socials.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className="w-10 h-10 rounded-lg bg-slate-900 border border-white/5 flex items-center justify-center text-slate-400 hover:text-brand-cyan hover:border-brand-cyan/20 transition-all"
                    aria-label={`Visit our ${social.name}`}
                  >
                    {social.name === 'Twitter' && (
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    )}
                    {social.name === 'GitHub' && (
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                      </svg>
                    )}
                    {social.name === 'LinkedIn' && (
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    )}
                    {social.name === 'Dribbble' && (
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24ZM21.9056 10.3546C21.6394 10.2314 18.5991 8.89539 15.3524 9.53936C15.1118 9.58721 14.8727 9.63935 14.6353 9.6958C16.4883 12.4338 17.4333 15.6543 17.5255 16.0028C20.1706 14.5422 21.7371 11.9723 21.9056 10.3546ZM15.6174 17.4206C15.539 17.1122 14.654 13.9877 12.8946 11.1963C12.8797 11.1728 12.8647 11.1493 12.8496 11.1258C9.28187 12.2655 6.43857 12.1979 5.25841 12.1481C6.27367 15.2678 8.66591 17.7661 11.7584 18.7909C12.1643 17.3776 13.5137 14.2882 15.6174 17.4206ZM10.0261 19.3496C7.30739 18.2575 5.1611 16.0353 4.14839 13.1973C5.55622 13.2505 8.1633 13.2526 11.5303 12.2654C11.6669 12.5029 11.8001 12.7428 11.9295 12.9846C10.0652 17.4372 9.94803 19.0988 10.0261 19.3496ZM3.85695 10.7416C4.85191 10.7093 8.35711 10.4578 11.8159 9.07684C11.7497 8.92425 11.6811 8.77123 11.61 8.61803C8.42398 9.68003 5.48512 9.64673 3.90487 9.5786C3.96825 9.97233 3.8166 10.3601 3.85695 10.7416ZM4.49842 7.7628C5.86774 7.82827 8.52834 7.84277 11.3789 6.94528C10.4542 5.22851 9.47953 3.75333 9.17646 3.32233C6.8837 4.29828 5.14441 6.27376 4.49842 7.7628ZM10.8711 2.76612C11.1683 3.17937 12.1643 4.63666 13.084 6.36868C16.1432 5.66014 18.9959 6.84074 20.0886 7.37837C19.263 5.25301 17.4897 3.63939 15.3093 3.01895C14.1802 2.68412 12.9734 2.58564 11.7963 2.73031C11.4816 2.71536 11.168 2.7301 10.8711 2.76612Z"/>
                      </svg>
                    )}
                  </a>
                ))}
              </div>
            </div>

          </div>

          <div className="border-t border-white/5 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p>&copy; {new Date().getFullYear()} Lunaris Digital. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-slate-400">Privacy Policy</a>
              <a href="#" className="hover:text-slate-400">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* BACK TO TOP BUTTON */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.a
            href="#home"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed bottom-8 right-8 w-12 h-12 rounded-xl bg-brand-cyan text-slate-900 flex items-center justify-center shadow-lg shadow-brand-cyan/25 z-50 hover:translate-y-[-2px] transition-transform"
            aria-label="Back to top"
          >
            <ArrowUp className="w-5 h-5 stroke-[2.5]" />
          </motion.a>
        )}
      </AnimatePresence>

    </div>
  );
}
