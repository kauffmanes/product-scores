export enum Product {
  LandCoverFL = '001',
  LandEligibilityFL = '002',
  ARRScopingReport = '003',
  REDDScopingReport = '004',
  ARREligibilityFast = '005'
}

export type Post = {
  comment: string;
  last_update: string;
  id: string;
  country: string;
  user: string;
  score: number;
  product: Product;
};
