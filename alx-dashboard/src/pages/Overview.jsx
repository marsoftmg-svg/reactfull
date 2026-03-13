import { LineChart, Line, XAxis, YAxis, CartesianGrid,
         Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { setSelectedRange } from '../store/dashboardSlice';
import { useMetrics }       from '../hooks/useMetrics';
import KpiCard              from '../components/ui/KpiCard';
import { useDispatch, useSelector } from 'react-redux';

const RANGES = ['3m', '6m', '12m'];

function Overview() {
  const dispatch       = useDispatch();
  const selectedRange  = useSelector(s => s.dashboard.selectedRange);
  const { kpi, chartData } = useMetrics();  // <-- custom hook
 
  return (
    <div className='page'>
      <div className='page-header'>
        <h1>Przeglad sprzedazy</h1>
 
        {/* Filtr zakresu – dispatches do Redux */}
        <div className='range-buttons'>
          {RANGES.map(r => (
            <button
              key={r}
              className={`range-btn ${selectedRange === r ? 'active' : ''}`}
              onClick={() => dispatch(setSelectedRange(r))}
            >
              {r}
            </button>
          ))}
        </div>
      </div>
      {/* Karty KPI */}
      <div className='kpi-grid'>
        <KpiCard label={kpi.revenue.label}   value={kpi.revenue.value}
                 trend={kpi.revenue.trend}    format='currency' />
        <KpiCard label={kpi.orders.label}    value={kpi.orders.value}
                 trend={kpi.orders.trend} />
        <KpiCard label={kpi.customers.label} value={kpi.customers.value}
                 trend={kpi.customers.trend} />
        <KpiCard label={kpi.avgOrder.label}  value={kpi.avgOrder.value}
                 trend={kpi.avgOrder.trend}   format='currency' />
      </div>

      {/* Wykres liniowy Recharts */}
      <div className='chart-card'>
        <h2>Trend przychodow</h2>
        <ResponsiveContainer width='100%' height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray='3 3' stroke='#e2e8f0' />
            <XAxis dataKey='month' />
            <YAxis tickFormatter={v => `${(v/1000).toFixed(0)}k`} />
            <Tooltip formatter={v => [`${v.toLocaleString()} PLN`, 'Przychod']} />
            <Legend />
            <Line type='monotone' dataKey='revenue'
                  stroke='#6366F1' strokeWidth={2}
                  dot={{ r: 4 }} activeDot={{ r: 7 }} />
            <Line type='monotone' dataKey='orders'
                  stroke='#F59E0B' strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
 
export default Overview;