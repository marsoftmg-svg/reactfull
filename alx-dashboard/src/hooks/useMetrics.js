import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { salesData } from '../data/mockData';

const RANGE_MAP = { '3m': 3, '6m': 6, '12m': 12 };

export function useMetrics() {
  const selectedRange = useSelector(s => s.dashboard.selectedRange);

  // useMemo – przeliczaj tylko gdy zmieni sie zakres
  const metrics = useMemo(() => {
    const months = RANGE_MAP[selectedRange] ?? 12;
    const slice  = salesData.slice(-months);

    const totalRevenue  = slice.reduce((s, d) => s + d.revenue,   0);
    const totalOrders   = slice.reduce((s, d) => s + d.orders,    0);
    const totalCustomers = slice.reduce((s, d) => s + d.customers, 0);
    const avgOrderValue = totalRevenue / totalOrders;

    // Trend vs poprzedni okres
    const prev = salesData.slice(-months * 2, -months);
    const prevRevenue = prev.reduce((s, d) => s + d.revenue, 0) || 1;
    const revenueTrend = ((totalRevenue - prevRevenue) / prevRevenue * 100).toFixed(1);

    return {
      kpi: {
        revenue:    { value: totalRevenue,   trend: +revenueTrend, label: 'Przychod' },
        orders:     { value: totalOrders,    trend: 12.4,          label: 'Zamowienia' },
        customers:  { value: totalCustomers, trend: 8.1,           label: 'Klienci' },
        avgOrder:   { value: avgOrderValue,  trend: -2.3,          label: 'Sr. koszyk' },
      },
      chartData: slice,  // gotowe do Recharts pobieranie danych bardzo szybko do wykresów
    };
  }, [selectedRange]);
 
  return metrics;
}