import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { Metric } from '..';
import { formatCurrency } from '../../../utils/format-currency';

export function DashboardMetricCard({ metric }: { metric: Metric }) {
  const toneClasses = {
    purple: 'text-purple',
    brand: 'text-brand',
    red: 'text-red',
  };

  const Icon = metric.icon;

  return (
    <Card className='flex gap-3 p-6 m-0 border border-gray-200 bg-white'>
      <CardContent className='flex flex-col gap-4 items-start p-0'>
        <div className='flex gap-3 text-xs font-medium uppercase text-gray-500 tracking-wide'>
          <Icon className={cn('size-5', toneClasses[metric.tone])} />
          <span>{metric.label}</span>
        </div>
        <span className='text-3xl font-bold text-gray-800 tabular-nums'>
          {formatCurrency(metric.value)}
        </span>
      </CardContent>
    </Card>
  );
}
