import React from 'react';
import {
  BarController,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  ChartData,
  ChartOptions,
  Filler,
  Legend,
  LineController,
  LineElement,
  LinearScale,
  Plugin,
  PointElement,
  RadarController,
  RadialLinearScale,
  ScatterController,
  ScriptableContext,
  Tooltip
} from 'chart.js';
import { Chart, Radar } from 'react-chartjs-2';
import type { AppliedWaterPoint } from '../data';
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

ChartJS.register(
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineController,
  LineElement,
  RadarController,
  RadialLinearScale,
  ScatterController,
  Filler,
  Tooltip,
  Legend
);

function roundedRect(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + width, y, x + width, y + height, r);
  ctx.arcTo(x + width, y + height, x, y + height, r);
  ctx.arcTo(x, y + height, x, y, r);
  ctx.arcTo(x, y, x + width, y, r);
  ctx.closePath();
}

const chipLabelPlugin: Plugin<'bar'> = {
  id: 'chipLabelPlugin',
  afterDraw(chart) {
    const xScale = chart.scales.x;
    const { ctx, chartArea } = chart;
    if (!xScale || !chartArea) {
      return;
    }

    const labels = (chart.data.labels as string[] | undefined) ?? [];

    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const chipCenterY = chartArea.bottom + 20;

    labels.forEach((label, index) => {
      const x = xScale.getPixelForTick(index);
      const y = chipCenterY;
      const width = 50;
      const height = 30;
      roundedRect(ctx, x - width / 2, y - height / 2, width, height, 15);
      ctx.fillStyle = '#efefef';
      ctx.fill();
      ctx.strokeStyle = '#a8abb1';
      ctx.lineWidth = 1.3;
      ctx.stroke();
      ctx.fillStyle = '#2b2f34';
      ctx.font = '500 12px system-ui';
      ctx.fillText(label, x, y + 1);
    });

    ctx.restore();
  }
};

const radarData: ChartData<'radar', number[], string> = {
  labels: radarIndicators.map((indicator) => indicator.name),
  datasets: [
    {
      label: 'Dimensions',
      data: radarValues,
      borderColor: '#3f8ddf',
      borderWidth: 2.5,
      pointRadius: 8,
      pointBorderWidth: 2,
      pointBorderColor: '#ffffff',
      pointBackgroundColor: [palette.blue, palette.green, palette.orange, palette.purple],
      backgroundColor: (context: ScriptableContext<'radar'>) => {
        const { chart } = context;
        const { ctx, chartArea } = chart;
        if (!chartArea) {
          return 'rgba(30,136,229,0.5)';
        }
        const gradient = ctx.createLinearGradient(chartArea.left, chartArea.top, chartArea.right, chartArea.bottom);
        gradient.addColorStop(0, 'rgba(30,136,229,0.62)');
        gradient.addColorStop(0.35, 'rgba(84, 195, 155, 0.55)');
        gradient.addColorStop(0.7, 'rgba(244,178,74,0.5)');
        gradient.addColorStop(1, 'rgba(169,138,214,0.56)');
        return gradient;
      }
    }
  ]
};

const radarOptions: ChartOptions<'radar'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false }
  },
  scales: {
    r: {
      min: 0,
      max: 100,
      ticks: { display: false, stepSize: 20 },
      grid: { color: palette.grid, lineWidth: 2 },
      angleLines: { color: palette.grid, lineWidth: 2 },
      pointLabels: {
        color: '#1f2328',
        font: { size: 17, weight: 600 }
      }
    }
  }
};

const barData: ChartData<'bar' | 'line', number[], string> = {
  labels: barCategories,
  datasets: [
    {
      label: 'Efficiency',
      data: barSeries.efficiency,
      backgroundColor: palette.blue,
      borderRadius: 8,
      barThickness: 11
    },
    {
      label: 'Adequacy',
      data: barSeries.adequacy,
      backgroundColor: palette.green,
      borderRadius: 8,
      barThickness: 11
    },
    {
      label: 'Equity',
      data: barSeries.equity,
      backgroundColor: palette.orange,
      borderRadius: 8,
      barThickness: 11
    },
    {
      label: 'Reliability',
      data: barSeries.reliability,
      backgroundColor: palette.purple,
      borderRadius: 8,
      barThickness: 11
    },
    {
      type: 'line' as const,
      label: 'Score',
      data: barSeries.score,
      showLine: false,
      pointRadius: 9,
      pointHoverRadius: 9,
      pointBackgroundColor: palette.dark,
      pointBorderColor: '#ffffff',
      pointBorderWidth: 2
    }
  ]
};

