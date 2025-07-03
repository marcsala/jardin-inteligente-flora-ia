export interface LunarPhase {
  date: string;
  time: string;
  phase: 'new' | 'first-quarter' | 'full' | 'third-quarter';
  lunation: number;
}

export interface LunarCycle {
  lunation: number;
  newMoon: LunarPhase | null;
  firstQuarter: LunarPhase | null;
  fullMoon: LunarPhase | null;
  thirdQuarter: LunarPhase | null;
  duration: string;
}

export const lunarPhases2025: LunarCycle[] = [
  {
    lunation: 1262,
    newMoon: null,
    firstQuarter: null,
    fullMoon: { date: '2025-01-07', time: '0:56', phase: 'full', lunation: 1262 },
    thirdQuarter: { date: '2025-01-13', time: '23:26', phase: 'third-quarter', lunation: 1262 },
    duration: '29d 14h 09m'
  },
  {
    lunation: 1263,
    newMoon: { date: '2025-01-29', time: '13:35', phase: 'new', lunation: 1263 },
    firstQuarter: { date: '2025-02-05', time: '9:02', phase: 'first-quarter', lunation: 1263 },
    fullMoon: { date: '2025-02-12', time: '14:53', phase: 'full', lunation: 1263 },
    thirdQuarter: { date: '2025-02-20', time: '18:32', phase: 'third-quarter', lunation: 1263 },
    duration: '29d 12h 09m'
  },
  {
    lunation: 1264,
    newMoon: { date: '2025-02-28', time: '1:44', phase: 'new', lunation: 1264 },
    firstQuarter: { date: '2025-03-06', time: '17:31', phase: 'first-quarter', lunation: 1264 },
    fullMoon: { date: '2025-03-14', time: '7:54', phase: 'full', lunation: 1264 },
    thirdQuarter: { date: '2025-03-22', time: '12:29', phase: 'third-quarter', lunation: 1264 },
    duration: '29d 10h 13m'
  },
  {
    lunation: 1265,
    newMoon: { date: '2025-03-29', time: '11:57', phase: 'new', lunation: 1265 },
    firstQuarter: { date: '2025-04-05', time: '4:14', phase: 'first-quarter', lunation: 1265 },
    fullMoon: { date: '2025-04-13', time: '2:22', phase: 'full', lunation: 1265 },
    thirdQuarter: { date: '2025-04-21', time: '3:35', phase: 'third-quarter', lunation: 1265 },
    duration: '29d 8h 33m'
  },
  {
    lunation: 1266,
    newMoon: { date: '2025-04-27', time: '21:31', phase: 'new', lunation: 1266 },
    firstQuarter: { date: '2025-05-04', time: '15:51', phase: 'first-quarter', lunation: 1266 },
    fullMoon: { date: '2025-05-12', time: '18:55', phase: 'full', lunation: 1266 },
    thirdQuarter: { date: '2025-05-20', time: '13:58', phase: 'third-quarter', lunation: 1266 },
    duration: '29d 7h 31m'
  },
  {
    lunation: 1267,
    newMoon: { date: '2025-05-27', time: '5:02', phase: 'new', lunation: 1267 },
    firstQuarter: { date: '2025-06-03', time: '5:40', phase: 'first-quarter', lunation: 1267 },
    fullMoon: { date: '2025-06-11', time: '9:43', phase: 'full', lunation: 1267 },
    thirdQuarter: { date: '2025-06-18', time: '21:19', phase: 'third-quarter', lunation: 1267 },
    duration: '29d 7h 29m'
  },
  {
    lunation: 1268,
    newMoon: { date: '2025-06-25', time: '12:31', phase: 'new', lunation: 1268 },
    firstQuarter: { date: '2025-07-02', time: '21:30', phase: 'first-quarter', lunation: 1268 },
    fullMoon: { date: '2025-07-10', time: '22:36', phase: 'full', lunation: 1268 },
    thirdQuarter: { date: '2025-07-18', time: '2:37', phase: 'third-quarter', lunation: 1268 },
    duration: '29d 8h 40m'
  },
  {
    lunation: 1269,
    newMoon: { date: '2025-07-24', time: '21:11', phase: 'new', lunation: 1269 },
    firstQuarter: { date: '2025-08-01', time: '14:41', phase: 'first-quarter', lunation: 1269 },
    fullMoon: { date: '2025-08-09', time: '9:54', phase: 'full', lunation: 1269 },
    thirdQuarter: { date: '2025-08-16', time: '7:12', phase: 'third-quarter', lunation: 1269 },
    duration: '29d 10h 55m'
  },
  {
    lunation: 1270,
    newMoon: { date: '2025-08-23', time: '8:06', phase: 'new', lunation: 1270 },
    firstQuarter: { date: '2025-08-31', time: '8:25', phase: 'first-quarter', lunation: 1270 },
    fullMoon: { date: '2025-09-07', time: '20:08', phase: 'full', lunation: 1270 },
    thirdQuarter: { date: '2025-09-14', time: '12:32', phase: 'third-quarter', lunation: 1270 },
    duration: '29d 13h 48m'
  },
  {
    lunation: 1271,
    newMoon: { date: '2025-09-21', time: '21:54', phase: 'new', lunation: 1271 },
    firstQuarter: { date: '2025-09-30', time: '1:53', phase: 'first-quarter', lunation: 1271 },
    fullMoon: { date: '2025-10-07', time: '5:47', phase: 'full', lunation: 1271 },
    thirdQuarter: { date: '2025-10-13', time: '20:12', phase: 'third-quarter', lunation: 1271 },
    duration: '29d 16h 31m'
  },
  {
    lunation: 1272,
    newMoon: { date: '2025-10-21', time: '14:25', phase: 'new', lunation: 1272 },
    firstQuarter: { date: '2025-10-29', time: '17:20', phase: 'first-quarter', lunation: 1272 },
    fullMoon: { date: '2025-11-05', time: '14:19', phase: 'full', lunation: 1272 },
    thirdQuarter: { date: '2025-11-12', time: '6:28', phase: 'third-quarter', lunation: 1272 },
    duration: '29d 18h 22m'
  },
  {
    lunation: 1273,
    newMoon: { date: '2025-11-20', time: '7:47', phase: 'new', lunation: 1273 },
    firstQuarter: { date: '2025-11-28', time: '7:58', phase: 'first-quarter', lunation: 1273 },
    fullMoon: { date: '2025-12-05', time: '0:14', phase: 'full', lunation: 1273 },
    thirdQuarter: { date: '2025-12-11', time: '21:51', phase: 'third-quarter', lunation: 1273 },
    duration: '29d 18h 56m'
  },
  {
    lunation: 1274,
    newMoon: { date: '2025-12-20', time: '2:43', phase: 'new', lunation: 1274 },
    firstQuarter: { date: '2025-12-27', time: '20:09', phase: 'first-quarter', lunation: 1274 },
    fullMoon: null,
    thirdQuarter: null,
    duration: '29d 18h 09m'
  }
];

