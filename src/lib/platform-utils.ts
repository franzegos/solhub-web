import type { SolanaProject } from "@/data/projects";
import type { Platform } from "@jup-ag/platform-list";

export type PlatformTag =
  | "dapp"
  | "tool"
  | "cex"
  | "nft-collection"
  | "nft-marketplace"
  | "lst"
  | "gaming"
  | "bridge"
  | "dao"
  | "memecoin"
  | "stablecoin"
  | "wallet"
  | "launchpad"
  | "dex"
  | "social"
  | "depin"
  | "desci"
  | "fitness"
  | "liquidity-provider";

export type { Platform };

export const transformPlatformToProject = (
  platform: Platform
): SolanaProject => {
  return {
    id: platform.id,
    name: platform.name,
    tags: platform.tags || [],
    links: {
      website: platform.links.website,
      twitter: platform.links.twitter,
      discord: platform.links.discord,
      telegram: platform.links.telegram,
      medium: platform.links.medium,
      documentation: platform.links.documentation,
    },
    tokens: platform.tokens,
    image: platform.image,
    isDeprecated: platform.isDeprecated,
    defiLlamaId: platform.defiLlamaId,
  };
};
