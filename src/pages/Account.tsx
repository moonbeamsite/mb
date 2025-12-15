import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Package, ShoppingBag, Calendar, Phone, Mail, MapPin } from "lucide-react";
import { toast } from "sonner";

interface Order {
  id: string;
  created_at: string;
  status: string;
  total: number;
  delivery_type: string;
  full_name: string;
  phone: string;
  email: string;
  address_line1: string | null;
  address_line2: string | null;
  city: string | null;
  pincode: string | null;
  payment_method: string;
}

interface OrderItem {
  id: string;
  item_type: string;
  name: string;
  price: number;
  quantity: number;
  line_total: number;
  category: string | null;
  image: string | null;
}

const Account = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, profile, loading: authLoading } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth?redirect=/account");
      return;
    }

    if (user) {
      fetchOrders();
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    const orderId = searchParams.get("order");
    if (orderId && orders.length > 0) {
      const order = orders.find((o) => o.id === orderId);
      if (order) {
        handleOrderClick(order);
      }
    }
  }, [searchParams, orders]);

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (error: any) {
      toast.error("Failed to load orders", { description: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleOrderClick = async (order: Order) => {
    setSelectedOrder(order);
    try {
      const { data, error } = await supabase
        .from("order_items")
        .select("*")
        .eq("order_id", order.id);

      if (error) throw error;
      setOrderItems(data || []);
    } catch (error: any) {
      toast.error("Failed to load order details", { description: error.message });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "placed":
        return "bg-lavender text-lavender-foreground";
      case "preparing":
        return "bg-royal text-primary-foreground";
      case "delivered":
        return "bg-green-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-lavender-light/5 to-royal/5 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-lavender" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-lavender-light/5 to-royal/5">
      <Navigation />

      <div className="container mx-auto px-4 pt-32 pb-16">
        <div className="mb-12 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 glow-lavender">
            Hello, {profile?.first_name}!
          </h1>
          <p className="text-xl text-muted-foreground">View your orders and order history</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Orders List */}
          <div className="lg:col-span-1 space-y-4">
            <h2 className="text-2xl font-bold text-royal mb-4">Your Orders</h2>
            {orders.length === 0 ? (
              <Card className="border-2 border-lavender/20 bg-card/80 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <p className="text-muted-foreground">No orders yet</p>
                </CardContent>
              </Card>
            ) : (
              orders.map((order) => (
                <Card
                  key={order.id}
                  className={`border-2 bg-card/80 backdrop-blur-sm cursor-pointer transition-all duration-300 ${
                    selectedOrder?.id === order.id
                      ? "border-lavender shadow-mystical"
                      : "border-lavender/20 hover:border-lavender/50"
                  }`}
                  onClick={() => handleOrderClick(order)}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-semibold text-royal">Order #{order.id.slice(0, 8)}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(order.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge className={getStatusColor(order.status)}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </Badge>
                    </div>
                    <p className="text-xl font-bold text-lavender">₹{order.total.toFixed(0)}</p>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          {/* Order Details */}
          <div className="lg:col-span-2">
            {selectedOrder ? (
              <Card className="border-2 border-lavender/20 bg-card/80 backdrop-blur-sm shadow-mystical">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-royal text-2xl">
                        Order #{selectedOrder.id.slice(0, 8)}
                      </CardTitle>
                      <p className="text-muted-foreground flex items-center gap-2 mt-2">
                        <Calendar className="w-4 h-4" />
                        {new Date(selectedOrder.created_at).toLocaleString()}
                      </p>
                    </div>
                    <Badge className={getStatusColor(selectedOrder.status) + " text-lg px-4 py-1"}>
                      {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Items */}
                  <div>
                    <h3 className="font-semibold text-royal mb-4 text-lg">Order Items</h3>
                    <div className="space-y-4">
                      {orderItems.filter((i) => i.item_type === "dish").length > 0 && (
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <ShoppingBag className="w-4 h-4 text-lavender" />
                            <p className="font-medium text-royal">Kitchen Menu</p>
                          </div>
                          {orderItems
                            .filter((item) => item.item_type === "dish")
                            .map((item) => (
                              <div
                                key={item.id}
                                className="flex justify-between items-center p-3 bg-lavender/5 rounded-lg"
                              >
                                <div>
                                  <p className="font-medium">{item.name}</p>
                                  <p className="text-sm text-muted-foreground">
                                    ₹{item.price} × {item.quantity}
                                  </p>
                                </div>
                                <p className="font-bold text-lavender">₹{item.line_total.toFixed(0)}</p>
                              </div>
                            ))}
                        </div>
                      )}

                      {orderItems.filter((i) => i.item_type === "product").length > 0 && (
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <Package className="w-4 h-4 text-royal" />
                            <p className="font-medium text-royal">Organic Store</p>
                          </div>
                          {orderItems
                            .filter((item) => item.item_type === "product")
                            .map((item) => (
                              <div
                                key={item.id}
                                className="flex justify-between items-center p-3 bg-lavender/5 rounded-lg"
                              >
                                <div>
                                  <p className="font-medium">{item.name}</p>
                                  <p className="text-sm text-muted-foreground">
                                    ₹{item.price} × {item.quantity}
                                  </p>
                                </div>
                                <p className="font-bold text-lavender">₹{item.line_total.toFixed(0)}</p>
                              </div>
                            ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Delivery Details */}
                  <div className="border-t border-lavender/20 pt-6">
                    <h3 className="font-semibold text-royal mb-4 text-lg">Delivery Details</h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-lavender mt-1" />
                        <div>
                          <p className="font-medium">{selectedOrder.full_name}</p>
                          {selectedOrder.delivery_type === "delivery" ? (
                            <>
                              <p className="text-sm text-muted-foreground">{selectedOrder.address_line1}</p>
                              {selectedOrder.address_line2 && (
                                <p className="text-sm text-muted-foreground">{selectedOrder.address_line2}</p>
                              )}
                              <p className="text-sm text-muted-foreground">
                                {selectedOrder.city}, {selectedOrder.pincode}
                              </p>
                            </>
                          ) : (
                            <Badge className="bg-lavender/20 text-lavender-foreground">
                              Pickup from Kitchen
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-lavender" />
                        <p>{selectedOrder.phone}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-lavender" />
                        <p>{selectedOrder.email}</p>
                      </div>
                    </div>
                  </div>

                  {/* Payment */}
                  <div className="border-t border-lavender/20 pt-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-muted-foreground">Payment Method</span>
                      <span className="font-medium">
                        {selectedOrder.payment_method === "cod" ? "Cash on Delivery" : "Online"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-xl font-bold mt-4 pt-4 border-t border-lavender/20">
                      <span className="text-royal">Total Paid</span>
                      <span className="text-lavender">₹{selectedOrder.total.toFixed(0)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-2 border-lavender/20 bg-card/80 backdrop-blur-sm">
                <CardContent className="p-12 text-center">
                  <Package className="w-16 h-16 mx-auto text-lavender/50 mb-4" />
                  <p className="text-muted-foreground text-lg">
                    Select an order to view details
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
