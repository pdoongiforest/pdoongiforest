function FormSectionSkeleton() {
  return (
    <form className="flex flex-col gap-6 w-full" aria-label="프로필 정보 수정 폼">
      <fieldset className="flex flex-col gap-6">
        <legend className="sr-only">프로필 정보</legend>

        {/* ImageSection Skeleton */}
        <div className="flex items-center gap-4 flex-col">
          <div className="relative w-40 h-40 rounded-lg bg-gray-200 animate-pulse" />
        </div>

        {/* ProfileInfoSection Skeleton */}
        <div className="flex flex-col gap-2">
          <div className="h-5 w-20 bg-gray-200 rounded animate-pulse" />
          <div className="h-8 w-full bg-gray-200 rounded-md animate-pulse" />
          <div className="h-4 w-48 bg-gray-200 rounded animate-pulse" />
        </div>

        {/* RoleSection Skeleton */}
        <div className="flex flex-col gap-2">
          <div className="h-5 w-16 bg-gray-200 rounded animate-pulse" />
          <div className="h-8 w-full bg-gray-200 rounded-md animate-pulse" />
        </div>

        {/* AgeSection Skeleton */}
        <div className="flex flex-col gap-2">
          <div className="h-5 w-12 bg-gray-200 rounded animate-pulse" />
          <div className="h-8 w-full bg-gray-200 rounded-md animate-pulse" />
          <div className="h-4 w-64 bg-gray-200 rounded animate-pulse" />
        </div>

        {/* InterestSection Skeleton */}
        <div className="flex flex-col gap-2">
          <div className="h-5 w-20 bg-gray-200 rounded animate-pulse" />
          <div className="h-8 w-full bg-gray-200 rounded-md animate-pulse" />
          <div className="h-4 w-80 bg-gray-200 rounded animate-pulse" />
          {/* 태그 스켈레톤 */}
          <ul className="flex flex-wrap gap-2 mt-2">
            <li className="h-7 w-20 bg-gray-200 rounded-md animate-pulse" />
            <li className="h-7 w-16 bg-gray-200 rounded-md animate-pulse" />
            <li className="h-7 w-24 bg-gray-200 rounded-md animate-pulse" />
          </ul>
        </div>
      </fieldset>

      {/* SocialLinksField Skeleton */}
      <div className="flex flex-col gap-2">
        <div className="h-6 w-24 bg-gray-200 rounded animate-pulse" />
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <div className="h-8 flex-1 bg-gray-200 rounded-md animate-pulse" />
            <div className="h-8 flex-1 bg-gray-200 rounded-md animate-pulse" />
            <div className="h-8 w-16 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
        <div className="h-8 w-24 bg-gray-200 rounded-md animate-pulse" />
      </div>

      {/* IntroduceSection Skeleton */}
      <fieldset>
        <legend className="sr-only">자기소개</legend>
        <div className="flex flex-col gap-2">
          <div className="h-5 w-20 bg-gray-200 rounded animate-pulse" />
          <div className="h-32 w-full bg-gray-200 rounded-md animate-pulse" />
        </div>
      </fieldset>

      {/* FormActions Skeleton */}
      <div className="flex flex-col gap-5 mt-20">
        <div className="h-10 w-full bg-gray-200 rounded-lg animate-pulse" />
        <div className="h-8 w-full bg-gray-200 rounded-md animate-pulse" />
      </div>
    </form>
  );
}

export default FormSectionSkeleton;
