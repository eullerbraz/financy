import logo from '@/assets/logo.svg';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Eye, EyeClosed, Lock, Mail, UserRoundPlus } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { Checkbox } from '../../components/ui/checkbox';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '../../components/ui/input-group';
import { Separator } from '../../components/ui/separator';
import { useAuthStore } from '../../stores/auth';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const login = useAuthStore((state) => state.login);

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    setLoading(true);

    try {
      const loginMutate = await login({
        email,
        password,
      });

      if (loginMutate) {
        toast.success('Login realizado com sucesso!');
      }
    } catch (error) {
      console.log(error);

      toast.success('Falha ao realizar o login!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex items-center justify-start flex-col gap-8 bg-gray-100 py-12 flex-1'>
      <img src={logo} className=' h-8' />
      <Card className='flex flex-col gap-8 w-[28rem] p-8 border-brand'>
        <CardHeader className='text-center'>
          <CardTitle className='text-xl font-bold'>Fazer login</CardTitle>
          <CardDescription className='text-base'>
            Entre na sua conta para continuar
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

                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-2'>
                    <Checkbox
                      id='remember'
                      name='remember'
                      className='data-[state=checked]:bg-blue-400 data-[state=checked]:border-white data-[state=checked]:text-white '
                      defaultChecked={false}
                    />
                    <label
                      htmlFor='remember'
                      className='text-xs text-gray-500 font-normal'
                    >
                      Lembrar-me
                    </label>
                  </div>
                  <span className='text-sm text-brand font-medium'>
                    Recuperar senha
                  </span>
                </div>
              </div>
            </div>
            <Button type='submit' className='w-full' disabled={loading}>
              Entrar
            </Button>
          </form>

          <Separator />

          <div className='flex flex-col items-center gap-4'>
            <span className='text-gray-600 text-sm font-normal'>
              Ainda não tem uma conta?
            </span>

            <Button
              variant='outline'
              className='w-full text-base text-gray-700 font-medium'
              asChild
            >
              <Link to='/signup'>
                <UserRoundPlus className='size-4 text-gray-700' />
                Criar conta
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
