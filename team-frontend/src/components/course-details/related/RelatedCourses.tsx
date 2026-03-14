import CourseCard from "../../reusable/CourseCard"
import type { CourseListItem as Course } from "../../../types"
import { useToastStore } from "../../../stores/toastStore"
import { Loading } from "../../ui"
import { useEffect, useState } from "react"
import { courseService } from "../../../lib/api/service/courseService"

type Props = {
    courseId: string
}

export const RelatedCourses = ({ courseId }: Props) => {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const error = useToastStore(state => state.error)  

  useEffect(() => {
    const fetchRelated = async () => {
      try {
        setLoading(true)
        const relatedCourses = await courseService.getRelatedCourses(courseId)
        setCourses(relatedCourses.data || [])
      } catch (err: any) {
        error(err.response?.data?.message || "Failed to load related courses")
    } finally {
        setLoading(false)
      }
    }

    fetchRelated()
  }, [courseId])

  // 🔄 Loading state
  if (loading) {
    return <Loading />
  }

  // 📭 Empty state
  if (!courses.length) {
    return (
      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-4">
          Related Courses
        </h2>
        <p className="text-gray-500 text-sm">
          No related courses found.
        </p>
      </div>
    )
  }

  return (
    <div className="mt-12">
      <h2 className="text-xl font-semibold mb-6">
        Related Courses
      </h2>

      {/* Desktop Grid */}
      <div className="hidden md:grid grid-cols-4 gap-6">
        {courses.slice(0, 4).map(course => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>

      {/* Mobile Horizontal Scroll */}
      <div className="md:hidden flex gap-4 overflow-x-auto pb-2">
        {courses.map(course => (
          <div key={course.id} className="min-w-[250px] flex-shrink-0">
            <CourseCard course={course} />
          </div>
        ))}
      </div>
    </div>
  )
}