export const lunarRecommendations = {
  'new': {
    title: 'Luna Nueva',
    emoji: '🌑',
    colorClass: 'text-lunar-new',
    activities: [
      'Siembra de semillas de flores anuales',
      'Preparación de suelos y compost',
      'Planificación del jardín',
      'Inicio de nuevos proyectos'
    ],
    description: 'Momento ideal para nuevos comienzos y siembras'
  },
  'first-quarter': {
    title: 'Cuarto Creciente',
    emoji: '🌓',
    colorClass: 'text-lunar-crescent',
    activities: [
      'Trasplante de plántulas',
      'Podas estimulantes para crecimiento',
      'Fertilización orgánica',
      'Injertos y propagación'
    ],
    description: 'Fase de crecimiento activo y desarrollo'
  },
  'full': {
    title: 'Luna Llena',
    emoji: '🌕',
    colorClass: 'text-lunar-full',
    activities: [
      'Cosecha de flores para bouquets',
      'Recolección de semillas',
      'Podas de limpieza y mantenimiento',
      'Tratamientos preventivos'
    ],
    description: 'Momento de máxima energía y floración'
  },
  'third-quarter': {
    title: 'Cuarto Menguante',
    emoji: '🌗',
    colorClass: 'text-lunar-waning',
    activities: [
      'Podas drásticas y formativas',
      'Control de plagas y enfermedades',
      'Mulching y protección del suelo',
      'Descanso del riego intensivo'
    ],
    description: 'Fase de introspección y trabajos de mantenimiento'
  }
};