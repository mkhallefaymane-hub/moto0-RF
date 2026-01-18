"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { MapPin, Gauge, Calendar, Fuel, MessageSquare, ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { toast } from "sonner"

export default function ListingDetailsPage() {
  const { id } = useParams()
  const { t, dir, formatPrice } = useLanguage()
  const router = useRouter()
  const [listing, setListing] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [activeImage, setActiveImage] = useState(0)

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await fetch(`/api/listings?admin=1`)
        const data = await res.json()
        const found = data.listings?.find((l: any) => l.id === id)
        if (found) {
          setListing(found)
        } else {
          toast.error(t("Annonce introuvable", "الإعلان غير موجود"))
          router.push("/")
        }
      } catch (err) {
        console.error(err)
        toast.error(t("Erreur de chargement", "خطأ في التحميل"))
      } finally {
        setLoading(false)
      }
    }
    fetchListing()
  }, [id, t, router])

  if (loading) return <div className="min-h-screen bg-background flex items-center justify-center p-20">{t("Chargement...", "جاري التحميل...")}</div>
  if (!listing) return null

  const handleWhatsApp = () => {
    if (!listing.whatsapp) return
    const message = encodeURIComponent(`Bonjour, je suis intéressé par votre annonce : ${listing.title}`)
    const whatsappUrl = `https://wa.me/${listing.whatsapp}?text=${message}`
    router.push(`/safety?redirect=${encodeURIComponent(whatsappUrl)}`)
  }

  return (
    <div className="min-h-screen bg-background" dir={dir}>
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8 lg:py-12">
        <Button variant="ghost" onClick={() => router.back()} className="mb-6 gap-2">
          <ArrowLeft className="h-4 w-4" />
          {t("Retour", "الرجوع")}
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Images */}
          <div className="space-y-4">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-border bg-card">
              <img
                src={listing.images?.[activeImage] || "/placeholder.svg"}
                alt={listing.title}
                className="w-full h-full object-cover"
              />
              {listing.images?.length > 1 && (
                <>
                  <button
                    onClick={() => setActiveImage(prev => (prev === 0 ? listing.images.length - 1 : prev - 1))}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    onClick={() => setActiveImage(prev => (prev === listing.images.length - 1 ? 0 : prev + 1))}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </>
              )}
            </div>
            
            {listing.images?.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                {listing.images.map((img: string, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`relative w-24 aspect-square rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all ${
                      activeImage === idx ? "border-accent scale-95" : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="space-y-8">
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-bold">
                  {listing.status === "SOLD" ? t("VENDU", "مباع") : t("DISPONIBLE", "متوفر")}
                </span>
                <span className="text-muted-foreground">{new Date(listing.created_at).toLocaleDateString()}</span>
              </div>
              <h1 className="text-3xl lg:text-5xl font-black tracking-tight mb-2">{listing.title}</h1>
              <p className="text-2xl font-black text-accent">{formatPrice(listing.price)}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-secondary/30 border border-border flex flex-col items-center text-center gap-1">
                <MapPin className="h-5 w-5 text-accent" />
                <span className="text-xs text-muted-foreground">{t("Ville", "المدينة")}</span>
                <span className="font-bold">{listing.city}</span>
              </div>
              <div className="p-4 rounded-2xl bg-secondary/30 border border-border flex flex-col items-center text-center gap-1">
                <Gauge className="h-5 w-5 text-accent" />
                <span className="text-xs text-muted-foreground">{t("Kilométrage", "المسافة")}</span>
                <span className="font-bold">{listing.mileage || "—"} km</span>
              </div>
              <div className="p-4 rounded-2xl bg-secondary/30 border border-border flex flex-col items-center text-center gap-1">
                <Calendar className="h-5 w-5 text-accent" />
                <span className="text-xs text-muted-foreground">{t("Année", "السنة")}</span>
                <span className="font-bold">{listing.year || "—"}</span>
              </div>
              <div className="p-4 rounded-2xl bg-secondary/30 border border-border flex flex-col items-center text-center gap-1">
                <Fuel className="h-5 w-5 text-accent" />
                <span className="text-xs text-muted-foreground">{t("Carburant", "الوقود")}</span>
                <span className="font-bold">{listing.fuel || "—"}</span>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold">{t("Description", "الوصف")}</h3>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">{listing.description}</p>
            </div>

            <Button 
              size="lg" 
              className="w-full h-14 text-lg font-black bg-green-600 hover:bg-green-700"
              onClick={handleWhatsApp}
              disabled={listing.status === "SOLD"}
            >
              <MessageSquare className="mr-2 h-5 w-5" />
              {t("Contacter le vendeur", "تواصل مع البائع")}
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
