import type { ComponentType, SVGProps } from 'react';

import { Card, CardContent } from '@/components/ui/card';
import { cn } from '../../../lib/utils';

export function CategoryMetricCard({
  icon: Icon,
  label,
  value,
  iconColor,
}: {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  label: string;
  value: string;
  iconColor: string;
}) {
  return (
    <Card className='flex border border-gray-200 bg-white p-6'>
      <CardContent className='flex items-start gap-4 p-0'>
        <Icon className={cn('size-8', iconColor)} />

        <div className='flex flex-col gap-2'>
          <span className='text-3xl font-bold text-gray-800 tabular-nums'>
            {value}
          </span>

          <span className='text-xs font-medium uppercase tracking-wide text-gray-500'>
            {label}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
