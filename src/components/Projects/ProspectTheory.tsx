'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, BarChart3, PieChart, Clock } from 'lucide-react';

type TabType = 'utility' | 'distribution' | 'profile' | 'event';
type DistributionView = 'density' | 'boxplot' | 'summary';
type EventType = 'tariff' | 'middleeast';

const utilityData = {
  labels: ['Apr 2025', 'May 2025', 'Jun 2025', 'Jul 2025', 'Aug 2025', 'Sep 2025', 'Oct 2025', 'Nov 2025', 'Dec 2025', 'Jan 2026', 'Feb 2026', 'Mar 2026'],
  csi300_pt: [0.0586, 0.0584, 0.0582, 0.0590, 0.0596, 0.0610, 0.0645, 0.0674, 0.0680, 0.0684, 0.0681, 0.0683],
  csi300_cpt: [0.0583, 0.0579, 0.0578, 0.0589, 0.0593, 0.0608, 0.0639, 0.0671, 0.0678, 0.0682, 0.0680, 0.0682],
  spy_pt: [-0.0101, -0.0147, -0.0105, -0.0005, -0.0017, -0.0011, -0.0030, -0.0036, -0.0045, -0.0041, -0.0044, -0.0073],
  spy_cpt: [-0.0125, -0.0160, -0.0131, -0.0032, -0.0038, -0.0030, -0.0062, -0.0076, -0.0084, -0.0071, -0.0068, -0.0091],
};

const events = [
  { id: 'tariff', name: 'Market Event 1', position: 6 },
  { id: 'middleeast', name: 'Market Event 2', position: 9 },
];

const distributionData = {
  csi300_pt: [0.0579, 0.0582, 0.0585, 0.0588, 0.0591, 0.0594, 0.0597, 0.0600, 0.0636, 0.0650, 0.0665, 0.0679, 0.0682, 0.0684],
  spy_pt: [-0.0192, -0.0150, -0.0100, -0.0086, -0.0060, -0.0044, -0.0030, -0.0018, 0.0000, 0.0005, 0.0010, 0.0015, 0.0020, 0.0022],
};

const summaryStats = {
  csi300: {
    pt: { mean: 0.0633, median: 0.0636, std: 0.0043, min: 0.0579, max: 0.0684 },
    cpt: { mean: 0.0628, median: 0.0631, std: 0.0044, min: 0.0575, max: 0.0682 },
  },
  spy: {
    pt: { mean: -0.0057, median: -0.0044, std: 0.0049, min: -0.0192, max: 0.0022 },
    cpt: { mean: -0.0074, median: -0.0063, std: 0.0056, min: -0.0188, max: 0.0009 },
  },
};

const radarData = {
  dimensions: ['Avg Utility', 'Volatility', 'Neg Utility', 'Tail Sensitivity', 'Behavioral Stability'],
  csi300: [83, 22, 0, 1, 99],
  spy: [14, 24, 95, 19, 95],
};

const eventData = {
  tariff: {
    csi300_pt: [0.0630, 0.0632, 0.0633, 0.0634, 0.0636, 0.0637, 0.0639, 0.0640, 0.0641],
    csi300_cpt: [0.0625, 0.0626, 0.0628, 0.0629, 0.0631, 0.0632, 0.0634, 0.0635, 0.0636],
    spy_pt: [-0.0021, -0.0015, -0.0013, -0.0015, -0.0016, -0.0012, -0.0015, -0.0010, -0.0014],
    spy_cpt: [-0.0036, -0.0030, -0.0030, -0.0030, -0.0031, -0.0028, -0.0031, -0.0027, -0.0029],
  },
  middleeast: {
    csi300_pt: [0.0627, 0.0628, 0.0630, 0.0631, 0.0633, 0.0635, 0.0637, 0.0638, 0.0640],
    csi300_cpt: [0.0622, 0.0623, 0.0625, 0.0626, 0.0628, 0.0630, 0.0632, 0.0633, 0.0635],
    spy_pt: [-0.0025, -0.0018, -0.0015, -0.0017, -0.0018, -0.0014, -0.0016, -0.0012, -0.0015],
    spy_cpt: [-0.0040, -0.0033, -0.0032, -0.0032, -0.0033, -0.0030, -0.0033, -0.0029, -0.0031],
  },
};

