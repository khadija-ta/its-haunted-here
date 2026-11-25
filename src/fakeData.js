// FAKE placeholder data. Every story below is marked "[Placeholder]".
// Replace with Khadija's own stories later.
// Types: 'folklore' | 'encounter' | 'legend'

// `bounds` = rough box around each city: [[south, west], [north, east]].
// Stories can only be pinned inside it.
export const CITIES = {
  'ann-arbor': { name: 'Ann Arbor', center: [42.2808, -83.743], zoom: 16, bounds: [[42.22, -83.8], [42.325, -83.67]] },
  lahore: { name: 'Lahore', center: [31.5700, 74.3310], zoom: 16, bounds: [[31.38, 74.2], [31.64, 74.48]] }, // center is between the Walled City and Mall Road
}

export const PLACE_TYPES = ['Old tree', 'Graveyard', 'Haveli / old house', 'Historic site', 'Campus', 'Restaurant / shop', 'Street / road', 'Other']
export const TIMES_OF_DAY = ['Dawn', 'Morning', 'Afternoon', 'Dusk', 'Evening', 'Night', 'Middle of the night']

export const STORY_TYPES = {
  folklore: { label: 'Local folklore' },
  encounter: { label: 'Personal encounter' },
  legend: { label: 'Invented legend' },
}

// "What happened" tags. `urdu` labels are shown on Lahore stories only.
export const TAGS = {
  whispers: { label: 'Whispers', urdu: 'سرگوشیاں', roman: 'sargoshiyan' },
  footsteps: { label: 'Footsteps on stairs or roof' },
  voice: { label: 'A voice calling your name' },
  knocking: { label: 'Knocking' },
  laughter: { label: 'Laughter or giggling' },
  cold: { label: 'Cold spot' },
  touch: { label: 'Unseen touch' },
  pressed: { label: 'Pressed down in sleep', urdu: 'بختک', roman: 'bakhtak' },
  watched: { label: 'Feeling watched' },
  moving: { label: 'Things moving or falling' },
  doors: { label: 'Doors opening or closing' },
  lights: { label: 'Lights or electronics acting up' },
  food: { label: 'Food spoiling fast' },
  smell: { label: 'Strange smell' },
  figure: { label: 'A figure' },
  animals: { label: 'Animals acting strange' },
}

// Tag groups, in the order they appear on the Post form
export const TAG_GROUPS = [
  { label: 'Sounds', ids: ['whispers', 'footsteps', 'voice', 'knocking', 'laughter'] },
  { label: 'Body', ids: ['cold', 'touch', 'pressed', 'watched'] },
  { label: 'Surroundings', ids: ['moving', 'doors', 'lights', 'food', 'smell'] },
  { label: 'Sightings', ids: ['figure', 'animals'] },
]

export const PLACEHOLDER_STORIES = [
  // Ann Arbor
  {
    id: 'aa-1', city: 'ann-arbor', type: 'folklore', position: [42.2796, -83.7462],
    titleLead: '[Placeholder] The old well at ', place: 'Placeholder Park',
    placeType: 'Old tree', timeOfDay: 'Dusk',
    tags: ['cold', 'watched'],
    text: '[Placeholder] This is where Khadija’s own local folklore story will go. People say the ground near the old tree is always colder than the rest of the park, even in summer. Replace this text with a story you wrote yourself.',
    author: '[Placeholder author]', date: '1 Oct 2026', votes: 4, meToo: 0,
  },
  {
    id: 'aa-2', city: 'ann-arbor', type: 'encounter', position: [42.2822, -83.7418],
    titleLead: '[Placeholder] Footsteps above ', place: 'Placeholder Library',
    placeType: 'Campus', timeOfDay: 'After dark',
    tags: ['footsteps', 'lights', 'figure'],
    text: '[Placeholder] This is where a personal encounter will go, told in the first person. The lights flickered, the stairs creaked, and nobody was there. Replace this text with a story you wrote yourself.',
    author: '[Placeholder author]', date: '8 Oct 2026', votes: 9, meToo: 5,
  },
  {
    id: 'aa-3', city: 'ann-arbor', type: 'legend', position: [42.2785, -83.7405],
    titleLead: '[Placeholder] The lantern keeper of ', place: 'Placeholder Alley',
    placeType: 'Street / road', timeOfDay: 'Midnight',
    tags: ['figure', 'smell'],
    text: '[Placeholder] This is where an invented legend will go. Legends grow with votes and retellings, so this pin is bigger than the others. Replace this text with a legend you made up yourself.',
    author: '[Placeholder author]', date: '15 Oct 2026', votes: 12, meToo: 0, retellings: 3,
  },
  // Lahore
  {
    id: 'lh-1', city: 'lahore', type: 'folklore', position: [31.5722, 74.3288],
    titleLead: '[Placeholder] The gate at ', place: 'Placeholder Darwaza',
    placeType: 'Historic site', timeOfDay: 'Dawn',
    tags: ['whispers', 'doors'],
    text: '[Placeholder] This is where Khadija’s own local folklore story from Lahore will go. Replace this text with a story you wrote yourself.',
    author: '[Placeholder author]', date: '2 Oct 2026', votes: 6, meToo: 0,
  },
  {
    id: 'lh-2', city: 'lahore', type: 'encounter', position: [31.5712, 74.3342],
    titleLead: '[Placeholder] A heavy night at ', place: 'Placeholder Haveli',
    placeType: 'Haveli / old house', timeOfDay: 'Middle of the night',
    tags: ['pressed', 'whispers', 'cold'],
    text: '[Placeholder] This is where a personal encounter from Lahore will go. Replace this text with a story you wrote yourself.',
    author: '[Placeholder author]', date: '9 Oct 2026', votes: 14, meToo: 8,
  },
  {
    id: 'lh-3', city: 'lahore', type: 'legend', position: [31.5688, 74.3305],
    titleLead: '[Placeholder] The tea seller of ', place: 'Placeholder Bazaar',
    placeType: 'Restaurant / shop', timeOfDay: 'Evening',
    tags: ['figure', 'animals'],
    text: '[Placeholder] This is where an invented legend from Lahore will go. Replace this text with a legend you made up yourself.',
    author: '[Placeholder author]', date: '16 Oct 2026', votes: 30, meToo: 0, retellings: 6,
  },
]
