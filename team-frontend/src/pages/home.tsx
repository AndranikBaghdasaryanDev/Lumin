import { PlayIcon, StarIcon, ClockIcon, UserGroupIcon } from "@heroicons/react/24/solid";

export function Home() {
  const courses = [
    { id: 1, title: "Modern React Architecture", author: "Sarah Drasner", price: "$89.99", rating: 4.9, students: "12k", image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop" },
    { id: 2, title: "UI/UX Design Masterclass", author: "Gary Simon", price: "$74.99", rating: 4.8, students: "8k", image: "https://images.unsplash.com/photo-1586717791821-3f44a563dc4c?w=800&auto=format&fit=crop" },
    { id: 3, title: "Node.js Backend Systems", author: "Maximilian S.", price: "$99.00", rating: 5.0, students: "5k", image: "https://images.unsplash.com/photo-1502945015378-0e284ca1a5be?w=800&auto=format&fit=crop" },
  ];

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
      {/* ===== HERO SECTION ===== */}
      <section className="bg-white border-b border-gray-100/60 py-20 px-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-16">
          <div className="max-w-xl space-y-8 text-center lg:text-left">
            <span className="inline-block bg-blue-50/80 text-blue-600 text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wider border border-blue-100">
              Lumin Learning
            </span>
            <h1 className="text-5xl lg:text-7xl font-extrabold text-gray-900 leading-tight tracking-tight">
              Master the skills of the <span className="text-blue-600">Future.</span>
            </h1>
            <p className="text-lg text-gray-500 font-medium leading-relaxed">
              Join over 5,000+ students learning the latest technologies with industry experts.
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-10 rounded-2xl shadow-xl shadow-blue-200/50 hover:shadow-2xl hover:shadow-blue-200/60 transition-all duration-300 active:scale-95">
                Explore Courses
              </button>
              <button className="bg-white border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-4 px-10 rounded-2xl transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>
          
          {/* Featured Video/Image Component */}
          <div className="relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative bg-white p-3 rounded-3xl shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop" 
                className="rounded-2xl w-full max-w-lg" 
                alt="Learning" 
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/95 backdrop-blur p-5 rounded-full shadow-2xl cursor-pointer hover:scale-110 transition-transform duration-300">
                  <PlayIcon className="w-12 h-12 text-blue-600" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PRODUCTS/COURSES SECTION ===== */}
      <section className="max-w-7xl mx-auto px-8 py-24">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 tracking-tight">Recommended for you</h2>
            <p className="text-gray-500 mt-3 text-lg">Based on your interests and recent search history</p>
          </div>
          <button className="text-blue-600 font-semibold hover:text-blue-700 transition-colors duration-200">View all courses →</button>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div key={course.id} className="group bg-white rounded-3xl border border-gray-100/80 overflow-hidden hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-500 flex flex-col">
              {/* Image Container */}
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={course.image} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  alt={course.title}
                />
                <div className="absolute top-6 left-6 bg-white/95 backdrop-blur px-3 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider text-blue-600 shadow-lg border border-blue-100">
                  Best Seller
                </div>
              </div>

              {/* Content */}
              <div className="p-8 flex flex-col flex-1">
                <div className="flex items-center gap-1 text-yellow-400 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className="w-5 h-5" />
                  ))}
                  <span className="text-gray-400 text-xs font-bold ml-2">({course.rating})</span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-200">
                  {course.title}
                </h3>
                <p className="text-sm text-gray-500 mb-6 font-medium">{course.author}</p>

                {/* Stats */}
                <div className="mt-auto flex items-center justify-between pt-6 border-t border-gray-50">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <ClockIcon className="w-5 h-5" />
                      12h 30m
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <UserGroupIcon className="w-5 h-5" />
                      {course.students}
                    </div>
                  </div>
                  <span className="text-xl font-black text-gray-900">{course.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== FEATURES MINI SECTION ===== */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 py-16 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="p-8">
                <h4 className="text-white font-bold text-2xl mb-4">Expert Instructors</h4>
                <p className="text-blue-100 text-sm leading-relaxed opacity-90">Learn from professionals who do the work daily.</p>
            </div>
            <div className="p-8">
                <h4 className="text-white font-bold text-2xl mb-4">Lifetime Access</h4>
                <p className="text-blue-100 text-sm leading-relaxed opacity-90">Buy once, learn forever on any device.</p>
            </div>
            <div className="p-8">
                <h4 className="text-white font-bold text-2xl mb-4">Certifications</h4>
                <p className="text-blue-100 text-sm leading-relaxed opacity-90">Gain verifiable certificates to boost your CV.</p>
            </div>
        </div>
      </section>
    </div>
  );
}