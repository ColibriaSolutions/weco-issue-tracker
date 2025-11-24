// Hardcoded list of supported regions
export const REGIONS = [
    { code: 'CA', name: 'Canada' },
    { code: 'TN', name: 'Tunisia' },
    { code: 'CN-SZ', name: 'Shenzhen' },
    { code: 'HK', name: 'Hong Kong' },
    { code: 'MX', name: 'Mexico' },
    { code: 'BR', name: 'Brazil' },
] as const

export type RegionCode = typeof REGIONS[number]['code']
