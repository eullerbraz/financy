import type { Category } from '..';
import { CategoryTag } from '../../../components/CategoryTag';
import { formatCurrency } from '../../../utils/format-currency';

export function DashboardCategoryItem({ category }: { category: Category }) {
  return (
    <div className='flex items-center'>
      <CategoryTag
        name={category.name}
        bgColor={`bg-${category.color}-light`}
        textColor={`text-${category.color}-dark`}
      />

      <div className='flex items-center justify-end flex-1'>
        <span className='min-w-16 text-sm font-normal text-gray-600 text-right'>
          {category.items} itens
        </span>
        <span className='min-w-24 text-sm font-semibold text-gray-800 text-right'>
          {formatCurrency(category.amount)}
        </span>
      </div>
    </div>
  );
}
