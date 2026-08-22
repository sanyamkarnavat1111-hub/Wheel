export const TOKENS = {
  void: '#07070b',
  panel: '#0d0d16',
  card: '#111119',
  violet: '#8b7bff',
  violetDim: '#4c3a8a',
  copper: '#cf9a67',
  gold: '#e8b866',
  goldSoft: '#f3d9a4',
  mist: '#7d7c8e',
  line: 'rgba(255,255,255,0.08)',
  success: '#4ade80',
};

export const SEGMENTS = [
  { value: 500, label: '500', color: '#c9946b', weight: 1 },
  { value: 0, label: '0', color: '#1c1a2e', weight: 8 },
  { value: 5, label: '5', color: '#221f38', weight: 12 },
  { value: 10, label: '10', color: '#1c1a2e', weight: 30 },
  { value: 20, label: '20', color: '#221f38', weight: 30 },
  { value: 50, label: '50', color: '#2a2542', weight: 30 },
  { value: 100, label: '100', color: '#332a4f', weight: 6 },
  { value: 200, label: '200', color: '#8b6f7a', weight: 3 },
];

export const SEGMENT_ANGLE = 360 / SEGMENTS.length;
