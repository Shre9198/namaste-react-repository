const Shimmer = () => {
  return (
    <div className="pt-20 px-5 min-h-screen bg-gradient-to-br from-orange-50 to-pink-50">
      <div className="w-full max-w-4xl mx-auto">
        {/* Shimmer for Hero Section */}
        <div className="text-center mb-12">
          <div className="w-96 h-12 bg-gradient-to-r from-orange-200 to-pink-200 rounded-lg mx-auto mb-4 animate-pulse"></div>
          <div className="w-80 h-6 bg-gradient-to-r from-orange-200 to-pink-200 rounded mx-auto mb-8 animate-pulse"></div>
          <div className="flex justify-center items-center gap-0 max-w-md mx-auto">
            <div className="w-80 h-16 bg-gradient-to-r from-orange-200 to-pink-200 rounded-l-full animate-pulse"></div>
            <div className="w-32 h-16 bg-gradient-to-r from-orange-300 to-red-300 rounded-r-full animate-pulse"></div>
          </div>
        </div>

        {/* Shimmer for Top Rated Button */}
        <div className="flex justify-center mb-8">
          <div className="w-64 h-12 bg-gradient-to-r from-pink-200 to-purple-200 rounded-full animate-pulse"></div>
        </div>

        {/* Shimmer for Restaurant Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 justify-items-center">
          {Array(15).fill("").map((_, index) => (
            <div key={index} className="w-72 bg-white rounded-2xl overflow-hidden shadow-lg animate-pulse border border-orange-100">
              <div className="w-full h-48 bg-gradient-to-br from-orange-200 to-pink-200"></div>
              <div className="p-4 bg-gradient-to-br from-white to-orange-50">
                <div className="flex justify-between items-center mb-2">
                  <div className="w-20 h-4 bg-gray-200 rounded"></div>
                  <div className="w-16 h-4 bg-gray-200 rounded"></div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="w-12 h-3 bg-orange-200 rounded-full"></div>
                  <div className="w-20 h-3 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shimmer;
