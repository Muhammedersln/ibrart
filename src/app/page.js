import Hero from '@/components/Hero'
import Navbar from '@/components/Navbar'
import Portfolio from '@/components/Portfolio'

export default function Home() {
  return (
    <main className="bg-green-900">
      <Navbar />
      <Hero />
      <Portfolio />
    </main>
  )
}
