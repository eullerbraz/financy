import { useMutation, useQuery } from '@apollo/client/react';
import { useState } from 'react';
import { toast } from 'sonner';
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
import { CREATE_TRANSACTION } from '../../../lib/graphql/mutations/Transaction';
import {
  CATEGORIES_METRICS,
  LIST_CATEGORIES,
} from '../../../lib/graphql/queries/Category';
import {
  LIST_RECENT_TRANSACTIONS,
  LIST_TRANSACTIONS,
} from '../../../lib/graphql/queries/Transaction';
import { TransactionType } from '../../../types';
import { TransactionTypeInput } from './TransactionTypeInput';

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
  const [type, setType] = useState<TransactionType>(TransactionType.outflow);
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState<number | null>(null);
  const [categoryId, setCategoryId] = useState<string>('');

  const { data } = useQuery(LIST_CATEGORIES);

  const categories = data?.getAllCategoriesByUserId || [];

  const [createTransaction, { loading }] = useMutation(CREATE_TRANSACTION, {
    refetchQueries: [
      { query: LIST_CATEGORIES },
      { query: CATEGORIES_METRICS },
      { query: LIST_RECENT_TRANSACTIONS },
      { query: LIST_TRANSACTIONS },
    ],
    onCompleted() {
      toast.success('Transaction criada com sucesso');

      handleOpenChange(false);

      onCreated?.();
    },
    onError() {
      toast.error('Falha ao criar a transação');
    },
  });

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    await createTransaction({
      variables: {
        data: {
          type,
          description,
          date: new Date(date).toISOString(),
          amount,
          categoryId,
        },
      },
    });
  };

  const clear = () => {
    setType(TransactionType.outflow);
    setDescription('');
    setDate('');
    setAmount(0);
    setCategoryId('');
  };

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      clear();
    }

    onOpenChange(isOpen);
  };

  const isSubmitDisabled = !description || !date || !amount || !categoryId;

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
                setType(value || TransactionType.outflow)
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
                value={date.split('T')[0] || ''}
                onChange={(e) =>
                  setDate(new Date(e.target.value).toISOString() || '')
                }
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

            <Select
              onValueChange={(value) => setCategoryId(value)}
              value={categoryId}
            >
              <SelectTrigger id='category' className='w-full'>
                <SelectValue placeholder='Selecione' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {categories.map((c: any) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className='flex justify-end gap-3 pt-2'>
            <Button
              className='w-full hover:bg-brand-dark'
              type='submit'
              disabled={loading || isSubmitDisabled}
            >
              Salvar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
