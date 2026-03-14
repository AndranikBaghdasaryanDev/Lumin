import PaginatedContent from '../components/shared/PaginatedContent';
import type { PaginationMeta } from '../types/pagination.types';

// Mock API function for demonstration
const mockFetchData = async (page: number) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Generate mock data
  const itemsPerPage = 10;
  const totalItems = 47; // Total items to create 5 pages
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  
  const data = Array.from({ length: endIndex - startIndex }, (_, index) => ({
    id: startIndex + index + 1,
    title: `Item ${startIndex + index + 1}`,
    description: `This is the description for item ${startIndex + index + 1}`,
    category: ['Technology', 'Design', 'Business', 'Marketing'][Math.floor(Math.random() * 4)]
  }));

  const pagination: PaginationMeta = {
    page,
    limit: itemsPerPage,
    total: totalItems,
    totalPages: Math.ceil(totalItems / itemsPerPage)
  };

  return { data, pagination };
};

export const PaginationDemo = () => {
  const renderItem = (item: any, index: number) => (
    <div 
      key={item.id} 
      className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
          <p className="text-gray-600 mb-2">{item.description}</p>
          <span className="inline-block px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full">
            {item.category}
          </span>
        </div>
        <div className="text-2xl text-gray-400">
          {index + 1}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Pagination Demo</h1>
          <p className="text-gray-600">
            Demonstrating the reusable Pagination component with URL synchronization and responsive design.
          </p>
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Features:</strong> URL sync, ellipsis logic, loading states, error handling, responsive design
            </p>
          </div>
        </div>

        {/* Pagination Demo */}
        <PaginatedContent
          fetchData={mockFetchData}
          resetOnFilterChange={['category', 'search']} // Example: reset page when these filters change
          renderItem={renderItem}
          emptyMessage="No items found in this demo."
          loadingMessage="Loading demo items..."
        />

        {/* Instructions */}
        <div className="mt-12 p-6 bg-gray-100 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">How to Test:</h2>
          <ul className="space-y-2 text-gray-700">
            <li>• Click page numbers to navigate</li>
            <li>• Use Previous/Next buttons</li>
            <li>• Check URL updates (page parameter)</li>
            <li>• Test responsive design on mobile</li>
            <li>• Verify ellipsis appears for many pages</li>
            <li>• Check loading states during navigation</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
