import React from 'react';
import {
  Bar,
  CartesianGrid,
  Cell,
  ComposedChart,
  Line,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ReferenceArea,
  ResponsiveContainer,
  Scatter,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import {
  appliedWaterPoints,
  barCategories,
  barSeries,
  consumedWaterLine,
  palette,
  pillarBars,
  pillarCategories,
  radarIndicators,
  radarValues,
  responseLine,
  scatterPoints,
  timelineTickLabels,
  totalAllocationLevel
} from '../data';

const radarData = radarIndicators.map((indicator, index) => ({
  metric: indicator.name,
  value: radarValues[index],
  max: 100
}));

const barData = barCategories.map((sample, index) => ({
  sample,
  efficiency: barSeries.efficiency[index],
  adequacy: barSeries.adequacy[index],
  equity: barSeries.equity[index],
  reliability: barSeries.reliability[index],
  score: barSeries.score[index]
}));

const scatterBy = {
  green: scatterPoints.filter((point) => point.cluster === 'green'),
  yellow: scatterPoints.filter((point) => point.cluster === 'yellow'),
  red: scatterPoints.filter((point) => point.cluster === 'red')
};

const timelineTickMap = new Map(timelineTickLabels.map((tick) => [tick.value, tick.label]));

const timelineBandColor: Record<'green' | 'yellow' | 'orange' | 'red', string> = {
  green: '#88c9aa',
  yellow: '#f0ce59',
  orange: '#f4ae3e',
  red: '#de7170'
};

const allocationLine = [
  { x: 1, y: totalAllocationLevel },
  { x: 8, y: totalAllocationLevel }
];

const pillarData = pillarCategories.map((sample, index) => ({
  sample,
  base: pillarBars.base[index],
  cap: pillarBars.cap[index],
  capColor: pillarBars.capColors[index]
}));

const cardStyle: React.CSSProperties = {
  width: '100%',
  height: 360
};

type TickPayload = {
  value: string;
};

type TickProps = {
  x?: number;
  y?: number;
  payload?: TickPayload;
};

function CategoryTick({ x = 0, y = 0, payload }: TickProps) {
  return (
    <g transform={`translate(${x},${y})`}>
      <rect x={-26} y={10} width={52} height={32} rx={16} fill="#efefef" stroke="#a8abb1" strokeWidth={1.2} />
      <text y={32} textAnchor="middle" fill="#2b2f34" fontSize={12} fontWeight={500}>
        {payload?.value}
      </text>
    </g>
  );
}

function PoorBadge() {
  return (
    <g transform="translate(536, 315)">
      <rect width={88} height={28} rx={6} fill="#f8dfdd" />
      <circle cx={18} cy={14} r={7} fill="none" stroke="#de2f2f" strokeWidth={1.4} />
      <text x={18} y={18} textAnchor="middle" fill="#de2f2f" fontSize={11} fontWeight={700}>
        !
      </text>
      <text x={38} y={19} fill="#de2f2f" fontSize={13} fontWeight={600}>
        Poor
      </text>
    </g>
  );
}

function TimelineDot(props: { cx?: number; cy?: number; payload?: { band: 'green' | 'yellow' | 'orange' | 'red' } }) {
  const { cx = 0, cy = 0, payload } = props;
  return <circle cx={cx} cy={cy} r={4} fill={timelineBandColor[payload?.band ?? 'green']} stroke="#7f848b" strokeWidth={1} />;
}

export function RechartsRadar() {
  return (
    <div style={cardStyle}>
      <ResponsiveContainer>
        <RadarChart data={radarData} outerRadius="67%" startAngle={90} endAngle={-270} margin={{ top: 8, right: 12, left: 12, bottom: 26 }}>
          <defs>
            <linearGradient id="rechartsRadarFill" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(30,136,229,0.62)" />
              <stop offset="35%" stopColor="rgba(84, 195, 155, 0.55)" />
              <stop offset="70%" stopColor="rgba(244,178,74,0.5)" />
              <stop offset="100%" stopColor="rgba(169,138,214,0.56)" />
            </linearGradient>
          </defs>
          <PolarGrid stroke={palette.grid} strokeWidth={1.8} gridType="polygon" radialLines />
          <PolarAngleAxis
            dataKey="metric"
            tick={{ fill: '#1f2328', fontSize: 18, fontWeight: 600 }}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip formatter={(value: number) => `${value}%`} />
          <Radar
            dataKey="value"
            name="Dimensions"
            stroke="#3f8ddf"
            fill="url(#rechartsRadarFill)"
            fillOpacity={1}
            strokeWidth={2.5}
            dot={{ fill: '#1e88e5', stroke: '#fff', strokeWidth: 2, r: 7 }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function RechartsBars() {
  return (
    <div style={cardStyle}>
      <ResponsiveContainer>
        <ComposedChart data={barData} margin={{ top: 20, right: 18, bottom: 20, left: 28 }} barCategoryGap="50%">
          <CartesianGrid vertical={false} horizontal={false} />
          <XAxis dataKey="sample" height={56} axisLine={{ stroke: '#aeb1b6' }} tickLine={false} tick={<CategoryTick />} />
          <YAxis
            domain={[0, 100]}
            ticks={[0, 20, 40, 60, 80, 100]}
            axisLine={{ stroke: '#b7b9bc' }}
            tickLine={{ stroke: '#b7b9bc' }}
            tick={{ fill: '#63676d', fontSize: 12 }}
            tickFormatter={(value) => (value === 0 ? '0' : `${value}%`)}
          />
          <Tooltip formatter={(value: number) => `${value}%`} />
          <Bar dataKey="efficiency" name="Efficiency" fill={palette.blue} radius={[10, 10, 10, 10]} barSize={11} />
          <Bar dataKey="adequacy" name="Adequacy" fill={palette.green} radius={[10, 10, 10, 10]} barSize={11} />
          <Bar dataKey="equity" name="Equity" fill={palette.orange} radius={[10, 10, 10, 10]} barSize={11} />
          <Bar dataKey="reliability" name="Reliability" fill={palette.purple} radius={[10, 10, 10, 10]} barSize={11} />
          <Scatter dataKey="score" name="Score" data={barData} fill={palette.dark} shape="circle" />
          <PoorBadge />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

export function RechartsScatter() {
  return (
    <div style={cardStyle}>
      <ResponsiveContainer>
        <ComposedChart data={responseLine} margin={{ top: 24, right: 20, bottom: 56, left: 24 }}>
          <CartesianGrid vertical={false} horizontal={false} />
          <ReferenceArea x1={0} x2={1200} y1={0} y2={30} fillOpacity={0} stroke="#afb2b6" />
          <XAxis
            type="number"
            dataKey="x"
            domain={[0, 1200]}
            ticks={[200, 400, 600, 800, 1000, 1200]}
            axisLine={false}
            tickLine={{ stroke: '#b5b7bc' }}
            tick={{ fill: '#61656b', fontSize: 12 }}
            tickFormatter={(value) => Number(value).toLocaleString('en-US')}
            label={{ value: 'Applied water (mm)', position: 'bottom', offset: 10, fill: '#23272d', fontSize: 16, fontWeight: 600 }}
          />
          <YAxis
            type="number"
            dataKey="y"
            domain={[0, 30]}
            ticks={[0, 5, 10, 15, 20, 25, 30]}
            axisLine={false}
            tickLine={{ stroke: '#b5b7bc' }}
            tick={{ fill: '#61656b', fontSize: 12 }}
            label={{ value: 'Yield (Mg/ha)', angle: -90, position: 'insideLeft', fill: '#23272d', fontSize: 16, fontWeight: 600, offset: -4 }}
          />
          <Tooltip formatter={(value: number) => value.toFixed(1)} />
          <Line type="linear" name="Response line" dataKey="y" stroke="#2a9b64" strokeWidth={4} dot={false} />
          <Scatter name="Adequate" data={scatterBy.green} fill="#7dc6a2" stroke="#697377" strokeWidth={1.5} />
          <Scatter name="Moderate" data={scatterBy.yellow} fill="#f0b31a" stroke="#697377" strokeWidth={1.5} />
          <Scatter name="Poor" data={scatterBy.red} fill="#db4d4e" stroke="#697377" strokeWidth={1.5} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

export function RechartsTimeline() {
  return (
    <div style={cardStyle}>
      <ResponsiveContainer>
        <ComposedChart margin={{ top: 18, right: 16, bottom: 20, left: 12 }}>
          <CartesianGrid vertical={false} horizontal={false} />
          <XAxis
            type="number"
            dataKey="x"
            domain={[1, 8]}
            ticks={timelineTickLabels.map((tick) => tick.value)}
            axisLine={{ stroke: '#b8bcc1' }}
            tickLine={{ stroke: '#b8bcc1' }}
            tick={{ fill: '#686d74', fontSize: 12 }}
            tickFormatter={(value) => timelineTickMap.get(Number(value)) ?? ''}
          />
          <YAxis
            domain={[0, 80]}
            ticks={[0, 20, 40, 60, 80]}
            axisLine={{ stroke: '#b8bcc1' }}
            tickLine={{ stroke: '#b8bcc1' }}
            tick={{ fill: '#686d74', fontSize: 12 }}
            tickFormatter={(value) => (value === 0 ? '0' : 'XX')}
          />
          <Tooltip
            formatter={(value: number) => value.toFixed(1)}
            labelFormatter={(value) => timelineTickMap.get(Math.round(Number(value))) ?? ''}
          />
          <Line
            data={consumedWaterLine}
            dataKey="y"
            name="Consumed water"
            stroke="#2a2f35"
            strokeWidth={1.4}
            dot={false}
            type="monotone"
          />
          <Scatter data={appliedWaterPoints} dataKey="y" name="Applied water" shape={<TimelineDot />} />
          <Line
            data={allocationLine}
            dataKey="y"
            name="Total water allocation"
            stroke="#e46868"
            strokeWidth={1.5}
            strokeDasharray="6 5"
            dot={false}
            type="linear"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

export function RechartsPillars() {
  return (
    <div style={cardStyle}>
      <ResponsiveContainer>
        <ComposedChart data={pillarData} margin={{ top: 16, right: 20, bottom: 20, left: 12 }} barCategoryGap="58%">
          <CartesianGrid vertical={false} horizontal={false} />
          <XAxis dataKey="sample" height={56} axisLine={{ stroke: '#b8bcc1' }} tickLine={false} tick={<CategoryTick />} />
          <YAxis
            domain={[0, 90]}
            ticks={[0, 15, 30, 45, 60, 75, 90]}
            axisLine={{ stroke: '#b8bcc1' }}
            tickLine={{ stroke: '#b8bcc1' }}
            tick={{ fill: '#686d74', fontSize: 12 }}
            tickFormatter={(value) => (value === 0 ? '0' : 'XX')}
          />
          <Tooltip formatter={(value: number) => value.toFixed(1)} />
          <Bar dataKey="base" name="Base" stackId="fill" barSize={8} fill="#1f242b" stroke="#8f9398" strokeWidth={1} radius={[0, 0, 8, 8]} />
          <Bar dataKey="cap" name="Cap" stackId="fill" barSize={8} radius={[8, 8, 0, 0]}>
            {pillarData.map((entry) => (
              <Cell key={entry.sample} fill={entry.capColor} stroke="#8f9398" strokeWidth={1} />
            ))}
          </Bar>
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
