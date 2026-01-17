"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/lib/language-context"

export default function TermsPage() {
  const { t, dir } = useLanguage()

  return (
    <div className="min-h-screen bg-background" dir={dir}>
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold text-foreground mb-8">
          {t("Conditions générales d'utilisation", "الشروط والأحكام")}
        </h1>

        <div className="prose prose-invert max-w-none space-y-8 text-muted-foreground">
          <p className="text-sm">{t("Dernière mise à jour : Janvier 2026", "آخر تحديث: يناير 2026")}</p>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              {t("Nature de la plateforme", "طبيعة المنصة")}
            </h2>
            <div className="bg-card border border-border rounded-lg p-6">
              <p className="leading-relaxed text-foreground font-medium">
                {t(
                  "Moto0.com est uniquement une plateforme de publication d'annonces. Nous ne sommes pas un concessionnaire et nous ne vendons pas de véhicules.",
                  "Moto0.com هو منصة نشر إعلانات فقط. نحن لسنا وكيل سيارات ولا نبيع المركبات.",
                )}
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">{t("Responsabilité", "المسؤولية")}</h2>
            <p className="leading-relaxed">
              {t(
                "Moto0.com n'est pas responsable des transactions effectuées entre les utilisateurs de la plateforme. Nous ne garantissons pas l'exactitude des informations publiées dans les annonces.",
                "Moto0.com غير مسؤول عن المعاملات التي تتم بين مستخدمي المنصة. لا نضمن دقة المعلومات المنشورة في الإعلانات.",
              )}
            </p>
            <p className="leading-relaxed mt-4">
              {t(
                "Toute transaction (paiement, transfert de propriété, vérification de l'état du véhicule) est de la seule responsabilité de l'acheteur et du vendeur.",
                "أي معاملة (الدفع، نقل الملكية، التحقق من حالة المركبة) هي مسؤولية المشتري والبائع فقط.",
              )}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              {t("Obligations des utilisateurs", "التزامات المستخدمين")}
            </h2>
            <p className="leading-relaxed mb-4">
              {t("En utilisant Moto0.com, vous vous engagez à :", "باستخدام Moto0.com، فإنك تلتزم بما يلي:")}
            </p>
            <ul className="space-y-3 list-disc list-inside">
              <li>{t("Publier uniquement des annonces véridiques et exactes", "نشر إعلانات صادقة ودقيقة فقط")}</li>
              <li>
                {t(
                  "Ne pas publier de contenu illégal, frauduleux ou trompeur",
                  "عدم نشر محتوى غير قانوني أو احتيالي أو مضلل",
                )}
              </li>
              <li>
                {t(
                  "Vérifier personnellement l'état du véhicule avant tout achat",
                  "التحقق شخصياً من حالة المركبة قبل أي شراء",
                )}
              </li>
              <li>
                {t(
                  "Vérifier tous les documents officiels (carte grise, assurance, contrôle technique)",
                  "التحقق من جميع الوثائق الرسمية (البطاقة الرمادية، التأمين، الفحص التقني)",
                )}
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              {t("Responsabilité de l'acheteur", "مسؤولية المشتري")}
            </h2>
            <p className="leading-relaxed">
              {t(
                "L'acheteur est entièrement responsable de vérifier l'authenticité du véhicule, son état mécanique, les documents légaux et l'identité du vendeur avant de procéder à un paiement.",
                "المشتري مسؤول بالكامل عن التحقق من أصالة المركبة وحالتها الميكانيكية والوثائق القانونية وهوية البائع قبل إجراء أي دفع.",
              )}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              {t("Responsabilité du vendeur", "مسؤولية البائع")}
            </h2>
            <p className="leading-relaxed">
              {t(
                "Le vendeur est entièrement responsable de l'exactitude des informations publiées dans son annonce, y compris le prix, le kilométrage, l'état du véhicule et les photos.",
                "البائع مسؤول بالكامل عن دقة المعلومات المنشورة في إعلانه، بما في ذلك السعر والمسافة المقطوعة وحالة المركبة والصور.",
              )}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              {t("Modification des conditions", "تعديل الشروط")}
            </h2>
            <p className="leading-relaxed">
              {t(
                "Moto0.com se réserve le droit de modifier ces conditions à tout moment. Les modifications prendront effet dès leur publication sur cette page.",
                "يحتفظ Moto0.com بالحق في تعديل هذه الشروط في أي وقت. ستدخل التعديلات حيز التنفيذ فور نشرها على هذه الصفحة.",
              )}
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
