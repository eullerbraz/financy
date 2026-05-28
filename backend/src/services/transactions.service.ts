import { prismaClient } from '../../prisma/prisma';
import {
  CreateTransactionInput,
  UpdateTransactionInput,
} from '../dtos/input/transaction.input';
import { TransactionType } from '../models/transaction.model';

export class TransactionsService {
  async createTransaction(data: CreateTransactionInput, userId: string) {
    return prismaClient.transaction.create({
      data: {
        description: data.description,
        date: data.date,
        amount: data.amount,
        type: data.type,
        categoryId: data.categoryId,
        userId,
      },
    });
  }

  async getTransactionById(id: string) {
    const transaction = await prismaClient.transaction.findUnique({
      where: {
        id,
      },
    });

    if (!transaction) throw new Error('Transação não existe');

    return transaction;
  }

  async getAllTransactionsByUserId(userId: string) {
    return prismaClient.transaction.findMany({
      where: {
        userId,
      },
    });
  }

  async getRecentTransactionsByUserId(userId: string) {
    return prismaClient.transaction.findMany({
      where: {
        userId,
      },
      orderBy: {
        date: 'desc',
      },
      take: 5,
    });
  }

  async getAllInflowsAmountByUserId(userId: string) {
    const {
      _sum: { amount },
    } = await prismaClient.transaction.aggregate({
      where: {
        userId,
        type: TransactionType.inflow,
      },
      _sum: {
        amount: true,
      },
    });

    return amount ?? 0;
  }

  async getAllOutflowsAmountByUserId(userId: string) {
    const {
      _sum: { amount },
    } = await prismaClient.transaction.aggregate({
      where: {
        userId,
        type: TransactionType.outflow,
      },
      _sum: {
        amount: true,
      },
    });

    return amount ?? 0;
  }

  async getAllTransactionsByCategoryId(categoryId: string) {
    return prismaClient.transaction.findMany({
      where: {
        categoryId,
      },
    });
  }

  async countTransactionsByCategoryId(categoryId: string) {
    return prismaClient.transaction.count({
      where: {
        categoryId,
      },
    });
  }

  async transactionsAmountByCategoryId(categoryId: string) {
    const {
      _sum: { amount: outflowAmount },
    } = await prismaClient.transaction.aggregate({
      where: {
        categoryId,
        type: TransactionType.outflow,
      },
      _sum: {
        amount: true,
      },
    });

    const {
      _sum: { amount: inflowAmount },
    } = await prismaClient.transaction.aggregate({
      where: {
        categoryId,
        type: TransactionType.inflow,
      },
      _sum: {
        amount: true,
      },
    });

    return (inflowAmount ?? 0) - (outflowAmount ?? 0);
  }

  async updateTransactionById(id: string, data: UpdateTransactionInput) {
    const transaction = await prismaClient.transaction.findUnique({
      where: { id },
    });

    if (!transaction) throw new Error('Transação não existe');

    return prismaClient.transaction.update({
      where: { id },
      data: {
        description: data.description ?? undefined,
        date: data.date ?? undefined,
        amount: data.amount ?? undefined,
        type: data.type ?? undefined,
        categoryId: data.categoryId ?? undefined,
      },
    });
  }

  async deleteTransactionById(id: string) {
    const transaction = await prismaClient.transaction.findUnique({
      where: { id },
    });

    if (!transaction) throw new Error('Transação não existe');

    await prismaClient.transaction.delete({
      where: { id },
    });

    return true;
  }
}
