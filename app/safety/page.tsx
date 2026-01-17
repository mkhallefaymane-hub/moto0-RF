"use client"

import { Suspense, useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/lib/language-context"
import { ShieldCheck, AlertTriangle, FileCheck, Eye, X, Users, Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"

function SafetyInner() {
  const { t, dir } = useLanguage()
  const searchParams = useSearchParams()
  const redirectUrl = searchParams.get("redirect")
  const [countdown, setCountdown] = useState(5)

  useEffect(() => {
    if (!redirectUrl) return

    if (countdown === 0) {
      window.open(redirectUrl, "_blank")
      return
    }

    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000)
    return () => clearTimeout(timer)
  }, [countdown, redirectUrl])

  const handleSkip = () => {
    if (redirectUrl) window.open(redirectUrl, "_blank")
  }

  const safetyTips = [
    {
      icon: ShieldCheck,
      titleFr: "Rencontrez-vous dans un lieu public",
      titleAr: "تقابل في مكان عام وآمن",
      descFr:
        "Choisissez toujours un endroit public et fréquenté pour voir le véhicule. Évitez les rendez-vous isolés ou tard le soir.",
      descAr: "اختر دائماً مكاناً عاماً ومزدحماً لمعاينة المركبة. تجنب اللقاءات في أماكن منعزلة أو في وقت متأخر من الليل.",
    },
    {
      icon: AlertTriangle,
      titleFr: "Ne payez jamais avant d'avoir vu le véhicule",
      titleAr: "لا تدفع أي مبلغ قبل معاينة المركبة",
      descFr:
        "Ne versez aucun acompte ni paiement avant d'avoir vu et inspecté le véhicule en personne. Méfiez-vous des demandes de paiement anticipé.",
      descAr: "لا تدفع أي عربون أو مبلغ قبل أن ترى وتفحص المركبة شخصياً. احذر من طلبات الدفع المسبق.",
    },
    {
      icon: Wallet,
      titleFr: "Évitez les paiements d'avance",
      titleAr: "تجنب الدفع المسبق",
      descFr:
        "Refusez tout transfert d'argent (WafaCash, Western Union) avant la conclusion de la vente devant les autorités compétentes.",
      descAr: "ارفض أي تحويل مالي قبل إتمام عملية البيع أمام السلطات المختصة.",
    },
    {
      icon: FileCheck,
      titleFr: "Vérifiez les documents officiels",
      titleAr: "تحقق من الوثائق الرسمية",
      descFr:
        "Demandez à voir la carte grise, l'assurance et le contrôle technique. Vérifiez que les informations correspondent au véhicule et au vendeur.",
      descAr: "اطلب رؤية البطاقة الرمادية والتأمين والفحص التقني. تحقق من أن المعلومات تتطابق مع المركبة والبائع.",
    },
    {
      icon: Users,
      titleFr: "Soyez accompagné",
      titleAr: "كن مرفوقاً بشخص آخر",
      descFr:
        "Si possible, amenez un ami ou un membre de votre famille lors de la rencontre avec le vendeur pour plus de sécurité.",
      descAr: "إذا كان ذلك ممكناً، أحضر معك صديقاً أو فرداً من عائلتك عند لقاء البائع لمزيد من الأمان.",
    },
    {
      icon: Eye,
      titleFr: "Méfiez-vous des offres trop attractives",
      titleAr: "احذر من العروض غير المنطقية",
      descFr:
        "Si un prix semble trop beau pour être vrai, c'est probablement le cas. Comparez les prix avec d'autres annonces similaires.",
      descAr: "إذا بدا السعر جيداً جداً ليكون حقيقياً، فمن المحتمل أنه ليس كذلك. قارن الأسعار مع إعلانات مماثلة.",
    },
  ]

  return (
    <div className="min-h-screen bg-background" dir={dir}>
      <Header />

      {redirectUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
          <div className="bg-card border border-border rounded-2xl p-8 max-w-md w-full relative shadow-2xl text-center">
            <button
              onClick={handleSkip}
              className="absolute top-4 right-4 p-2 hover:bg-secondary rounded-full transition-colors"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="mb-6 flex justify-center">
              <div className="w-20 h-20 rounded-full border-4 border-accent border-t-transparent animate-spin flex items-center justify-center">
                <span className="text-2xl font-black text-accent">{countdown}</span>
              </div>
            </div>

            <h3 className="text-xl font-bold mb-2">
              {t("Redirection vers WhatsApp...", "جاري التحويل إلى واتساب...")}
            </h3>

            <p className="text-muted-foreground mb-6">
              {t(
  `Vous serez redirigé dans ${countdown} secondes.`,
  `سيتم تحويلك خلال ${countdown} ثوانٍ.`
)}
            </p>

            <Button onClick={handleSkip} variant="outline" className="w-full">
              {t("Passer", "تخطي")}
            </Button>
          </div>
        </div>
      )}

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold text-foreground mb-4">{t("Conseils de sécurité", "نصائح الأمان")}</h1>
        <p className="text-lg text-muted-foreground mb-12">
          {t("Suivez ces conseils pour acheter et vendre en toute sécurité sur Moto0.com", "اتبع هذه النصائح للشراء والبيع بأمان على Moto0.com")}
        </p>

        <div className="grid gap-6">
          {safetyTips.map((tip, index) => {
            const Icon = tip.icon
            return (
              <div key={index} className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                    <Icon className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-foreground mb-2">{t(tip.titleFr, tip.titleAr)}</h2>
                    <p className="text-muted-foreground leading-relaxed">{t(tip.descFr, tip.descAr)}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-12 bg-destructive/10 border border-destructive/20 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-foreground mb-4">{t("Signaler une fraude", "الإبلاغ عن احتيال")}</h2>
          <p className="text-muted-foreground leading-relaxed">
            {t(
              "Si vous suspectez une arnaque ou avez été victime d'une fraude, contactez-nous immédiatement à contact@moto0.com. Nous prenons chaque signalement au sérieux.",
              "إذا كنت تشتبه في عملية احتيال أو كنت ضحية لها، تواصل معنا فوراً على contact@moto0.com. نأخذ كل بلاغ على محمل الجد."
            )}
          </p>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default function SafetyPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <SafetyInner />
    </Suspense>
  )
}
