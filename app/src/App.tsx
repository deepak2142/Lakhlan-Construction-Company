import { useState, useEffect, useRef } from 'react'
import { motion, useInView, useScroll, useTransform, AnimatePresence, type Variants } from 'framer-motion'
import { 
  Menu, 
  X, 
  Phone, 
  Mail, 
  MapPin, 
  Building2, 
  HardHat, 
  Users, 
  Award, 
  Calendar,
  ArrowRight,
  TrendingUp,
  Briefcase
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import './App.css'

// Animation variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: 'easeOut' } 
  }
}

const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { duration: 0.6, ease: 'easeOut' } 
  }
}

const slideInRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { duration: 0.6, ease: 'easeOut' } 
  }
}

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { duration: 0.5, ease: 'easeOut' } 
  }
}

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
}

// Counter animation component
function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      const duration = 2000
      const steps = 60
      const increment = target / steps
      let current = 0
      const timer = setInterval(() => {
        current += increment
        if (current >= target) {
          setCount(target)
          clearInterval(timer)
        } else {
          setCount(Math.floor(current))
        }
      }, duration / steps)
      return () => clearInterval(timer)
    }
  }, [isInView, target])

  return <span ref={ref}>{count}{suffix}</span>
}

// Header Component
function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '#about', label: 'About' },
    { href: '#projects', label: 'Projects' },
    { href: '#stats', label: 'Achievements' },
    { href: '#reviews', label: 'Reviews' },
    { href: '#contact', label: 'Contact' },
  ]

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <motion.a 
            href="#"
            className="flex items-center gap-2"
            whileHover={{ scale: 1.02 }}
          >
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
              isScrolled ? 'bg-indigo-600' : 'bg-white'
            }`}>
              <Building2 className={`w-6 h-6 ${isScrolled ? 'text-white' : 'text-indigo-600'}`} />
            </div>
            <span className={`text-xl font-bold ${isScrolled ? 'text-indigo-700' : 'text-white'}`}>
              Lakhlan<span className="font-light">Construction</span>
            </span>
          </motion.a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.href}
                href={link.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative font-medium transition-colors underline-animate ${
                  isScrolled ? 'text-gray-700 hover:text-indigo-600' : 'text-white/90 hover:text-white'
                }`}
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href="#contact"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-5 py-2.5 rounded-full font-semibold transition-all btn-shine ${
                isScrolled 
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
                  : 'bg-white text-indigo-600 hover:bg-gray-100'
              }`}
            >
              Get Quote
            </motion.a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors ${
              isScrolled ? 'text-indigo-700' : 'text-white'
            }`}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t shadow-lg"
          >
            <nav className="flex flex-col p-4 space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-gray-700 font-medium py-2 px-4 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

