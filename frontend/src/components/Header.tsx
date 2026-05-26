import logo from '@/assets/logo.svg';
import { Link, useLocation } from 'react-router-dom';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Button } from './ui/button';

export function Header() {
  const { user, isAuthenticated } = {
    user: {
      name: 'Euller Braz',
      email: 'euller.braz@example.com',
    },
    isAuthenticated: true,
  };

  const location = useLocation();

  const isDashboardPage = location.pathname === '/';
  const isTransactionsPage = location.pathname === '/transactions';
  const isCategoriesPage = location.pathname === '/categories';

  const nameInitials = user?.name
    ? user.name
        .split(' ')
        .map((n) => n[0].toUpperCase())
        .join('')
    : '';

  return (
    <header className='w-full px-12 py-4 bg-white border-b border-gray-200'>
      {isAuthenticated && (
        <div className='flex justify-between w-full'>
          <img className='h-6' src={logo} />
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
          <Link to='/profile'>
            <Button size='icon' variant='ghost'>
              <Avatar>
                <AvatarFallback className='bg-gray-300 text-gray-800'>
                  {nameInitials}
                </AvatarFallback>
              </Avatar>
            </Button>
          </Link>
        </div>
      )}
    </header>
  );
}
