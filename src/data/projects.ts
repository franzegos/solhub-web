export interface SolanaProject {
  id: string;
  name: string;
  tags: string[];
  links: {
    website?: string;
    twitter?: string;
    discord?: string;
    telegram?: string;
    medium?: string;
    documentation?: string;
  };
  tokens?: string[];
  image: string;
  isDeprecated: boolean;
  defiLlamaId?: string;
}
