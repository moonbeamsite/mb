-- Create menu_images table for storing menu flipbook images
CREATE TABLE IF NOT EXISTS public.menu_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url TEXT NOT NULL,
  page_order INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.menu_images ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can view menu images"
ON public.menu_images FOR SELECT USING (true);

CREATE POLICY "Admins can manage menu images"
ON public.menu_images FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Create trigger for updated_at
CREATE TRIGGER update_menu_images_updated_at
BEFORE UPDATE ON public.menu_images
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default menu images
INSERT INTO public.menu_images (image_url, page_order) VALUES
('https://images.unsplash.com/photo-1544025162-d76694265947?w=800&h=1200&fit=crop&crop=center', 1),
('https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&h=1200&fit=crop&crop=center', 2),
('https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&h=1200&fit=crop&crop=center', 3),
('https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&h=1200&fit=crop&crop=center', 4),
('https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=800&h=1200&fit=crop&crop=center', 5),
('https://images.unsplash.com/photo-1565299585323-38174c4a6471?w=800&h=1200&fit=crop&crop=center', 6);