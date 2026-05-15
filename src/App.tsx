import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  ArrowRight,
  Award,
  Clock3,
  MessageCircle,
  Instagram,
  MapPin,
  Menu,
  Star,
  Wine,
  X,
} from 'lucide-react'

type Stat = {
  value: number
  suffix: string
  label: string
}

type Dish = {
  name: string
  price: string
  description: string
  image: string
}

type Course = {
  title: string
  description: string
  price: string
}

type Testimonial = {
  quote: string
  name: string
  title: string
}

const navLinks = [
  { label: 'Story', href: '#story' },
  { label: 'Signature', href: '#signature' },
  { label: 'Chef', href: '#chef' },
  { label: 'Tasting Menu', href: '#tasting' },
]

const stats: Stat[] = [
  { value: 25, suffix: '+', label: 'Years Heritage' },
  { value: 50, suffix: '+', label: 'Master Chefs' },
  { value: 150, suffix: '+', label: 'Signature Dishes' },
  { value: 98, suffix: '%', label: 'Guest Satisfaction' },
]

const dishes: Dish[] = [
  {
    name: 'Royal Hyderabadi Biryani',
    price: '₹680',
    description: 'Aromatic basmati rice layered with tender mutton, slow-cooked in dum style with saffron and royal spices.',
    image:
      'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'Tandoori Lobster',
    price: '₹1,890',
    description: 'Whole lobster marinated in saffron yogurt, kissed by tandoor flames with cardamom butter glaze.',
    image:
      'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'Paneer Lababdar Royale',
    price: '₹520',
    description: 'Cottage cheese in rich cashew tomato gravy with kasuri methi and a touch of cream.',
    image:
      'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=1200&q=80',
  },
]
const tastingMenu: Course[] = [
  { title: 'Welcome Aperitif', description: 'Masala mocktail, cardamom mist, edible gold flakes', price: '₹240' },
  { title: 'First Course', description: 'Dahi ke kebab, mint chutney veil, pomegranate caviar', price: '₹340' },
  { title: 'Second Course', description: 'Tandoori jhinga, saffron foam, charred lemon', price: '₹420' },
  { title: 'Third Course', description: 'Galouti kebab, ulte tawa parantha, rose air', price: '₹480' },
  { title: 'Main Course Veg', description: 'Paneer pasanda, royal cashew gravy, gold leaf naan', price: '₹520' },
  { title: 'Main Course Non-Veg', description: 'Lucknowi mutton biryani, burhani raita, mirchi ka salan', price: '₹680' },
  { title: 'Finale', description: 'Saffron rabri, gulab jamun cremeux, pistachio dust', price: '₹280' },
]

const testimonials: Testimonial[] = [
  {
    quote:
      'Sri Garuda took me back to my grandmother\'s kitchen, but with a touch of pure royalty. Every bite was poetry.',
    name: 'Priya Sharma',
    title: 'Food Critic, Times of India',
  },
  {
    quote:
      'The most authentic Indian luxury dining experience I have had outside of palace dining in Rajasthan.',
    name: 'Rajesh Mehra',
    title: 'Travel & Lifestyle Editor',
  },
  {
    quote:
      'From the warmth of the welcome to the artistry on the plate, Sri Garuda is a celebration of Indian heritage.',
    name: 'Anjali Krishnamurthy',
    title: 'Michelin Guide Reviewer',
  },
]

function useCountUp(target: number, start: boolean, duration = 1800) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!start) return

    let frame = 0
    const totalFrames = Math.max(1, Math.round(duration / 16))

    const tick = () => {
      frame += 1
      const progress = frame / totalFrames
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(target * eased))
      if (frame < totalFrames) {
        requestAnimationFrame(tick)
      }
    }

    requestAnimationFrame(tick)
  }, [duration, start, target])

  return count
}

function CountStat({ value, suffix, label, active }: Stat & { active: boolean }) {
  const count = useCountUp(value, active)

  return (
    <div className="group text-center">
      <div className="font-serif text-4xl text-[#C9A84C] md:text-5xl">
        {count}
        {suffix}
      </div>
      <div className="mt-2 text-sm uppercase tracking-[0.32em] text-[#E8D5A3]/80">{label}</div>
    </div>
  )
}

function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 48 }}
      whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

