export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#29B6F6] to-[#26D0B2] flex flex-col items-center justify-center p-6 text-white">
      <div className="w-20 h-20 rounded-full border-4 border-white border-t-transparent animate-spin"></div>
      <p className="mt-4 text-lg font-medium">Connecting...</p>
    </div>
  )
}
