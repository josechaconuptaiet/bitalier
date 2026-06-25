import { Code2, Megaphone, Palette, TrendingUp, Search, Gem, Layers, Zap, Globe, ArrowUpRight } from 'lucide-react'

export interface Service {
  icon: React.ElementType
  title: string
  short: string
  tags: string[]
  number: string
}

export const LIME = '#a5f000'
export const DEEP = '#03045e'
export const DARK = '#0a0c10'

export const SERVICES: Service[] = [
  {
    icon: Code2,
    title: 'Desarrollo de Software',
    short: 'Web, móvil y sistemas a la medida. React, Next.js, APIs, microservicios, apps iOS/Android.',
    tags: ['React', 'Next.js', 'APIs', 'iOS/Android'],
    number: '01',
  },
  {
    icon: Megaphone,
    title: 'Marketing Digital',
    short: 'SEM, Social Ads, content marketing, email automatizado y analítica para escalar tu marca.',
    tags: ['SEM', 'Social Ads', 'Email', 'Analytics'],
    number: '02',
  },
  {
    icon: Palette,
    title: 'Diseño UX/UI',
    short: 'Sistemas de diseño, prototipos, animación y micro-interacciones que convierten visitantes en clientes.',
    tags: ['UX Research', 'Prototipado', 'Motion'],
    number: '03',
  },
  {
    icon: TrendingUp,
    title: 'Estrategia Digital',
    short: 'Auditoría, roadmap estratégico, CRO y growth hacking basado en datos reales de tu negocio.',
    tags: ['Auditoría', 'Roadmap', 'CRO'],
    number: '04',
  },
  {
    icon: Search,
    title: 'SEO & SEM',
    short: 'Posicionamiento técnico, Google Ads y Local SEO para visibilidad real y tráfico calificado.',
    tags: ['SEO Técnico', 'Google Ads', 'Local SEO'],
    number: '05',
  },
  {
    icon: Gem,
    title: 'Branding Corporativo',
    short: 'Naming, identidad visual, guías de estilo y storytelling que posicionan tu marca con carácter.',
    tags: ['Naming', 'Identidad', 'Storytelling'],
    number: '06',
  },
]

export const STATS = [
  { value: '150+', label: 'Proyectos entregados', icon: Layers },
  { value: '98%', label: 'Satisfacción de clientes', icon: Zap },
  { value: '8+', label: 'Años de experiencia', icon: Globe },
  { value: '40+', label: 'Empresas transformadas', icon: ArrowUpRight },
]
