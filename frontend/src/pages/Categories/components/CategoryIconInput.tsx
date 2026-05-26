import { RadioGroup, RadioGroupItem } from '../../../components/ui/radio-group';
import type { Icon } from './CreateCategoryDialog';

export function CategoryIcon({
  value,
  id,
  children,
}: {
  value: string;
  id: string;
  children: React.ReactNode;
}) {
  return (
    <RadioGroupItem
      value={value}
      id={id}
      className='flex size-10 cursor-pointer items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-500 transition-all hover:bg-gray-200 data-[state=checked]:border-brand data-[state=checked]:bg-gray-100 data-[state=checked]:text-gray-600'
    >
      {children}
    </RadioGroupItem>
  );
}

export function CategoryIconInput({
  icons,
  onValueChange,
}: {
  icons: Icon[];
  onValueChange: (value: Icon | null) => void;
}) {
  return (
    <RadioGroup
      onValueChange={(value) => {
        const selectedIcon = icons.find((icon) => icon.name === value) || null;

        onValueChange(selectedIcon);
      }}
      className='grid grid-cols-8 gap-2 p-0'
    >
      {icons.map((icon) => {
        const Icon = icon.icon;

        if (!Icon) {
          console.warn(`Ícone "${icon.name}" não foi encontrado no Lucide.`);
          return null;
        }

        return (
          <CategoryIcon key={icon.name} value={icon.name} id={icon.name}>
            <Icon className='h-5 w-5' />
          </CategoryIcon>
        );
      })}
    </RadioGroup>
  );
}
