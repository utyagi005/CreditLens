export const loaderPhrases = [
  'Initializing CreditLens',
  'Loading risk engine',
  'Mapping credit exposures',
  'Preparing investment intelligence',
]

export const metricChips = [
  { label: 'DSCR', value: '1.42x', tone: 'cyan' },
  { label: 'Leverage', value: '4.8x', tone: 'violet' },
  { label: 'Yield', value: '8.7%', tone: 'silver' },
  { label: 'Covenant Headroom', value: '18%', tone: 'cyan' },
  { label: 'Risk Score', value: 'Medium', tone: 'amber' },
]

export const platformModules = [
  {
    title: 'Deal Intake',
    copy: 'Normalize lender decks, CIMs, models, and covenant packages into an auditable opportunity record.',
    meta: 'Source control',
  },
  {
    title: 'Bottom-Up Credit Analysis',
    copy: 'Model revenue durability, collateral strength, debt service, liquidity, and downside recovery in one workspace.',
    meta: 'Risk engine',
  },
  {
    title: 'Relative Value Engine',
    copy: 'Compare spread, structure, leverage, sponsor quality, and sector risk across public and private comps.',
    meta: 'Market context',
  },
  {
    title: 'IC Memo Generator',
    copy: 'Generate committee-ready memos with assumptions, risks, recommendation logic, and monitoring plans.',
    meta: 'Memo control',
  },
]

export const positioningItems = [
  'Private credit',
  'Infrastructure debt',
  'Direct lending',
  'Portfolio teams',
]

export const dashboardRows = [
  {
    opportunity: 'Data Center HoldCo',
    sector: 'Digital infra',
    yield: '9.1%',
    leverage: '5.2x',
    dscr: '1.36x',
    risk: 'Medium',
    recommendation: 'Proceed',
  },
  {
    opportunity: 'Solar Portfolio SPV',
    sector: 'Renewables',
    yield: '8.3%',
    leverage: '4.1x',
    dscr: '1.58x',
    risk: 'Low',
    recommendation: 'Increase',
  },
  {
    opportunity: 'Logistics Term Loan',
    sector: 'Industrial',
    yield: '8.7%',
    leverage: '4.8x',
    dscr: '1.42x',
    risk: 'Medium',
    recommendation: 'Watch',
  },
  {
    opportunity: 'Toll Road Concession',
    sector: 'Transport',
    yield: '7.6%',
    leverage: '6.0x',
    dscr: '1.24x',
    risk: 'Elevated',
    recommendation: 'Reprice',
  },
  {
    opportunity: 'Midstream Infra Debt',
    sector: 'Energy',
    yield: '8.9%',
    leverage: '4.5x',
    dscr: '1.51x',
    risk: 'Medium',
    recommendation: 'Proceed',
  },
]

export const stressScenarios = [
  {
    title: 'Base Case',
    dscr: '1.48x',
    coverage: '2.7x',
    headroom: '22%',
    recommendation: 'Proceed',
  },
  {
    title: 'Downside Case',
    dscr: '1.21x',
    coverage: '2.0x',
    headroom: '9%',
    recommendation: 'Watch',
  },
  {
    title: 'Rate Shock',
    dscr: '1.17x',
    coverage: '1.9x',
    headroom: '7%',
    recommendation: 'Hedge',
  },
  {
    title: 'EBITDA Compression',
    dscr: '1.08x',
    coverage: '1.6x',
    headroom: '3%',
    recommendation: 'Reprice',
  },
  {
    title: 'Refinancing Stress',
    dscr: '1.14x',
    coverage: '1.8x',
    headroom: '5%',
    recommendation: 'Limit size',
  },
]

export const memoSections = [
  'Executive Summary',
  'Business Overview',
  'Credit Metrics',
  'Key Risks',
  'Relative Value',
  'Recommendation',
  'Monitoring Plan',
]

export const monitoringFeatures = [
  'Covenant breach detection',
  'Watchlist automation',
  'Risk migration tracking',
  'Maturity wall analysis',
  'Exposure by sector',
  'Portfolio performance notes',
]
