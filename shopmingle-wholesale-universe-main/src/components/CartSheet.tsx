import { useState } from "react";
import { ShoppingCart, Plus, Minus, Trash2, FileDown, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from "@/components/ui/sheet";
import { useCart } from "@/context/CartContext";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

export default function CartSheet() {
  const { items, totalItems, totalAmount, updateQuantity, removeFromCart, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const handleCheckout = async () => {
    if (items.length === 0) return;
    setIsProcessing(true);
    
    try {
      // 1. Save order to Supabase
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert([{ total_amount: totalAmount, status: 'completed' }])
        .select()
        .single();
        
      if (orderError) {
        console.error("Order save error:", orderError);
        toast.warning("Proceeding with local checkout (Database schema missing or unauthorized).");
      } else if (orderData) {
        // 2. Save order items
        const orderItems = items.map(item => ({
          order_id: orderData.id,
          product_id: item.id.length > 10 ? item.id : undefined, // Fallback IDs may not be UUIDs
          quantity: item.quantity,
          price: item.price
        }));
        
        try {
          await supabase.from('order_items').insert(orderItems.filter(i => i.product_id));
        } catch(e) { console.log('Item insert skipped for fake data') }
      }

      setOrderComplete(true);
      toast.success("Order placed successfully! Delivery within 30 minutes.");
    } catch (error) {
      console.error("Unexpected checkout error:", error);
      toast.error("Checkout failed, but you can retry.");
    } finally {
      setIsProcessing(false);
    }
  };

  const generatePDF = async () => {
    const receiptEl = document.getElementById("receipt-content");
    if (!receiptEl) return;
    
    try {
      const canvas = await html2canvas(receiptEl);
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`shopmingle-receipt.pdf`);
      toast.success("Receipt downloaded!");
      
      // Reset after download
      setOrderComplete(false);
      clearCart();
    } catch (error) {
      toast.error("Failed to generate PDF");
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative group">
          <ShoppingCart className="w-5 h-5 group-hover:text-gold transition-colors" />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-gradient-gold text-[10px] font-bold flex items-center justify-center text-accent-foreground">
              {totalItems}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md flex flex-col h-full bg-background border-l border-border/50">
        <SheetHeader>
          <SheetTitle className="font-display text-xl border-b border-border pb-4">
            Your Cart {totalItems > 0 && `(${totalItems} items)`}
          </SheetTitle>
        </SheetHeader>

        {orderComplete ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-bold font-display mb-2 text-foreground">Order Successful!</h3>
              <p className="text-muted-foreground text-sm">
                Your order will be delivered under 30 mins.
              </p>
            </div>
            
            {/* Hidden Receipt Element for PDF Generation */}
            <div className="absolute left-[-9999px] top-[-9999px]">
              <div id="receipt-content" className="p-8 bg-white text-black w-[600px] border border-gray-200">
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold text-gray-900 border-b-2 border-gray-900 pb-4">ShopMingle Receipt</h1>
                  <p className="text-gray-600 mt-2">Delivery under 30 mins constraint fulfilled.</p>
                </div>
                <table className="w-full mb-8 text-left">
                  <thead className="border-b border-gray-300">
                    <tr>
                      <th className="py-2">Item</th>
                      <th className="py-2">Qty</th>
                      <th className="py-2 text-right">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => (
                      <tr key={item.id} className="border-b border-gray-100">
                        <td className="py-3">{item.name}</td>
                        <td className="py-3">{item.quantity}</td>
                        <td className="py-3 text-right">₹{item.price * item.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="flex justify-end pt-4 border-t border-gray-300">
                  <div className="w-64">
                    <div className="flex justify-between font-bold text-xl">
                      <span>Total</span>
                      <span>₹{totalAmount}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-12 text-center text-sm text-gray-500">
                  Thank you for shopping at ShopMingle!
                </div>
              </div>
            </div>

            <Button onClick={generatePDF} className="w-full bg-primary hover:bg-gold text-white flex items-center gap-2">
              <FileDown className="w-4 h-4" /> Download Receipt as PDF
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto py-4 scrollbar-thin">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
                  <ShoppingCart className="w-12 h-12 mb-4 opacity-20" />
                  <p>Your cart is empty.</p>
                </div>
              ) : (
                <div className="space-y-4 pr-1">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4 bg-muted/30 p-3 rounded-xl border border-border/50">
                      <div className="w-16 h-16 rounded-md bg-white overflow-hidden flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="font-medium text-sm line-clamp-1">{item.name}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="font-display font-bold text-sm">₹{item.price}</span>
                            <span className="text-xs text-muted-foreground line-through">₹{item.mrp}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-2 bg-background border border-border rounded-lg">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 rounded-lg"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus className="h-3 h-3" />
                            </Button>
                            <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 rounded-lg"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-3 h-3" />
                            </Button>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-7 w-7 text-red-500 hover:text-red-600 hover:bg-red-500/10"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {items.length > 0 && (
              <SheetFooter className="border-t border-border pt-4 sm:flex-col sm:space-x-0 w-full gap-4">
                <div className="w-full bg-muted/50 p-4 rounded-xl border border-border space-y-2">
                  <div className="flex justify-between text-sm text-foreground">
                    <span>Subtotal</span>
                    <span>₹{totalAmount}</span>
                  </div>
                  <div className="flex justify-between text-sm text-green-500">
                    <span>Discount</span>
                    <span>-₹{items.reduce((acc, item) => acc + (item.mrp - item.price) * item.quantity, 0)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground border-b border-border/50 pb-2">
                    <span>Delivery</span>
                    <span className="text-green-500 uppercase text-xs font-bold tracking-wider">Free (Under 30m)</span>
                  </div>
                  <div className="flex justify-between font-display font-bold text-lg pt-1">
                    <span>Total</span>
                    <span>₹{totalAmount}</span>
                  </div>
                </div>
                <Button 
                  onClick={handleCheckout} 
                  disabled={isProcessing} 
                  className="w-full bg-gradient-gold text-accent-foreground font-semibold h-12 text-base hover:opacity-90 shadow-lg"
                >
                  {isProcessing ? "Processing..." : "Checkout & Pay"}
                </Button>
              </SheetFooter>
            )}
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
