"use client"

import Link from "next/link"
import { Instagram, Facebook, Youtube } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function Footer() {
  const { t, dir } = useLanguage()

  return (
    <footer className="bg-card border-t border-border" dir={dir}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="text-2xl font-black tracking-tighter text-foreground">
              MOTO<span className="text-accent">0</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              {t(
                "La marketplace de référence pour les véhicules d'occasion au Maroc. Vendeurs vérifiés dans tout le Royaume.",
                "السوق المرجعي للسيارات المستعملة في المغرب. بائعون موثوقون في جميع أنحاء المملكة.",
              )}
            </p>
            <div className="flex items-center gap-4 mt-6">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Marketplace */}
          <div>
            <h4 className="text-sm font-bold text-foreground uppercase tracking-wider mb-4">{t("Marché", "السوق")}</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {t("Parcourir les annonces", "تصفح الإعلانات")}
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {t("Publier une annonce", "نشر إعلان")}
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {t("Concessionnaires", "الوكلاء")}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-foreground uppercase tracking-wider mb-4">
              {t("Entreprise", "الشركة")}
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {t("À propos", "من نحن")}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {t("Contact", "اتصل بنا")}
                </Link>
              </li>
              <li>
                <Link href="/safety" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {t("Conseils de sécurité", "نصائح السلامة")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-foreground uppercase tracking-wider mb-4">{t("Aide", "المساعدة")}</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {t("Centre d'aide", "مركز المساعدة")}
                </a>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {t("Conditions d'utilisation", "شروط الاستخدام")}
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {t("Politique de confidentialité", "سياسة الخصوصية")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground text-center leading-relaxed">
            {t(
              "Moto0.com est une plateforme d'annonces et n'est pas responsable des transactions entre utilisateurs.",
              "Moto0.com منصة إعلانات ولا تتحمل مسؤولية المعاملات بين المستخدمين.",
            )}
          </p>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2026 MOTO0. {t("Tous droits réservés.", "جميع الحقوق محفوظة.")}
          </p>
          <div className="flex items-center gap-6">
            <Link href="/terms" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              {t("Conditions", "الشروط")}
            </Link>
            <Link href="/privacy" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              {t("Confidentialité", "الخصوصية")}
            </Link>
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              {t("Cookies", "ملفات تعريف الارتباط")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
