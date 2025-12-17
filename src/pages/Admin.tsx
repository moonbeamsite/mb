import { Navigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { useIsAdmin } from "@/hooks/useAdmin";
import { AdminDishes } from "@/components/admin/AdminDishes";
import { AdminProducts } from "@/components/admin/AdminProducts";
import { AdminBlogs } from "@/components/admin/AdminBlogs";
import { AdminJournal } from "@/components/admin/AdminJournal";
import { AdminMenu } from "@/components/admin/AdminMenu";
import { ChefHat, ShoppingBag, FileText, BookOpen, Settings, Loader2, Menu } from "lucide-react";

const Admin = () => {
  const { user, loading: authLoading } = useAuth();
  const { data: isAdmin, isLoading: adminLoading } = useIsAdmin();

  if (authLoading || adminLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-lavender-light/5 to-royal/5 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-lavender" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-lavender-light/5 to-royal/5">
        <Navigation />
        <div className="container mx-auto px-4 py-20">
          <Card className="max-w-md mx-auto border-lavender/30">
            <CardHeader className="text-center">
              <CardTitle className="text-royal">Access Denied</CardTitle>
              <CardDescription>
                You don't have permission to access the admin panel. Please contact an administrator if you believe this is an error.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-lavender-light/5 to-royal/5">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8 pt-24">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Settings className="w-8 h-8 text-lavender" />
            <h1 className="text-4xl font-serif font-bold text-royal">Admin Dashboard</h1>
          </div>
          <p className="text-muted-foreground">
            Manage your dishes, products, blogs, and journal entries
          </p>
        </div>

        <Tabs defaultValue="menu" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:inline-grid bg-lavender/10 border border-lavender/30">
            <TabsTrigger value="menu" className="flex items-center gap-2 data-[state=active]:bg-lavender data-[state=active]:text-primary-foreground">
              <Menu className="w-4 h-4" />
              <span className="hidden sm:inline">Menu</span>
            </TabsTrigger>
            <TabsTrigger value="dishes" className="flex items-center gap-2 data-[state=active]:bg-lavender data-[state=active]:text-primary-foreground">
              <ChefHat className="w-4 h-4" />
              <span className="hidden sm:inline">Dishes</span>
            </TabsTrigger>
            <TabsTrigger value="products" className="flex items-center gap-2 data-[state=active]:bg-lavender data-[state=active]:text-primary-foreground">
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Products</span>
            </TabsTrigger>
            <TabsTrigger value="blogs" className="flex items-center gap-2 data-[state=active]:bg-lavender data-[state=active]:text-primary-foreground">
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">Blogs</span>
            </TabsTrigger>
            <TabsTrigger value="journal" className="flex items-center gap-2 data-[state=active]:bg-lavender data-[state=active]:text-primary-foreground">
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Journal</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="menu">
            <AdminMenu />
          </TabsContent>

          <TabsContent value="dishes">
            <AdminDishes />
          </TabsContent>

          <TabsContent value="products">
            <AdminProducts />
          </TabsContent>

          <TabsContent value="blogs">
            <AdminBlogs />
          </TabsContent>

          <TabsContent value="journal">
            <AdminJournal />
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default Admin;