function App() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [statsActive, setStatsActive] = useState(false)
  const [testimonialIndex, setTestimonialIndex] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      document.documentElement.style.setProperty('--scroll', `${window.scrollY}`)
    }
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTestimonialIndex((current) => (current + 1) % testimonials.length)
    }, 4800)
    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    const setCursor = (event: MouseEvent) => {
      document.documentElement.style.setProperty('--cursor-x', `${event.clientX}px`)
      document.documentElement.style.setProperty('--cursor-y', `${event.clientY}px`)
    }

    window.addEventListener('mousemove', setCursor)
    return () => window.removeEventListener('mousemove', setCursor)
  }, [])

  const currentTestimonial = useMemo(() => testimonials[testimonialIndex], [testimonialIndex])

  return (
    <div className="bg-[#000000] text-[#F5F0E8] selection:bg-[#C9A84C] selection:text-black">
      <div className="pointer-events-none fixed inset-0 z-50 hidden md:block">
        <div className="gold-cursor" />
      </div>

      <header
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
          scrolled ? 'border-b border-[#C9A84C]/20 bg-black/90 shadow-[0_12px_40px_rgba(0,0,0,0.45)] backdrop-blur-xl' : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm uppercase tracking-[0.28em] text-[#F5F0E8]/72 transition hover:text-[#C9A84C]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <a href="#hero" className="absolute left-1/2 -translate-x-1/2 font-serif text-2xl tracking-[0.35em] text-[#E8D5A3]">
            SRI GARUDA
          </a>

          <button
            className="hidden rounded-full border border-[#C9A84C] bg-[#C9A84C] px-6 py-3 text-sm font-medium uppercase tracking-[0.24em] text-black transition hover:scale-[1.02] hover:bg-[#E8D5A3] lg:inline-flex"
          >
            Reserve Table
          </button>

          <button
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#C9A84C]/40 text-[#E8D5A3] lg:hidden"
            onClick={() => setMenuOpen((value) => !value)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden border-t border-[#C9A84C]/10 bg-black/95 lg:hidden"
            >
              <div className="flex flex-col gap-5 px-6 py-6">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="text-sm uppercase tracking-[0.28em] text-[#F5F0E8]/80"
                  >
                    {link.label}
                  </a>
                ))}
                <button className="rounded-full bg-[#C9A84C] px-5 py-3 text-sm uppercase tracking-[0.24em] text-black">
                  Reserve Table
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main>
        <section
          id="hero"
          className="relative flex min-h-screen items-center overflow-hidden px-6 pb-16 pt-32 lg:px-10"
        >
          <div className="absolute inset-0">
            <div
              className="absolute inset-0 scale-110 bg-cover bg-center opacity-30"
              style={{
                backgroundImage:
                  "linear-gradient(to bottom, rgba(0,0,0,0.55), rgba(0,0,0,0.92)), url('https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=1800&q=80')",
                transform: 'translateY(calc(var(--scroll, 0) * 0.08px))',
              }}
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(201,168,76,0.22),transparent_34%),linear-gradient(180deg,rgba(0,0,0,0.2),rgba(0,0,0,0.95))]" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto flex w-full max-w-7xl flex-col items-start"
          >
            <span className="mb-6 inline-flex items-center gap-3 border border-[#C9A84C]/30 bg-[#0D0D0D]/60 px-5 py-2 text-xs uppercase tracking-[0.42em] text-[#C9A84C] backdrop-blur-sm">
              Est. 2024 · Fine Dining
            </span>
            <h1 className="gold-shimmer max-w-4xl font-serif text-5xl leading-[0.95] text-[#F5F0E8] sm:text-6xl lg:text-8xl">
              Where Every Meal Becomes
              <br />
              A Timeless Memory
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-[#F5F0E8]/72 md:text-xl">
            Sri Garuda orchestrates a rare journey through India's royal kitchens — an immersive dining ritual celebrating veg and non-veg masterpieces for those who expect the exceptional.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="#reservation"
                className="inline-flex items-center justify-center gap-3 rounded-full bg-[#C9A84C] px-8 py-4 text-sm font-medium uppercase tracking-[0.24em] text-black transition duration-300 hover:scale-[1.02] hover:bg-[#E8D5A3]"
              >
                Reserve Your Table <ArrowRight size={16} />
              </a>
              <a
                href="#tasting"
                className="inline-flex items-center justify-center rounded-full border border-[#C9A84C] px-8 py-4 text-sm uppercase tracking-[0.24em] text-[#E8D5A3] transition duration-300 hover:bg-[#C9A84C]/10"
              >
                Explore Menu
              </a>
            </div>
          </motion.div>
        </section>

        <section className="border-y border-[#C9A84C]/12 bg-[#050505] px-6 py-10 lg:px-10">
          <Reveal className="mx-auto grid max-w-6xl gap-8 md:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                ref={(node) => {
                  if (!node) return
                  const observer = new IntersectionObserver(
                    (entries) => {
                      entries.forEach((entry) => {
                        if (entry.isIntersecting) setStatsActive(true)
                      })
                    },
                    { threshold: 0.35 },
                  )
                  observer.observe(node)
                }}
              >
                <CountStat {...stat} active={statsActive} />
              </div>
            ))}
          </Reveal>
        </section>

        <section id="story" className="px-6 py-24 lg:px-10 lg:py-32">
          <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
            <Reveal className="relative overflow-hidden rounded-[2rem] border border-[#C9A84C]/20 bg-[#0D0D0D]">
              <div className="absolute inset-0 bg-gradient-to-tr from-black via-transparent to-[#C9A84C]/12" />
              <img
  src="/images/story.jpg"
  alt="Sri Garuda Restaurant Interior"
  className="h-[560px] w-full object-cover object-center transition duration-700 hover:scale-105"
