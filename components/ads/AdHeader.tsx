'use client'
export default function AdHeader() {
  return (
    <div className="w-full flex justify-center py-2 bg-gray-50 border-b border-gray-100">
      <div className="hidden md:flex w-[728px] h-[90px] bg-gray-200 items-center justify-center text-gray-400 text-xs rounded">[Ad 728×90]</div>
      <div className="flex md:hidden w-[320px] h-[50px] bg-gray-200 items-center justify-center text-gray-400 text-xs rounded">[Ad 320×50]</div>
    </div>
  )
}
