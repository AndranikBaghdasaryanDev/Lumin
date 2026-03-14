import { useState, useEffect } from "react";
import { Search, X, Clock, BookOpen, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { courseService } from "../lib/api/service/courseService.js";
import type { CourseListItem } from "../types/course.js";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<CourseListItem[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Search courses API call
  const searchCourses = async (query: string) => {
    console.log("🔍 Search courses called with query:", query);
    
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setSearchLoading(true);
    setSearchError(null);

    try {
      console.log("📡 Making API call with filters:", {
        search: query.trim(),
        page: 1,
        limit: 5,
      });

      const response = await courseService.getCourses({
        search: query.trim(),
        page: 1,
        limit: 5, // Limit results for modal
      });

      console.log("📦 Search API response:", response);
      console.log("📊 Response data:", response.data);
      console.log("📊 Response success:", response.data?.success);

      // Use same structure as coursesStore - response.data.data.courses
      if (response.data?.success && response.data?.data?.courses) {
        console.log("✅ Found courses in response.data.data.courses:", response.data.data.courses);
        setSearchResults(response.data.data.courses);
      } else if (response.data?.courses) {
        console.log("✅ Found courses in response.data.courses:", response.data.courses);
        setSearchResults(response.data.courses);
      } else {
        console.log("❌ No courses in response");
        console.log("📋 Full response structure:", JSON.stringify(response.data, null, 2));
        setSearchResults([]);
      }
    } catch (error) {
      console.error("❌ Search error:", error);
      setSearchError("Failed to search courses");
      setSearchResults([]);
    } finally {
      setSearchLoading(false);
    }
  };

  // Debounced search
  useEffect(() => {
    console.log("🔄 Debounce effect triggered with searchQuery:", searchQuery);
    
    const timeoutId = setTimeout(() => {
      if (searchQuery) {
        console.log("⚡ Triggering search for:", searchQuery);
        searchCourses(searchQuery);
      } else {
        console.log("🔄 Clearing search results");
        setSearchResults([]);
      }
    }, 300); // 300ms debounce

    return () => {
      console.log("🧹 Clearing timeout");
      clearTimeout(timeoutId);
    };
  }, [searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/courses?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsModalOpen(false);
      setSearchQuery("");
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
    // Focus input after modal opens
    setTimeout(() => {
      document.getElementById("search-input")?.focus();
    }, 100);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSearchQuery("");
  };

  return (
    <>
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={openModal}
              className="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg text-sm text-gray-600 hover:text-gray-900 transition-all duration-200"
            >
              <Search className="w-4 h-4" />
              <span>Search courses...</span>
            </button>
          </div>
        </div>
      </header>

      {/* Search Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closeModal}
          />

          {/* Modal Content */}
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 border border-gray-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900">Search Courses</h2>
              <button
                onClick={closeModal}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Search Form */}
            <form onSubmit={handleSearch} className="p-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="search-input"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Type to search courses..."
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl text-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  autoFocus
                />
              </div>

              {/* Search Results */}
              {(searchQuery || searchResults.length > 0 || searchLoading || searchError) && (
                <div className="mt-6 border-t border-gray-100 pt-6">
                  {searchLoading && (
                    <div className="text-center py-8">
                      <div className="inline-flex items-center gap-2 text-gray-500">
                        <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                        <span>Searching...</span>
                      </div>
                    </div>
                  )}

                  {searchError && (
                    <div className="text-center py-8">
                      <p className="text-red-500">{searchError}</p>
                    </div>
                  )}

                  {!searchLoading && !searchError && searchResults.length > 0 && (
                    <div className="space-y-3">
                      <h3 className="text-sm font-medium text-gray-500 mb-3">
                        Search Results ({searchResults.length})
                      </h3>
                      {searchResults.map((course) => (
                        <div
                          key={course.id}
                          onClick={() => {
                            navigate(`/courses/${course.id}`);
                            closeModal();
                          }}
                          className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors duration-200"
                        >
                          {/* Course Thumbnail */}
                          <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                            <img
                              src={course.thumbnailUrl}
                              alt={course.title}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).style.display = 'none';
                                (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                              }}
                            />
                            <div className="w-full h-full bg-gray-300 flex items-center justify-center hidden">
                              <BookOpen className="w-6 h-6 text-gray-400" />
                            </div>
                          </div>

                          {/* Course Info */}
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-gray-900 truncate text-sm">
                              {course.title}
                            </h4>
                            <p className="text-xs text-gray-500 truncate mt-1">
                              {course.shortDescription}
                            </p>
                            <div className="flex items-center gap-4 mt-2">
                              <div className="flex items-center gap-1">
                                <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                                <span className="text-xs text-gray-600">
                                  {course.rating} ({course.ratingCount})
                                </span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3 text-gray-400" />
                                <span className="text-xs text-gray-600">
                                  {Math.floor(course.duration / 3600)}h {Math.floor((course.duration % 3600) / 60)}m
                                </span>
                              </div>
                              <div className="flex items-center gap-1">
                                <span className="text-xs font-medium text-blue-600">
                                  ${course.discountPrice || course.price}
                                </span>
                                {course.discountPrice < course.price && (
                                  <span className="text-xs text-gray-400 line-through">
                                    ${course.price}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {!searchLoading && !searchError && searchQuery && searchResults.length === 0 && (
                    <div className="text-center py-8">
                      <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500">No courses found for "{searchQuery}"</p>
                    </div>
                  )}
                </div>
              )}

              {/* Search Button */}
              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-6 py-3 text-gray-600 hover:text-gray-800 font-medium transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!searchQuery.trim()}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200 font-medium"
                >
                  Search
                </button>
              </div>
            </form>

            {/* Popular Searches */}
            <div className="px-6 pb-6">
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-500 mb-3">Popular Searches</h3>
                <div className="flex flex-wrap gap-2">
                  {["JavaScript", "React", "Node.js", "Python", "CSS", "TypeScript"].map((term) => (
                    <button
                      key={term}
                      onClick={() => {
                        setSearchQuery(term);
                        setTimeout(() => {
                          document.getElementById("search-input")?.focus();
                        }, 100);
                      }}
                      className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900 rounded-full text-sm transition-colors duration-200"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
