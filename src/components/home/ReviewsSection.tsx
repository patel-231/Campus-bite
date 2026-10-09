import React, { useState } from 'react';
import { Star, MessageSquarePlus, CheckCircle2 } from 'lucide-react';
import { CustomerReview } from '../../types';

interface ReviewsSectionProps {
  reviews: CustomerReview[];
  onAddReview: (review: Omit<CustomerReview, 'id' | 'date'>) => Promise<void>;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  reviews,
  onAddReview,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !reviewText.trim()) return;

    setIsSubmitting(true);
    try {
      await onAddReview({
        name: name.trim(),
        rating,
        review: reviewText.trim(),
      });
      setSubmittedSuccess(true);
      setTimeout(() => {
        setSubmittedSuccess(false);
        setShowModal(false);
        setName('');
        setReviewText('');
        setRating(5);
      }, 1500);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="my-16">
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#FF6B35]">
            Verified Student Feedback
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#202124] mt-1 tracking-tight">
            What Campus Students Say
          </h2>
          <p className="text-sm text-[#777777] mt-1">
            Genuine ratings and dining experiences from students across campus.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 text-xs font-bold text-[#FF6B35] bg-[#FFF8F1] hover:bg-[#FF6B35]/15 border border-[#FF6B35]/30 rounded-xl transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap"
        >
          <MessageSquarePlus className="w-4 h-4" />
          <span>Write a Review</span>
        </button>
      </div>

      {/* Review Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="bg-white rounded-2xl p-6 border border-[#EAEAEA] flex flex-col justify-between shadow-xs transition-shadow hover:shadow-md"
          >
            <div>
              {/* Star Rating */}
              <div className="flex items-center gap-1 mb-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${
                      star <= rev.rating
                        ? 'fill-amber-400 text-amber-400'
                        : 'fill-gray-200 text-gray-200'
                    }`}
                  />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-sm text-[#202124] italic leading-relaxed">
                "{rev.review}"
              </p>
            </div>

            {/* Author Metadata - Unboxed clean layout */}
            <div className="mt-5 pt-4 border-t border-[#EAEAEA] flex items-center justify-between text-xs">
              <span className="font-bold text-[#202124]">{rev.name}</span>
              <span className="text-[#777777]">{rev.date}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Write Review Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-[#EAEAEA] relative">
            <h3 className="font-display text-xl font-bold text-[#202124] mb-1">
              Share Your Experience
            </h3>
            <p className="text-xs text-[#777777] mb-5">
              Help your fellow campus mates discover the best meals on Campus Bite.
            </p>

            {submittedSuccess ? (
              <div className="py-8 text-center space-y-2">
                <CheckCircle2 className="w-12 h-12 text-[#238636] mx-auto animate-bounce" />
                <h4 className="font-bold text-base text-[#202124]">Thank you!</h4>
                <p className="text-xs text-[#777777]">Your review has been published.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#202124] mb-1">
                    Your Name / Branch
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Aditi R. (IT, 3rd Year)"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm border border-[#EAEAEA] rounded-lg focus:outline-none focus:border-[#FF6B35]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#202124] mb-1">
                    Rating
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button
                        type="button"
                        key={s}
                        onClick={() => setRating(s)}
                        className="p-1 cursor-pointer focus:outline-none"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            s <= rating
                              ? 'fill-amber-400 text-amber-400'
                              : 'fill-gray-200 text-gray-200'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs text-[#777777] ml-2 tabular-nums">
                      {rating} out of 5
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#202124] mb-1">
                    Your Review
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us about the food quality, speed, or your favorite dish..."
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm border border-[#EAEAEA] rounded-lg focus:outline-none focus:border-[#FF6B35]"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 text-xs font-medium text-[#777777] hover:text-[#202124] cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-5 py-2.5 text-xs font-bold text-white bg-[#FF6B35] hover:bg-[#E95420] rounded-lg transition-colors cursor-pointer shadow-xs disabled:opacity-50"
                  >
                    {isSubmitting ? 'Posting...' : 'Submit Review'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
