import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Dish {
  id: string;
  name: string;
  description: string | null;
  price: number;
  original_price: number | null;
  discount_text: string | null;
  image_url: string | null;
  category: string | null;
  is_featured: boolean | null;
  is_available: boolean | null;
}

export interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  category: string | null;
  is_featured: boolean | null;
  is_available: boolean | null;
  stock_quantity: number | null;
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  cover_image: string | null;
  is_published: boolean | null;
  published_at: string | null;
  created_at: string | null;
}

export interface JournalEntry {
  id: string;
  title: string;
  entry_date: string | null;
  excerpt: string | null;
  content: string | null;
  image_url: string | null;
  is_featured: boolean | null;
  is_published: boolean | null;
}

// Fetch all available dishes
export const usePublicDishes = () => {
  return useQuery({
    queryKey: ["public-dishes"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("dishes")
        .select("*")
        .eq("is_available", true)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as Dish[];
    },
  });
};

// Fetch featured dishes for Today's Special
export const useFeaturedDishes = () => {
  return useQuery({
    queryKey: ["featured-dishes"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("dishes")
        .select("*")
        .eq("is_featured", true)
        .eq("is_available", true)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as Dish[];
    },
  });
};

// Fetch all available products
export const usePublicProducts = () => {
  return useQuery({
    queryKey: ["public-products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("is_available", true)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as Product[];
    },
  });
};

// Fetch featured products for Organic Treasures
export const useFeaturedProducts = () => {
  return useQuery({
    queryKey: ["featured-products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("is_featured", true)
        .eq("is_available", true)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as Product[];
    },
  });
};

// Fetch published blogs
export const usePublicBlogs = () => {
  return useQuery({
    queryKey: ["public-blogs"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("is_published", true)
        .order("published_at", { ascending: false });
      if (error) throw error;
      return data as Blog[];
    },
  });
};

// Fetch published journal entries
export const usePublicJournalEntries = () => {
  return useQuery({
    queryKey: ["public-journal-entries"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("journal_entries")
        .select("*")
        .eq("is_published", true)
        .order("entry_date", { ascending: false });
      if (error) throw error;
      return data as JournalEntry[];
    },
  });
};

// Fetch featured journal entries for carousel
export const useFeaturedJournalEntries = () => {
  return useQuery({
    queryKey: ["featured-journal-entries"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("journal_entries")
        .select("*")
        .eq("is_featured", true)
        .eq("is_published", true)
        .order("entry_date", { ascending: false })
        .limit(5);
      if (error) throw error;
      return data as JournalEntry[];
    },
  });
};