/>
            </Reveal>

            <Reveal>
              <div className="mb-5 inline-flex items-center gap-3 text-xs uppercase tracking-[0.4em] text-[#C9A84C]">
                <span className="h-px w-14 bg-[#C9A84C]/70" />
                Our Story
              </div>
              <h2 className="gold-shimmer font-serif text-4xl leading-tight text-[#F5F0E8] md:text-6xl">
                A sanctuary of ritual, rarity, and quiet grandeur.
              </h2>
              <p className="mt-8 text-lg leading-8 text-[#F5F0E8]/72">
                Conceived for guests who seek more than dinner, Sri Garuda is an intimate house of flame, texture, and precision. Each service is curated like a private performance — from the gleam of polished brass to the final velvet note of dessert.
              </p>
              <p className="mt-6 text-lg leading-8 text-[#F5F0E8]/68">
                Our philosophy is rooted in disciplined simplicity: incomparable ingredients, refined technique, and hospitality that anticipates every detail. The result is a dining experience that feels timeless, rare, and deeply personal.
              </p>
              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-[#C9A84C]/18 bg-[#0D0D0D] p-6">
                  <Award className="text-[#C9A84C]" size={20} />
                  <div className="mt-4 font-serif text-2xl text-[#E8D5A3]">Seasonal Mastery</div>
                  <p className="mt-2 text-sm leading-7 text-[#F5F0E8]/65">Menus evolve with rare harvests, ocean catches, and estate-sourced produce.</p>
                </div>
                <div className="rounded-3xl border border-[#C9A84C]/18 bg-[#0D0D0D] p-6">
                  <Wine className="text-[#C9A84C]" size={20} />
                  <div className="mt-4 font-serif text-2xl text-[#E8D5A3]">Cellar Excellence</div>
                  <p className="mt-2 text-sm leading-7 text-[#F5F0E8]/65">A collector's list of vintages, pairings, and celebratory pours from revered estates.</p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="signature" className="bg-[#040404] px-6 py-24 lg:px-10 lg:py-32">
          <Reveal className="mx-auto max-w-7xl">
            <div className="text-center">
              <div className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.4em] text-[#C9A84C]">
                <span className="h-px w-14 bg-[#C9A84C]/70" />
                Signature Dishes
                <span className="h-px w-14 bg-[#C9A84C]/70" />
              </div>
              <h2 className="gold-shimmer mt-6 font-serif text-4xl md:text-6xl">The Icons of Sri Garuda</h2>
            </div>
            <div className="mt-16 grid gap-8 lg:grid-cols-3">
              {dishes.map((dish, index) => (
                <motion.article
                  key={dish.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.75, delay: index * 0.12 }}
                  whileHover={{ y: -10 }}
                  className="group overflow-hidden rounded-[2rem] border border-[#C9A84C]/10 bg-[#0D0D0D] transition duration-500 hover:border-[#C9A84C]/60 hover:shadow-[0_0_0_1px_rgba(201,168,76,0.2),0_30px_80px_rgba(0,0,0,0.45)]"
                >
                  <div className="overflow-hidden">
                    <img src={dish.image} alt={dish.name} className="h-80 w-full object-cover transition duration-700 group-hover:scale-105" />
                  </div>
                  <div className="p-8">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="font-serif text-3xl text-[#F5F0E8]">{dish.name}</h3>
                      <span className="text-lg text-[#C9A84C]">{dish.price}</span>
                    </div>
                    <p className="mt-4 leading-7 text-[#F5F0E8]/68">{dish.description}</p>
                  </div>
                </motion.article>
              ))}
            </div>
          </Reveal>
        </section>

        <section id="chef" className="px-6 py-24 lg:px-10 lg:py-32">
          <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[0.95fr_1.05fr]">
            <Reveal className="relative overflow-hidden rounded-[2rem] border border-[#C9A84C]/18 bg-[#0D0D0D]">
              <img
                src="https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=1200&q=80"
                alt="Executive chef portrait"
                className="h-[620px] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
            </Reveal>
            <Reveal>
              <div className="mb-5 inline-flex items-center gap-3 text-xs uppercase tracking-[0.4em] text-[#C9A84C]">
                <span className="h-px w-14 bg-[#C9A84C]/70" />
                Executive Chef
              </div>
              <h2 className="font-serif text-4xl md:text-6xl">Chef Arvind Surya</h2>
              <p className="mt-4 text-xl text-[#E8D5A3]">Chef Patron · Culinary Visionary</p>
              <p className="mt-8 text-lg leading-8 text-[#F5F0E8]/72">
              With a career shaped by the royal kitchens of Lucknow, Hyderabad, and the Maharaja palaces of Rajasthan, Chef Arvind brings centuries of Indian culinary heritage to every plate. His cuisine balances ancient techniques with modern artistry — a signature that has made Sri Garuda a destination for connoisseurs of authentic Indian luxury dining.
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
  {['Premium Dining Expert', 'Royal Cuisine Master', 'Biryani Specialist', 'Tandoor Expert'].map((badge) => (
    <span
      key={badge}
      className="rounded-full border border-[#C9A84C]/22 bg-[#0D0D0D] px-5 py-3 text-sm uppercase tracking-[0.2em] text-[#E8D5A3]"
    >
      {badge}
    </span>
  ))}
