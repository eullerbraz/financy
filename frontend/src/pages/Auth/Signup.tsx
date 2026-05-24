import logo from '@/assets/logo.svg';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group';

import { Label } from '@/components/ui/label';
import { Eye, EyeClosed, Lock, LogIn, Mail, UserRound } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { Separator } from '../../components/ui/separator';

export function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const signup = (signupInput: any) => {
    console.log('Signup input:', signupInput);
    return Promise.resolve(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const signupMutate = await signup({
        name,
        email,
        password,
      });

      if (signupMutate) {
        toast.success('Cadastro realizado com sucesso!');
      }
    } catch (error: any) {
      toast.error('Erro ao realizar o cadastro');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex items-center justify-start flex-col gap-8 bg-gray-100 py-12 flex-1'>
      <img src={logo} className=' h-8' />
      <Card className='flex flex-col gap-8 w-[28rem] p-8 border-brand'>
        <CardHeader className='text-center'>
          <CardTitle className='text-xl font-bold'>Criar conta</CardTitle>
          <CardDescription className='text-base'>
            Comece a controlar suas finanças ainda hoje
          </CardDescription>
        </CardHeader>

        <CardContent className='w-full max-w-md rounded-xl flex flex-col gap-6'>
          <form onSubmit={handleSubmit} className='flex flex-col gap-6'>
            <div className='flex flex-col gap-4'>
              <div className='group flex flex-col gap-2'>
                <Label
                  htmlFor='email'
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
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </InputGroup>
              </div>
              <div className='group flex flex-col gap-2'>
                <Label
                  htmlFor='password'
                  className='group-has-[[data-slot=input-group-control]:focus-visible]:text-brand'
                >
                  Senha
                </Label>
                <InputGroup>
                  <InputGroupAddon align='inline-start'>
                    <Lock className='size-4' />
                  </InputGroupAddon>
                  <InputGroupInput
                    id='password'
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Digite sua senha'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <InputGroupAddon align='inline-end'>
                    <InputGroupButton
                      type='button'
                      variant='ghost'
                      size='icon-xs'
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? (
                        <EyeClosed className='size-4' />
                      ) : (
                        <Eye className='size-4' />
                      )}
                    </InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>
                <span className='text-xs text-gray-500 font-normal'>
                  A senha deve ter no mínimo 8 caracteres
                </span>
              </div>
            </div>
            <Button type='submit' className='w-full' disabled={loading}>
              Cadastrar
            </Button>
          </form>

          <Separator />

          <div className='flex flex-col items-center gap-4'>
            <span className='text-gray-600 text-sm font-normal'>
              Já tem uma conta?
            </span>

            <Button
              variant='outline'
              className='w-full text-base text-gray-700 font-medium'
              asChild
            >
              <Link to='/login'>
                <LogIn className='size-4 text-gray-700' />
                Fazer login
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
