import { useState } from 'react';
import { Button } from '../../../components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../../../components/ui/dialog';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../components/ui/select';
import { TransactionTypeInput } from './TransactionTypeInput';

export const TransactionTypeEnum = {
  INFLOW: 'inflow',
  OUTFLOW: 'outflow',
} as const;

export type TransactionType =
  (typeof TransactionTypeEnum)[keyof typeof TransactionTypeEnum];

interface CreateTransactionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreated?: () => void;
}

export function CreateTransactionDialog({
  open,
  onOpenChange,
  onCreated,
}: CreateTransactionDialogProps) {
  const [type, setType] = useState<TransactionType>(
    TransactionTypeEnum.OUTFLOW,
  );
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState<number | null>(null);
  const [category, setCategory] = useState<string | null>(null);

  const loading = false; // TODO: loading state from mutation

  // const [createCategory, { loading }] = useMutation(CREATE_CATEGORY, {
  //   onCompleted() {
  //     toast.success('Category criada com sucesso');
  //     onOpenChange(false);
  //     onCreated?.();
  //   },
  //   onError() {
  //     toast.error('Falha ao criar a ideia');
  //   },
  // });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log({
      type,
      description,
      date,
      amount,
      category,
    });

    onCreated?.();
  };

  const clear = () => {
    setType(TransactionTypeEnum.OUTFLOW);
    setDescription('');
    setDate('');
    setAmount(0);
    setCategory(null);
  };

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      clear();
    }

    onOpenChange(isOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className='gap-6 max-w-md'>
        <DialogHeader className='flex flex-col items-start gap-0.5'>
          <DialogTitle className='text-base font-semibold text-gray-800'>
            Nova transação
          </DialogTitle>
          <DialogDescription className='text-sm font-normal text-gray-600'>
            Registre sua despesa ou receita
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className='flex flex-col gap-4 w-full'>
          <div className='group flex flex-col gap-2'>
            <TransactionTypeInput
              value={type}
              onValueChange={(value) =>
                setType(value || TransactionTypeEnum.OUTFLOW)
              }
            />
          </div>

          <div className='group flex flex-col gap-2'>
            <Label
              htmlFor='description'
              className='group-has-[[data-slot=input-group-control]:focus-visible]:text-brand'
            >
              Descrição
            </Label>
            <Input
              id='description'
              placeholder='Ex. Alimentação'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className='flex gap-2 w-full'>
            <div className='group flex flex-col gap-2 flex-1'>
              <Label
                htmlFor='date'
                className='group-has-[[data-slot=input-group-control]:focus-visible]:text-brand'
              >
                Data
              </Label>
              <Input
                id='date'
                type='date'
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <div className='group flex flex-col gap-2 flex-1'>
              <Label
                htmlFor='amount'
                className='group-has-[[data-slot=input-group-control]:focus-visible]:text-brand'
              >
                Valor
              </Label>
              <Input
                id='amount'
                type='number'
                placeholder='R$ 0,00'
                value={amount ?? ''}
                onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
              />
            </div>
          </div>

          <div className='group flex flex-col gap-2 flex-1'>
            <Label
              htmlFor='category'
              className='group-has-[[data-slot=input-group-control]:focus-visible]:text-brand text-sm font-medium text-gray-700'
            >
              Categoria
            </Label>

            <Select defaultValue='all'>
              <SelectTrigger id='category' className='w-full'>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value='all'>Todas</SelectItem>
                  <SelectItem value='food'>Alimentacao</SelectItem>
                  <SelectItem value='transport'>Transporte</SelectItem>
                  <SelectItem value='market'>Mercado</SelectItem>
                  <SelectItem value='investiment'>Investimento</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className='flex justify-end gap-3 pt-2'>
            <Button
              className='w-full hover:bg-brand-dark'
              type='submit'
              disabled={loading}
            >
              Salvar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
