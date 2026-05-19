import { Archetype, Phase, Context, StreamProgress, StreamMethod } from '../types'

interface RecipeMethod {
  id: string
  name: string
}

// Budget strings per archetype × phase (from fish-model.md §7)
export const STREAM_BUDGETS: Record<Archetype, Record<Phase, string>> = {
  nemo:   { explore: '10–30 min', solidify: '30 min–2 h', build: '15 min–4 h',  ship: '15–30 min' },
  tuna:   { explore: 'half-day–1 day', solidify: '1–3 days', build: 'multi-sprint', ship: 'half-day' },
  salmon: { explore: 'multi-day', solidify: '2–5 days', build: '1–3 days', ship: '1–2 days' },
  willy:  { explore: '2+ weeks', solidify: '1–3 weeks', build: 'month+', ship: 'multi-week' },
}

// Canonical method sets per archetype × phase (from fish-model.md §6 and §7)
export const FISH_RECIPE: Record<Archetype, Record<Phase, RecipeMethod[]>> = {
  nemo: {
    explore: [
      { id: 'competitor-scan',  name: 'Competitor scan'       },
      { id: 'micro-brief',      name: 'Micro-brief'           },
      { id: 'heuristic-eval',   name: 'Heuristic evaluation'  },
      { id: 'hmw-reframe',      name: 'HMW reframe'           },
    ],
    solidify: [
      { id: 'problem-framing',  name: 'Problem framing'       },
      { id: 'one-sketch',       name: 'One sketch'            },
      { id: 'ac-3-5',           name: 'AC (3–5 bullets)'      },
      { id: 'hicks-law-check',  name: 'Hick\'s Law check'     },
    ],
    build: [
      { id: 'smallest-change',  name: 'Smallest change'       },
      { id: 'golden-path-test', name: 'Golden-path test'      },
      { id: 'ac-as-tests',      name: 'AC as tests'           },
    ],
    ship: [
      { id: 'one-line-changelog', name: 'One-line changelog'  },
      { id: 'trust-receipt',      name: 'Trust receipt'       },
      { id: 'beta-groups',        name: 'Beta groups'         },
      { id: 'heatmaps',           name: 'Heatmaps'            },
    ],
  },

  tuna: {
    explore: [
      { id: 'competitor-scan',     name: 'Competitor scan'         },
      { id: 'micro-brief',         name: 'Micro-brief'             },
      { id: 'heuristic-eval',      name: 'Heuristic evaluation'    },
      { id: 'convention-inventory',name: 'Convention inventory'    },
      { id: 'journey-map',         name: 'Journey mapping'         },
      { id: 'osd',                 name: 'OSD'                     },
    ],
    solidify: [
      { id: 'storyboard',          name: 'Storyboard'              },
      { id: 'brief',               name: 'Brief (journey-structured)' },
      { id: 'microinteraction-specs', name: 'Microinteraction specs' },
      { id: 'design-system-ext',   name: 'Design-system extension' },
      { id: 'ac-multi',            name: 'AC (multi-category)'     },
      { id: 'journey-meeting',     name: 'Journey meeting'         },
    ],
    build: [
      { id: 'component-library',   name: 'Component library first' },
      { id: 'iterative-prototype', name: 'Iterative prototyping'   },
      { id: 'vertical-slices',     name: 'Thin vertical slices'    },
      { id: 'motion-principles',   name: 'Motion principles'       },
      { id: 'joint-review',        name: 'Joint review'            },
    ],
    ship: [
      { id: 'changelog',           name: 'Full changelog'          },
      { id: 'release-notes',       name: 'Release notes'           },
      { id: 'feedback-loops',      name: 'Feedback loops'          },
      { id: 'private-preview',     name: 'Private preview'         },
      { id: 'journey-meeting-ship',name: 'Journey meeting'         },
      { id: 'trust-receipt',       name: 'Trust receipt'           },
    ],
  },

  salmon: {
    explore: [
      { id: 'user-interviews',     name: 'User interviews (5–8)'   },
      { id: 'tzumi',               name: 'TZUMI'                   },
      { id: 'nugget-board',        name: 'Nugget board'            },
      { id: 'task-analysis',       name: 'Task analysis'           },
      { id: 'journey-map',         name: 'Journey mapping'         },
      { id: 'jtbd',                name: 'JTBD'                    },
    ],
    solidify: [
      { id: 'problem-framing',     name: 'Problem framing'         },
      { id: 'brief-1pg',           name: 'One-page brief'          },
      { id: 'concept-test',        name: 'Concept test (3–5 users)'},
      { id: 'affinity-analysis',   name: 'Affinity / action / cognitive analysis' },
      { id: 'measurement-plan',    name: 'Measurement plan'        },
      { id: 'ac-evidence',         name: 'Evidence-informed AC'    },
    ],
    build: [
      { id: 'crazy-6',             name: 'Crazy 6'                 },
      { id: 'co-creation',         name: 'Co-creation'             },
      { id: 'instrumented-build',  name: 'Instrumented build'      },
      { id: 'usability-test',      name: 'Usability test (3–5 users)' },
      { id: 'iterate-once',        name: 'Iterate once'            },
    ],
    ship: [
      { id: 'baseline-measure',    name: 'Baseline measurement'    },
      { id: 'iso-9241',            name: 'ISO 9241 triad'          },
      { id: 'learning-log',        name: 'Learning log'            },
      { id: 'next-loop-queue',     name: 'Next-loop queue'         },
      { id: 'trust-receipt',       name: 'Trust receipt'           },
    ],
  },

  willy: {
    explore: [
      { id: 'market-scan',         name: 'Market / competitive scan' },
      { id: 'user-interviews',     name: 'User interviews (8–15)'  },
      { id: 'tzumi',               name: 'TZUMI (multi-cohort)'    },
      { id: 'contextual-inquiry',  name: 'Contextual inquiry'      },
      { id: 'goal-directed-design',name: 'Goal-Directed Design'    },
      { id: 'jtbd',                name: 'JTBD'                    },
      { id: 'osd',                 name: 'OSD (end-to-end)'        },
      { id: 'premortem',           name: 'Premortem'               },
      { id: 'scenario-planning',   name: 'Scenario planning'       },
      { id: 'pitch-outline',       name: 'Pitch outline'           },
    ],
    solidify: [
      { id: 'pitch-rfc',           name: 'Pitch / RFC'             },
      { id: 'concept-tests-3',     name: 'Concept tests (2–3)'     },
      { id: 'spectrum-mapping',    name: 'Spectrum mapping'        },
      { id: 'five-whys',           name: '5 Whys'                  },
      { id: 'swot',                name: 'SWOT'                    },
      { id: 'ac-multi-level',      name: 'Multi-level AC'          },
      { id: 'decision-log',        name: 'Decision log'            },
      { id: 'measurement-plan',    name: 'Measurement plan'        },
      { id: 'stakeholder-journeys',name: 'Stakeholder journey meetings' },
    ],
    build: [
      { id: 'tuna-sub-cards',      name: 'Break into Tuna sub-cards' },
      { id: 'thin-vertical-slice', name: 'Thin vertical slice first' },
      { id: 'integrated-reqs',     name: 'Integrated requirements' },
      { id: 'joint-reviews',       name: 'Joint product reviews'   },
      { id: 'staged-rollout',      name: 'Staged rollout'          },
      { id: 'measure-per-slice',   name: 'Measure per slice'       },
    ],
    ship: [
      { id: 'canary-release',      name: 'Canary release'          },
      { id: 'ab-test',             name: 'A/B test'                },
      { id: 'per-stage-measure',   name: 'Per-stage measurement'   },
      { id: 'retrospective',       name: 'Retrospective'           },
      { id: 'master-trust-receipt',name: 'Master trust receipt'    },
      { id: 'next-loop-queue',     name: 'Next-loop queue'         },
    ],
  },
}

