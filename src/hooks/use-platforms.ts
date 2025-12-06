import { platforms } from "@jup-ag/platform-list";
import type { Platform } from "@/lib/platform-utils";

export const usePlatforms = () => {
  return {
    data: platforms as Platform[],
    isLoading: false,
    error: null,
    refetch: () => Promise.resolve({ data: platforms as Platform[] }),
  };
};
