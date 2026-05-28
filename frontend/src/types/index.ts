import {
  BaggageClaim,
  BookOpen,
  BriefcaseBusiness,
  CarFront,
  Dumbbell,
  Gift,
  HeartPulse,
  Home,
  Mailbox,
  PawPrint,
  PiggyBank,
  ReceiptText,
  ShoppingCart,
  Ticket,
  ToolCase,
  Utensils,
} from 'lucide-react';

export enum Colors {
  green = 'green',
  blue = 'blue',
  purple = 'purple',
  pink = 'pink',
  red = 'red',
  orange = 'orange',
  yellow = 'yellow',
}

export const icons = [
  { name: 'BriefcaseBusiness', icon: BriefcaseBusiness },
  { name: 'CarFront', icon: CarFront },
  { name: 'HeartPulse', icon: HeartPulse },
  { name: 'PiggyBank', icon: PiggyBank },
  { name: 'ShoppingCart', icon: ShoppingCart },
  { name: 'Ticket', icon: Ticket },
  { name: 'ToolCase', icon: ToolCase },
  { name: 'Utensils', icon: Utensils },
  { name: 'PawPrint', icon: PawPrint },
  { name: 'Home', icon: Home },
  { name: 'Gift', icon: Gift },
  { name: 'Dumbbell', icon: Dumbbell },
  { name: 'BookOpen', icon: BookOpen },
  { name: 'BaggageClaim', icon: BaggageClaim },
  { name: 'Mailbox', icon: Mailbox },
  { name: 'ReceiptText', icon: ReceiptText },
];

export enum IconsEnum {
  BriefcaseBusiness = 'BriefcaseBusiness',
  CarFront = 'CarFront',
  HeartPulse = 'HeartPulse',
  PiggyBank = 'PiggyBank',
  ShoppingCart = 'ShoppingCart',
  Ticket = 'Ticket',
  ToolCase = 'ToolCase',
  Utensils = 'Utensils',
  PawPrint = 'PawPrint',
  Home = 'Home',
  Gift = 'Gift',
  Dumbbell = 'Dumbbell',
  BookOpen = 'BookOpen',
  BaggageClaim = 'BaggageClaim',
  Mailbox = 'Mailbox',
  ReceiptText = 'ReceiptText',
}

export const IconsMap = {
  BriefcaseBusiness: BriefcaseBusiness,
  CarFront: CarFront,
  HeartPulse: HeartPulse,
  PiggyBank: PiggyBank,
  ShoppingCart: ShoppingCart,
  Ticket: Ticket,
  ToolCase: ToolCase,
  Utensils: Utensils,
  PawPrint: PawPrint,
  Home: Home,
  Gift: Gift,
  Dumbbell: Dumbbell,
  BookOpen: BookOpen,
  BaggageClaim: BaggageClaim,
  Mailbox: Mailbox,
  ReceiptText: ReceiptText,
};

export enum TransactionType {
  inflow = 'inflow',
  outflow = 'outflow',
}

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

export interface RegisterMutationData {
  register: {
    token: string;
    refreshToken: string;
    user: User;
  };
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface LoginMutationData {
  login: {
    token: string;
    refreshToken: string;
    user: User;
  };
}

export interface Category {
  id: string;
  name: string;
  description?: string | null;
  icon: IconsEnum;
  color: Colors;
  userId: string;
  user?: User;
  countTransactions?: number;
  transactionsAmount?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Transaction {
  id: string;
  description: string;
  date: string;
  amount: number;
  type: TransactionType;
  categoryId: string;
  category: Category;
  userId: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface TransactionsMany {
  transactions: Transaction[];
  totalInflow: number;
  totalOutflow: number;
  balance: number;
}
