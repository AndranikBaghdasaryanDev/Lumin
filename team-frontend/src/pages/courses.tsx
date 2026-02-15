import { CategoryFilter } from "../components/filters/CategoryFilter";

export const CoursesPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <CategoryFilter />
        </div>
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Courses</h1>
            <p className="text-gray-600">
              Select a category from the filter to view courses. The category selection 
              will be reflected in the URL parameters.
            </p>
            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <h2 className="font-semibold text-gray-900 mb-2">Features demonstrated:</h2>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Dynamic category loading from API</li>
                <li>Expandable subcategories with accordion UI</li>
                <li>URL synchronization with categoryId and subcategoryId parameters</li>
                <li>Loading and error state handling</li>
                <li>Responsive design</li>
                <li>Clear selection functionality</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
