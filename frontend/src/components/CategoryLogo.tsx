import { cn } from '@/lib/utils';
import type { LucideProps } from 'lucide-react';

export function CategoryLogo({
  bgColor,
  textColor,
  icon,
}: {
  bgColor: string;
  textColor: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
  >;
}) {
  const Icon = icon;

  return (
    <div
      className={cn(
        'flex size-10 items-center justify-center rounded-lg',
        bgColor,
        textColor,
      )}
    >
      <Icon className={cn('size-4', textColor)} />
    </div>
  );
}
