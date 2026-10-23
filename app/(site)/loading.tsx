import { Skeleton } from "@/components/ui/skeleton";

export default function SiteLoading() {
  return (
    <div className="container-x pt-36">
      <Skeleton className="h-4 w-32" />
      <Skeleton className="mt-6 h-16 w-3/4 max-w-2xl" />
      <Skeleton className="mt-4 h-5 w-full max-w-xl" />
      <Skeleton className="mt-2 h-5 w-2/3 max-w-lg" />
      <div className="mt-10 flex gap-3">
        <Skeleton className="h-12 w-40 rounded-full" />
        <Skeleton className="h-12 w-40 rounded-full" />
      </div>
      <div className="mt-16 grid gap-5 md:grid-cols-2">
        <Skeleton className="h-64 rounded-2xl" />
        <Skeleton className="h-64 rounded-2xl" />
      </div>
    </div>
  );
}
