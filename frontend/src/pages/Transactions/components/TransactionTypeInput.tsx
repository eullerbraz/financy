import { ArrowDownCircle, ArrowUpCircle } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '../../../components/ui/radio-group';
import {
  TransactionTypeEnum,
  type TransactionType,
} from './CreateTransactionDialog';

export function TransactionTypeOutflow() {
  return (
    <RadioGroupItem
      value={TransactionTypeEnum.OUTFLOW}
      id={TransactionTypeEnum.OUTFLOW}
      className='flex flex-1 gap-3 h-12 p-1 cursor-pointer items-center justify-center border-0 rounded-lg bg-white text-gray-500 text-base font-normal transition-all hover:bg-gray-200 data-[state=checked]:font-medium data-[state=checked]:text-red data-[state=checked]:border data-[state=checked]:border-red'
    >
      <ArrowDownCircle className='size-4' />

      <span>Despesa</span>
    </RadioGroupItem>
  );
}

export function TransactionTypeInflow() {
  return (
    <RadioGroupItem
      value={TransactionTypeEnum.INFLOW}
      id={TransactionTypeEnum.INFLOW}
      className='flex flex-1 gap-3 h-12 p-1 cursor-pointer items-center justify-center border-0 rounded-lg bg-white text-gray-500 text-base font-normal transition-all hover:bg-gray-200 data-[state=checked]:font-medium data-[state=checked]:text-green data-[state=checked]:border data-[state=checked]:border-green'
    >
      <ArrowUpCircle className='size-4' />

      <span>Receita</span>
    </RadioGroupItem>
  );
}

export function TransactionTypeInput({
  value,
  onValueChange,
}: {
  value: TransactionType | null;
  onValueChange: (value: TransactionType | null) => void;
}) {
  return (
    <RadioGroup
      value={value}
      onValueChange={(value) => {
        const selectedType =
          value === 'inflow' || value === 'outflow' ? value : null;

        onValueChange(selectedType);
      }}
      className='flex gap-2 w-full'
    >
      <TransactionTypeOutflow />
      <TransactionTypeInflow />
    </RadioGroup>
  );
}
