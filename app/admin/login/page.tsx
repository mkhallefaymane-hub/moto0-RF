"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { toast } from "sonner"
import { useLanguage } from "@/lib/language-context"

export default function AdminLoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { t } = useLanguage()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })

      if (res.ok) {
        toast.success(t("Connexion réussie", "تم تسجيل الدخول بنجاح"))
        router.push('/admin')
      } else {
        const data = await res.json()
        toast.error(data.message || t("Identifiants invalides", "بيانات الاعتماد غير صالحة"))
      }
    } catch (err) {
      toast.error(t("Erreur de connexion", "خطأ في الاتصال"))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">{t("Administration", "الإدارة")}</CardTitle>
            <CardDescription>
              {t("Veuillez vous connecter pour accéder au tableau de bord", "يرجى تسجيل الدخول للوصول إلى لوحة التحكم")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">{t("Nom d'utilisateur", "اسم المستخدم")}</Label>
                <Input 
                  id="username" 
                  required 
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="aymanemkh"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">{t("Mot de passe", "كلمة المرور")}</Label>
                <Input 
                  id="password" 
                  type="password" 
                  required 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? t("Connexion...", "جاري الاتصال...") : t("Se connecter", "تسجيل الدخول")}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  )
}
