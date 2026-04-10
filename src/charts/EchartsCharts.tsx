import React from 'react';
import ReactECharts from 'echarts-for-react';
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

const chartStyle: React.CSSProperties = { width: '100%', height: 360 };

const radarOption = {
  backgroundColor: '#efefef',
  legend: { show: false },
  tooltip: {
    trigger: 'item',
    formatter: (params: { value: number[] }) =>
      radarIndicators
        .map((indicator, idx) => `${indicator.name}: ${params.value[idx]}%`)
        .join('<br/>')
  },
  radar: {
    shape: 'polygon',
    radius: '66%',
    splitNumber: 5,
    startAngle: 90,
    center: ['50%', '50%'],
    indicator: radarIndicators,
    axisName: {
      color: '#1f2328',
      fontSize: 18,
      fontWeight: 600
    },
    splitArea: { show: false },
    splitLine: { lineStyle: { color: palette.grid, width: 2 } },
    axisLine: { lineStyle: { color: palette.grid, width: 2 } }
  },
  series: [
    {
      type: 'radar',
      name: 'Dimensions',
      symbolSize: 14,
      lineStyle: { width: 2.5, color: '#3f8ddf' },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 1,
          y2: 1,
          colorStops: [
            { offset: 0, color: 'rgba(30,136,229,0.62)' },
            { offset: 0.35, color: 'rgba(84, 195, 155, 0.55)' },
            { offset: 0.7, color: 'rgba(244,178,74,0.5)' },
            { offset: 1, color: 'rgba(169,138,214,0.56)' }
          ]
        }
      },
      data: [
        {
          value: radarValues,
          itemStyle: { color: '#1e88e5', borderColor: '#ffffff', borderWidth: 2 }
        }
      ]
    }
  ]
};

const barOption = {
  backgroundColor: '#efefef',
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    },
    valueFormatter: (value: number) => `${value}%`
  },
  grid: { top: 20, right: 20, bottom: 92, left: 56 },
  legend: { show: false },
  xAxis: {
    type: 'category',
    data: barCategories,
    axisTick: { show: false },
    axisLine: { lineStyle: { color: '#aeb1b6', width: 2 } },
    axisLabel: {
      interval: 0,
      hideOverlap: false,
      margin: 18,
      color: '#2b2f34',
      fontSize: 14,
      rich: {
        chip: {
          padding: [7, 14],
          borderColor: '#a8abb1',
          borderWidth: 1,
          borderRadius: 16,
          backgroundColor: '#efefef'
        }
      },
      formatter: (value: string) => `{chip|${value}}`
    }
  },
  yAxis: {
    type: 'value',
    min: 0,
    max: 100,
    interval: 20,
    axisLine: { show: true, lineStyle: { color: '#b7b9bc', width: 2 } },
    axisTick: { show: true, lineStyle: { color: '#b7b9bc' } },
    splitLine: { show: false },
    axisLabel: {
      color: '#63676d',
      fontSize: 12,
      formatter: (v: number) => (v === 0 ? '0' : `${v}%`)
    }
  },
  series: [
    {
      type: 'bar',
      name: 'Efficiency',
      data: barSeries.efficiency,
      barWidth: 11,
      barCategoryGap: '48%',
      itemStyle: { color: palette.blue, borderRadius: [8, 8, 8, 8] }
    },
    {
      type: 'bar',
      name: 'Adequacy',
      data: barSeries.adequacy,
      barWidth: 11,
      itemStyle: { color: palette.green, borderRadius: [8, 8, 8, 8] }
    },
    {
      type: 'bar',
      name: 'Equity',
      data: barSeries.equity,
      barWidth: 11,
      itemStyle: { color: palette.orange, borderRadius: [8, 8, 8, 8] }
    },
    {
      type: 'bar',
      name: 'Reliability',
      data: barSeries.reliability,
      barWidth: 11,
      itemStyle: { color: palette.purple, borderRadius: [8, 8, 8, 8] }
    },
    {
      type: 'scatter',
      name: 'Score',
      symbolSize: 18,
      data: barSeries.score.map((value, idx) => [idx, value]),
      itemStyle: { color: palette.dark, borderColor: '#ffffff', borderWidth: 2 }
    }
  ]
};

