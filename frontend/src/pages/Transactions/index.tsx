import { Button } from '@/components/ui/button';
import { useQuery } from '@apollo/client/react';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { LIST_TRANSACTIONS } from '../../lib/graphql/queries/Transaction.ts';
import type { Transaction } from '../../types/index.ts';
import { CreateTransactionDialog } from './components/CreateTransactionDialog.tsx';
import { DeleteTransactionDialog } from './components/DeleteTransactionDialog.tsx';
import { EditTransactionDialog } from './components/EditTransactionDialog.tsx';
import { TransactionsFilters } from './components/TransactionsFilters.tsx';
import { TransactionsTable } from './components/TransactionsTable.tsx';
import { TransactionsTableSkeleton } from './components/TransactionsTableSkeleton.tsx';

export function Transactions() {
  const { data, loading, refetch } = useQuery(LIST_TRANSACTIONS);

  const transactions = data?.getAllTransactionsByUserId || [];

  const [openCreateDialog, setCreateOpenDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [transaction, setTransaction] = useState<Transaction | null>(null);

  const handleEditTransaction = (transaction: Transaction) => {
    setTransaction(transaction);
    setOpenEditDialog(true);
  };

  const handleDeleteTransaction = (transaction: Transaction) => {
    setTransaction(transaction);

    setOpenDeleteDialog(true);
  };

  return (
    <>
      <div className='flex flex-1 gap-8 flex-col w-full p-12 justify-start'>
        <header className='flex justify-between items-center gap-4'>
          <div className='flex flex-col gap-0.5'>
            <h1 className='text-2xl font-bold text-gray-800'>Transações</h1>
            <p className='text-base font-normal text-gray-600'>
              Gerencie todas as suas transacoes financeiras
            </p>
          </div>
          <Button
            className='hover:bg-brand-dark text-sm font-medium text-white'
            size='lg'
            onClick={() => setCreateOpenDialog(true)}
          >
            <Plus className='size-4' />
            Nova transação
          </Button>
        </header>
        <TransactionsFilters />

        {loading ? (
          <TransactionsTableSkeleton />
        ) : (
          <TransactionsTable
            transactions={transactions}
            onEditTransaction={handleEditTransaction}
            onDeletedTransaction={handleDeleteTransaction}
          />
        )}
      </div>

      <CreateTransactionDialog
        open={openCreateDialog}
        onOpenChange={setCreateOpenDialog}
        onCreated={refetch}
      />

      <EditTransactionDialog
        transaction={transaction}
        open={openEditDialog}
        onOpenChange={setOpenEditDialog}
        onEdited={refetch}
      />

      <DeleteTransactionDialog
        transaction={transaction}
        open={openDeleteDialog}
        onOpenChange={setOpenDeleteDialog}
        onDeleted={refetch}
      />
    </>
  );
}
