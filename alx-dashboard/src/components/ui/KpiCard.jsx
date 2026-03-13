                                   
function KpiCard({ label, value, trend, format }) {
  const isPositive = trend >= 0;
 
  const formatted = format === 'currency'
    ? `${Math.round(value).toLocaleString('pl-PL')} PLN`
    : value.toLocaleString('pl-PL');
 
  return (
    <div className='kpi-card'>
      <span className='kpi-label'>{label}</span>
      <span className='kpi-value'>{formatted}</span>
      <span className={`kpi-trend ${isPositive ? 'positive' : 'negative'}`}>
        {isPositive ? '▲' : '▼'} {Math.abs(trend)}%
      </span>
    </div>
  );
}
 
export default KpiCard;