"use client";
import React, { useMemo } from "react";
import { Star, Calendar, Hash } from "lucide-react";
import type { Review } from "@/app/components/reviews/review";

interface ReviewCardProps {
  review: Review;
  isLast: boolean;
  onUpdate?: () => void;
}

const statusBadges = {
  approved: "bg-green-100 text-green-700 border-green-200",
  pending: "bg-yellow-600/10 text-yellow-700 border-yellow-600/20",
  flagged: "bg-red-100 text-red-700 border-red-200",
};

import { sendReviewResponse } from "@/src/services/admin.service";
import { toast } from "react-toastify";
import { Send } from "lucide-react";
import { Button } from "@repo/ui";

export function ReviewCard({ review, isLast }: ReviewCardProps) {
  const [adminMessage, setAdminMessage] = React.useState("");
  const [sending, setSending] = React.useState(false);

  const handleSendMessage = async () => {
    if (!adminMessage.trim()) {
      toast.error("Please enter a message");
      return;
    }
    setSending(true);
    try {
      const [_, error] = await sendReviewResponse(review.id, adminMessage);
      if (error) throw new Error(error.message);
      toast.success("Message sent to astrologer");
      setAdminMessage("");
    } catch (err: any) {
      toast.error(err.message || "Failed to send message");
    } finally {
      setSending(false);
    }
  };

  const formattedDate = useMemo(() => {
// ...
    try {
      if (!review.date) return "N/A";
      const date = new Date(review.date);
      if (isNaN(date.getTime())) return "Invalid Date";
      return new Intl.DateTimeFormat("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }).format(date);
    } catch (e) {
      return "Invalid Date";
    }
  }, [review.date]);

  return (
    <div className={`pb-4 ${!isLast ? "border-b border-gray-200" : ""}`}>
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
        {/* Left Section */}
        <div className="flex gap-4 flex-1">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-gradient-to-br from-orange to-yellow-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md">
              {review.avatar}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <h3 className="font-semibold text-gray-800">{review.user}</h3>
              <span className="text-gray-500 text-sm">reviewed</span>
              <span className="font-medium text-orange">{review.expert}</span>
            </div>

            {/* Rating */}
            <div className="flex gap-0.5 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${i < review.rating ? "text-yellow-600 fill-yellow-600" : "text-gray-300"
                    }`}
                />
              ))}
            </div>

            {/* Comment */}
            <p className="text-gray-700 mb-2 leading-relaxed">{review.comment}</p>

            {/* Date & Session */}
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                <time dateTime={typeof review.date === 'string' ? review.date : ''}>{formattedDate}</time>
              </div>
              {review.sessionId && (
                <div className="flex items-center gap-1.5 px-2 py-0.5 bg-gray-100 rounded text-gray-600 font-medium">
                  <Hash className="w-3.5 h-3.5" />
                  <span>Session {review.sessionId}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Section - Message Area */}
        <div className="flex flex-col items-start lg:items-end gap-3 w-full lg:w-64">
          <div className="w-full space-y-2">
            <p className="text-xs font-medium text-gray-500">Message to Astrologer:</p>
            <textarea
              className="w-full text-sm p-2 border border-gray-200 rounded-lg focus:ring-1 focus:ring-orange focus:border-orange outline-none resize-none h-20"
              placeholder="Type your message here..."
              value={adminMessage}
              onChange={(e) => setAdminMessage(e.target.value)}
            />
            <Button
              variant="primary"
              size="sm"
              className="w-full rounded-lg"
              disabled={sending}
              onClick={handleSendMessage}
            >
              {sending ? "Sending..." : "Send Message"}
              <Send className="ml-2 w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
