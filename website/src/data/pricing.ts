export const tiers = [
  {
    name: 'Free',
    price: 'Always free.',
    features: [
      'Fish agents in your tools',
      'Local context capture',
      'Open source',
    ],
    cta: 'Download',
    ctaStyle: 'outline' as const,
    href: '/DubleSlash.dmg',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '$12 / month',
    features: [
      'Personal agents + Context Cloud',
      'Cross-session memory',
      'Cipher redaction',
    ],
    cta: 'Get Pro',
    ctaStyle: 'filled' as const,
    href: 'https://app.dubleslash.com',
    highlighted: true,
  },
  {
    name: 'Team',
    price: '$24 / seat / month',
    features: [
      'Full system agents + team graph',
      'Digest — replaces standups',
      'Beacon handoff routing',
    ],
    cta: 'Get Team',
    ctaStyle: 'filled' as const,
    href: 'https://app.dubleslash.com',
    highlighted: false,
  },
] as const
