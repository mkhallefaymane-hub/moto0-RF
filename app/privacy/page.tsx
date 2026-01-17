"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/lib/language-context"

export default function PrivacyPage() {
  const { t, dir } = useLanguage()

  return (
    <div className="min-h-screen bg-background" dir={dir}>
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold text-foreground mb-8">
          {t("Politique de confidentialité", "سياسة الخصوصية")}
        </h1>

        <div className="prose prose-invert max-w-none space-y-8 text-muted-foreground">
          <p className="text-sm">{t("Dernière mise à jour : Janvier 2026", "آخر تحديث: يناير 2026")}</p>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">{t("Collecte des données", "جمع البيانات")}</h2>
            <p className="leading-relaxed">
              {t(
                "Moto0.com collecte les informations que vous nous fournissez directement lors de la création d'un compte ou de la publication d'une annonce, notamment : votre adresse email, numéro de téléphone, ville et les détails de votre véhicule.",
                "يجمع Moto0.com المعلومات التي تقدمها لنا مباشرة عند إنشاء حساب أو نشر إعلان، بما في ذلك: بريدك الإلكتروني ورقم هاتفك ومدينتك وتفاصيل مركبتك.",
              )}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              {t("Utilisation des données", "استخدام البيانات")}
            </h2>
            <p className="leading-relaxed">
              {t(
                "Nous utilisons vos données pour : afficher vos annonces sur la plateforme, vous contacter concernant votre compte, améliorer nos services et vous envoyer des communications relatives à Moto0.com.",
                "نستخدم بياناتك من أجل: عرض إعلاناتك على المنصة، والتواصل معك بخصوص حسابك، وتحسين خدماتنا، وإرسال اتصالات متعلقة بـ Moto0.com.",
              )}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              {t("Cookies et technologies similaires", "ملفات تعريف الارتباط والتقنيات المماثلة")}
            </h2>
            <p className="leading-relaxed">
              {t(
                "Moto0.com utilise des cookies et technologies similaires pour améliorer votre expérience de navigation, analyser le trafic du site et personnaliser le contenu. Ces cookies peuvent inclure des cookies de session, des cookies de préférences et des cookies analytiques.",
                "يستخدم Moto0.com ملفات تعريف الارتباط والتقنيات المماثلة لتحسين تجربة التصفح، وتحليل حركة المرور على الموقع، وتخصيص المحتوى. قد تشمل هذه الملفات ملفات الجلسة وملفات التفضيلات والملفات التحليلية.",
              )}
            </p>
            <p className="leading-relaxed mt-4">
              {t(
                "Nous utilisons également Google AdSense pour afficher des publicités. Google peut utiliser des cookies pour diffuser des annonces basées sur vos visites précédentes sur ce site ou d'autres sites. Vous pouvez désactiver la publicité personnalisée en visitant les paramètres des annonces Google.",
                "نستخدم أيضاً Google AdSense لعرض الإعلانات. قد يستخدم Google ملفات تعريف الارتباط لعرض إعلانات بناءً على زياراتك السابقة لهذا الموقع أو مواقع أخرى. يمكنك تعطيل الإعلانات المخصصة من خلال زيارة إعدادات إعلانات Google.",
              )}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              {t("Protection des données", "حماية البيانات")}
            </h2>
            <p className="leading-relaxed">
              {t(
                "Nous mettons en œuvre des mesures de sécurité appropriées pour protéger vos données personnelles contre tout accès, modification, divulgation ou destruction non autorisés. Cependant, aucune méthode de transmission sur Internet n'est totalement sécurisée.",
                "نطبق إجراءات أمنية مناسبة لحماية بياناتك الشخصية من أي وصول أو تعديل أو إفشاء أو تدمير غير مصرح به. ومع ذلك، لا توجد طريقة نقل عبر الإنترنت آمنة تماماً.",
              )}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">{t("Vos droits", "حقوقك")}</h2>
            <p className="leading-relaxed">
              {t(
                "Vous avez le droit d'accéder, de corriger ou de supprimer vos données personnelles. Pour exercer ces droits, contactez-nous à contact@moto0.com.",
                "لديك الحق في الوصول إلى بياناتك الشخصية أو تصحيحها أو حذفها. لممارسة هذه الحقوق، تواصل معنا على contact@moto0.com.",
              )}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">{t("Modifications", "التعديلات")}</h2>
            <p className="leading-relaxed">
              {t(
                "Nous pouvons mettre à jour cette politique de confidentialité de temps à autre. Nous vous informerons de tout changement en publiant la nouvelle politique sur cette page.",
                "قد نقوم بتحديث سياسة الخصوصية هذه من وقت لآخر. سنبلغك بأي تغييرات من خلال نشر السياسة الجديدة على هذه الصفحة.",
              )}
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
