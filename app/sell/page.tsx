"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useLanguage } from "@/lib/language-context"
import { toast } from "sonner"
import { Camera, CheckCircle2, X } from "lucide-react"

export default function SellPage() {
  const { t, dir } = useLanguage()
  const router = useRouter()
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [images, setImages] = useState<File[]>([])
  const [previews, setPreviews] = useState<string[]>([])
  const [formData, setFormData] = useState({
    type: "Voiture",
    title: "",
    brand: "",
    model: "",
    year: "",
    city: "",
    price: "",
    mileage: "",
    fuel: "Diesel",
    description: "",
    whatsapp: ""
  })

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length + images.length > 6) {
      toast.error(t("Maximum 6 images", "حد أقصى 6 صور"))
      return
    }

    const validFiles = files.filter(file => {
      if (!file.type.startsWith('image/')) {
        toast.error(`${file.name}: ${t("Format non supporté", "صيغة غير مدعومة")}`)
        return false
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error(`${file.name}: ${t("Fichier trop volumineux (max 5MB)", "الملف كبير جداً (أقصى حد 5 ميجابايت)")}`)
        return false
      }
      return true
    })

    setImages(prev => [...prev, ...validFiles])
    
    const newPreviews = validFiles.map(file => URL.createObjectURL(file))
    setPreviews(prev => [...prev, ...newPreviews])
  }

  const removeImage = (index: number) => {
    URL.revokeObjectURL(previews[index])
    setImages(prev => prev.filter((_, i) => i !== index))
    setPreviews(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (images.length === 0) {
      toast.error(t("Au moins une image est obligatoire.", "إضافة صورة واحدة على الأقل ضرورية."))
      return
    }

    setLoading(true)

    try {
      // 1. Upload images
      const uploadData = new FormData()
      images.forEach(image => uploadData.append('images', image))

      const uploadRes = await fetch('/api/upload', {
        method: 'POST',
        body: uploadData
      })

      if (!uploadRes.ok) throw new Error('Upload failed')
      const { urls } = await uploadRes.json()

      // 2. Submit listing with uploaded URLs
      const res = await fetch('/api/listings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          ...formData,
          images: urls,
          category: formData.type === "Voiture" ? "car" : "motorcycle"
        })
      })

      if (res.ok) {
        setIsSubmitted(true)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        toast.error(t("Erreur lors de la soumission", "خطأ أثناء الإرسال"))
      }
    } catch (err) {
      toast.error(t("Erreur de connexion", "خطأ في الاتصال"))
    } finally {
      setLoading(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center p-4">
          <div className="max-w-md w-full text-center space-y-6 animate-in fade-in zoom-in duration-500">
            <div className="flex justify-center">
              <CheckCircle2 className="h-20 w-20 text-green-500" />
            </div>
            <h1 className="text-3xl font-black">{t("Annonce Envoyée !", "تم إرسال الإعلان!")}</h1>
            <p className="text-muted-foreground text-lg">
              {t(
                "Votre annonce est en cours de révision par notre équipe. Elle sera publiée dès qu'elle sera validée.",
                "إعلانك قيد المراجعة من قبل فريقنا. سيتم نشره بمجرد الموافقة عليه."
              )}
            </p>
            <Button onClick={() => router.push('/')} className="w-full h-12 text-lg font-bold">
              {t("Retour à l'accueil", "العودة للرئيسية")}
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 py-12 lg:py-20" dir={dir}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h1 className="text-4xl lg:text-6xl font-black tracking-tighter mb-4">
              {t("Publier une annonce", "نشر إعلان")}
              <span className="text-accent">.</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              {t("Vendez votre véhicule rapidement au meilleur prix.", "بع مركبتك بسرعة وبأفضل ثمن.")}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8 bg-card p-6 lg:p-10 rounded-3xl border border-border">
            {/* Vehicle Type */}
            <div className="space-y-4">
              <Label className="text-lg font-bold">{t("Type de véhicule", "نوع المركبة")}</Label>
              <RadioGroup 
                defaultValue="Voiture" 
                onValueChange={(v) => setFormData({...formData, type: v})}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2 bg-secondary/50 px-4 py-3 rounded-xl border border-border cursor-pointer hover:border-accent transition-colors">
                  <RadioGroupItem value="Voiture" id="voiture" />
                  <Label htmlFor="voiture" className="cursor-pointer">{t("Voiture", "سيارة")}</Label>
                </div>
                <div className="flex items-center space-x-2 bg-secondary/50 px-4 py-3 rounded-xl border border-border cursor-pointer hover:border-accent transition-colors">
                  <RadioGroupItem value="Moto" id="moto" />
                  <Label htmlFor="moto" className="cursor-pointer">{t("Moto", "دراجة نارية")}</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title">{t("Titre de l'annonce", "عنوان الإعلان")}</Label>
                <Input 
                  id="title" required 
                  placeholder="ex: Golf 7 R-Line"
                  value={formData.title} 
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="bg-secondary/30 border-border h-12"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="brand">{t("Marque", "العلامة التجارية")}</Label>
                <Input 
                  id="brand" required 
                  placeholder="ex: Volkswagen"
                  value={formData.brand} 
                  onChange={(e) => setFormData({...formData, brand: e.target.value})}
                  className="bg-secondary/30 border-border h-12"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="model">{t("Modèle", "الموديل")}</Label>
                <Input 
                  id="model" required 
                  placeholder="ex: Golf"
                  value={formData.model} 
                  onChange={(e) => setFormData({...formData, model: e.target.value})}
                  className="bg-secondary/30 border-border h-12"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="year">{t("Année", "السنة")}</Label>
                <Input 
                  id="year" required type="number"
                  placeholder="ex: 2020"
                  value={formData.year} 
                  onChange={(e) => setFormData({...formData, year: e.target.value})}
                  className="bg-secondary/30 border-border h-12"
                />
              </div>
            </div>

            {/* Technical Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="city">{t("Ville", "المدينة")}</Label>
                <Input 
                  id="city" required 
                  placeholder="ex: Casablanca"
                  value={formData.city} 
                  onChange={(e) => setFormData({...formData, city: e.target.value})}
                  className="bg-secondary/30 border-border h-12"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fuel">{t("Carburant", "الوقود")}</Label>
                <select 
                  id="fuel"
                  className="flex h-12 w-full rounded-md border border-border bg-secondary/30 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
                  value={formData.fuel}
                  onChange={(e) => setFormData({...formData, fuel: e.target.value})}
                  disabled={formData.type === "Moto"}
                >
                  <option value="Diesel">Diesel</option>
                  <option value="Essence">Essence</option>
                  <option value="Hybride">Hybride</option>
                  <option value="Electrique">Electrique</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">{t("Prix (DH)", "الثمن (درهم)")}</Label>
                <Input 
                  id="price" required type="number"
                  placeholder="ex: 150000"
                  value={formData.price} 
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  className="bg-secondary/30 border-border h-12"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mileage">{t("Kilométrage (km)", "المسافة المقطوعة (كلم)")}</Label>
                <Input 
                  id="mileage" required type="number"
                  placeholder="ex: 50000"
                  value={formData.mileage} 
                  onChange={(e) => setFormData({...formData, mileage: e.target.value})}
                  className="bg-secondary/30 border-border h-12"
                />
              </div>
            </div>

            {/* Photos Section */}
            <div className="space-y-4">
              <Label className="text-lg font-bold">{t("Photos", "الصور")}</Label>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {previews.map((url, index) => (
                  <div key={index} className="relative aspect-square rounded-2xl overflow-hidden border border-border group">
                    <img src={url} alt="Preview" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 bg-red-600 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                
                {images.length < 6 && (
                  <label className="aspect-square border-2 border-dashed border-border rounded-2xl flex flex-col items-center justify-center gap-2 hover:border-accent cursor-pointer bg-secondary/10 transition-colors">
                    <Camera className="h-8 w-8 text-muted-foreground" />
                    <span className="text-xs font-bold text-muted-foreground">{t("Ajouter", "إضافة")}</span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </label>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                {t("Max 6 photos. Max 5MB par image.", "حد أقصى 6 صور. 5 ميجابايت للصورة كحد أقصى.")}
              </p>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">{t("Description", "الوصف")}</Label>
              <Textarea 
                id="description" required 
                placeholder={t("Détaillez l'état de votre véhicule...", "فصل حالة مركبتك...")}
                value={formData.description} 
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="bg-secondary/30 border-border min-h-[150px] rounded-2xl"
              />
            </div>

            {/* Contact */}
            <div className="space-y-2">
              <Label htmlFor="whatsapp">{t("Numéro WhatsApp", "رقم الواتساب")}</Label>
              <Input 
                id="whatsapp" required 
                placeholder="ex: 212612345678"
                value={formData.whatsapp} 
                onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                className="bg-secondary/30 border-border h-12"
              />
              <p className="text-xs text-muted-foreground">
                {t("Incluez l'indicatif pays (ex: 212)", "أضف رمز الدولة (مثال: 212)")}
              </p>
            </div>

            <Button type="submit" className="w-full h-14 text-lg font-black bg-accent hover:bg-accent/90 text-foreground" disabled={loading}>
              {loading ? t("Envoi en cours...", "جاري الإرسال...") : t("Publier l'annonce", "نشر الإعلان")}
            </Button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  )
}
