import { Card, CardContent } from '@/components/ui/card';
import { Search } from 'lucide-react';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '../../../components/ui/input-group';
import { Label } from '../../../components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../components/ui/select';

export function TransactionsFilters() {
  return (
    <Card className='border border-gray-200 p-0'>
      <CardContent className='flex gap-4 p-6 justify-stretch'>
        <div className='group flex flex-col gap-2 flex-1'>
          <Label
            htmlFor='search'
            className='group-has-[[data-slot=input-group-control]:focus-visible]:text-brand text-sm font-medium text-gray-700'
          >
            Buscar
          </Label>

          <InputGroup>
            <InputGroupAddon align='inline-start'>
              <Search className='size-4' />
            </InputGroupAddon>
            <InputGroupInput
              id='search'
              type='text'
              placeholder='Buscar por descricao'
              value={''}
              onChange={(e) => console.log(e.target.value)}
              required
            />
          </InputGroup>
        </div>

        <div className='group flex flex-col gap-2 flex-1'>
          <Label
            htmlFor='type'
            className='group-has-[[data-slot=input-group-control]:focus-visible]:text-brand text-sm font-medium text-gray-700'
          >
            Tipo
          </Label>
          <Select defaultValue='all'>
            <SelectTrigger id='type' className='w-full'>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value='all'>Todos</SelectItem>
                <SelectItem value='inflow'>Entrada</SelectItem>
                <SelectItem value='outflow'>Saida</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className='group flex flex-col gap-2 flex-1'>
          <Label
            htmlFor='category'
            className='group-has-[[data-slot=input-group-control]:focus-visible]:text-brand text-sm font-medium text-gray-700'
          >
            Categoria
          </Label>

          <Select defaultValue='all'>
            <SelectTrigger id='category' className='w-full'>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value='all'>Todas</SelectItem>
                <SelectItem value='food'>Alimentacao</SelectItem>
                <SelectItem value='transport'>Transporte</SelectItem>
                <SelectItem value='market'>Mercado</SelectItem>
                <SelectItem value='investiment'>Investimento</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className='group flex flex-col gap-2 flex-1'>
          <Label
            htmlFor='period'
            className='group-has-[[data-slot=input-group-control]:focus-visible]:text-brand text-sm font-medium text-gray-700'
          >
            Periodo
          </Label>

          <Select defaultValue='november-2025'>
            <SelectTrigger id='period' className='w-full'>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value='november-2025'>Novembro / 2025</SelectItem>
                <SelectItem value='october-2025'>Outubro / 2025</SelectItem>
                <SelectItem value='september-2025'>Setembro / 2025</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
