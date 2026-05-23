import { prismaClient } from '../../prisma/prisma';
import {
  CreateTransactionInput,
  UpdateTransactionInput,
} from '../dtos/input/transaction.input';

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
