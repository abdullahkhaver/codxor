const ProfileSkeleton = () => (
  <div className="w-screen h-screen flex items-center justify-center bg-[#0f1117] p-4">
    <div className="w-full max-w-6xl h-[80vh] bg-[#1a1d24] backdrop-blur-lg rounded-2xl shadow-xl border border-[#2d2f36] flex">
      <div className="w-1/3 flex flex-col items-center justify-center p-8 border-r border-[#2d2f36]">
        <Skeleton className="w-32 h-32 rounded-full bg-[#2d2f36]" />
        <Skeleton className="h-6 w-48 bg-[#2d2f36] mt-4" />
        <Skeleton className="h-4 w-32 bg-[#2d2f36] mt-2" />
        <Skeleton className="h-8 w-40 rounded-full bg-[#2d2f36] mt-6" />
      </div>
      <div className="w-2/3 p-8">
        <Skeleton className="h-6 w-32 bg-[#2d2f36] mb-6" />
        <Skeleton className="h-24 w-full bg-[#2d2f36] rounded-xl mb-8" />
        <div className="grid grid-cols-2 gap-6 mb-8">
          <Skeleton className="h-20 bg-[#2d2f36] rounded-xl" />
          <Skeleton className="h-20 bg-[#2d2f36] rounded-xl" />
        </div>
        <Skeleton className="h-6 w-32 bg-[#2d2f36] mb-4" />
        <div className="grid grid-cols-2 gap-4">
          <Skeleton className="h-16 bg-[#2d2f36] rounded-lg" />
          <Skeleton className="h-16 bg-[#2d2f36] rounded-lg" />
          <Skeleton className="h-16 bg-[#2d2f36] rounded-lg" />
          <Skeleton className="h-16 bg-[#2d2f36] rounded-lg" />
        </div>
      </div>
    </div>
  </div>
);

export default ProfileSkeleton
