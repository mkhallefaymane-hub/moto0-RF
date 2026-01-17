"use client"

import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { FeaturedReels } from "@/components/featured-reels"
import { ListingsGrid } from "@/components/listings-grid"
import { CategoryNav } from "@/components/category-nav"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/lib/language-context"

export default function Home() {
  const { dir } = useLanguage()

  return (
    <main className="min-h-screen bg-background" dir={dir}>
      <Header />
      <HeroSection />
      <CategoryNav />
      <FeaturedReels />
      <ListingsGrid />
      <Footer />
    </main>
  )
}
