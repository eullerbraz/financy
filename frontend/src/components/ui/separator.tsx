import * as React from 'react';

import { cn } from '@/lib/utils';

function Separator({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='separator'
      className={cn(
        'text-gray-500 text-sm font-normal flex items-center gap-2',
        className,
      )}
      {...props}
    >
      <div className='w-full h-px bg-gray-300' />
      <span>ou</span>
      <div className='w-full h-px bg-gray-300' />
    </div>
  );
}

export { Separator };
