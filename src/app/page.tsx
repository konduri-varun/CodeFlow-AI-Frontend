'use client'

import { SignedIn, SignedOut } from '@clerk/nextjs'
import LandingPage from '@/components/LandingPage'
import ChatInterface from '@/components/ChatInterface'

export default function Home() {
  return (
    <>
      <SignedOut>
        <LandingPage />
      </SignedOut>
      <SignedIn>
        <ChatInterface />
      </SignedIn>
    </>
  )
}
