"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Construction, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/lib/language-context"

export default function ActualitesPlaceholder() {
  const router = useRouter()
  const { t, dir } = useLanguage()

  return (
    <div className="min-h-screen bg-background flex flex-col" dir={dir}>
      <Header />
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center space-y-6 animate-in fade-in zoom-in duration-500">
          <div className="flex justify-center">
            <div className="p-6 rounded-full bg-accent/10">
              <Construction className="h-20 w-20 text-accent" />
            </div>
          </div>
          <h1 className="text-3xl font-black tracking-tight">
            {t("Page en développement", "صفحة قيد التطوير")}
          </h1>
          <p className="text-muted-foreground text-lg">
            {t(
              "Cette page est actuellement en cours de développement. Nous y travaillons et elle sera bientôt disponible.",
              "هذه الصفحة قيد التطوير حاليًا. نحن نعمل عليها وستكون متاحة قريبًا."
            )}
          </p>
          <Button 
            onClick={() => router.push("/")} 
            className="w-full h-12 text-lg font-bold gap-2"
          >
            <ArrowLeft className="h-5 w-5" />
            {t("Retour à l'accueil", "العودة للرئيسية")}
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  )
}
