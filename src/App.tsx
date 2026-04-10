import React from 'react';
import { ChartJsBars, ChartJsPillars, ChartJsRadar, ChartJsScatter, ChartJsTimeline } from './charts/ChartJsCharts';
import { EchartsBars, EchartsPillars, EchartsRadar, EchartsScatter, EchartsTimeline } from './charts/EchartsCharts';
import { RechartsBars, RechartsPillars, RechartsRadar, RechartsScatter, RechartsTimeline } from './charts/RechartsCharts';

type LibraryName = 'ECharts' | 'Recharts' | 'Chart.js';

const bundleContribution: Record<LibraryName, { renderedKiB: number; gzipKiB: number }> = {
  ECharts: { renderedKiB: 2733.9, gzipKiB: 759.4},
  Recharts: { renderedKiB: 629.0, gzipKiB: 173.8},
  'Chart.js': { renderedKiB: 432.9, gzipKiB: 91.1}
};

function useTotalRenderTime() {
  const startedAt = React.useRef(performance.now());
  const [totalRenderMs, setTotalRenderMs] = React.useState<number>();

  React.useEffect(() => {
    let raf1 = 0;
    let raf2 = 0;
    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        setTotalRenderMs(performance.now() - startedAt.current);
      });
    });

    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, []);

  return totalRenderMs;
}

function formatMs(value?: number) {
  return typeof value === 'number' ? `${value.toFixed(1)} ms` : '...';
}

function ChartCard({
  library,
  children
}: {
  library: LibraryName;
  children: React.ReactNode;
}) {
  const totalRenderMs = useTotalRenderTime();

  return (
    <article className="chart-card">
      <header className="chart-card-header">
        <h3>{library}</h3>
      </header>
      <div className="chart-body">{children}</div>
      <footer className="chart-metrics">
        <span className="metric-label">Total Render Time</span>
        <span>{formatMs(totalRenderMs)}</span>
      </footer>
    </article>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="chart-section">
      <h2>{title}</h2>
      <div className="comparison-grid">{children}</div>
    </section>
  );
}

export default function App() {
  return (
    <main className="app-shell">
      <header className="app-header">
        <h1>Chart Library Comparison</h1>
        <p>
          Same datasets and target visuals rendered with <strong>ECharts</strong>, <strong>Recharts</strong>, and{' '}
          <strong>Chart.js</strong>.
        </p>
      </header>

      <section className="bundle-summary">
        <h2>Bundle Contribution (Shared Across All Graphs)</h2>
        <div className="bundle-table">
          <div className="bundle-row bundle-head">
            <span>Library</span>
            <span>Rendered</span>
            <span>Gzip</span>
          </div>
          {(Object.keys(bundleContribution) as LibraryName[]).map((library) => {
            const metric = bundleContribution[library];
            return (
              <div key={library} className="bundle-row">
                <span>{library}</span>
                <span>{metric.renderedKiB.toFixed(1)} KiB</span>
                <span>{metric.gzipKiB.toFixed(1)} KiB</span>
              </div>
            );
          })}
        </div>
      </section>

      <Section title="1. Radar: Efficiency / Adequacy / Equity / Reliability">
        <ChartCard library="ECharts">
          <EchartsRadar />
        </ChartCard>
        <ChartCard library="Recharts">
          <RechartsRadar />
        </ChartCard>
        <ChartCard library="Chart.js">
          <div className="fixed-canvas-height">
            <ChartJsRadar />
          </div>
        </ChartCard>
      </Section>

      <Section title="2. Grouped Bars + Score Marker">
        <ChartCard library="ECharts">
          <EchartsBars />
        </ChartCard>
        <ChartCard library="Recharts">
          <RechartsBars />
        </ChartCard>
        <ChartCard library="Chart.js">
          <div className="fixed-canvas-height">
            <ChartJsBars />
          </div>
        </ChartCard>
      </Section>

      <Section title="3. Scatter + Response Line">
        <ChartCard library="ECharts">
          <EchartsScatter />
        </ChartCard>
        <ChartCard library="Recharts">
          <RechartsScatter />
        </ChartCard>
        <ChartCard library="Chart.js">
          <div className="fixed-canvas-height">
            <ChartJsScatter />
          </div>
        </ChartCard>
      </Section>

      <Section title="4. Timeline: Consumed / Applied / Allocation">
        <ChartCard library="ECharts">
          <EchartsTimeline />
        </ChartCard>
        <ChartCard library="Recharts">
          <RechartsTimeline />
        </ChartCard>
        <ChartCard library="Chart.js">
          <div className="fixed-canvas-height">
            <ChartJsTimeline />
          </div>
        </ChartCard>
      </Section>

      <Section title="5. Vertical Pillars by Sample">
        <ChartCard library="ECharts">
          <EchartsPillars />
        </ChartCard>
        <ChartCard library="Recharts">
          <RechartsPillars />
        </ChartCard>
        <ChartCard library="Chart.js">
          <div className="fixed-canvas-height">
            <ChartJsPillars />
          </div>
        </ChartCard>
      </Section>
    </main>
  );
}
