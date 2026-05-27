import { useMutation } from '@apollo/client/react';
import { toast } from 'sonner';
import { Button } from '../../../components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../../components/ui/dialog';
import { DELETE_TRANSACTION } from '../../../lib/graphql/mutations/Transaction';
import type { Transaction } from '../../../types';

interface DeleteTransactionDialogProps {
  transaction: Transaction | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDeleted: () => void;
}

export function DeleteTransactionDialog({
  open,
  onOpenChange,
  transaction,
  onDeleted,
}: DeleteTransactionDialogProps) {
  const [deleteTransactionById, { loading }] = useMutation(DELETE_TRANSACTION, {
    onCompleted() {
      toast.success('Transação removida com sucesso');

      onOpenChange(false);

      onDeleted?.();
    },
    onError() {
      toast.error('Falha ao remover a transação');
    },
  });

  const handleDeleteTransaction = async () => {
    if (!transaction) return;

    await deleteTransactionById({
      variables: {
        deleteTransactionByIdId: transaction.id,
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader className='flex flex-col items-start gap-4'>
          <DialogTitle className='text-base font-semibold text-gray-800'>
            Remover transação
          </DialogTitle>
          <DialogDescription className='text-sm font-normal text-gray-600'>
            <span>Tem certeza que deseja remover a transação </span>
            <span className='font-semibold'> {transaction?.description}</span>
            <span>? Essa ação não poderá ser desfeita.</span>
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            className='hover:bg-gray-200'
            variant='outline'
            onClick={() => onOpenChange(false)}
          >
            Cancelar
          </Button>
          <Button
            className='bg-red text-white hover:bg-red-dark'
            variant='destructive'
            onClick={handleDeleteTransaction}
            disabled={loading}
          >
            Remover
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
