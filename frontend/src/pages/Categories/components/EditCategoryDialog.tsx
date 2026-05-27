import { useEffect, useState } from 'react';
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
import { Colors, IconsEnum, type Category } from '../../../types';
import { CategoryColorInput } from './CategoryColorInput';
import { CategoryIconInput } from './CategoryIconInput';

interface EditCategoryDialogProps {
  category: Category;
  open: boolean;
  onOpenChange: (oepn: boolean) => void;
  onEdited?: (category: Category) => void;
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
      setName(category.name);
      setDescription(category.description || '');
      setIcon(category.icon);
      setColor(category.color);
    }
  }, [category, open]);

  const loading = false; // TODO: loading state from mutation

  // const [createCategory, { loading }] = useMutation(CREATE_CATEGORY, {
  //   onCompleted() {
  //     toast.success('Category criada com sucesso');
  //     onOpenChange(false);
  //     onEdited?.();
  //   },
  //   onError() {
  //     toast.error('Falha ao criar a ideia');
  //   },
  // });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onEdited?.({
      ...category,
      name,
      description,
      icon: icon || category.icon,
      color: color || category.color,
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