const tabInfo: Record<TabType, {
  question: string;
  method: string;
  observation: string;
}> = {
  utility: {
    question: 'How do investor perceptions evolve under different market structures?',
    method: 'Rolling-window PT and CPT utility estimation based on daily returns.',
    observation: 'Chinese investors remain in a relatively positive utility regime, while U.S. investors exhibit persistent loss-oriented utility with stronger probability distortion.',
  },
  distribution: {
    question: 'What are the characteristics of behavioral utility distribution?',
    method: 'Cross-market statistical comparison using kernel density estimation and non-parametric tests.',
    observation: 'Investor utility distributions differ systematically across institutional environments, with Chinese markets showing less extreme loss aversion.',
  },
  profile: {
    question: 'How do market systems shape behavioral characteristics?',
    method: 'Multi-dimensional feature extraction through five behavioral dimensions.',
    observation: 'Market institutions continuously reshape investors\' reference points and long-term behavioral preferences, creating distinct behavioral profiles.',
  },
  event: {
    question: 'How do investors respond to external shocks?',
    method: 'Event-based utility comparison with event window analysis.',
    observation: 'Market reactions depend less on the event itself than on whether it disrupts the market\'s underlying reference point.',
  },
};

function UtilityDynamics({ hoveredPoint, setHoveredPoint }: { hoveredPoint: number | null; setHoveredPoint: (p: number | null) => void }) {
  const maxValue = Math.max(...utilityData.csi300_pt, ...utilityData.csi300_cpt, ...utilityData.spy_pt, ...utilityData.spy_cpt);
  const minValue = Math.min(...utilityData.csi300_pt, ...utilityData.csi300_cpt, ...utilityData.spy_pt, ...utilityData.spy_cpt);
  const padding = 40;
  const width = 500;
  const height = 280;

  const getX = (index: number) => padding + (index * (width - 2 * padding)) / (utilityData.labels.length - 1);
  const getY = (value: number) => height - padding - ((value - minValue) * (height - 2 * padding)) / (maxValue - minValue);

  const lines = [
    { data: utilityData.csi300_pt, color: '#e8a87c', name: 'CSI300 PT' },
    { data: utilityData.csi300_cpt, color: '#85cdca', name: 'CSI300 CPT' },
    { data: utilityData.spy_pt, color: '#c38d9e', name: 'SPY PT' },
    { data: utilityData.spy_cpt, color: '#a8b5a0', name: 'SPY CPT' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4 mb-4">
        {lines.map((line) => (
          <div key={line.name} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: line.color }} />
            <span className="text-xs text-gray-400">{line.name}</span>
          </div>
        ))}
      </div>

      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
        <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="rgba(255,255,255,0.1)" />
        <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="rgba(255,255,255,0.1)" />
        <line x1={padding} y1={getY(0)} x2={width - padding} y2={getY(0)} stroke="rgba(255,255,255,0.15)" strokeDasharray="4,4" />

        {[-0.2, -0.1, 0, 0.1, 0.2].map((val) => (
          <g key={val}>
            <line x1={padding} y1={getY(val)} x2={width - padding} y2={getY(val)} stroke="rgba(255,255,255,0.05)" />
            <text x={padding - 10} y={getY(val) + 4} textAnchor="end" fill="rgba(255,255,255,0.4)" fontSize="10">{val.toFixed(1)}</text>
          </g>
        ))}

        {utilityData.labels.map((label, i) => (
          <text key={label} x={getX(i)} y={height - 15} textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="9" className="select-none">{label}</text>
        ))}

        {lines.map((line, i) => (
          <motion.path
            key={line.name}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: i * 0.1 }}
            d={`M ${line.data.map((v, i) => `${getX(i)},${getY(v)}`).join(' L ')}`}
            stroke={line.color}
            strokeWidth="2"
            fill="none"
          />
        ))}

        {events.map((event) => (
          <g key={event.id}>
            <rect x={getX(event.position) - 20} y={padding} width={40} height={height - 2 * padding} fill="rgba(195, 141, 158, 0.1)" />
            <text x={getX(event.position)} y={padding + (height - 2 * padding) / 2} textAnchor="middle" dominantBaseline="middle" fill="#c38d9e" fontSize="9" fontWeight="medium">{event.name}</text>
          </g>
        ))}

        {lines.flatMap((line) => line.data.map((v, i) => (
          <motion.circle
            key={`${line.name}-${i}`}
            initial={{ r: 0 }}
            animate={{ r: hoveredPoint === i ? 5 : 3 }}
            transition={{ duration: 0.2 }}
            cx={getX(i)}
            cy={getY(v)}
            fill={line.color}
            className="cursor-pointer"
            onMouseEnter={() => setHoveredPoint(i)}
            onMouseLeave={() => setHoveredPoint(null)}
          />
        )))}

        {hoveredPoint !== null && (
          <g>
            <rect
              x={getX(hoveredPoint) - 60}
              y={padding - 30}
              width={120}
              height={25}
              fill="rgba(0,0,0,0.8)"
              rx="4"
            />
            <text x={getX(hoveredPoint)} y={padding - 15} textAnchor="middle" fill="white" fontSize="10">
              {utilityData.labels[hoveredPoint]}
            </text>
          </g>
        )}
      </svg>
    </div>
  );
}

