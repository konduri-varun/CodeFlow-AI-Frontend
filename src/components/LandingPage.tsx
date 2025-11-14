'use client'

import { SignInButton, SignUpButton } from '@clerk/nextjs'

const features = [
  {
    icon: '🔧',
    title: 'Backend Development',
    description: 'FastAPI, Flask, Django, REST APIs, GraphQL, WebSockets',
    technologies: ['FastAPI', 'Flask', 'Django']
  },
  {
    icon: '🎨',
    title: 'Frontend Integration',
    description: 'React, Vue.js, Next.js, API integration, State management',
    technologies: ['React', 'Vue.js', 'Next.js']
  },
  {
    icon: '💾',
    title: 'Database & ORM',
    description: 'PostgreSQL, MongoDB, Redis, Schema design, Optimization',
    technologies: ['PostgreSQL', 'MongoDB', 'Redis']
  },
  {
    icon: '🚀',
    title: 'Deployment & DevOps',
    description: 'Docker, Kubernetes, CI/CD, Infrastructure as Code',
    technologies: ['Docker', 'Kubernetes', 'CI/CD']
  },
  {
    icon: '🧪',
    title: 'Testing & Security',
    description: 'pytest, JWT, OAuth, Security audits, Test automation',
    technologies: ['pytest', 'JWT', 'OAuth']
  },
  {
    icon: '⚡',
    title: 'Performance & ML',
    description: 'Optimization, Caching, Data science, ML Model serving',
    technologies: ['Caching', 'Profiling', 'ML Models']
  },
]

const stats = [
  { number: '12', label: 'Specialized Agents' },
  { number: '50+', label: 'Technologies Covered' },
  { number: '24/7', label: 'Always Available' },
  { number: '∞', label: 'Solutions Generated' },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center text-white mb-16">
          <div className="inline-block mb-6 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
            <span className="text-sm font-semibold">✨ Powered by Advanced AI Technology</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-2xl leading-tight">
            CodeFlow AI<br />Development Assistant
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-95 max-w-3xl mx-auto">
            Your professional AI-powered development companion with 12 specialized agents for enterprise-grade full-stack solutions
          </p>
          
          <div className="flex gap-4 justify-center flex-wrap">
            <SignUpButton mode="modal">
              <button className="px-10 py-4 bg-white text-indigo-600 rounded-xl font-bold text-lg shadow-2xl hover:shadow-3xl hover:scale-105 transition-all">
                Get Started Free
              </button>
            </SignUpButton>
            <SignInButton mode="modal">
              <button className="px-10 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white rounded-xl font-bold text-lg hover:bg-white/20 hover:scale-105 transition-all">
                Sign In
              </button>
            </SignInButton>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center text-white border border-white/20">
              <div className="text-4xl font-bold mb-2">{stat.number}</div>
              <div className="text-sm opacity-90">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 hover:scale-105 transition-all duration-300"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-white/90 text-sm mb-4">{feature.description}</p>
              <div className="flex flex-wrap gap-2">
                {feature.technologies.map((tech, i) => (
                  <span 
                    key={i}
                    className="px-3 py-1 bg-white/20 rounded-full text-xs text-white font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>


      </div>
    </div>
  )
}
