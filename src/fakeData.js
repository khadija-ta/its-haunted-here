// FAKE placeholder data for Step 1 only. Replace with Khadija's own stories later.
// Types: 'folklore' | 'encounter' | 'legend'

export const CITIES = {
  'ann-arbor': { name: 'Ann Arbor', center: [42.2808, -83.743], zoom: 16 },
  lahore: { name: 'Lahore', center: [31.5700, 74.3310], zoom: 16 }, // between the Walled City and Mall Road
}

export const STORY_TYPES = {
  folklore: { label: 'Local folklore' },
  encounter: { label: 'Personal encounter' },
  legend: { label: 'Invented legend' },
}

export const PLACEHOLDER_PINS = [
  // Ann Arbor
  { id: 'aa-1', city: 'ann-arbor', type: 'folklore', title: 'Placeholder folklore', position: [42.2796, -83.7462] },
  { id: 'aa-2', city: 'ann-arbor', type: 'encounter', title: 'Placeholder encounter', position: [42.2822, -83.7418] },
  { id: 'aa-3', city: 'ann-arbor', type: 'legend', title: 'Placeholder legend', position: [42.2785, -83.7405], votes: 12, retellings: 3 },
  // Lahore
  { id: 'lh-1', city: 'lahore', type: 'folklore', title: 'Placeholder folklore', position: [31.5722, 74.3288] },
  { id: 'lh-2', city: 'lahore', type: 'encounter', title: 'Placeholder encounter', position: [31.5712, 74.3342] },
  { id: 'lh-3', city: 'lahore', type: 'legend', title: 'Placeholder legend', position: [31.5688, 74.3305], votes: 30, retellings: 6 },
]
