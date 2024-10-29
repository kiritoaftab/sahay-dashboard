import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

const RangerCustomerReview = () => {
  const { id } = useParams();
  const [rangerData, setRangerData] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);

  const cardsPerPage = 3;
  const totalPages = Math.ceil(reviews.length / cardsPerPage);

  useEffect(() => {
    if (id) {
      setLoading(true);
      axios
        .get(`https://admin.sahay24x7.com:4000/api/feedback/getByRanger/${id}`)
        .then((response) => {
          const { feedbackDocs } = response.data;
          if (feedbackDocs && feedbackDocs.length > 0) {
            setRangerData(feedbackDocs[0].ranger);
            setReviews(feedbackDocs.filter(feedback => feedback.review));
          }
        })
        .catch((error) => console.error("Error fetching data:", error))
        .finally(() => setLoading(false));
    }
  }, [id]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPage((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, [reviews, totalPages]);

  const nextPage = () => {
    setCurrentPage((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  };

  if (loading) {
    return (
      <div className="w-full max-w-6xl mx-auto p-6">
        <div className="bg-white shadow-lg rounded-lg p-8 text-center">
          Loading...
        </div>
      </div>
    );
  }

  if (!rangerData || reviews.length === 0) {
    return (
      <div className="w-full max-w-6xl mx-auto p-6">
        <div className="bg-white shadow-lg rounded-lg p-8 text-center">
          No reviews available
        </div>
      </div>
    );
  }

  // Get current page's reviews
  const getCurrentPageReviews = () => {
    const startIndex = currentPage * cardsPerPage;
    return reviews.slice(startIndex, startIndex + cardsPerPage);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Header with Ranger Profile */}
        <div className="p-4 border-b flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <img
              src={rangerData.aadharImg}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold">
              {rangerData.firstName} {rangerData.lastName}
            </h2>
            <div className="flex items-center space-x-2">
              <span className="text-yellow-400">
                {"★".repeat(Math.round(rangerData.rating || 0))}
              </span>
              <span className="text-gray-400">
                {"☆".repeat(5 - Math.round(rangerData.rating || 0))}
              </span>
              <span className="text-sm text-gray-500">
                ({rangerData.noOfBooking || 0} bookings)
              </span>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="relative p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {getCurrentPageReviews().map((review, index) => (
              <div key={index} className="bg-gray-100 rounded-lg p-4 shadow-md">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <img
                      src={review.customer?.profilePic || '/placeholder-avatar.png'}
                      alt="Customer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">
                      {review.customer?.firstName || 'Anonymous'} {review.customer?.lastName || ''}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <span className="text-yellow-400">
                        {"★".repeat(review.rating || 0)}
                      </span>
                      <span className="text-gray-400">
                        {"☆".repeat(5 - (review.rating || 0))}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 mt-2 line-clamp-3">{review.review || 'No review text'}</p>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          {totalPages > 1 && (
            <>
              <button
                onClick={prevPage}
                className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white shadow-lg hover:bg-gray-100 border border-gray-200"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextPage}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white shadow-lg hover:bg-gray-100 border border-gray-200"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Page Indicators */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex space-x-2 pb-4">
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      currentPage === index ? "bg-blue-500 w-4" : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RangerCustomerReview;