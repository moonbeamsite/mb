import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, Package, ShoppingBag } from "lucide-react";

const Checkout = () => {
  const navigate = useNavigate();
  const { items, total, subtotal, clearCart } = useCart();
  const { user, profile } = useAuth();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    pincode: "",
    deliveryType: "delivery",
    paymentMethod: "cod",
  });

  useEffect(() => {
    if (!user) {
      navigate(`/auth?redirect=/checkout`);
      return;
    }

    if (items.length === 0) {
      navigate("/cart");
      return;
    }

    if (profile) {
      setFormData((prev) => ({
        ...prev,
        fullName: `${profile.first_name || ""} ${profile.last_name || ""}`.trim(),
        email: profile.email || "",
        phone: profile.phone || "",
      }));
    }
  }, [user, profile, items, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);

    try {
      const deliveryCharge = formData.deliveryType === "delivery" ? 50 : 0;
      const finalTotal = subtotal + deliveryCharge;

      // Create order
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert({
          user_id: user.id,
          full_name: formData.fullName,
          phone: formData.phone,
          email: formData.email,
          address_line1: formData.addressLine1,
          address_line2: formData.addressLine2,
          city: formData.city,
          pincode: formData.pincode,
          delivery_type: formData.deliveryType,
          payment_method: formData.paymentMethod,
          subtotal,
          delivery_charge: deliveryCharge,
          total: finalTotal,
          status: "placed",
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = items.map((item) => ({
        order_id: order.id,
        item_id: item.id.toString(),
        item_type: item.type,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        line_total: item.price * item.quantity,
        image: item.image,
        category: item.category,
      }));

      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(orderItems);

      if (itemsError) throw itemsError;

      clearCart();
      toast.success("Order placed successfully!");
      navigate(`/account?order=${order.id}`);
    } catch (error: any) {
      console.error("Order error:", error);
      toast.error("Failed to place order", { description: error.message });
    } finally {
      setLoading(false);
    }
  };

  const kitchenItems = items.filter((item) => item.type === "dish");
  const storeItems = items.filter((item) => item.type === "product");
  const deliveryCharge = formData.deliveryType === "delivery" ? 50 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-lavender-light/5 to-royal/5">
      <Navigation />

      <div className="container mx-auto px-4 pt-32 pb-16">
        <h1 className="text-5xl md:text-6xl font-bold mb-12 text-center glow-lavender">
          Checkout
        </h1>

        <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Details */}
            <Card className="border-2 border-lavender/20 bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-royal">Delivery Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      required
                      className="border-lavender/20 focus:border-lavender"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                      className="border-lavender/20 focus:border-lavender"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="border-lavender/20 focus:border-lavender"
                  />
                </div>

                <RadioGroup
                  value={formData.deliveryType}
                  onValueChange={(value) => setFormData({ ...formData, deliveryType: value })}
                  className="space-y-3"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="delivery" id="delivery" />
                    <Label htmlFor="delivery" className="cursor-pointer">
                      Home Delivery (+₹50)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="pickup" id="pickup" />
                    <Label htmlFor="pickup" className="cursor-pointer">
                      Pickup from Kitchen
                    </Label>
                  </div>
                </RadioGroup>

                {formData.deliveryType === "delivery" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="addressLine1">Address Line 1 *</Label>
                      <Input
                        id="addressLine1"
                        value={formData.addressLine1}
                        onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })}
                        required
                        className="border-lavender/20 focus:border-lavender"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="addressLine2">Address Line 2</Label>
                      <Input
                        id="addressLine2"
                        value={formData.addressLine2}
                        onChange={(e) => setFormData({ ...formData, addressLine2: e.target.value })}
                        className="border-lavender/20 focus:border-lavender"
                      />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City *</Label>
                        <Input
                          id="city"
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          required
                          className="border-lavender/20 focus:border-lavender"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="pincode">Pincode *</Label>
                        <Input
                          id="pincode"
                          value={formData.pincode}
                          onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                          required
                          className="border-lavender/20 focus:border-lavender"
                        />
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card className="border-2 border-lavender/20 bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-royal">Payment Method</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={formData.paymentMethod}
                  onValueChange={(value) => setFormData({ ...formData, paymentMethod: value })}
                  className="space-y-3"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="cod" id="cod" />
                    <Label htmlFor="cod" className="cursor-pointer">
                      Cash on Delivery
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 opacity-50">
                    <RadioGroupItem value="online" id="online" disabled />
                    <Label htmlFor="online" className="cursor-not-allowed">
                      UPI / Online (Coming Soon)
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="border-2 border-lavender/20 bg-card/80 backdrop-blur-sm shadow-mystical sticky top-32">
              <CardHeader>
                <CardTitle className="text-royal">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {kitchenItems.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <ShoppingBag className="w-4 h-4 text-lavender" />
                      <h3 className="font-semibold text-royal">From Kitchen Menu</h3>
                    </div>
                    <div className="space-y-2">
                      {kitchenItems.map((item) => (
                        <div key={`${item.type}-${item.id}`} className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            {item.name} x{item.quantity}
                          </span>
                          <span className="font-semibold">₹{(item.price * item.quantity).toFixed(0)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {storeItems.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Package className="w-4 h-4 text-royal" />
                      <h3 className="font-semibold text-royal">From Organic Store</h3>
                    </div>
                    <div className="space-y-2">
                      {storeItems.map((item) => (
                        <div key={`${item.type}-${item.id}`} className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            {item.name} x{item.quantity}
                          </span>
                          <span className="font-semibold">₹{(item.price * item.quantity).toFixed(0)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="border-t border-lavender/20 pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-semibold">₹{subtotal.toFixed(0)}</span>
                  </div>
                  {deliveryCharge > 0 && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Delivery Charge</span>
                      <span className="font-semibold">₹{deliveryCharge}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-xl font-bold pt-2 border-t border-lavender/20">
                    <span className="text-royal">Total</span>
                    <span className="text-lavender">₹{(subtotal + deliveryCharge).toFixed(0)}</span>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-mystical hover:shadow-lavender h-12 text-lg"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Confirm Order"
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
