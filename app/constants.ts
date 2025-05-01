export enum Products {
  LandCoverFL = '001',
  LandEligibilityFL = '002',
  ARRScopingReport = '003',
  REDDScopingReport = '004',
  ARREligibilityFast = '005'
}

export const productNames = {
  [Products.LandCoverFL]: 'Land Cover FL',
  [Products.LandEligibilityFL]: 'Land Eligibility FL',
  [Products.ARRScopingReport]: 'ARR Scoping Report',
  [Products.REDDScopingReport]: 'REDD Scoping Report',
  [Products.ARREligibilityFast]: 'ARR Eligibility Fast'
};
