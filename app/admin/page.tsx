"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/lib/language-context"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { supabase } from "@/lib/supabaseClient"

export default function AdminPage() {
  const [data, setData] = useState<any>({ listings: [], trends: [] })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [newTrend, setNewTrend] = useState({ titleFr: "", titleAr: "", url: "", platform: "YouTube" })

  const router = useRouter()
  const { t } = useLanguage()

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' })
      toast.success(t("Déconnecté", "تم تسجيل الخروج"))
      router.push('/admin/login')
    } catch (err) {
      toast.error("Logout failed")
    }
  }

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL && !process.env.SUPABASE_URL) {
      setError("Configuration error: Supabase URL is missing.")
      setLoading(false)
      return
    }
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setError(null)
      const { data: listings, error: listingsError } = await supabase
        .from("listings")
        .select("*")
        .order("created_at", { ascending: false })
      
      if (listingsError) throw listingsError

      setData({ trends: [], listings: listings || [] })
    } catch (err: any) {
      console.error("Fetch error:", err)
      setError(err.message || "Failed to load data")
      toast.error("Failed to load admin data")
    } finally {
      setLoading(false)
    }
  }

  const updateListingStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from("listings")
        .update({ status })
        .eq("id", id)
      
      if (error) throw error
      
      toast.success(`Status updated to ${status}`)
      fetchData()
    } catch (err: any) {
      toast.error("Update failed: " + err.message)
    }
  }

  const deleteListing = async (id: string) => {
    if (!confirm("Are you sure you want to delete this listing?")) return
    try {
      const { error } = await supabase
        .from("listings")
        .delete()
        .eq("id", id)
      
      if (error) throw error
      
      toast.success("Listing deleted")
      fetchData()
    } catch (err: any) {
      toast.error("Delete failed: " + err.message)
    }
  }

  const addTrend = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/admin', {
        method: 'POST',
        body: JSON.stringify({ type: 'add_trend', trend: newTrend })
      })
      if (res.ok) {
        toast.success("Trend added")
        setNewTrend({ titleFr: "", titleAr: "", url: "", platform: "YouTube" })
        fetchData()
      }
    } catch (err) {
      toast.error("Add failed")
    }
  }

  const deleteTrend = async (id: string) => {
    try {
      const res = await fetch('/api/admin', {
        method: 'POST',
        body: JSON.stringify({ type: 'delete_trend', id })
      })
      if (res.ok) {
        toast.success("Trend deleted")
        fetchData()
      }
    } catch (err) {
      toast.error("Delete failed")
    }
  }

  if (loading) return <div className="p-20 text-center">Loading Admin...</div>
  if (error) return (
    <div className="p-20 text-center space-y-4">
      <div className="text-destructive font-bold text-xl">Error</div>
      <p className="text-muted-foreground">{error}</p>
      <Button onClick={fetchData}>Retry</Button>
    </div>
  )

  const allListings = data.listings || []

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <Button variant="outline" onClick={handleLogout}>{t("Déconnexion", "تسجيل الخروج")}</Button>
        </div>
        
        <Tabs defaultValue="listings">
          <TabsList className="mb-8">
            <TabsTrigger value="listings">Listings Moderation</TabsTrigger>
            <TabsTrigger value="trends">Trends Manager</TabsTrigger>
          </TabsList>

          <TabsContent value="listings">
            <Card>
              <CardHeader>
                <CardTitle>Moderate Listings</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>City</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {allListings.map((listing: any) => {
                      const status = listing.status || "PENDING"
                      const details = listing.payload || listing
                      return (
                        <TableRow key={listing.id}>
                          <TableCell>{details.title}</TableCell>
                          <TableCell>{details.city}</TableCell>
                          <TableCell>{details.price} DH</TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                              status === 'APPROVED' ? 'bg-green-500/20 text-green-500' :
                              status === 'REJECTED' ? 'bg-red-500/20 text-red-500' :
                              status === 'SOLD' ? 'bg-blue-500/20 text-blue-500' :
                              'bg-yellow-500/20 text-yellow-500'
                            }`}>
                              {status}
                            </span>
                          </TableCell>
                          <TableCell className="space-x-2">
                            <Button size="sm" variant="outline" onClick={() => updateListingStatus(listing.id, 'APPROVED')}>Approve</Button>
                            <Button size="sm" variant="outline" onClick={() => updateListingStatus(listing.id, 'REJECTED')}>Reject</Button>
                            <Button size="sm" variant="outline" onClick={() => updateListingStatus(listing.id, 'SOLD')}>Mark Sold</Button>
                            <Button size="sm" variant="destructive" onClick={() => deleteListing(listing.id)}>Delete</Button>
                            <Button size="sm" variant="ghost" onClick={() => updateListingStatus(listing.id, 'PENDING')}>Reset</Button>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trends">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Existing Videos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {data.trends.map((trend: any) => (
                      <div key={trend.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-bold">{trend.titleFr}</p>
                          <p className="text-xs text-muted-foreground">{trend.url}</p>
                        </div>
                        <Button variant="destructive" size="sm" onClick={() => deleteTrend(trend.id)}>Delete</Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Add New Video</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={addTrend} className="space-y-4">
                    <div className="grid gap-2">
                      <Label>Title (FR)</Label>
                      <Input required value={newTrend.titleFr} onChange={e => setNewTrend({...newTrend, titleFr: e.target.value})} />
                    </div>
                    <div className="grid gap-2">
                      <Label>Title (AR)</Label>
                      <Input required value={newTrend.titleAr} onChange={e => setNewTrend({...newTrend, titleAr: e.target.value})} />
                    </div>
                    <div className="grid gap-2">
                      <Label>Video URL</Label>
                      <Input required type="url" value={newTrend.url} onChange={e => setNewTrend({...newTrend, url: e.target.value})} />
                    </div>
                    <div className="grid gap-2">
                      <Label>Platform</Label>
                      <select 
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        value={newTrend.platform} 
                        onChange={e => setNewTrend({...newTrend, platform: e.target.value})}
                      >
                        <option>YouTube</option>
                        <option>TikTok</option>
                        <option>Instagram</option>
                      </select>
                    </div>
                    <Button type="submit" className="w-full">Add Video</Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  )
}