function DistributionView() {
  const [view, setView] = useState<DistributionView>('density');

  if (view === 'density') {
    const maxDensity = 3.5;
    const width = 400;
    const height = 200;
    const padding = 40;

    const getX = (value: number) => padding + ((value + 0.3) * (width - 2 * padding)) / 0.6;
    const getY = (density: number) => height - padding - (density * (height - 2 * padding)) / maxDensity;

    const densityCurves = [
      { data: distributionData.csi300_pt.map((_, i) => ({ x: distributionData.csi300_pt[i], y: [0.5, 1.2, 1.8, 2.5, 3.0, 3.5, 3.2, 2.8, 2.2, 1.6, 1.0, 0.6, 0.3, 0.1][i] })), color: '#e8a87c', name: 'CSI300 PT' },
      { data: distributionData.spy_pt.map((_, i) => ({ x: distributionData.spy_pt[i], y: [0.1, 0.5, 1.2, 1.8, 2.5, 3.2, 3.5, 3.0, 2.5, 1.8, 1.2, 0.7, 0.3, 0.1][i] })), color: '#c38d9e', name: 'SPY PT' },
    ];

    return (
      <div className="space-y-4">
        <div className="flex gap-2">
          {(['density', 'boxplot', 'summary'] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`px-4 py-2 text-sm rounded-lg transition-all capitalize ${
                view === v
                  ? 'bg-accent-coral/20 text-accent-coral border border-accent-coral/50'
                  : 'bg-dark-600 text-gray-400 border border-dark-500'
              }`}
            >
              {v}
            </button>
          ))}
        </div>

        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
          <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="rgba(255,255,255,0.1)" />
          <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="rgba(255,255,255,0.1)" />

          {[-0.2, -0.1, 0, 0.1, 0.2].map((val) => (
            <text key={val} x={getX(val)} y={height - 15} textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="9">{val.toFixed(1)}</text>
          ))}

          {densityCurves.map((curve, i) => (
            <motion.path
              key={curve.name}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              d={`M ${curve.data.map((p) => `${getX(p.x)},${getY(p.y)}`).join(' L ')}`}
              stroke={curve.color}
              strokeWidth="2"
              fill="none"
            />
          ))}

          {densityCurves.map((curve, i) => (
            <motion.path
              key={`area-${curve.name}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: i * 0.2 + 0.2 }}
              d={`M ${getX(curve.data[0].x)},${height - padding} L ${curve.data.map((p) => `${getX(p.x)},${getY(p.y)}`).join(' L ')} L ${getX(curve.data[curve.data.length - 1].x)},${height - padding} Z`}
              fill={`${curve.color}20`}
            />
          ))}
        </svg>
      </div>
    );
  }

  if (view === 'boxplot') {
    const width = 400;
    const height = 200;
    const padding = 40;
    const boxWidth = 40;

    const boxes = [
      { name: 'CSI300 PT', min: -0.15, q1: -0.05, median: 0.035, q3: 0.08, max: 0.18, color: '#e8a87c' },
      { name: 'SPY PT', min: -0.25, q1: -0.12, median: -0.025, q3: 0.05, max: 0.18, color: '#c38d9e' },
    ];

    const getY = (value: number) => height - padding - ((value + 0.3) * (height - 2 * padding)) / 0.6;
    const getX = (index: number) => padding + (width - 2 * padding) / (boxes.length + 1) * (index + 1);

    return (
      <div className="space-y-4">
        <div className="flex gap-2">
          {(['density', 'boxplot', 'summary'] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`px-4 py-2 text-sm rounded-lg transition-all capitalize ${
                view === v
                  ? 'bg-accent-coral/20 text-accent-coral border border-accent-coral/50'
                  : 'bg-dark-600 text-gray-400 border border-dark-500'
              }`}
            >
              {v}
            </button>
          ))}
        </div>

        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
          <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="rgba(255,255,255,0.1)" />

          {boxes.map((box, i) => {
            const x = getX(i);
            return (
              <g key={box.name}>
                <line x1={x} y1={getY(box.min)} x2={x} y2={getY(box.max)} stroke={box.color} strokeWidth="2" />
                <rect x={x - boxWidth / 2} y={getY(box.q3)} width={boxWidth} height={getY(box.q1) - getY(box.q3)} fill={`${box.color}30`} stroke={box.color} strokeWidth="2" rx="2" />
                <line x1={x - boxWidth / 2} y1={getY(box.median)} x2={x + boxWidth / 2} y2={getY(box.median)} stroke={box.color} strokeWidth="2" />
                <text x={x} y={height - 15} textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="10">{box.name}</text>
              </g>
            );
          })}
        </svg>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {(['density', 'boxplot', 'summary'] as const).map((v) => (
          <button
            key={v}
            onClick={() => setView(v)}
            className={`px-4 py-2 text-sm rounded-lg transition-all capitalize ${
              view === v
                ? 'bg-accent-coral/20 text-accent-coral border border-accent-coral/50'
                : 'bg-dark-600 text-gray-400 border border-dark-500'
            }`}
          >
            {v}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-dark-700/50 rounded-xl p-4">
          <h4 className="text-accent-coral text-sm font-medium mb-3">CSI300</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">PT Mean</span>
              <span className="text-white">{summaryStats.csi300.pt.mean.toFixed(3)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">PT Median</span>
              <span className="text-white">{summaryStats.csi300.pt.median.toFixed(3)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">PT Std</span>
              <span className="text-white">{summaryStats.csi300.pt.std.toFixed(3)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">CPT Mean</span>
              <span className="text-white">{summaryStats.csi300.cpt.mean.toFixed(3)}</span>
            </div>
          </div>
        </div>
        <div className="bg-dark-700/50 rounded-xl p-4">
          <h4 className="text-accent-rose text-sm font-medium mb-3">SPY</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">PT Mean</span>
              <span className="text-white">{summaryStats.spy.pt.mean.toFixed(3)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">PT Median</span>
              <span className="text-white">{summaryStats.spy.pt.median.toFixed(3)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">PT Std</span>
              <span className="text-white">{summaryStats.spy.pt.std.toFixed(3)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">CPT Mean</span>
              <span className="text-white">{summaryStats.spy.cpt.mean.toFixed(3)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MarketProfile() {
  const centerX = 120;
  const centerY = 120;
  const radius = 80;
  const numDimensions = radarData.dimensions.length;

  const getPoint = (index: number, value: number) => {
    const angle = (Math.PI * 2 * index) / numDimensions - Math.PI / 2;
    const r = (value / 100) * radius;
    return { x: centerX + r * Math.cos(angle), y: centerY + r * Math.sin(angle) };
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-accent-coral" />
          <span className="text-sm text-gray-400">CSI300</span>
        </div>
        <svg viewBox="0 0 240 240" className="w-full h-auto">
          {[20, 40, 60, 80, 100].map((r) => (
            <circle key={r} cx={centerX} cy={centerY} r={(r / 100) * radius} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
          ))}
          {radarData.dimensions.map((_, i) => {
            const angle = (Math.PI * 2 * i) / numDimensions - Math.PI / 2;
            return <line key={i} x1={centerX} y1={centerY} x2={centerX + radius * Math.cos(angle)} y2={centerY + radius * Math.sin(angle)} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />;
          })}
          <motion.polygon
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            points={radarData.csi300.map((v, i) => { const p = getPoint(i, v); return `${p.x},${p.y}`; }).join(' ')}
            fill="rgba(232, 168, 124, 0.3)"
            stroke="#e8a87c"
            strokeWidth="2"
          />
          {radarData.csi300.map((v, i) => {
            const p = getPoint(i, v);
            return <motion.circle key={i} initial={{ r: 0 }} animate={{ r: 4 }} transition={{ delay: 0.3 + i * 0.1 }} cx={p.x} cy={p.y} fill="#e8a87c" />;
          })}
          {radarData.dimensions.map((dim, i) => {
            const angle = (Math.PI * 2 * i) / numDimensions - Math.PI / 2;
            const p = { x: centerX + (radius + 15) * Math.cos(angle), y: centerY + (radius + 15) * Math.sin(angle) };
            return <text key={dim} x={p.x} y={p.y} textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="8">{dim}</text>;
          })}
        </svg>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-accent-rose" />
          <span className="text-sm text-gray-400">SPY</span>
        </div>
        <svg viewBox="0 0 240 240" className="w-full h-auto">
          {[20, 40, 60, 80, 100].map((r) => (
            <circle key={r} cx={centerX} cy={centerY} r={(r / 100) * radius} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
          ))}
          {radarData.dimensions.map((_, i) => {
            const angle = (Math.PI * 2 * i) / numDimensions - Math.PI / 2;
            return <line key={i} x1={centerX} y1={centerY} x2={centerX + radius * Math.cos(angle)} y2={centerY + radius * Math.sin(angle)} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />;
          })}
          <motion.polygon
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            points={radarData.spy.map((v, i) => { const p = getPoint(i, v); return `${p.x},${p.y}`; }).join(' ')}
            fill="rgba(195, 141, 158, 0.3)"
            stroke="#c38d9e"
            strokeWidth="2"
          />
          {radarData.spy.map((v, i) => {
            const p = getPoint(i, v);
            return <motion.circle key={i} initial={{ r: 0 }} animate={{ r: 4 }} transition={{ delay: 0.3 + i * 0.1 }} cx={p.x} cy={p.y} fill="#c38d9e" />;
          })}
          {radarData.dimensions.map((dim, i) => {
            const angle = (Math.PI * 2 * i) / numDimensions - Math.PI / 2;
            const p = { x: centerX + (radius + 15) * Math.cos(angle), y: centerY + (radius + 15) * Math.sin(angle) };
            return <text key={dim} x={p.x} y={p.y} textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="8">{dim}</text>;
          })}
        </svg>
      </div>
    </div>
  );
}

function EventAnalysis() {
  const [event, setEvent] = useState<EventType>('tariff');
  const data = eventData[event];
  const labels = ['-4d', '-3d', '-2d', '-1d', 'Event', '+1d', '+2d', '+3d', '+4d'];

  const maxValue = Math.max(...data.csi300_pt, ...data.csi300_cpt, ...data.spy_pt, ...data.spy_cpt);
  const minValue = Math.min(...data.csi300_pt, ...data.csi300_cpt, ...data.spy_pt, ...data.spy_cpt);
  const padding = 40;
  const width = 450;
  const height = 220;

  const getX = (index: number) => padding + (index * (width - 2 * padding)) / (labels.length - 1);
  const getY = (value: number) => height - padding - ((value - minValue) * (height - 2 * padding)) / (maxValue - minValue);

  const lines = [
    { data: data.csi300_pt, color: '#e8a87c', name: 'CSI300 PT' },
    { data: data.csi300_cpt, color: '#85cdca', name: 'CSI300 CPT' },
    { data: data.spy_pt, color: '#c38d9e', name: 'SPY PT' },
    { data: data.spy_cpt, color: '#a8b5a0', name: 'SPY CPT' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {(['tariff', 'middleeast'] as const).map((e) => (
          <button
            key={e}
            onClick={() => setEvent(e)}
            className={`px-4 py-2 text-sm rounded-lg transition-all capitalize ${
              event === e
                ? 'bg-accent-rose/20 text-accent-rose border border-accent-rose/50'
                : 'bg-dark-600 text-gray-400 border border-dark-500'
            }`}
          >
            {e === 'tariff' ? 'US-China Tariff' : 'Middle East Conflict'}
          </button>
        ))}
      </div>

      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
        <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="rgba(255,255,255,0.1)" />
        <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="rgba(255,255,255,0.1)" />
        <line x1={getX(4)} y1={padding} x2={getX(4)} y2={height - padding} stroke="#c38d9e" strokeWidth="2" strokeDasharray="4,4" />

        <rect x={getX(3) - 10} y={padding} width={40} height={height - 2 * padding} fill="rgba(195, 141, 158, 0.1)" />

        {labels.map((label, i) => (
          <text key={label} x={getX(i)} y={height - 15} textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="10">{label}</text>
        ))}

        {lines.map((line, i) => (
          <motion.path
            key={line.name}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, delay: i * 0.1 }}
            d={`M ${line.data.map((v, i) => `${getX(i)},${getY(v)}`).join(' L ')}`}
            stroke={line.color}
            strokeWidth="2"
            fill="none"
          />
        ))}

        {lines.flatMap((line) => line.data.map((v, i) => (
          <motion.circle
            key={`${line.name}-${i}`}
            initial={{ r: 0 }}
            animate={{ r: 4 }}
            transition={{ delay: 0.5 + i * 0.05 }}
            cx={getX(i)}
            cy={getY(v)}
            fill={line.color}
          />
        )))}
      </svg>
    </div>
  );
}

export default function ProspectTheory() {
  const [activeTab, setActiveTab] = useState<TabType>('utility');
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);

  const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'utility', label: 'Utility Dynamics', icon: <LineChart size={16} /> },
    { id: 'distribution', label: 'Distribution', icon: <BarChart3 size={16} /> },
    { id: 'profile', label: 'Market Profile', icon: <PieChart size={16} /> },
    { id: 'event', label: 'Event Analysis', icon: <Clock size={16} /> },
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      className="min-h-screen flex flex-col justify-center py-24 px-4 bg-dark-800"
    >
      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <span className="text-accent-coral text-sm uppercase tracking-widest mb-4 block">
            PROJECT 02
          </span>
          <h2 className="text-5xl md:text-7xl font-light text-white mb-4">
            Prospect Theory Empirical Study
          </h2>
          <p className="text-xl text-gray-400 mb-6">
            Behavioral Finance Across Real Markets
          </p>
          <p className="text-gray-500 max-w-3xl mx-auto">
            This study applies Prospect Theory and Cumulative Prospect Theory to compare investor behavioral utility across the 
            Chinese and U.S. equity markets, revealing how different market structures shape risk perception and decision making.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass-card rounded-2xl p-8 mb-16"
        >
          <div className="flex border-b border-dark-600 mb-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-all border-b-2 -mb-px ${
                  activeTab === tab.id
                    ? 'text-accent-coral border-accent-coral'
                    : 'text-gray-500 border-transparent hover:text-gray-300'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1 bg-dark-900/50 rounded-xl p-6">
              <AnimatePresence mode="wait">
                {activeTab === 'utility' && (
                  <motion.div
                    key="utility"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <UtilityDynamics hoveredPoint={hoveredPoint} setHoveredPoint={setHoveredPoint} />
                  </motion.div>
                )}
                {activeTab === 'distribution' && (
                  <motion.div
                    key="distribution"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <DistributionView />
                  </motion.div>
                )}
                {activeTab === 'profile' && (
                  <motion.div
                    key="profile"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <MarketProfile />
                  </motion.div>
                )}
                {activeTab === 'event' && (
                  <motion.div
                    key="event"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <EventAnalysis />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="lg:w-80 space-y-4">
              <motion.div
                key={`q-${activeTab}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-dark-700/50 rounded-xl p-6 border-l-4 border-accent-coral"
              >
                <h3 className="text-accent-coral text-sm font-medium mb-2">Research Question</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{tabInfo[activeTab].question}</p>
              </motion.div>

              <motion.div
                key={`m-${activeTab}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="bg-dark-700/50 rounded-xl p-6 border-l-4 border-accent-mint"
              >
                <h3 className="text-accent-mint text-sm font-medium mb-2">Methodology</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{tabInfo[activeTab].method}</p>
              </motion.div>

              <motion.div
                key={`i-${activeTab}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="bg-dark-700/50 rounded-xl p-6 border-l-4 border-accent-rose"
              >
                <h3 className="text-accent-rose text-sm font-medium mb-2">Key Insight</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{tabInfo[activeTab].observation}</p>
              </motion.div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <p className="text-gray-400 max-w-2xl mx-auto">
            Prospect Theory is not only a behavioral finance theory, but also an empirical framework 
            for understanding how different market structures shape investor psychology.
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
}