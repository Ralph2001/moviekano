//@components/MovieCardLoading.tsx
export const MovieCardLoading = () => {
  return (
    <div className="flex flex-wrap gap-4">
      <div className="flex flex-col gap-2 w-full h-full md:lg:min-w-[10rem] md:lg:max-w-[10rem] outline-none focus:outline-none ring-0 group animate-pulse">
        {/* Image placeholder */}
        <div className="relative w-full h-[15rem] bg-gray-700 " />

        {/* Text placeholder */}
        <div className="h-[3rem] flex flex-col gap-1">
          <div className="h-4 bg-gray-700 rounded w-3/4" />
          <div className="h-3 bg-gray-700 rounded w-1/2" />
        </div>
      </div>
    </div>
  );
};