const scatterBy = {
  green: scatterPoints.filter((point) => point.cluster === 'green').map((point) => [point.x, point.y]),
  yellow: scatterPoints.filter((point) => point.cluster === 'yellow').map((point) => [point.x, point.y]),
  red: scatterPoints.filter((point) => point.cluster === 'red').map((point) => [point.x, point.y])
};

const scatterOption = {
  backgroundColor: '#efefef',
  legend: { show: false },
  tooltip: {
    trigger: 'item',
    formatter: (params: { seriesType: string; value: [number, number] }) => {
      const [x, y] = params.value;
      if (params.seriesType === 'line') {
        return `Response line<br/>Applied water: ${x.toLocaleString('en-US')} mm<br/>Yield: ${y.toFixed(1)} Mg/ha`;
      }
      return `Applied water: ${x.toLocaleString('en-US')} mm<br/>Yield: ${y.toFixed(1)} Mg/ha`;
    }
  },
  grid: {
    show: true,
    top: 30,
    right: 24,
    bottom: 64,
    left: 68,
    borderColor: '#afb2b6',
    borderWidth: 2
  },
  xAxis: {
    type: 'value',
    min: 0,
    max: 1200,
    interval: 200,
    name: 'Applied water (mm)',
    nameLocation: 'middle',
    nameGap: 42,
    nameTextStyle: {
      color: '#23272d',
      fontSize: 16,
      fontWeight: 600
    },
    splitLine: { show: false },
    axisLine: { show: false },
    axisTick: { show: true, lineStyle: { color: '#b5b7bc' } },
    axisLabel: {
      color: '#61656b',
      fontSize: 12,
      formatter: (value: number) => value.toLocaleString('en-US')
    }
  },
  yAxis: {
    type: 'value',
    min: 0,
    max: 30,
    interval: 5,
    name: 'Yield (Mg/ha)',
    nameLocation: 'middle',
    nameRotate: 90,
    nameGap: 42,
    nameTextStyle: {
      color: '#23272d',
      fontSize: 16,
      fontWeight: 600
    },
    splitLine: { show: false },
    axisLine: { show: false },
    axisTick: { show: true, lineStyle: { color: '#b5b7bc' } },
    axisLabel: { color: '#61656b', fontSize: 12 }
  },
  series: [
    {
      type: 'line',
      name: 'Response line',
      data: responseLine.map((point) => [point.x, point.y]),
      lineStyle: { color: '#2a9b64', width: 4 },
      symbol: 'none'
    },
    {
      type: 'scatter',
      name: 'Adequate',
      data: scatterBy.green,
      symbolSize: 14,
      itemStyle: { color: '#7dc6a2', borderColor: '#697377', borderWidth: 2 }
    },
    {
      type: 'scatter',
      name: 'Moderate',
      data: scatterBy.yellow,
      symbolSize: 14,
      itemStyle: { color: '#f0b31a', borderColor: '#697377', borderWidth: 2 }
    },
    {
      type: 'scatter',
      name: 'Poor',
      data: scatterBy.red,
      symbolSize: 14,
      itemStyle: { color: '#db4d4e', borderColor: '#697377', borderWidth: 2 }
    }
  ]
};

const timelineTickMap = new Map(timelineTickLabels.map((tick) => [tick.value, tick.label]));

const timelineBandColor: Record<'green' | 'yellow' | 'orange' | 'red', string> = {
  green: '#88c9aa',
  yellow: '#f0ce59',
  orange: '#f4ae3e',
  red: '#de7170'
};

