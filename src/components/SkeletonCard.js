const SkeletonCard = () => {
  return (
    <div className="w-80 bg-white rounded-3xl overflow-hidden shadow-premium border border-gray-100 animate-pulse">
      <div className="relative">
        {/* Image skeleton */}
        <div className="w-full h-56 bg-gradient-to-br from-gray-200 to-gray-300"></div>

        {/* Rating badge skeleton */}
        <div className="absolute top-4 right-4 w-16 h-6 bg-white/80 rounded-full"></div>

        {/* Top rated badge skeleton */}
        <div className="absolute top-4 left-4 w-20 h-5 bg-gradient-to-r from-yellow-300 to-orange-300 rounded-full"></div>

        {/* Restaurant info overlay skeleton */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="h-6 bg-black/20 rounded mb-2"></div>
          <div className="h-4 bg-black/10 rounded mb-2 w-3/4"></div>
          <div className="flex justify-between">
            <div className="h-4 bg-black/10 rounded w-16"></div>
            <div className="h-4 bg-black/10 rounded w-20"></div>
          </div>
        </div>
      </div>

      <div className="p-4 bg-gradient-to-br from-white to-gray-50">
        <div className="flex items-center justify-between mb-3">
          <div className="w-20 h-5 bg-blue-100 rounded-full"></div>
          <div className="w-16 h-4 bg-gray-200 rounded"></div>
        </div>
        <div className="w-full h-12 bg-gradient-to-r from-orange-200 to-pink-200 rounded-2xl"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;
