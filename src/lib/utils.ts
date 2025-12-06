import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTagLabel(tag: string): string {
  const acronyms: Record<string, string> = {
    lst: "LST",
    nft: "NFT",
  };

  return tag
    .split("-")
    .map((word) => {
      const lowerWord = word.toLowerCase();
      if (acronyms[lowerWord]) {
        return acronyms[lowerWord];
      }
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}