</div>
            </Reveal>
          </div>
        </section>

        <section id="tasting" className="bg-[#050505] px-6 py-24 lg:px-10 lg:py-32">
          <Reveal className="mx-auto max-w-5xl rounded-[2rem] border border-[#C9A84C]/16 bg-[#0D0D0D] p-8 shadow-[0_24px_80px_rgba(0,0,0,0.35)] md:p-14">
            <div className="text-center">
              <div className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.4em] text-[#C9A84C]">
                <span className="h-px w-14 bg-[#C9A84C]/70" />
                Seven Course Journey
                <span className="h-px w-14 bg-[#C9A84C]/70" />
              </div>
              <h2 className="gold-shimmer mt-6 font-serif text-4xl md:text-6xl">Tasting Menu</h2>
            </div>
            <div className="mt-12 space-y-5">
              {tastingMenu.map((course) => (
                <div key={course.title} className="grid gap-4 border-b border-[#C9A84C]/12 py-5 md:grid-cols-[1fr_auto] md:items-end">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="h-2 w-2 rounded-full bg-[#C9A84C]" />
                      <h3 className="font-serif text-2xl text-[#F5F0E8]">{course.title}</h3>
                    </div>
                    <p className="mt-3 pl-5 text-[#F5F0E8]/68">{course.description}</p>
                  </div>
                  <div className="pl-5 text-right font-serif text-2xl text-[#C9A84C]">{course.price}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        <section className="px-6 py-24 lg:px-10 lg:py-32">
          <Reveal className="mx-auto max-w-5xl text-center">
            <div className="text-7xl text-[#C9A84C]">“</div>
            <div className="relative min-h-[240px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTestimonial.name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.9 }}
                  className="absolute inset-0 flex flex-col items-center justify-center"
                >
                  <p className="font-serif text-3xl leading-relaxed text-[#F5F0E8] md:text-4xl">
                    {currentTestimonial.quote}
                  </p>
                  <div className="mt-8 h-px w-24 bg-[#C9A84C]/60" />
                  <p className="mt-6 text-lg text-[#E8D5A3]">{currentTestimonial.name}</p>
                  <p className="mt-2 text-sm uppercase tracking-[0.26em] text-[#F5F0E8]/55">{currentTestimonial.title}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </Reveal>
        </section>

        <section id="reservation" className="bg-[#040404] px-6 py-24 lg:px-10 lg:py-32">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <Reveal className="rounded-[2rem] border border-[#C9A84C]/14 bg-[#0D0D0D] p-8 md:p-10">
              <div className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.4em] text-[#C9A84C]">
                <span className="h-px w-14 bg-[#C9A84C]/70" />
                Visit Us
              </div>
              <h2 className="mt-6 font-serif text-4xl md:text-5xl">Reserve an unforgettable evening.</h2>
              <div className="mt-10 space-y-8 text-[#F5F0E8]/72">
                <div className="flex gap-4">
                  <Clock3 className="mt-1 text-[#C9A84C]" />
                  <div>
                    <div className="font-serif text-2xl text-[#F5F0E8]">Hours</div>
                    <p className="mt-2">All Days · 12:00 PM – 3:30 PM & 7:00 PM – 11:30 PM</p>
<p>Private Royal Dining Hall · By reservation only</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <MapPin className="mt-1 text-[#C9A84C]" />
                  <div>
                    <div className="font-serif text-2xl text-[#F5F0E8]">Address</div>
                    <p className="mt-2">Main road, beside GV Mall, Sathupally</p>
<p>Sathupally, Telangana 500034</p>
                  </div>
                </div>
                
              </div>
            </Reveal>

            <Reveal className="rounded-[2rem] border border-[#C9A84C]/16 bg-[#0D0D0D] p-8 md:p-10">
              <form className="grid gap-5">
                <div className="grid gap-5 md:grid-cols-2">
                  <input className="luxury-input" type="text" placeholder="Guest Name" />
                  <input className="luxury-input" type="email" placeholder="Email Address" />
                </div>
                <div className="grid gap-5 md:grid-cols-2">
                  <input className="luxury-input" type="date" />
                  <input className="luxury-input" type="time" />
                </div>
                <div className="grid gap-5 md:grid-cols-2">
                  <input className="luxury-input" type="number" min="1" max="12" placeholder="Guests" />
                  <input className="luxury-input" type="tel" placeholder="Phone Number" />
                </div>
                <textarea className="luxury-input min-h-36 resize-none" placeholder="Special requests, tasting preferences, celebrations" />
                <button
                  type="submit"
                  className="mt-2 inline-flex items-center justify-center rounded-full bg-[#C9A84C] px-8 py-4 text-sm font-medium uppercase tracking-[0.24em] text-black transition duration-300 hover:scale-[1.01] hover:bg-[#E8D5A3]"
                >
                  Request Reservation
                </button>
              </form>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="px-6 py-14 lg:px-10">
        <div className="mx-auto max-w-5xl text-center">
          <div className="font-serif text-3xl tracking-[0.35em] text-[#E8D5A3]">SRI GARUDA</div>
          <div className="mx-auto mt-6 h-px w-40 bg-[#C9A84C]/60" />
          <div className="mt-8 flex items-center justify-center gap-6 text-[#F5F0E8]/70">
          <a 
  href="https://www.instagram.com/garuda_restaurant_sathupally" 
  target="_blank"
  rel="noreferrer"
  aria-label="Instagram" 
  className="transition hover:text-[#C9A84C]"
>
  <Instagram size={18} />
</a>
            <a 
  href="https://wa.me/919876543210" 
  target="_blank"
  rel="noreferrer"
  aria-label="WhatsApp" 
  className="transition hover:text-[#C9A84C]"
>
  <MessageCircle size={18} />
</a>
          </div>
          
          <p className="mt-8 text-sm uppercase tracking-[0.22em] text-[#F5F0E8]/42">An extraordinary address for world-class dining.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
