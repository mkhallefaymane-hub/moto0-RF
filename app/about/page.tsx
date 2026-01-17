"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/lib/language-context"

export default function AboutPage() {
  const { t, dir } = useLanguage()

  return (
    <div className="min-h-screen bg-background" dir={dir}>
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold text-foreground mb-8">{t("À propos de Moto0.com", "من نحن - Moto0.com")}</h1>

        <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
          <p className="text-lg leading-relaxed">
            {t(
              "Moto0.com est une marketplace en ligne marocaine dédiée à l'achat et à la vente de voitures et motos d'occasion.",
              "Moto0.com هو سوق إلكتروني مغربي مخصص لشراء وبيع السيارات والدراجات النارية المستعملة.",
            )}
          </p>

          <p className="leading-relaxed">
            {t(
              "Notre plateforme met en relation les acheteurs et les vendeurs partout au Maroc, de Tanger à Agadir, en passant par Casablanca, Rabat, Marrakech et Fès.",
              "منصتنا تربط بين المشترين والبائعين في جميع أنحاء المغرب، من طنجة إلى أكادير، مروراً بالدار البيضاء والرباط ومراكش وفاس.",
            )}
          </p>

          <div className="bg-card border border-border rounded-lg p-6 my-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">{t("Important", "مهم")}</h2>
            <p className="leading-relaxed">
              {t(
                "Moto0.com n'est pas un concessionnaire automobile et ne vend pas de véhicules directement. Nous sommes uniquement une plateforme d'annonces qui facilite la mise en relation entre particuliers et professionnels.",
                "Moto0.com ليس وكيل سيارات ولا يبيع المركبات مباشرة. نحن مجرد منصة إعلانات تسهل التواصل بين الأفراد والمهنيين.",
              )}
            </p>
          </div>

          <h2 className="text-2xl font-semibold text-foreground mt-12 mb-4">{t("Notre mission", "مهمتنا")}</h2>
          <p className="leading-relaxed">
            {t(
              "Nous nous concentrons sur le marché marocain des véhicules d'occasion, en offrant une plateforme simple, sécurisée et accessible à tous. Notre objectif est de rendre l'achat et la vente de véhicules plus transparents et plus faciles pour tous les Marocains.",
              "نركز على سوق السيارات المستعملة في المغرب، ونقدم منصة بسيطة وآمنة ومتاحة للجميع. هدفنا هو جعل شراء وبيع السيارات أكثر شفافية وسهولة لجميع المغاربة.",
            )}
          </p>

          <h2 className="text-2xl font-semibold text-foreground mt-12 mb-4">
            {t("Pourquoi Moto0.com ?", "لماذا Moto0.com؟")}
          </h2>
          <ul className="space-y-3 list-disc list-inside">
            <li>
              {t(
                "Annonces vérifiées de véhicules avec immatriculation marocaine",
                "إعلانات موثقة لمركبات بترقيم مغربي",
              )}
            </li>
            <li>{t("Vendeurs dans toutes les villes du Maroc", "بائعون في جميع مدن المغرب")}</li>
            <li>{t("Interface simple en français et en arabe", "واجهة بسيطة بالفرنسية والعربية")}</li>
            <li>{t("Prix affichés en Dirhams marocains (DH)", "الأسعار بالدرهم المغربي")}</li>
          </ul>
        </div>
      </main>
      <Footer />
    </div>
  )
}
