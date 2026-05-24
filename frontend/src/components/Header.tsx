import logo from '@/assets/logo.svg';
import { LogOut } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Button } from './ui/button';

export function Header() {
  const { user, logout, isAuthenticated } = {
    user: {
      name: 'Euller Braz',
      email: 'euller.braz@example.com',
    },
    logout: () => {
      console.log('Logout');
    },
    isAuthenticated: true,
  };

  const location = useLocation();
  const navigate = useNavigate();

  const isDashboardPage = location.pathname === '/';
  const isTransactionsPage = location.pathname === '/transactions';
  const isCategoriesPage = location.pathname === '/categories';

  const handleLogout = () => {
    logout();

    navigate('/login');
  };

  return (
    <div className='w-full px-16 pt-6'>
      {isAuthenticated && (
        <div className='flex justify-between w-full'>
          <img className='min-h-6' src={logo} />
          <div className='flex items-center gap-4'>
            <Link to='/'>
              <Button
                size='sm'
                className='gap-2'
                variant={isDashboardPage ? 'link' : 'ghost'}
              >
                Dashboard
              </Button>
            </Link>
            <Link to='/transactions'>
              <Button
                size='sm'
                className='gap-2'
                variant={isTransactionsPage ? 'link' : 'ghost'}
              >
                Transações
              </Button>
            </Link>
            <Link to='/categories'>
              <Button
                size='sm'
                className='gap-2'
                variant={isCategoriesPage ? 'link' : 'ghost'}
              >
                Categorias
              </Button>
            </Link>
          </div>
          <div className='flex items-center gap-2'>
            <div className='flex items-center gap-2'>
              <Avatar>
                <AvatarFallback className='bg-zinc-950 text-primary-foreground'>
                  {user?.name?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className='flex flex-col'>
                <span className='text-sm font-medium'>{user?.name}</span>
                <span className='text-xs text-muted-foreground'>
                  {user?.email}
                </span>
              </div>
            </div>
            <Button variant='ghost' size='icon' onClick={handleLogout}>
              <LogOut className='w-5 h-5' />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
