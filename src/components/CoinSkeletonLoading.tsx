import { Skeleton } from '@/components/ui/skeleton';

const CoinSkeletonLoading = () => {
  return (
    <div
      className={`group
        w-full
        rounded-lg
        border-2
        border-gray-800
        p-3
        flex
        flex-col
        gap-y-2
        cursor-pointer
        transition
        hover:border-gray-700`}
    >
      <Skeleton className="h-5 w-24 rounded-xl" />
      {/* Coin Fullname */}
      <Skeleton className="h-5 w-full rounded-xl" />
      {/* Coin Fullname */}
      {/* Coin Price */}
      <Skeleton className="h-5 w-full rounded-xl" />
      {/* Coin Price */}
      {/* Day Volume */}
      <Skeleton className="h-5 w-24 rounded-xl" />
      {/* Day Volume */}
    </div>
  );
};

export default CoinSkeletonLoading;
