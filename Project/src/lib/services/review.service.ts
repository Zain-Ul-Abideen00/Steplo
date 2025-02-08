import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";

const supabase = createClient();

export interface ProductReview {
  id: string;
  product_id: string;
  user_id: string;
  user_name: string;
  rating: number;
  review_text: string;
  created_at: string;
  images: string[];
  is_verified_purchase?: boolean;
  helpful_count?: number;
}

export const reviewService = {
  async uploadImages(files: File[]): Promise<string[]> {
    const uploadPromises = files.map(async (file) => {
      try {
        const fileExt = file.name.split(".").pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `review-images/${fileName}`;

        // Upload the file
        const { error: uploadError } = await supabase.storage
          .from("reviews")
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        // Store only the path, not the full URL
        return filePath;
      } catch (error) {
        console.error("Error in image upload:", error);
        throw error;
      }
    });

    return Promise.all(uploadPromises);
  },

  async addReview(
    user: User,
    productId: string,
    rating: number,
    reviewText: string,
    images: File[] = []
  ): Promise<void> {
    let imagePaths: string[] = [];

    if (images.length > 0) {
      imagePaths = await this.uploadImages(images);
    }

    const { error } = await supabase.from("product_reviews").insert({
      product_id: productId,
      user_id: user.id,
      user_name: user.user_metadata.full_name || user.email,
      rating,
      review_text: reviewText,
      images: imagePaths,
    });

    if (error) throw error;
  },

  async getProductReviews(productId: string): Promise<ProductReview[]> {
    const { data, error } = await supabase
      .from("product_reviews")
      .select("*")
      .eq("product_id", productId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async getAverageRating(productId: string): Promise<number> {
    const { data, error } = await supabase
      .from("product_reviews")
      .select("rating")
      .eq("product_id", productId);

    if (error) throw error;
    if (!data?.length) return 0;

    const average =
      data.reduce((acc, curr) => acc + curr.rating, 0) / data.length;
    return Number(average.toFixed(1));
  },

  async getLikeCounts(reviewIds: string[]): Promise<{ [key: string]: number }> {
    try {
      const { data, error } = await supabase
        .from("review_likes")
        .select("review_id")
        .in("review_id", reviewIds);

      if (error) throw error;

      const counts: { [key: string]: number } = {};
      data.forEach((like) => {
        counts[like.review_id] = (counts[like.review_id] || 0) + 1;
      });

      return counts;
    } catch (error) {
      console.error("Error fetching like counts:", error);
      return {};
    }
  },
};