const barOptions: ChartOptions<'bar' | 'line'> = {
  responsive: true,
  maintainAspectRatio: false,
  layout: {
    padding: { left: 6, right: 8, bottom: 58, top: 8 }
  },
  plugins: {
    legend: { display: false }
  },
  scales: {
    x: {
      ticks: { display: false },
      grid: { display: false },
      border: { color: '#aeb1b6', width: 2 }
    },
    y: {
      min: 0,
      max: 100,
      ticks: {
        stepSize: 20,
        color: '#63676d',
        callback: (value: string | number) => (Number(value) === 0 ? '0' : `${value}%`)
      },
      grid: { display: false },
      border: { color: '#b7b9bc', width: 2 }
    }
  }
};

const pointsBy = {
  green: scatterPoints.filter((point) => point.cluster === 'green'),
  yellow: scatterPoints.filter((point) => point.cluster === 'yellow'),
  red: scatterPoints.filter((point) => point.cluster === 'red')
};

const scatterData: ChartData<'scatter' | 'line', { x: number; y: number }[]> = {
  datasets: [
    {
      type: 'line' as const,
      label: 'Response line',
      data: responseLine,
      parsing: false,
      borderColor: '#2a9b64',
      borderWidth: 4,
      pointRadius: 0
    },
    {
      type: 'scatter' as const,
      label: 'Adequate',
      data: pointsBy.green,
      parsing: false,
      backgroundColor: '#7dc6a2',
      pointRadius: 7,
      borderColor: '#697377',
      borderWidth: 1.5
    },
    {
      type: 'scatter' as const,
      label: 'Moderate',
      data: pointsBy.yellow,
      parsing: false,
      backgroundColor: '#f0b31a',
      pointRadius: 7,
      borderColor: '#697377',
      borderWidth: 1.5
    },
    {
      type: 'scatter' as const,
      label: 'Poor',
      data: pointsBy.red,
      parsing: false,
      backgroundColor: '#db4d4e',
      pointRadius: 7,
      borderColor: '#697377',
      borderWidth: 1.5
    }
  ]
};

const scatterOptions: ChartOptions<'scatter' | 'line'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false }
  },
  scales: {
    x: {
      min: 0,
      max: 1200,
      ticks: {
        stepSize: 200,
        color: '#61656b',
        callback: (value: string | number) => Number(value).toLocaleString('en-US')
      },
      title: {
        display: true,
        text: 'Applied water (mm)',
        color: '#23272d',
        font: { size: 16, weight: 600 },
        padding: { top: 18 }
      },
      grid: { display: false },
      border: { color: '#afb2b6', width: 2 }
    },
    y: {
      min: 0,
      max: 30,
      ticks: { stepSize: 5, color: '#61656b' },
      title: {
        display: true,
        text: 'Yield (Mg/ha)',
        color: '#23272d',
        font: { size: 16, weight: 600 },
        padding: { bottom: 10 }
      },
      grid: { display: false },
      border: { color: '#afb2b6', width: 2 }
    }
  }
};

const timelineTickMap = new Map(timelineTickLabels.map((tick) => [tick.value, tick.label]));

const timelineBandColor: Record<AppliedWaterPoint['band'], string> = {
  green: '#88c9aa',
  yellow: '#f0ce59',
  orange: '#f4ae3e',
  red: '#de7170'
};

