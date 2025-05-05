export default function Loading() {
  return (
    <div className="min-h-screen text-gray-800 relative">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Main background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-[#f0fbfa] to-[#e6f7f5] z-[-2]"></div>

        {/* Floating gradient blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-b from-primary-light to-transparent rounded-full opacity-40 transform translate-x-1/3 -translate-y-1/3 blur-3xl bg-float"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-t from-secondary-light to-transparent rounded-full opacity-40 transform -translate-x-1/3 translate-y-1/3 blur-3xl bg-float-reverse"></div>
      </div>

      {/* Main content with loading indicators */}
      <main className="pb-24 px-4 pt-4 relative z-10">
        {/* Header with skeleton */}
        <div className="mb-6">
          <div className="h-8 w-48 bg-gray-200 rounded-md animate-pulse mb-2"></div>
          <div className="h-6 w-72 bg-gray-200 rounded-md animate-pulse"></div>
        </div>

        {/* Search bar skeleton */}
        <div className="mb-6 relative">
          <div className="h-14 bg-gray-200 rounded-full animate-pulse"></div>
        </div>

        {/* Guidelines content skeletons */}
        <div className="space-y-4 mb-20">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="border rounded-xl bg-gray-100 shadow-sm mb-4 overflow-hidden">
              <div className="px-4 py-4 flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse mr-3 flex-shrink-0"></div>
                <div className="h-6 w-48 bg-gray-200 rounded-md animate-pulse"></div>
              </div>
              <div className="px-4 pb-4 pt-0">
                <div className="space-y-4 pl-11">
                  <div className="border-l-2 border-gray-200 pl-4 py-1">
                    <div className="h-5 w-full bg-gray-200 rounded-md animate-pulse mb-2"></div>
                    <div className="h-4 w-full bg-gray-200 rounded-md animate-pulse"></div>
                    <div className="h-4 w-3/4 bg-gray-200 rounded-md animate-pulse mt-2"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Fixed Navigation Bar - Floating style */}
      <div className="fixed bottom-6 left-0 right-0 flex justify-center z-30">
        <div className="flex justify-around items-center py-3 px-6 bg-white rounded-full shadow-lg w-[85%] max-w-md">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="p-3 rounded-full">
              <div className="w-5 h-5 bg-gray-200 rounded-full animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
