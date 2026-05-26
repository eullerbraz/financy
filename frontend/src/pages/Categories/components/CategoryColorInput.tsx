import { RadioGroup, RadioGroupItem } from '../../../components/ui/radio-group';
import { cn } from '../../../lib/utils';
import type { Color } from './CreateCategoryDialog';

export function CategoryColor({
  color,
  bgColor,
}: {
  color: string;
  bgColor: string;
}) {
  return (
    <RadioGroupItem
      value={color}
      id={color}
      className='flex w-12 h-7 p-1 cursor-pointer items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-500 transition-all hover:bg-gray-200 data-[state=checked]:border-brand data-[state=checked]:bg-gray-100 data-[state=checked]:text-gray-600'
    >
      <div className={cn('w-full h-full rounded-sm', bgColor)} />
    </RadioGroupItem>
  );
}

export function CategoryColorInput({
  colors,
  onValueChange,
}: {
  colors: Color[];
  onValueChange: (value: Color | null) => void;
}) {
  return (
    <RadioGroup
      onValueChange={(value) => {
        const selectedColor =
          colors.find((color) => color.name === value) || null;

        onValueChange(selectedColor);
      }}
      className='grid grid-cols-7 gap-2 p-0'
    >
      {colors.map((color) => (
        <CategoryColor key={color.name} color={color.name} bgColor={color.bg} />
      ))}
    </RadioGroup>
  );
}
