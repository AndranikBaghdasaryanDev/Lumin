import { PlayIcon, StarIcon, ClockIcon, UserGroupIcon } from "@heroicons/react/24/solid";

export function Home() {
  const courses = [
    { id: 1, title: "Modern React Architecture", author: "Sarah Drasner", price: "$89.99", rating: 4.9, students: "12k", image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop" },
    { id: 2, title: "UI/UX Design Masterclass", author: "Gary Simon", price: "$74.99", rating: 4.8, students: "8k", image: "https://images.unsplash.com/photo-1586717791821-3f44a563dc4c?w=800&auto=format&fit=crop" },
    { id: 3, title: "Node.js Backend Systems", author: "Maximilian S.", price: "$99.00", rating: 5.0, students: "5k", image: "https://images.unsplash.com/photo-1502945015378-0e284ca1a5be?w=800&auto=format&fit=crop" },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* ===== HERO SECTION ===== */}
      <section className="bg-white border-b border-gray-100 py-16 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-xl space-y-6 text-center md:text-left">
            <span className="inline-block bg-blue-50 text-blue-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">
              Lumin Learning
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
              Master the skills of the <span className="text-blue-600">Future.</span>
            </h1>
            <p className="text-lg text-gray-500 font-medium">
              Join over 5,000+ students learning the latest technologies with industry experts.
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg shadow-blue-200 transition-all active:scale-95">
                Explore Courses
              </button>
              <button className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-bold py-3 px-8 rounded-xl transition-all">
                Learn More
              </button>
            </div>
          </div>
          
          {/* Featured Video/Image Component */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative bg-white p-2 rounded-2xl shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop" 
                className="rounded-xl w-full max-w-lg" 
                alt="Learning" 
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/90 backdrop-blur p-4 rounded-full shadow-xl cursor-pointer hover:scale-110 transition-transform">
                  <PlayIcon className="w-10 h-10 text-blue-600" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PRODUCTS/COURSES SECTION ===== */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Recommended for you</h2>
            <p className="text-gray-500 mt-2">Based on your interests and recent search history</p>
          </div>
          <button className="text-blue-600 font-bold hover:underline">View all courses →</button>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div key={course.id} className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-2xl hover:shadow-gray-200 transition-all duration-300 flex flex-col">
              {/* Image Container */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={course.image} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                  alt={course.title}
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider text-blue-600 shadow-sm">
                  Best Seller
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-1 text-yellow-400 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className="w-4 h-4" />
                  ))}
                  <span className="text-gray-400 text-xs font-bold ml-1">({course.rating})</span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {course.title}
                </h3>
                <p className="text-sm text-gray-500 mb-4">{course.author}</p>

                {/* Stats */}
                <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-50">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <ClockIcon className="w-4 h-4" />
                      12h 30m
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <UserGroupIcon className="w-4 h-4" />
                      {course.students}
                    </div>
                  </div>
                  <span className="text-lg font-black text-gray-900">{course.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== FEATURES MINI SECTION ===== */}
      <section className="bg-blue-600 py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
                <h4 className="text-white font-bold text-xl mb-2">Expert Instructors</h4>
                <p className="text-blue-100 text-sm italic opacity-80">Learn from professionals who do the work daily.</p>
            </div>
            <div className="p-6">
                <h4 className="text-white font-bold text-xl mb-2">Lifetime Access</h4>
                <p className="text-blue-100 text-sm italic opacity-80">Buy once, learn forever on any device.</p>
            </div>
            <div className="p-6">
                <h4 className="text-white font-bold text-xl mb-2">Certifications</h4>
                <p className="text-blue-100 text-sm italic opacity-80">Gain verifiable certificates to boost your CV.</p>
            </div>
        </div>
      </section>
    </div>
  );
}