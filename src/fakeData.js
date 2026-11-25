// FAKE placeholder data for Step 1 only. Replace with Khadija's own stories later.
// Types: 'folklore' | 'encounter' | 'legend'

export const CITIES = {
  'ann-arbor': { name: 'Ann Arbor', center: [42.2808, -83.743], zoom: 14 },
  lahore: { name: 'Lahore', center: [31.5497, 74.3436], zoom: 13 },
}

export const STORY_TYPES = {
  folklore: { label: 'Local folklore' },
  encounter: { label: 'Personal encounter' },
  legend: { label: 'Invented legend' },
}

export const PLACEHOLDER_PINS = [
  // Ann Arbor
  { id: 'aa-1', city: 'ann-arbor', type: 'folklore', title: 'Placeholder folklore', position: [42.2780, -83.7382] },
  { id: 'aa-2', city: 'ann-arbor', type: 'encounter', title: 'Placeholder encounter', position: [42.2831, -83.7430] },
  { id: 'aa-3', city: 'ann-arbor', type: 'legend', title: 'Placeholder legend', position: [42.2760, -83.7490], votes: 12, retellings: 3 },
  // Lahore
  { id: 'lh-1', city: 'lahore', type: 'folklore', title: 'Placeholder folklore', position: [31.5880, 74.3100] },
  { id: 'lh-2', city: 'lahore', type: 'encounter', title: 'Placeholder encounter', position: [31.5820, 74.3290] },
  { id: 'lh-3', city: 'lahore', type: 'legend', title: 'Placeholder legend', position: [31.5560, 74.3350], votes: 30, retellings: 6 },
]