const waterTimelineOption = {
  backgroundColor: '#efefef',
  legend: { show: false },
  tooltip: {
    trigger: 'item',
    formatter: (params: { seriesName: string; value: [number, number] }) => {
      const [x, y] = params.value;
      const label = timelineTickMap.get(Math.round(x)) ?? '';
      return `${params.seriesName}<br/>${label}<br/>Value: ${y.toFixed(1)}`;
    }
  },
  grid: { top: 18, right: 16, bottom: 48, left: 44 },
  xAxis: {
    type: 'value',
    min: 1,
    max: 8,
    interval: 1,
    splitLine: { show: false },
    axisLine: { lineStyle: { color: '#b8bcc1' } },
    axisTick: { lineStyle: { color: '#b8bcc1' } },
    axisLabel: {
      color: '#686d74',
      margin: 10,
      formatter: (value: number) => timelineTickMap.get(value) ?? ''
    }
  },
  yAxis: {
    type: 'value',
    min: 0,
    max: 80,
    interval: 20,
    splitLine: { show: false },
    axisLine: { lineStyle: { color: '#b8bcc1' } },
    axisTick: { lineStyle: { color: '#b8bcc1' } },
    axisLabel: {
      color: '#686d74',
      formatter: (value: number) => (value === 0 ? '0' : 'XX')
    }
  },
  series: [
    {
      name: 'Consumed water',
      type: 'line',
      smooth: 0.2,
      symbol: 'none',
      lineStyle: { color: '#2a2f35', width: 1.4 },
      data: consumedWaterLine.map((point) => [point.x, point.y])
    },
    {
      name: 'Applied water',
      type: 'scatter',
      symbolSize: 8,
      itemStyle: {
        color: (params: { data: [number, number, keyof typeof timelineBandColor] }) => timelineBandColor[params.data[2]],
        borderColor: '#7f848b',
        borderWidth: 1
      },
      data: appliedWaterPoints.map((point) => [point.x, point.y, point.band])
    },
    {
      name: 'Total water allocation',
      type: 'line',
      symbol: 'none',
      lineStyle: {
        color: '#e46868',
        width: 1.5,
        type: 'dashed'
      },
      data: [
        [1, totalAllocationLevel],
        [8, totalAllocationLevel]
      ]
    }
  ]
};

const pillarOption = {
  backgroundColor: '#efefef',
  legend: { show: false },
  tooltip: {
    trigger: 'axis',
    axisPointer: { type: 'shadow' }
  },
  grid: { top: 16, right: 20, bottom: 86, left: 44 },
  xAxis: {
    type: 'category',
    data: pillarCategories,
    axisTick: { show: false },
    axisLine: { lineStyle: { color: '#b8bcc1' } },
    axisLabel: {
      interval: 0,
      hideOverlap: false,
      margin: 10,
      color: '#2b2f34',
      fontSize: 12,
      rich: {
        chip: {
          padding: [5, 10],
          borderColor: '#a8abb1',
          borderWidth: 1,
          borderRadius: 14,
          backgroundColor: '#efefef'
        }
      },
      formatter: (value: string) => `{chip|${value}}`
    }
  },
  yAxis: {
    type: 'value',
    min: 0,
    max: 90,
    interval: 15,
    splitLine: { show: false },
    axisLine: { lineStyle: { color: '#b8bcc1' } },
    axisTick: { lineStyle: { color: '#b8bcc1' } },
    axisLabel: {
      color: '#686d74',
      formatter: (value: number) => (value === 0 ? '0' : 'XX')
    }
  },
  series: [
    {
      type: 'bar',
      name: 'Base',
      stack: 'fill',
      data: pillarBars.base,
      barWidth: 8,
      itemStyle: { color: '#1f242b', borderRadius: [0, 0, 8, 8] },
      z: 3
    },
    {
      type: 'bar',
      name: 'Cap',
      stack: 'fill',
      data: pillarBars.cap.map((value, idx) => ({ value, itemStyle: { color: pillarBars.capColors[idx], borderRadius: [8, 8, 0, 0] } })),
      barWidth: 8,
      z: 4
    }
  ]
};

export function EchartsRadar() {
  return <ReactECharts option={radarOption} style={chartStyle} notMerge lazyUpdate />;
}

export function EchartsBars() {
  return <ReactECharts option={barOption} style={chartStyle} notMerge lazyUpdate />;
}

export function EchartsScatter() {
  return <ReactECharts option={scatterOption} style={chartStyle} notMerge lazyUpdate />;
}

export function EchartsTimeline() {
  return <ReactECharts option={waterTimelineOption} style={chartStyle} notMerge lazyUpdate />;
}

export function EchartsPillars() {
  return <ReactECharts option={pillarOption} style={chartStyle} notMerge lazyUpdate />;
}
