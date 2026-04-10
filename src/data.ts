export const radarIndicators = [
  { name: 'Efficiency', max: 100 },
  { name: 'Adequacy', max: 100 },
  { name: 'Equity', max: 100 },
  { name: 'Reliability', max: 100 }
];

export const radarValues = [64, 84, 52, 58];

export const barCategories = ['S4', 'S1', 'S6', 'S3', 'S5', 'S2'];

export const barSeries = {
  efficiency: [65, 60, 70, 53, 69, 73],
  adequacy: [51, 74, 56, 55, 55, 49],
  equity: [79, 58, 80, 80, 67, 31],
  reliability: [64, 59, 69, 68, 67, 31],
  score: [86, 83, 81, 69, 63, 52]
};

export type ScatterPoint = {
  x: number;
  y: number;
  cluster: 'green' | 'yellow' | 'red';
};

export const scatterPoints: ScatterPoint[] = [
  { x: 310, y: 5.1, cluster: 'green' },
  { x: 315, y: 11.4, cluster: 'green' },
  { x: 370, y: 9.2, cluster: 'green' },
  { x: 420, y: 8.0, cluster: 'green' },
  { x: 430, y: 16.0, cluster: 'green' },
  { x: 445, y: 17.8, cluster: 'green' },
  { x: 540, y: 17.0, cluster: 'green' },
  { x: 980, y: 17.4, cluster: 'green' },
  { x: 620, y: 2.4, cluster: 'yellow' },
  { x: 760, y: 5.9, cluster: 'yellow' },
  { x: 760, y: 11.9, cluster: 'yellow' },
  { x: 880, y: 13.0, cluster: 'yellow' },
  { x: 860, y: 3.1, cluster: 'red' },
  { x: 910, y: 7.6, cluster: 'red' },
  { x: 910, y: 5.7, cluster: 'red' },
  { x: 1000, y: 4.8, cluster: 'red' }
];

export const responseLine = [
  { x: 220, y: 0 },
  { x: 420, y: 18.7 },
  { x: 1060, y: 18.7 }
];

export const timelineTickLabels = [
  { value: 1, label: 'Mar 01' },
  { value: 2, label: 'Apr 01' },
  { value: 3, label: 'May 01' },
  { value: 4, label: 'Jun 01' },
  { value: 5, label: 'Jul 01' },
  { value: 6, label: 'Aug 01' },
  { value: 7, label: 'Sep 01' },
  { value: 8, label: 'Oct 01' }
];

export const consumedWaterLine = [
  { x: 1.0, y: 2 },
  { x: 1.5, y: 16 },
  { x: 2.0, y: 27 },
  { x: 2.8, y: 33 },
  { x: 3.6, y: 36 },
  { x: 4.8, y: 35 },
  { x: 5.5, y: 41 },
  { x: 6.1, y: 45 },
  { x: 6.8, y: 54 },
  { x: 7.3, y: 62 },
  { x: 8.0, y: 78 }
];

export type AppliedWaterPoint = {
  x: number;
  y: number;
  band: 'green' | 'yellow' | 'orange' | 'red';
};

export const appliedWaterPoints: AppliedWaterPoint[] = [
  { x: 2.05, y: 18, band: 'green' },
  { x: 2.15, y: 20, band: 'green' },
  { x: 2.25, y: 22, band: 'green' },
  { x: 2.35, y: 24, band: 'green' },
  { x: 2.45, y: 25, band: 'green' },
  { x: 2.55, y: 26.5, band: 'green' },
  { x: 2.65, y: 27.4, band: 'green' },
  { x: 2.75, y: 28, band: 'yellow' },
  { x: 2.85, y: 28.3, band: 'yellow' },
  { x: 3.45, y: 34.6, band: 'red' },
  { x: 3.58, y: 34.5, band: 'red' },
  { x: 3.72, y: 34.7, band: 'green' },
  { x: 3.84, y: 35.2, band: 'green' },
  { x: 3.96, y: 35.1, band: 'green' },
  { x: 4.08, y: 35.0, band: 'green' },
  { x: 4.2, y: 34.9, band: 'green' },
  { x: 4.34, y: 34.7, band: 'green' },
  { x: 4.46, y: 34.8, band: 'green' },
  { x: 4.58, y: 34.5, band: 'yellow' },
  { x: 4.7, y: 34.9, band: 'yellow' },
  { x: 4.84, y: 35.1, band: 'orange' },
  { x: 4.98, y: 35.8, band: 'green' },
  { x: 5.12, y: 36.2, band: 'green' },
  { x: 5.28, y: 37.1, band: 'yellow' },
  { x: 5.42, y: 37.8, band: 'yellow' },
  { x: 5.56, y: 38.6, band: 'orange' },
  { x: 5.72, y: 40.2, band: 'red' },
  { x: 5.9, y: 42.2, band: 'red' },
  { x: 6.06, y: 44.2, band: 'yellow' },
  { x: 6.2, y: 46.5, band: 'green' },
  { x: 6.34, y: 47.8, band: 'green' },
  { x: 6.46, y: 49.4, band: 'green' },
  { x: 6.6, y: 52.7, band: 'yellow' },
  { x: 6.74, y: 55.2, band: 'yellow' },
  { x: 6.88, y: 58.7, band: 'orange' },
  { x: 7.0, y: 62.2, band: 'red' },
  { x: 7.1, y: 62.8, band: 'red' },
  { x: 7.18, y: 63.1, band: 'green' },
  { x: 7.26, y: 64.4, band: 'green' },
  { x: 7.34, y: 65.8, band: 'green' },
  { x: 7.42, y: 66.7, band: 'green' },
  { x: 7.5, y: 68.8, band: 'green' }
];

export const totalAllocationLevel = 66;

export const pillarCategories = ['S5', 'S1', 'S4', 'S2', 'S3', 'S6'];

export const pillarBars = {
  base: [40, 52, 62, 66, 70, 74],
  cap: [30, 22, 16, 14, 12, 10],
  capColors: ['#de5a60', '#e79798', '#f5bf2f', '#d8d8d8', '#82c69f', '#4fb778'],
  track: 82
};

export const palette = {
  blue: '#1e88e5',
  green: '#48a87b',
  orange: '#e5924b',
  purple: '#a98ad6',
  dark: '#1e232b',
  grid: '#9ea1a5',
  axis: '#a6a9ad'
};
