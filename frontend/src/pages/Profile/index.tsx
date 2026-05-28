import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useMutation } from '@apollo/client/react';
import { LogOut, Mail, UserRound } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '../../components/ui/input-group';
import { UPDATE_USER } from '../../lib/graphql/mutations/User';
import { useAuthStore } from '../../stores/auth';

export function Profile() {
  const { user, logout, updateUserName } = useAuthStore();
  const email = user?.email || '';

  const [name, setName] = useState(user?.name || '');

  const navigate = useNavigate();

  const initials = user?.name
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0]?.toUpperCase())
    .join('')
    .slice(0, 2);

  const [updateUserById, { loading }] = useMutation(UPDATE_USER, {
    onCompleted() {
      toast.success('Alterações salvas com sucesso!');
    },
    onError() {
      toast.error('Não foi possível salvar as alterações.');
    },
  });

  const handleSave = async (event: React.SubmitEvent) => {
    event.preventDefault();

    await updateUserById({
      variables: {
        data: { name },
      },
    });

    updateUserName(name);
  };

  const handleLogout = () => {
    logout();

    navigate('/login');
  };

  return (
    <Card className='flex flex-col w-full max-w-[28rem] border-gray-200 p-8 gap-8'>
      <CardHeader className='flex flex-col items-center gap-6'>
        <Avatar size='default' className='size-16 bg-gray-200'>
          <AvatarFallback className='bg-gray-300 text-2xl font-medium text-gray-800'>
            {initials}
          </AvatarFallback>
        </Avatar>

        <div className='flex flex-col items-center gap-0.5'>
          <CardTitle className='text-xl font-semibold text-gray-800'>
            {user?.name || 'Usuário'}
          </CardTitle>

          <p className='text-base font-normal text-gray-500'>{email}</p>
        </div>
      </CardHeader>

      <div className='h-px w-full bg-gray-200 rounded-full' />

      <CardContent className='flex flex-col gap-6 p-0'>
        <form onSubmit={handleSave} className='flex flex-col gap-5'>
          <div className='group flex flex-col gap-2'>
            <Label
              htmlFor='name'
              className='group-has-[[data-slot=input-group-control]:focus-visible]:text-brand'
            >
              Nome completo
            </Label>
            <InputGroup>
              <InputGroupAddon align='inline-start'>
                <UserRound className='size-4' />
              </InputGroupAddon>
              <InputGroupInput
                id='name'
                placeholder='Seu nome completo'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </InputGroup>
          </div>

          <div className='group flex flex-col gap-2'>
            <Label
              htmlFor='email'
              className='group-has-[[data-slot=input-group-control]:focus-visible]:text-brand'
            >
              E-mail
            </Label>
            <InputGroup>
              <InputGroupAddon align='inline-start'>
                <Mail className='size-4' />
              </InputGroupAddon>
              <InputGroupInput
                id='email'
                type='email'
                placeholder='mail@exemplo.com'
                value={email}
                disabled
              />
            </InputGroup>
            <span className='text-xs font-normal text-gray-500'>
              O e-mail não pode ser alterado
            </span>
          </div>

          <div className='flex flex-col gap-4'>
            <Button
              type='submit'
              className='w-full font-medium'
              disabled={loading}
            >
              Salvar alterações
            </Button>

            <Button
              type='button'
              variant='outline'
              className='w-full font-medium'
              onClick={handleLogout}
            >
              <LogOut className='size-4 text-red' />
              Sair da conta
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
