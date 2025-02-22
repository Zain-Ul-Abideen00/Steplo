/* eslint-disable */


"use client";

import { useState, useEffect } from "react";
import { Star, ThumbsUp, Camera, Loader2, ImageOff, X } from "lucide-react";
import { Button } from "../ui/Button";
import { Textarea } from "../ui/textarea";
import { reviewService, ProductReview } from "@/lib/services/review.service";
import { useAuth } from "@/context/AuthContext";
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import Link from "next/link";

interface RatingDistribution {
  [key: string]: number;
}

interface ReviewLike {
  id: string;
  review_id: string;
  user_id: string;
  created_at: string;
}

interface ReviewSectionProps {
  productId: string;
}

export function ReviewSection({ productId }: ReviewSectionProps) {
  const [reviews, setReviews] = useState<ProductReview[]>([]);
  const [averageRating, setAverageRating] = useState(0);
  const [userRating, setUserRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sortBy, setSortBy] = useState<"recent" | "rating" | "helpful">(
    "recent"
  );
  const [filter, setFilter] = useState<"all" | "verified" | "images">("all");
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewImages, setReviewImages] = useState<File[]>([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const { user } = useAuth();
  const supabase = createClient();
  const [imageLoading, setImageLoading] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [imageError, setImageError] = useState<{ [key: string]: boolean }>({});
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [reviewLikes, setReviewLikes] = useState<{ [key: string]: number }>({});
  const [userLikes, setUserLikes] = useState<{ [key: string]: boolean }>({});
  const [isLiking, setIsLiking] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    fetchReviews();
    setupRealtimeSubscription();
    if (user) {
      fetchUserLikes();
    }
  }, [productId, user ]);

  const fetchReviews = async () => {
    try {
      const [reviewsData, avgRating] = await Promise.all([
        reviewService.getProductReviews(productId),
        reviewService.getAverageRating(productId),
      ]);
      setReviews(reviewsData);
      setAverageRating(avgRating);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const setupRealtimeSubscription = () => {
    const channel = supabase
      .channel("product-reviews")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "product_reviews",
          filter: `product_id=eq.${productId}`,
        },
        () => {
          fetchReviews();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const fetchUserLikes = async () => {
    if (!user) return;

    try {
      const { data: likes } = await supabase
        .from('review_likes')
        .select('*')
        .eq('user_id', user.id)
        .returns<ReviewLike[]>();

      if (likes) {
        const likeMap: { [key: string]: boolean } = {};
        likes.forEach((like: ReviewLike) => {
          likeMap[like.review_id] = true;
        });
        setUserLikes(likeMap);
      }
    } catch (error) {
      console.error('Error fetching user likes:', error);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 3) {
      toast.error("Maximum 3 images allowed");
      return;
    }

    // Validate file types and sizes
    const validFiles = files.filter((file) => {
      const isValidType = ["image/jpeg", "image/png", "image/webp"].includes(
        file.type
      );
      const isValidSize = file.size <= 1 * 1024 * 1024; // 1MB limit

      if (!isValidType) {
        toast.error(`${file.name} is not a valid image type`);
      }
      if (!isValidSize) {
        toast.error(`${file.name} is too large (max 5MB)`);
      }

      return isValidType && isValidSize;
    });

    setReviewImages(validFiles);
  };

  const handleSubmitReview = async () => {
    if (!user) {
      toast.error("Please sign in to write a review");
      return;
    }

    if (!userRating) {
      toast.error("Please select a rating");
      return;
    }

    if (!reviewText.trim()) {
      toast.error("Please write a review");
      return;
    }

    setIsSubmitting(true);
    try {
      await reviewService.addReview(
        user,
        productId,
        userRating,
        reviewText,
        reviewImages
      );

      // Reset form
      setUserRating(0);
      setReviewText("");
      setReviewImages([]);
      setShowReviewForm(false);

      toast.success("Review submitted successfully");
      // Refresh reviews
      fetchReviews();
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("Failed to submit review");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLikeClick = async (reviewId: string) => {
    if (!user) {
      toast.error("Please sign in to like reviews");
      return;
    }

    setIsLiking((prev) => ({ ...prev, [reviewId]: true }));

    try {
      const isLiked = userLikes[reviewId];

      if (isLiked) {
        // Unlike
        const { error } = await supabase
          .from("review_likes")
          .delete()
          .eq("review_id", reviewId)
          .eq("user_id", user.id);

        if (error) throw error;

        setUserLikes((prev) => ({ ...prev, [reviewId]: false }));
        setReviewLikes((prev) => ({
          ...prev,
          [reviewId]: (prev[reviewId] || 0) - 1,
        }));
      } else {
        // Like
        const { error } = await supabase.from("review_likes").insert({
          review_id: reviewId,
          user_id: user.id,
        });

        if (error) throw error;

        setUserLikes((prev) => ({ ...prev, [reviewId]: true }));
        setReviewLikes((prev) => ({
          ...prev,
          [reviewId]: (prev[reviewId] || 0) + 1,
        }));
      }
    } catch (error) {
      console.error("Error toggling like:", error);
      toast.error("Failed to update like");
    } finally {
      setIsLiking((prev) => ({ ...prev, [reviewId]: false }));
    }
  };

  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortBy === "recent") {
      return (
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    }
    return b.rating - a.rating;
  });

  const filteredReviews = sortedReviews.filter((review) => {
    switch (filter) {
      case "verified":
        return review.is_verified_purchase ?? false;
      case "images":
        return Array.isArray(review.images) && review.images.length > 0;
      default:
        return true;
    }
  });

  const ratingDistribution: RatingDistribution = {
    "5": reviews.filter((r) => r.rating === 5).length,
    "4": reviews.filter((r) => r.rating === 4).length,
    "3": reviews.filter((r) => r.rating === 3).length,
    "2": reviews.filter((r) => r.rating === 2).length,
    "1": reviews.filter((r) => r.rating === 1).length,
  };

  const handleLoadMore = async () => {
    setIsLoadingMore(true);
    try {
      const nextPage = page + 1;
      setPage(nextPage);
    } catch (error) {
      console.error("Error loading more reviews:", error);
      toast.error("Failed to load more reviews");
    } finally {
      setIsLoadingMore(false);
    }
  };

  return (
    <div className="space-y-8">
      <Tabs defaultValue="reviews" className="w-full">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
          <TabsTrigger value="questions">Questions</TabsTrigger>
        </TabsList>

        <TabsContent value="reviews" className="space-y-8 mt-6">
          {/* Rating Summary Card */}
          <div className="bg-white rounded-lg border p-6">
            <div className="grid gap-8">
              <div className="space-y-4">
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-bold">{averageRating}</span>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-5 w-5 ${
                          star <= averageRating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-200"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-500">
                  Based on {reviews.length}{" "}
                  {reviews.length === 1 ? "review" : "reviews"}
                </p>

                {/* Rating Distribution */}
                <div className="space-y-2">
                  {Object.entries(ratingDistribution)
                    .reverse()
                    .map(([rating, count]) => (
                      <div key={rating} className="flex items-center gap-2">
                        <span className="text-sm w-12">{rating} stars</span>
                        <Progress
                          value={
                            reviews.length > 0
                              ? (count / reviews.length) * 100
                              : 0
                          }
                          className="h-2"
                        />
                        <span className="text-sm text-gray-500 w-12">
                          {count.toString()}
                        </span>
                      </div>
                    ))}
                </div>
              </div>

              <div className="flex flex-col justify-center space-y-4">
                {user ? (
                  <Dialog
                    open={showReviewForm}
                    onOpenChange={setShowReviewForm}
                  >
                    <DialogTrigger asChild>
                      <Button className="w-full">Write a Review</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                      <DialogHeader>
                        <DialogTitle>Write Your Review</DialogTitle>
                        <DialogDescription>
                          Share your experience with this product
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 mt-4">
                        <div className="flex gap-2 justify-center">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <motion.button
                              key={star}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => setUserRating(star)}
                            >
                              <Star
                                className={`h-8 w-8 ${
                                  star <= userRating
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            </motion.button>
                          ))}
                        </div>
                        <Textarea
                          value={reviewText}
                          onChange={(e) => setReviewText(e.target.value)}
                          placeholder="What did you like or dislike? How's the quality?"
                          className="min-h-[120px]"
                        />
                        <div className="space-y-2">
                          <label className="text-sm text-gray-500">
                            Add Photos (optional)
                          </label>
                          <div className="flex gap-2">
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() =>
                                document
                                  .getElementById("review-images")
                                  ?.click()
                              }
                              className="w-full"
                            >
                              <Camera className="h-4 w-4 mr-2" />
                              Add Photos
                            </Button>
                            <input
                              id="review-images"
                              type="file"
                              multiple
                              accept="image/*"
                              onChange={handleImageUpload}
                              className="hidden"
                            />
                          </div>
                          {reviewImages.length > 0 && (
                            <p className="text-sm text-gray-500">
                              {reviewImages.length}{" "}
                              {reviewImages.length === 1 ? "image" : "images"}{" "}
                              selected
                            </p>
                          )}
                        </div>
                        <Button
                          onClick={handleSubmitReview}
                          disabled={isSubmitting}
                          className="w-full"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                              Submitting...
                            </>
                          ) : (
                            "Submit Review"
                          )}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                ) : (
                  <Link href="/login">
                    <Button variant="outline">
                      Sign in to Review
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Filters and Sort */}
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex gap-2">
              <Button
                variant={filter === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("all")}
              >
                All Reviews
              </Button>
              <Button
                variant={filter === "verified" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("verified")}
              >
                Verified Purchases
              </Button>
              <Button
                variant={filter === "images" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("images")}
              >
                With Images
              </Button>
            </div>
            <Select
              value={sortBy}
              onValueChange={(value) => setSortBy(value as typeof sortBy)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="helpful">Most Helpful</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Reviews List */}
          <div className="space-y-6">
            <AnimatePresence>
              {filteredReviews.map((review, index) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-lg border p-6"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex gap-3">
                      <Avatar>
                        <AvatarFallback>
                          {review.user_name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{review.user_name}</p>
                          {review.is_verified_purchase && (
                            <Badge variant="secondary" className="text-xs">
                              Verified Purchase
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`h-4 w-4 ${
                                  star <= review.rating
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-200"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-500">
                            {new Date(review.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`text-gray-500 hover:text-gray-800 ${
                        userLikes[review.id] ? "text-gray-900" : ""
                      }`}
                      onClick={() => handleLikeClick(review.id)}
                      disabled={isLiking[review.id]}
                    >
                      {isLiking[review.id] ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <ThumbsUp
                          className={`h-4 w-4 ${userLikes[review.id] ? "fill-gray-800" : ""}`}
                        />
                      )}
                      {reviewLikes[review.id] > 0 && (
                        <span className="ml-1 text-sm">
                          {reviewLikes[review.id]}
                        </span>
                      )}
                    </Button>
                  </div>
                  <p className="text-gray-700 mb-4">{review.review_text}</p>

                  {/* Review Images */}
                  {review.images && review.images.length > 0 && (
                    <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                      {review.images.map((imageUrl, i) => (
                        <div key={i} className="relative min-w-[80px]">
                          {imageLoading[imageUrl] && (
                            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
                              <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
                            </div>
                          )}
                          <img
                            src={imageUrl}
                            alt={`Review image ${i + 1}`}
                            className={`h-20 w-20 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity duration-200 ${
                              imageError[imageUrl] ? "hidden" : ""
                            }`}
                            onClick={() => setSelectedImage(imageUrl)}
                            onLoad={() => {
                              setImageLoading((prev) => ({
                                ...prev,
                                [imageUrl]: false,
                              }));
                            }}
                            onError={() => {
                              console.error("Failed to load image:", imageUrl);
                              setImageError((prev) => ({
                                ...prev,
                                [imageUrl]: true,
                              }));
                              setImageLoading((prev) => ({
                                ...prev,
                                [imageUrl]: false,
                              }));
                            }}
                          />
                          {imageError[imageUrl] && (
                            <div className="h-20 w-20 bg-gray-100 rounded-lg flex items-center justify-center">
                              <ImageOff className="h-6 w-6 text-gray-400" />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Load More Button */}
          {reviews.length > 10 && (
            <Button
              variant="outline"
              className="w-full"
              onClick={handleLoadMore}
              disabled={isLoadingMore}
            >
              {isLoadingMore ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Loading...
                </>
              ) : (
                "Load More Reviews"
              )}
            </Button>
          )}

          {reviews.length === 0 && (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <Star className="h-12 w-12 mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-medium mb-2">No Reviews Yet</h3>
              <p className="text-gray-500 mb-4">
                Be the first to review this product
              </p>
              {user && (
                <Button
                  onClick={() => setShowReviewForm(true)}
                  variant="outline"
                >
                  Write a Review
                </Button>
              )}
            </div>
          )}
        </TabsContent>

        <TabsContent value="questions" className="mt-6">
          {/* Add Q&A section here */}
          <div className="text-center py-8 text-gray-500">
            Q&A section coming soon
          </div>
        </TabsContent>
      </Tabs>

      <Dialog
        open={!!selectedImage}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedImage(null);
          }
        }}
      >
        <DialogContent
          className="max-w-[95vw] h-[95vh] p-0 overflow-hidden bg-transparent backdrop-blur-sm border-0 rounded-lg"
          onPointerDownOutside={() => {
            setSelectedImage(null);
          }}
        >
          <VisuallyHidden>
            <DialogTitle>Image Preview</DialogTitle>
          </VisuallyHidden>

          <AnimatePresence mode="wait">
            <motion.div
              className="relative w-full h-full flex items-center justify-center overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                className="relative"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
              >
                {selectedImage && (
                  <>
                    <motion.img
                      src={selectedImage}
                      alt="Preview"
                      className="max-w-full max-h-[85vh] object-contain rounded-lg"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "/placeholder-image.jpg";
                      }}
                    />

                    {/* Close button */}
                    <motion.div
                      className="absolute top-0 right-0 p-4"
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <DialogClose
                        className="p-2 rounded-full bg-black/50 text-white backdrop-blur-sm hover:bg-black/70 transition-all"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <X className="h-5 w-5" />
                      </DialogClose>
                    </motion.div>
                  </>
                )}
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </div>
  );
}