export function getRecipe(archetype: Archetype, phase: Phase): RecipeMethod[] {
  return FISH_RECIPE[archetype]?.[phase] ?? []
}

export function computeStreamProgress(context: Context): StreamProgress {
  if (!context.archetype) return { total: 0, completed: 0, methods: [] }
  const recipe = getRecipe(context.archetype, context.phase)
  if (context.streamProgress?.methods?.length) {
    const statusMap = Object.fromEntries(
      context.streamProgress.methods.map(m => [m.id, m])
    ) as Record<string, StreamMethod>
    const methods: StreamMethod[] = recipe.map(r =>
      statusMap[r.id] ?? { ...r, status: 'pending' as const }
    )
    const completed = methods.filter(m => m.status === 'done').length
    return { total: methods.length, completed, methods }
  }
  return {
    total: recipe.length,
    completed: 0,
    methods: recipe.map(r => ({ ...r, status: 'pending' as const })),
  }
}

export function getNextMethod(context: Context): RecipeMethod | null {
  const progress = computeStreamProgress(context)
  return progress.methods.find(m => m.status === 'pending' || m.status === 'in-progress') ?? null
}

export function getNextPhase(phase: Phase): Phase | null {
  const idx = (['explore', 'solidify', 'build', 'ship'] as Phase[]).indexOf(phase)
  if (idx === -1 || idx === 3) return null
  return (['explore', 'solidify', 'build', 'ship'] as Phase[])[idx + 1]
}
