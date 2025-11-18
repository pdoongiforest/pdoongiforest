function MypageSectionSkeleton() {
  return (
    <>
      {/* ProfileSection Skeleton */}
      <section className="mx-6 relative">
        {/* ProfileSectionHeader Skeleton */}
        <div className="h-9 w-48 bg-gray-200 rounded animate-pulse mb-6" />

        {/* ProfileCard Container Skeleton */}
        <div className="border border-gray-300 rounded-lg px-8 py-5 md:mt-6 mt-12">
          {/* ProfileCard Skeleton */}
          <div className="flex gap-4 md:flex-row flex-col">
            {/* ProfileImage Skeleton */}
            <div className="w-40 h-40 bg-gray-200 rounded-lg animate-pulse" />

            {/* ProfileInfo Skeleton */}
            <div className="flex flex-col gap-3 flex-1">
              <div className="h-8 w-32 bg-gray-200 rounded animate-pulse" />
              <div className="h-6 w-24 bg-gray-200 rounded animate-pulse" />
              <div className="h-6 w-20 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>

          {/* Social Skeleton */}
          <div className="flex gap-5 justify-between mt-5 md:flex-row flex-col">
            {/* 소셜 링크 Skeleton */}
            <div className="w-1/2 flex flex-col gap-2">
              <div className="h-6 w-16 bg-gray-200 rounded animate-pulse" />
              <ul className="flex gap-2">
                <li className="w-10 h-10 bg-gray-200 rounded-xl animate-pulse" />
                <li className="w-10 h-10 bg-gray-200 rounded-xl animate-pulse" />
                <li className="w-10 h-10 bg-gray-200 rounded-xl animate-pulse" />
              </ul>
            </div>

            {/* 관심 분야 Skeleton */}
            <div className="w-1/2 flex flex-col gap-2">
              <div className="h-6 w-20 bg-gray-200 rounded animate-pulse" />
              <ul className="flex gap-2 flex-wrap">
                <li className="h-7 w-20 bg-gray-200 rounded-xl animate-pulse" />
                <li className="h-7 w-16 bg-gray-200 rounded-xl animate-pulse" />
                <li className="h-7 w-24 bg-gray-200 rounded-xl animate-pulse" />
              </ul>
            </div>
          </div>

          {/* ProfileButtonGroup Skeleton */}
          <div className="flex gap-4 mt-6">
            <div className="h-10 w-24 bg-gray-200 rounded animate-pulse" />
            <div className="h-10 w-24 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </section>

      {/* AboutSection Skeleton */}
      <div className="mx-6 mt-5 bg-primary/20 py-2 px-4 rounded-lg">
        <div className="h-7 w-24 bg-gray-200 rounded animate-pulse mb-2" />
        <div className="space-y-2">
          <div className="h-5 w-full bg-gray-200 rounded animate-pulse" />
          <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>

      {/* ContentSection Skeleton */}
      <>
        {/* MypageTabs Skeleton */}
        <div className="flex gap-10 mx-6 px-2 mt-10">
          <div className="h-7 w-24 bg-gray-200 rounded animate-pulse" />
          <div className="h-7 w-20 bg-gray-200 rounded animate-pulse" />
        </div>

        {/* Container Skeleton */}
        <section className="mx-6 mt-5">
          <div className="w-full border border-gray-300 rounded-lg p-6">
            <div className="space-y-4">
              <div className="h-20 w-full bg-gray-200 rounded animate-pulse" />
              <div className="h-20 w-full bg-gray-200 rounded animate-pulse" />
              <div className="h-20 w-full bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        </section>
      </>
    </>
  );
}

export default MypageSectionSkeleton;
