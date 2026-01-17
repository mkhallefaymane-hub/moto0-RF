"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/lib/language-context"
import { Mail, MapPin } from "lucide-react"

export default function ContactPage() {
  const { t, dir } = useLanguage()

  return (
    <div className="min-h-screen bg-background" dir={dir}>
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold text-foreground mb-8">{t("Contact", "اتصل بنا")}</h1>

        <div className="space-y-8 text-muted-foreground">
          <p className="text-lg leading-relaxed">
            {t(
              "Vous avez une question ou besoin d'aide ? Notre équipe est là pour vous accompagner.",
              "هل لديك سؤال أو تحتاج إلى مساعدة؟ فريقنا موجود لمساعدتك.",
            )}
          </p>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <Mail className="h-6 w-6 text-accent" />
                <h2 className="text-xl font-semibold text-foreground">{t("Email", "البريد الإلكتروني")}</h2>
              </div>
              <p className="text-foreground font-medium">contact@moto0.com</p>
              <p className="text-sm mt-2">
                {t("Nous répondons généralement sous 24 à 48 heures.", "نرد عادةً خلال 24 إلى 48 ساعة.")}
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="h-6 w-6 text-accent" />
                <h2 className="text-xl font-semibold text-foreground">{t("Pays", "البلد")}</h2>
              </div>
              <p className="text-foreground font-medium">{t("Maroc", "المغرب")}</p>
              <p className="text-sm mt-2">
                {t("Nous servons exclusivement le marché marocain.", "نخدم حصرياً السوق المغربي.")}
              </p>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6 mt-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              {t("Comment pouvons-nous vous aider ?", "كيف يمكننا مساعدتك؟")}
            </h2>
            <ul className="space-y-3">
              <li>{t("• Questions sur la publication d'annonces", "• أسئلة حول نشر الإعلانات")}</li>
              <li>{t("• Signalement d'annonces frauduleuses", "• الإبلاغ عن إعلانات احتيالية")}</li>
              <li>{t("• Problèmes techniques sur la plateforme", "• مشاكل تقنية على المنصة")}</li>
              <li>{t("• Suggestions et partenariats", "• اقتراحات وشراكات")}</li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
