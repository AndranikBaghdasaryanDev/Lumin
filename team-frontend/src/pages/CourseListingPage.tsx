import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import CourseCard from "../components/reusable/CourseCard"; // your reusable card
import { Axios } from "../lib/api/axios";
import type { ApiResponse } from "../lib/api/types";
import { Error } from "../components/ui";

type CourseListItem = {
  id: string;
  title: string;
  thumbnail: string;
  instructor: { name: string };
  rating: number;
  ratingCount: number;
  isFree: boolean;
  price: number;
  discountPrice: number;
  duration: number; // seconds
  level: string;
  slug: string;
  shortDescription: string;
  enrollmentCount: number 
};

type CourseApiData = {
    courses: CourseListItem[],
    total: number
}

export default function CoursesListingPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [error, setError] = useState("")  
  const [courses, setCourses] = useState<CourseListItem[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const search = searchParams.get("search") || "";
  const sort = searchParams.get("sort") || "newest";
  const page = Number(searchParams.get("page")) || 1;

  // Fetch courses
  useEffect(() => {
    async function fetchCourses() {
      try {
        setLoading(true);

        const query = new URLSearchParams({
          search,
          sort,
          page: page.toString(),
        }).toString();

        const res = await Axios.get<ApiResponse<CourseApiData>>(`/api/courses?${query}`);
        const data = res.data.data

        setCourses(data?.courses || []);
        setTotal(data?.total || 0);
      } catch (err) {
        setError("Something went wrong")
        setCourses([]);
        setTotal(0);
      } finally {
        setLoading(false);
      }
    }

    fetchCourses();
  }, [search, sort, page]);

  // Handle sort change
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchParams({
      search,
      sort: e.target.value,
      page: "1", // reset page when sort changes
    });
  };

  return (
    <div className="container mx-auto px-4 py-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <h1 className="text-2xl font-bold">Courses ({total})</h1>

        <select
          value={sort}
          onChange={handleSortChange}
          className="border rounded px-3 py-2"
        >
          <option value="newest">Newest</option>
          <option value="price_low">Price: Low to High</option>
          <option value="price_high">Price: High to Low</option>
        </select>
      </div>

      {/* Loading Skeleton */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="animate-pulse border p-4 rounded-lg shadow-sm"
            >
              <div className="h-40 bg-gray-300 mb-4 rounded"></div>
              <div className="h-4 bg-gray-300 mb-2 rounded"></div>
              <div className="h-4 bg-gray-300 w-1/2 rounded"></div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && courses.length === 0 && (
        <div className="text-center py-16">
          <p className="text-lg font-medium">No courses found</p>
        </div>
      )}

      {/* Courses Grid */}
      {!loading && courses.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}

      {error && <Error message={error} />}
    </div>
  );
}