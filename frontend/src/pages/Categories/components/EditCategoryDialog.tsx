import { useMutation } from '@apollo/client/react';
import { useEffect, useState } from 'react';
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
import { UPDATE_CATEGORY } from '../../../lib/graphql/mutations/Category';
import { LIST_CATEGORIES } from '../../../lib/graphql/queries/Category';
import { Colors, IconsEnum, type Category } from '../../../types';
import { CategoryColorInput } from './CategoryColorInput';
import { CategoryIconInput } from './CategoryIconInput';

interface EditCategoryDialogProps {
  category: Category | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdited?: () => void;
}

export function EditCategoryDialog({
  category,
  open,
  onOpenChange,
  onEdited,
}: EditCategoryDialogProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState<IconsEnum | null>(null);
  const [color, setColor] = useState<Colors | null>(null);

  useEffect(() => {
    if (open) {
      if (!category) return;

      setName(category.name);
      setDescription(category.description || '');
      setIcon(category.icon);
      setColor(category.color);
    }
  }, [category, open]);

  const [updateCategoryById, { loading }] = useMutation(UPDATE_CATEGORY, {
    refetchQueries: [{ query: LIST_CATEGORIES }],
    onCompleted() {
      toast.success('Categoria atualizada com sucesso');

      handleOpenChange(false);

      onEdited?.();
    },
    onError() {
      toast.error('Falha ao atualizar a categoria');
    },
  });

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    if (!category) return;

    await updateCategoryById({
      variables: {
        updateCategoryByIdId: category.id,
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
            Editar categoria
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
              placeholder='Ex. Alimentação'
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
