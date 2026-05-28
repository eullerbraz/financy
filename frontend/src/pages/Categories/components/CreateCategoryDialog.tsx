import { useMutation } from '@apollo/client/react';
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
import { CREATE_CATEGORY } from '../../../lib/graphql/mutations/Category';
import {
  CATEGORIES_METRICS,
  LIST_CATEGORIES,
} from '../../../lib/graphql/queries/Category';
import { Colors, IconsEnum } from '../../../types';
import { CategoryColorInput } from './CategoryColorInput';
import { CategoryIconInput } from './CategoryIconInput';

interface CreateCategoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreated?: () => void;
}

export function CreateCategoryDialog({
  open,
  onOpenChange,
  onCreated,
}: CreateCategoryDialogProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState<IconsEnum | null>(null);
  const [color, setColor] = useState<Colors | null>(null);

  const [createCategory, { loading }] = useMutation(CREATE_CATEGORY, {
    refetchQueries: [{ query: LIST_CATEGORIES }, { query: CATEGORIES_METRICS }],
    onCompleted() {
      toast.success('Categoria criada com sucesso');

      handleOpenChange(false);

      onCreated?.();
    },
    onError() {
      toast.error('Falha ao criar a categoria');
    },
  });

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    await createCategory({
      variables: {
        data: {
          name,
          description,
          icon,
          color,
        },
      },
    });
  };

  const clear = () => {
    setName('');
    setDescription('');
    setIcon(null);
    setColor(null);
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
            Nova categoria
          </DialogTitle>
          <DialogDescription className='text-sm font-normal text-gray-600'>
            Organize suas transações com categorias
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className='flex flex-col gap-4 w-full'>
          <div className='group flex flex-col gap-2'>
            <Label
              htmlFor='title'
              className='group-has-[[data-slot=input-group-control]:focus-visible]:text-brand'
            >
              Título
            </Label>
            <Input
              id='title'
              placeholder='Ex. Almoço no restaurante'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
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
            <span className='text-xs text-gray-500 font-normal'>Opcional</span>
          </div>

          <div className='group flex flex-col gap-2'>
            <Label
              htmlFor='icon'
              className='group-has-[[data-slot=input-group-control]:focus-visible]:text-brand'
            >
              Ícone
            </Label>

            <CategoryIconInput
              value={icon}
              onValueChange={setIcon}
              icons={Object.values(IconsEnum)}
            />
          </div>

          <div className='group flex flex-col gap-2'>
            <Label
              htmlFor='cor'
              className='group-has-[[data-slot=input-group-control]:focus-visible]:text-brand'
            >
              Cor
            </Label>

            <CategoryColorInput
              value={color}
              onValueChange={setColor}
              colors={Object.values(Colors)}
            />
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
