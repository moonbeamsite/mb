import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Pencil, Trash2, Star } from "lucide-react";
import { useDishes, useCreateDish, useUpdateDish, useDeleteDish, Dish } from "@/hooks/useAdmin";

export const AdminDishes = () => {
  const { data: dishes, isLoading } = useDishes();
  const createDish = useCreateDish();
  const updateDish = useUpdateDish();
  const deleteDish = useDeleteDish();
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingDish, setEditingDish] = useState<Dish | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    original_price: 0,
    discount_text: "",
    image_url: "",
    category: "",
    is_featured: false,
    is_available: true,
  });

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: 0,
      original_price: 0,
      discount_text: "",
      image_url: "",
      category: "",
      is_featured: false,
      is_available: true,
    });
    setEditingDish(null);
  };

  const handleEdit = (dish: Dish) => {
    setEditingDish(dish);
    setFormData({
      name: dish.name,
      description: dish.description || "",
      price: dish.price,
      original_price: dish.original_price || 0,
      discount_text: dish.discount_text || "",
      image_url: dish.image_url || "",
      category: dish.category || "",
      is_featured: dish.is_featured,
      is_available: dish.is_available,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const dishData = {
      ...formData,
      original_price: formData.original_price || null,
      discount_text: formData.discount_text || null,
      image_url: formData.image_url || null,
      category: formData.category || null,
      description: formData.description || null,
    };

    if (editingDish) {
      await updateDish.mutateAsync({ id: editingDish.id, ...dishData });
    } else {
      await createDish.mutateAsync(dishData);
    }
    
    setIsDialogOpen(false);
    resetForm();
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this dish?")) {
      await deleteDish.mutateAsync(id);
    }
  };

  const toggleFeatured = async (dish: Dish) => {
    await updateDish.mutateAsync({ id: dish.id, is_featured: !dish.is_featured });
  };

  if (isLoading) return <div className="text-center py-8">Loading dishes...</div>;

  return (
    <Card className="border-lavender/30">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-royal">Manage Dishes</CardTitle>
        <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) resetForm(); }}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-lavender to-royal">
              <Plus className="w-4 h-4 mr-2" /> Add Dish
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingDish ? "Edit Dish" : "Add New Dish"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="price">Price (₹) *</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="original_price">Original Price (₹)</Label>
                  <Input
                    id="original_price"
                    type="number"
                    value={formData.original_price}
                    onChange={(e) => setFormData({ ...formData, original_price: Number(e.target.value) })}
                  />
                </div>
                <div>
                  <Label htmlFor="discount_text">Discount Text</Label>
                  <Input
                    id="discount_text"
                    value={formData.discount_text}
                    onChange={(e) => setFormData({ ...formData, discount_text: e.target.value })}
                    placeholder="e.g., 20% OFF"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="image_url">Image URL</Label>
                <Input
                  id="image_url"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  placeholder="https://..."
                />
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Switch
                    id="is_featured"
                    checked={formData.is_featured}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_featured: checked })}
                  />
                  <Label htmlFor="is_featured">Featured in Today's Special</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    id="is_available"
                    checked={formData.is_available}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_available: checked })}
                  />
                  <Label htmlFor="is_available">Available</Label>
                </div>
              </div>
              <Button type="submit" className="w-full bg-gradient-to-r from-lavender to-royal">
                {editingDish ? "Update Dish" : "Create Dish"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Featured</TableHead>
              <TableHead>Available</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dishes?.map((dish) => (
              <TableRow key={dish.id}>
                <TableCell className="font-medium">{dish.name}</TableCell>
                <TableCell>{dish.category || "-"}</TableCell>
                <TableCell>₹{dish.price}</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleFeatured(dish)}
                    className={dish.is_featured ? "text-amber-500" : "text-muted-foreground"}
                  >
                    <Star className={`w-4 h-4 ${dish.is_featured ? "fill-amber-500" : ""}`} />
                  </Button>
                </TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${dish.is_available ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                    {dish.is_available ? "Yes" : "No"}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" onClick={() => handleEdit(dish)}>
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(dish.id)} className="text-destructive">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {(!dishes || dishes.length === 0) && (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                  No dishes found. Add your first dish!
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