// Hero Section
function HeroSection() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 150])
  const opacity = useTransform(scrollY, [0, 400], [1, 0])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax */}
      <motion.div 
        style={{ y }}
        className="absolute inset-0 z-0"
      >
        <img
          src="/images/hero-construction.jpg"
          alt="Construction Site"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/90 via-indigo-800/80 to-indigo-600/70" />
      </motion.div>

      {/* Content */}
      <motion.div 
        style={{ opacity }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center"
      >
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
            <Award className="w-5 h-5 text-yellow-400" />
            <span className="text-white/90 text-sm font-medium">30+ Years of Excellence</span>
          </motion.div>

          <motion.h1 
            variants={fadeInUp}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight"
          >
            Building Tomorrow's
            <span className="block mt-2 bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 bg-clip-text text-transparent">
              Infrastructure Today
            </span>
          </motion.h1>

          <motion.p 
            variants={fadeInUp}
            className="max-w-2xl mx-auto text-lg md:text-xl text-white/80"
          >
            Lakhlan Construction Company - Your trusted partner for government and private projects. 
            Delivering excellence with craftsmanship, reliability, and unmatched client satisfaction since 1995.
          </motion.p>

          <motion.div 
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(99, 102, 241, 0.4)' }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-indigo-700 font-semibold rounded-full btn-shine transition-all"
            >
              View Our Projects
              <ArrowRight className="w-5 h-5" />
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent text-white font-semibold rounded-full border-2 border-white/30 hover:bg-white/10 transition-all"
            >
              <Phone className="w-5 h-5" />
              Contact Us
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Stats Preview */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
        >
          {[
            { value: 30, suffix: '+', label: 'Years Experience' },
            { value: 100, suffix: '+', label: 'Projects Completed' },
            { value: 100, suffix: 'Cr+', label: 'Turnover (FY 24)' },
            { value: 50, suffix: '+', label: 'Happy Clients' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 + index * 0.1 }}
              className="glass rounded-2xl p-4 text-center"
            >
              <div className="text-2xl md:text-3xl font-bold text-white">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-sm text-white/70">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2"
        >
          <motion.div className="w-1.5 h-1.5 bg-white rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  )
}

// About Section
function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const features = [
    { icon: Calendar, label: 'Established', value: '1995' },
    { icon: Building2, label: 'Type', value: 'Partnership' },
    { icon: MapPin, label: 'Location', value: 'Rajasthan' },
    { icon: Briefcase, label: 'Activity', value: 'Civil Engineering' },
  ]

  return (
    <section id="about" className="py-20 md:py-32 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <motion.div
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-600 mb-6">
              <Building2 className="w-5 h-5" />
              <span className="text-sm font-semibold">About Us</span>
            </motion.div>

            <motion.h2 
              variants={fadeInUp}
              className="text-3xl md:text-5xl font-bold text-gray-900 mb-6"
            >
              Building Excellence Since{' '}
              <span className="gradient-text">1995</span>
            </motion.h2>

            <motion.p 
              variants={fadeInUp}
              className="text-lg text-gray-600 mb-6 leading-relaxed"
            >
              Lakhlan Construction Company is a premier construction firm established with a vision 
              to deliver high-quality infrastructure with timely completion and utmost safety. Since 
              its incorporation on 1-Apr-1995, we have consistently partnered with government and 
              private sectors to bring exceptional projects to life.
            </motion.p>

            <motion.p 
              variants={fadeInUp}
              className="text-lg text-gray-600 mb-8 leading-relaxed"
            >
              Our team of certified engineers and skilled laborers work hand-in-hand ensuring every 
              project meets the highest standards and regulatory compliance. We have successfully 
              executed numerous projects ranging from government schools, sports complexes, housing 
              developments to district hospitals and more.
            </motion.p>

            <motion.div variants={fadeInUp} className="grid grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 hover:bg-indigo-50 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center">
                    <feature.icon className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">{feature.label}</div>
                    <div className="font-semibold text-gray-900">{feature.value}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - Image Grid */}
          <motion.div
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
            className="relative"
          >
            <motion.div 
              variants={scaleIn}
              className="relative z-10 rounded-2xl overflow-hidden shadow-2xl"
            >
              <img
                src="/images/project-school.jpg"
                alt="Our Project"
                className="w-full h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="text-white font-semibold text-lg">Government School Project</div>
                <div className="text-white/80 text-sm">Dheemari, Bharatpur</div>
              </div>
            </motion.div>

            <motion.div 
              variants={slideInRight}
              className="absolute -top-6 -right-6 w-48 h-48 rounded-2xl overflow-hidden shadow-xl z-20 hidden lg:block"
            >
              <img
                src="/images/project-hospital.jpg"
                alt="Hospital Project"
                className="w-full h-full object-cover"
              />
            </motion.div>

            <motion.div 
              variants={slideInLeft}
              className="absolute -bottom-6 -left-6 w-40 h-40 rounded-2xl overflow-hidden shadow-xl z-20 hidden lg:block"
            >
              <img
                src="/images/project-road.jpg"
                alt="Road Project"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Decorative Elements */}
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-indigo-100 rounded-full blur-3xl opacity-60" />
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-100 rounded-full blur-3xl opacity-60" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Stats Section
function StatsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const stats = [
    { icon: Calendar, value: 30, suffix: '+', label: 'Years of Experience', color: 'from-blue-500 to-blue-600' },
    { icon: Building2, value: 100, suffix: '+', label: 'Projects Completed', color: 'from-indigo-500 to-indigo-600' },
    { icon: TrendingUp, value: 100, suffix: 'Cr+', label: 'Turnover (FY 2023-24)', color: 'from-purple-500 to-purple-600' },
    { icon: Users, value: 50, suffix: '+', label: 'Happy Clients', color: 'from-pink-500 to-pink-600' },
  ]

  return (
    <section id="stats" className="py-20 bg-gradient-to-br from-indigo-900 via-indigo-800 to-purple-900" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white mb-6">
            <TrendingUp className="w-5 h-5" />
            <span className="text-sm font-semibold">Our Achievements</span>
          </motion.div>
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-bold text-white mb-4">
            Numbers That Speak
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-lg text-white/70 max-w-2xl mx-auto">
            Our track record of success is reflected in these impressive numbers
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={scaleIn}
              whileHover={{ y: -8, scale: 1.02 }}
              className="relative group"
            >
              <div className="glass rounded-2xl p-6 md:p-8 text-center hover:bg-white/20 transition-all duration-300">
                <div className={`w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                  <stat.icon className="w-7 h-7 text-white" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-white/70 text-sm md:text-base">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// Projects Section
function ProjectsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const projects = [
    {
      title: 'Government School at Dheemari Bharatpur',
      description: 'Constructed a modern government school building under RSRDC department, enhancing education infrastructure.',
      type: 'Government (RSRDC)',
      image: '/images/project-school.jpg',
    },
    {
      title: 'Sports Complex at Jodhpur',
      description: 'Developed a state-of-the-art sports complex in Jodhpur on behalf of RSRDC.',
      type: 'Government (RSRDC)',
      image: '/images/project-sports.jpg',
    },
    {
      title: 'Rajasthan Housing Board MIG & LIG Flats',
      description: 'Constructed affordable MIG and LIG category housing flats for Rajasthan Housing Board.',
      type: 'Government (RHB)',
      image: '/images/project-housing.jpg',
    },
    {
      title: 'District Hospitals at Sheoganj, Salumber & Balotra',
      description: 'Upgraded and constructed district hospitals with modern facilities for Medical & Health Department.',
      type: 'Government (Medical & Health Dept.)',
      image: '/images/project-hospital.jpg',
    },
    {
      title: 'PWD CC Road Construction - Jodhpur',
      description: 'Constructed Cement Concrete roads for Public Works Department in and around Jodhpur.',
      type: 'Government (PWD Dept.)',
      image: '/images/project-road.jpg',
    },
    {
      title: 'Government Hostel Construction',
      description: 'Completed multiple hostel buildings projects for RSRDC ensuring quality student accommodations.',
      type: 'Government (RSRDC)',
      image: '/images/project-hostel.jpg',
    },
    {
      title: 'Judicial Academy at Jodhpur',
      description: 'Constructed judicial training academy infrastructure enhancing local governance education facilities.',
      type: 'Government',
      image: '/images/project-judicial.jpg',
    },
    {
      title: 'Residential Home Construction - Kudi Sector',
      description: 'Built customized residential house for client Mukesh Kumar focusing on quality and comfort.',
      type: 'Private',
      image: '/images/project-residential.jpg',
    },
  ]

  return (
    <section id="projects" className="py-20 md:py-32 bg-gray-50" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-600 mb-6">
            <HardHat className="w-5 h-5" />
            <span className="text-sm font-semibold">Our Portfolio</span>
          </motion.div>
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Featured <span className="gradient-text">Projects</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our diverse portfolio of successfully completed government and private sector projects
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover={{ y: -8 }}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              <div className="img-zoom h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="inline-block px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-semibold mb-3">
                  {project.type}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-3">
                  {project.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// Reviews Section
function ReviewsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const reviews = [
    {
      quote: "Lakhlan Construction completed our government school building at Dheemari Bharatpur with meticulous attention to details and on strict timelines. A reliable partner for government projects!",
      author: 'RSRDC Bharatpur Department',
      role: 'Government Client',
    },
    {
      quote: "Their professionalism and dedication during our residential home construction project was outstanding. Delivered quality beyond expectations.",
      author: 'Mukesh Kumar',
      role: 'Private Client',
    },
    {
      quote: "Lakhlan's adherence to safety and timelines in PWD road projects in Jodhpur speaks volumes about their expertise in government infrastructure works.",
      author: 'PWD Jodhpur',
      role: 'Government Department',
    },
    {
      quote: "We are impressed by Lakhlan's work on the district hospitals and judicial academy. Their team brought great energy and skill to every phase.",
      author: 'Medical & Health Department',
      role: 'Government Client',
    },
  ]

  return (
    <section id="reviews" className="py-20 md:py-32 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-600 mb-6">
            <Award className="w-5 h-5" />
            <span className="text-sm font-semibold">Testimonials</span>
          </motion.div>
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            What Our <span className="gradient-text">Clients Say</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hear from our satisfied clients about their experience working with us
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="grid md:grid-cols-2 gap-6"
        >
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover={{ y: -4, scale: 1.01 }}
              className="relative p-8 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100"
            >
              <div className="absolute top-6 right-6 text-6xl text-indigo-200 font-serif">&ldquo;</div>
              <p className="text-gray-700 text-lg mb-6 relative z-10 leading-relaxed">
                {review.quote}
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                  {review.author.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{review.author}</div>
                  <div className="text-sm text-gray-500">{review.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// Contact Section
function ContactSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({ name: '', email: '', message: '' })

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors = { name: '', email: '', message: '' }
    let isValid = true

    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your name'
      isValid = false
    }
    if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email'
      isValid = false
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Please enter your message'
      isValid = false
    }

    setErrors(newErrors)

    if (isValid) {
      const subject = encodeURIComponent('Inquiry from website contact form')
      const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)
      window.location.href = `mailto:lakhlan.qureshi.jodhpur@gmail.com?subject=${subject}&body=${body}`
      toast.success('Opening email client...')
      setFormData({ name: '', email: '', message: '' })
    }
  }

  const contactInfo = [
    { icon: MapPin, label: 'Address', value: '402, Diamond Tower, Purani Chungi Ajmer Road, Jaipur, Rajasthan 302001' },
    { icon: Phone, label: 'Phone', value: '+91 92143 44441' },
    { icon: Mail, label: 'Email', value: 'lakhlan.qureshi.jodhpur@gmail.com' },
  ]

  return (
    <section id="contact" className="py-20 md:py-32 bg-gray-50" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-600 mb-6">
            <Phone className="w-5 h-5" />
            <span className="text-sm font-semibold">Get In Touch</span>
          </motion.div>
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Contact <span className="gradient-text">Us</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-lg text-gray-600 max-w-2xl mx-auto">
            For inquiries, project consultation, or partnership opportunities, reach out to us
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={slideInLeft}
          >
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
                  <Input
                    type="text"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full ${errors.name ? 'border-red-500' : ''}`}
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                  <Input
                    type="email"
                    placeholder="Your email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full ${errors.email ? 'border-red-500' : ''}`}
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                  <Textarea
                    placeholder="Write your message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={`w-full ${errors.message ? 'border-red-500' : ''}`}
                  />
                  {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                </div>
                <Button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl btn-shine"
                >
                  Send Message
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={slideInRight}
            className="space-y-6"
          >
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ x: 4 }}
                className="flex items-start gap-4 p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center flex-shrink-0">
                  <info.icon className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">{info.label}</div>
                  <div className="text-gray-900 font-medium">{info.value}</div>
                </div>
              </motion.div>
            ))}

            {/* Quick Contact Buttons */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <motion.a
                href="tel:+919214344441"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-2 p-4 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors"
              >
                <Phone className="w-5 h-5" />
                Call Now
              </motion.a>
              <motion.a
                href="mailto:lakhlan.qureshi.jodhpur@gmail.com"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-2 p-4 bg-white text-indigo-600 border-2 border-indigo-600 rounded-xl font-semibold hover:bg-indigo-50 transition-colors"
              >
                <Mail className="w-5 h-5" />
                Email Us
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Footer
function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">Lakhlan<span className="font-light">Construction</span></span>
            </div>
            <p className="text-gray-400 max-w-md">
              Building excellence with trusted government and private projects since 1995. 
              Your partner in creating tomorrow's infrastructure.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['About', 'Projects', 'Reviews', 'Contact'].map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase()}`} className="text-gray-400 hover:text-white transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Jaipur, Rajasthan</li>
              <li>+91 92143 44441</li>
              <li>lakhlan.qureshi.jodhpur@gmail.com</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>© {currentYear} Lakhlan Construction Company. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

// WhatsApp Button
function WhatsAppButton() {
  return (
    <motion.a
      href="https://wa.me/919214344441"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: 'spring' }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 whatsapp-btn rounded-full flex items-center justify-center shadow-lg"
      title="Chat with us on WhatsApp"
    >
      <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white">
        <path d="M20.52 3.48A11.83 11.83 0 0012.04 0C5.53 0 .24 5.27.24 11.78a11.45 11.45 0 001.6 5.79L0 24l6.62-1.72a11.84 11.84 0 005.43 1.35h.02c6.52 0 11.8-5.28 11.8-11.8a11.8 11.8 0 00-3.35-8.05zm-8.47 18.5a9.48 9.48 0 01-4.84-1.41l-.35-.21-3.9 1.02 1.04-3.8-.23-.37a9.4 9.4 0 01-1.44-5.1c0-5.21 4.23-9.44 9.44-9.44a9.32 9.32 0 016.67 2.76 9.27 9.27 0 012.77 6.68c-.01 5.21-4.24 9.44-9.45 9.44zm5.4-6.6c-.29-.14-1.72-.85-1.98-.95-.26-.11-.45-.14-.65.13-.2.27-.78.95-.96 1.15-.18.2-.36.23-.66.08a8.47 8.47 0 01-2.48-1.54 9.72 9.72 0 01-1.8-2.24c-.19-.32 0-.49.14-.63.14-.13.31-.32.46-.48a1.16 1.16 0 00.2-.35.52.52 0 00-.01-.48c-.08-.15-.65-1.57-.89-2.14s-.46-.47-.65-.48c-.17 0-.37 0-.57 0a1.2 1.2 0 00-.44.19c-.15.13-.58.57-.58 1.4s.6 1.62.68 1.74c.08.11 1.17 1.8 2.83 2.52a6.55 6.55 0 003.16.72c.42 0 1.19-.17 1.36-.33a.75.75 0 00.54-.33c.13-.23.13-.42.09-.46-.03-.03-.26-.04-.55-.18z"/>
      </svg>
    </motion.a>
  )
}

// Main App
function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <StatsSection />
        <ProjectsSection />
        <ReviewsSection />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}

export default App
