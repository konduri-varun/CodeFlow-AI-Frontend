import { type Metadata } from 'next'
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import './globals.css'

export const metadata: Metadata = {
  title: 'CodeFlow AI - Professional Development Assistant',
  description: 'Your AI-powered development companion with 12 specialized agents',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider 
      appearance={{
        elements: {
          footer: "hidden",
          footerAction: "hidden",
          footerActionLink: "hidden",
          footerPages__default: "hidden",
          footerPagesLink__default: "hidden",
          card: "shadow-none",
          userButtonPopoverFooter: "hidden",
          modalClerkFooter: "hidden",
          badge: "hidden",
        },
      }}
    >
      <html lang="en">
        <head>
          <script src="https://unpkg.com/@elevenlabs/convai-widget-embed" async type="text/javascript"></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                if (localStorage.getItem('theme') === 'dark' || (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark')
                } else {
                  document.documentElement.classList.remove('dark')
                }
              `,
            }}
          />
        </head>
        <body className="antialiased bg-gray-50 dark:bg-gray-900">
          <elevenlabs-convai agent-id="agent_5301k9y9fschet2sbv1rzn64ys2y"></elevenlabs-convai>
          <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg">
            <div className="max-w-full px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-20">
                <div className="flex items-center gap-8">
                  <a href="/" className="flex items-center gap-4 hover:opacity-80 transition-opacity">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-2xl font-bold shadow-lg">
                      AI
                    </div>
                    <div>
                      <h1 className="text-xl font-bold tracking-tight">CodeFlow AI</h1>
                      <p className="text-xs text-indigo-100">Professional Development Assistant</p>
                    </div>
                  </a>
                  <nav className="hidden md:flex items-center gap-6">
                    <a href="/docs" className="text-sm font-medium hover:text-indigo-100 transition-colors">
                      Documentation
                    </a>
                  </nav>
                </div>
                <div className="flex items-center gap-3">
                  <SignedOut>
                    <SignUpButton mode="modal">
                      <button className="px-6 py-2.5 bg-white text-indigo-600 rounded-lg font-semibold hover:bg-indigo-50 transition-all shadow-lg hover:shadow-xl">
                        Get Started
                      </button>
                    </SignUpButton>
                    <SignInButton mode="modal">
                      <button className="flex items-center gap-1.5 px-5 py-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg font-medium transition-all border border-white/20 hover:border-white/40">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                        Sign In
                      </button>
                    </SignInButton>
                  </SignedOut>
                  <SignedIn>
                    <UserButton 
                      appearance={{
                        elements: {
                          avatarBox: "w-11 h-11 ring-2 ring-white/30",
                          userButtonPopoverFooter: "hidden",
                        }
                      }}
                    />
                  </SignedIn>
                </div>
              </div>
            </div>
          </header>
          <main>
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  )
}
