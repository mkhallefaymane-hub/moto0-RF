"use client"

import { useState } from "react"
import { Car, Truck, Bike, CircleDot, Cog } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function CategoryNav() {
  const [active, setActive] = useState("all")
  const { t, dir } = useLanguage()

  const categories = [
    { id: "all", labelFr: "Tout", labelAr: "الكل", icon: Car },
    { id: "voiture", labelFr: "Voitures", labelAr: "سيارات", icon: Car },
    { id: "moto", labelFr: "Motos", labelAr: "دراجات نارية", icon: Bike },
  ]

  const handleCategoryClick = (id: string) => {
    setActive(id)
    window.dispatchEvent(new CustomEvent("filter-category", { detail: id }))
  }

  return (
    <section className="py-6 border-b border-border bg-background sticky top-16 lg:top-20 z-40" dir={dir}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
                  active === category.id
                    ? "bg-foreground text-background"
                    : "bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                {t(category.labelFr, category.labelAr)}
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
