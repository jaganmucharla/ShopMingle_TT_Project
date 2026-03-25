-- Supabase Schema for ShopMingle
-- Please execute this query in your Supabase SQL Editor

-- 1. Create Categories Table
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    items_count TEXT NOT NULL,
    discount TEXT NOT NULL,
    image_url TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create Products Table
CREATE TABLE IF NOT EXISTS public.products (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    price NUMERIC NOT NULL,
    mrp NUMERIC NOT NULL,
    rating NUMERIC NOT NULL,
    reviews INTEGER NOT NULL,
    image_url TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Create Orders Table
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    total_amount NUMERIC NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Create Order Items Table
CREATE TABLE IF NOT EXISTS public.order_items (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL,
    price NUMERIC NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Set up Row Level Security (RLS)
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- Create Policies for Anonymous Access (For Demo Purposes)
CREATE POLICY "Allow public read access on categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Allow public read access on products" ON public.products FOR SELECT USING (true);
CREATE POLICY "Allow public insert on orders" ON public.orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public read on orders" ON public.orders FOR SELECT USING (true);
CREATE POLICY "Allow public update on orders" ON public.orders FOR UPDATE USING (true);
CREATE POLICY "Allow public insert on order_items" ON public.order_items FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public read on order_items" ON public.order_items FOR SELECT USING (true);

-- Insert Initial Categories Data
INSERT INTO public.categories (name, items_count, discount, image_url) VALUES 
('Electronics', '50K+ Products', 'Up to 60% off', 'https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&q=80'),
('Fashion', '1L+ Products', 'Up to 70% off', 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80'),
('Home & Kitchen', '80K+ Products', 'Up to 55% off', 'https://images.unsplash.com/photo-1556910103-1c02745a872f?auto=format&fit=crop&q=80'),
('Grocery', '30K+ Products', 'Up to 40% off', 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80'),
('Beauty', '25K+ Products', 'Up to 65% off', 'https://images.unsplash.com/photo-1596462502278-27bf85033e5a?auto=format&fit=crop&q=80'),
('Sports & Fitness', '15K+ Products', 'Up to 50% off', 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80');

-- Insert Initial Products Data
INSERT INTO public.products (name, category, price, mrp, rating, reviews, image_url) VALUES
('Wireless Earbuds Pro', 'Electronics', 899, 2999, 4.5, 2340, 'https://images.unsplash.com/photo-1590658268037-6f1401222b46?auto=format&fit=crop&q=80'),
('Cotton Kurta Set', 'Fashion', 499, 1499, 4.3, 890, 'https://images.unsplash.com/photo-1583391733958-650fac5ni72?auto=format&fit=crop&q=80'),
('Stainless Steel Cooker', 'Kitchen', 1299, 3499, 4.7, 5600, 'https://images.unsplash.com/photo-1584990347449-a6e033bbd575?auto=format&fit=crop&q=80'),
('Organic Honey 1kg', 'Grocery', 299, 799, 4.6, 1200, 'https://images.unsplash.com/photo-1587049352851-8d4e8913411b?auto=format&fit=crop&q=80'),
('Yoga Mat Premium', 'Sports', 599, 1999, 4.4, 780, 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&q=80'),
('Face Serum Vitamin C', 'Beauty', 349, 1299, 4.8, 3400, 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80'),
('Smart Watch Band', 'Electronics', 1999, 5999, 4.5, 4500, 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&q=80'),
('Premium Basmati Rice 5kg', 'Grocery', 449, 899, 4.3, 2100, 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80'),
('Gaming Headphones', 'Electronics', 1499, 3999, 4.6, 1500, 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80'),
('Summer Dress', 'Fashion', 699, 2199, 4.2, 540, 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80');
