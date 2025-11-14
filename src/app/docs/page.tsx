'use client'

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Introduction */}
        <section className="mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Documentation</h1>
          <p className="text-lg text-gray-600 mb-8">
            CodeFlow AI - Professional Development Assistant with 12 specialized agents
          </p>
        </section>

        {/* AI Agents */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">12 Specialized AI Agents</h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-indigo-600 mb-2">🔧 Backend Agent</h3>
              <p className="text-gray-600 text-sm">FastAPI, Flask, Django, REST APIs</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-indigo-600 mb-2">🎨 Frontend Agent</h3>
              <p className="text-gray-600 text-sm">React, Next.js, Vue.js</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-indigo-600 mb-2">💾 Database Agent</h3>
              <p className="text-gray-600 text-sm">PostgreSQL, MongoDB, Redis</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-indigo-600 mb-2">🚀 Deployment Agent</h3>
              <p className="text-gray-600 text-sm">Docker, AWS, Heroku, CI/CD</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-indigo-600 mb-2">🐛 Debugging Agent</h3>
              <p className="text-gray-600 text-sm">Error analysis, troubleshooting</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-indigo-600 mb-2">🧪 Testing Agent</h3>
              <p className="text-gray-600 text-sm">pytest, test automation</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-indigo-600 mb-2">☸️ DevOps Agent</h3>
              <p className="text-gray-600 text-sm">Kubernetes, Terraform</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-indigo-600 mb-2">📊 Data Science Agent</h3>
              <p className="text-gray-600 text-sm">pandas, ML models</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-indigo-600 mb-2">🔒 Security Agent</h3>
              <p className="text-gray-600 text-sm">Authentication, vulnerabilities</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-indigo-600 mb-2">⚡ Performance Agent</h3>
              <p className="text-gray-600 text-sm">Optimization, caching</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-indigo-600 mb-2">💻 Code Agent</h3>
              <p className="text-gray-600 text-sm">Code execution, validation</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-indigo-600 mb-2">📚 Search Agent</h3>
              <p className="text-gray-600 text-sm">Documentation, packages</p>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Key Features</h2>
          
          <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
            <div className="flex items-start gap-3">
              <span className="text-2xl">💬</span>
              <div>
                <h3 className="font-semibold text-gray-900">Chat History</h3>
                <p className="text-gray-600 text-sm">Save and manage multiple chat sessions</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <span className="text-2xl">🔄</span>
              <div>
                <h3 className="font-semibold text-gray-900">Session Management</h3>
                <p className="text-gray-600 text-sm">Create, rename, and delete chat sessions</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <span className="text-2xl">🎯</span>
              <div>
                <h3 className="font-semibold text-gray-900">Voice Assistant</h3>
                <p className="text-gray-600 text-sm">ElevenLabs voice integration for hands-free interaction</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <span className="text-2xl">🔐</span>
              <div>
                <h3 className="font-semibold text-gray-900">Authentication</h3>
                <p className="text-gray-600 text-sm">Secure user authentication with Clerk</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">FAQ</h2>
          
          <div className="space-y-4">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-semibold text-gray-900 mb-2">How do I get started?</h3>
              <p className="text-gray-600">Follow the Quick Start guide above to set up the backend and frontend.</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-semibold text-gray-900 mb-2">Is chat history saved?</h3>
              <p className="text-gray-600">Yes, all chat sessions are saved locally in your browser and can be synced to MongoDB.</p>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Need Help?</h2>
            <p className="text-lg mb-6 opacity-90">
              Our team is here to help you succeed.
            </p>
            <p className="text-xl mb-6 font-semibold">
              📧 kondurivarun09@gmail.com
            </p>
            <a 
              href="mailto:kondurivarun09@gmail.com" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-indigo-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              Contact Support
            </a>
          </div>
        </section>
      </div>
    </div>
  )
}
