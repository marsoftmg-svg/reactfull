import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
         PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts';
import { salesData, categoryData } from '../data/mockData';
 
function Analytics() {
  return (
    <div className='page'>
      <h1>Analityka</h1>
 
      <div className='charts-grid'>
        {/* Wykres slupkowy – sprzedaz miesiecznie */}
        <div className='chart-card'>
          <h2>Sprzedaz miesiecznie (PLN)</h2>
          <ResponsiveContainer width='100%' height={280}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='month' />
              <YAxis tickFormatter={v => `${(v/1000).toFixed(0)}k`} />
              <Tooltip formatter={v => `${v.toLocaleString()} PLN`} />
              <Bar dataKey='revenue' fill='#6366F1' radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
 
        {/* Pie chart – udzialy kategorii */}
        <div className='chart-card'>
          <h2>Udzialy kategorii (%)</h2>
          <ResponsiveContainer width='100%' height={280}>
            <PieChart>
              <Pie
                data={categoryData}
                dataKey='value'
                nameKey='name'
                cx='50%' cy='50%'
                outerRadius={100}
                label={({ name, value }) => `${name}: ${value}%`}
              >
                {categoryData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
                      </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
 
export default Analytics;