const timelineData: ChartData<'scatter' | 'line', { x: number; y: number }[]> = {
  datasets: [
    {
      type: 'line' as const,
      label: 'Consumed water',
      data: consumedWaterLine,
      parsing: false,
      borderColor: '#2a2f35',
      borderWidth: 1.4,
      pointRadius: 0,
      tension: 0.25
    },
    {
      type: 'scatter' as const,
      label: 'Applied water',
      data: appliedWaterPoints,
      parsing: false,
      pointRadius: 4,
      backgroundColor: appliedWaterPoints.map((point) => timelineBandColor[point.band]),
      pointBorderColor: '#7f848b',
      pointBorderWidth: 1
    },
    {
      type: 'line' as const,
      label: 'Total water allocation',
      data: [
        { x: 1, y: totalAllocationLevel },
        { x: 8, y: totalAllocationLevel }
      ],
      parsing: false,
      borderColor: '#e46868',
      borderWidth: 1.5,
      borderDash: [7, 5],
      pointRadius: 0
    }
  ]
};

const timelineOptions: ChartOptions<'scatter' | 'line'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      callbacks: {
        title: (items) => {
          const x = Math.round(items[0]?.parsed?.x ?? 0);
          return timelineTickMap.get(x) ?? '';
        },
        label: (ctx) => `${ctx.dataset.label}: ${Number(ctx.parsed.y ?? 0).toFixed(1)}`
      }
    }
  },
  scales: {
    x: {
      type: 'linear',
      min: 1,
      max: 8,
      ticks: {
        stepSize: 1,
        color: '#686d74',
        callback: (value: string | number) => timelineTickMap.get(Number(value)) ?? ''
      },
      grid: { display: false },
      border: { color: '#b8bcc1' }
    },
    y: {
      min: 0,
      max: 80,
      ticks: {
        stepSize: 20,
        color: '#686d74',
        callback: (value: string | number) => (Number(value) === 0 ? '0' : 'XX')
      },
      grid: { display: false },
      border: { color: '#b8bcc1' }
    }
  }
};

const pillarData: ChartData<'bar', number[], string> = {
  labels: pillarCategories,
  datasets: [
    {
      label: 'Base',
      data: pillarBars.base.map((value) => value as number),
      barThickness: 8,
      categoryPercentage: 0.58,
      barPercentage: 0.28,
      backgroundColor: '#1f242b',
      borderColor: '#8f9398',
      borderWidth: 1,
      borderSkipped: false,
      borderRadius: {
        bottomLeft: 99,
        bottomRight: 99
      }
    },
    {
      label: 'Cap',
      data: pillarBars.cap.map((value) => value as number),
      barThickness: 8,
      categoryPercentage: 0.58,
      barPercentage: 0.28,
      backgroundColor: pillarBars.capColors,
      borderColor: '#8f9398',
      borderWidth: 1,
      borderSkipped: false,
      borderRadius: {
        topLeft: 99,
        topRight: 99
      }
    }
  ]
};

const pillarOptions: ChartOptions<'bar'> = {
  responsive: true,
  maintainAspectRatio: false,
  layout: { padding: { bottom: 30 } },
  plugins: {
    legend: { display: false },
    tooltip: {
      callbacks: {
        label: (ctx) => `${ctx.dataset.label}: ${Number(ctx.raw).toFixed(1)}`
      }
    }
  },
  scales: {
    x: {
      stacked: true,
      ticks: { display: false },
      grid: { display: false },
      border: { color: '#b8bcc1' }
    },
    y: {
      stacked: true,
      min: 0,
      max: 90,
      ticks: {
        stepSize: 15,
        color: '#686d74',
        callback: (value: string | number) => (Number(value) === 0 ? '0' : 'XX')
      },
      grid: { display: false },
      border: { color: '#b8bcc1' }
    }
  }
};

export function ChartJsRadar() {
  return <Radar data={radarData} options={radarOptions} />;
}

export function ChartJsBars() {
  return <Chart type="bar" data={barData} options={barOptions} plugins={[chipLabelPlugin]} />;
}

export function ChartJsScatter() {
  return <Chart type="scatter" data={scatterData} options={scatterOptions} />;
}

export function ChartJsTimeline() {
  return <Chart type="scatter" data={timelineData} options={timelineOptions} />;
}

export function ChartJsPillars() {
  return <Chart type="bar" data={pillarData} options={pillarOptions} plugins={[chipLabelPlugin]} />;
}
