import { cn } from '@/lib/utils';

export function CategoryTag({
  name,
  bgColor,
  textColor,
}: {
  name: string;
  bgColor: string;
  textColor: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-sm font-medium',
        bgColor,
        textColor,
      )}
    >
      {name}
    </span>
  );
}
