import { Skeleton } from "@/components/shadcn/skeleton";

export default function ItemLoading() {
  return (
    <section className="max-w-screen-lg mx-auto p-4 md:p-6 lg:px-0 lg:py-8 space-y-6">
      <Skeleton className="w-[224px] lg:w-[284px] h-7" />
      <div className="mt-4 space-y-2">
        <div className="flex-between gap-x-6">
          <Skeleton className="w-[256px] h-10" />
          <div className="flex-end gap-x-2">
            <Skeleton className="w-10 min-w-10 lg:w-24 h-10" />
            <Skeleton className="w-10 min-w-10 lg:w-28 h-10" />
          </div>
        </div>
        <Skeleton className="w-full lg:w-[356px] h-6" />
        <Skeleton className="w-[92px] h-7 rounded-full" />
      </div>
    </section>
  );
}
