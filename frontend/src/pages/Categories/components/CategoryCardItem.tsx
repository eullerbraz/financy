import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { SquarePen, Trash } from 'lucide-react';
import { colorsMap, type Category } from '..';
import { CategoryLogo } from '../../../components/CategoryLogo';
import { CategoryTag } from '../../../components/CategoryTag';

export function CategoryCardItem({ category }: { category: Category }) {
  const Icon = category.icon;
  const color = colorsMap[category.tone];

  return (
    <Card className='flex flex-col gap-5 border border-gray-200 p-6'>
      <CardHeader className='flex items-start justify-between gap-4 p-0'>
        <CategoryLogo bgColor={color.bg} textColor={color.text} icon={Icon} />

        <div className='min-w-28 flex items-center justify-end gap-2'>
          <Button
            size='icon'
            variant='outline'
            className='border-gray-300 text-red'
          >
            <Trash className='size-4 text-feedback-danger' />
          </Button>

          <Button
            size='icon'
            variant='outline'
            className='border-gray-300 text-gray-600'
          >
            <SquarePen className='size-4 text-gray-700' />
          </Button>
        </div>
      </CardHeader>

      <CardContent className='flex flex-col'>
        <div className='flex flex-col gap-1'>
          <h3 className='text-base font-semibold text-gray-800'>
            {category.name}
          </h3>

          <p className='text-sm line-clamp-2 font-normal leading-5 h-10 text-gray-600'>
            {category.description}
          </p>
        </div>
      </CardContent>

      <CardFooter className='flex gap-4 items-center justify-between border-t-0 p-0'>
        <CategoryTag
          name={category.name}
          bgColor={color.bg}
          textColor={color.textDark}
        />

        <span className='text-sm font-normal text-gray-600'>
          {category.items} {category.items === 1 ? 'item' : 'itens'}
        </span>
      </CardFooter>
    </Card>
  );
}
