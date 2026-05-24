import { Toaster } from 'sonner';
import { Header } from './Header';

interface PageProps {
  hasHeader?: boolean;
  children: React.ReactNode;
}

export function Page({ hasHeader = true, children }: PageProps) {
  return (
    <div className='min-h-dvh bg-gray-100 flex flex-col w-full'>
      {hasHeader && <Header />}
      <main className='flex flex-col justify-center items-center flex-1 w-full'>
        {children}
      </main>
      <Toaster />
    </div>
  );
}
