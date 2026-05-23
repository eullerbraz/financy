import { prismaClient } from '../../prisma/prisma';
import {
  CreateCategoryInput,
  UpdateCategoryInput,
} from '../dtos/input/category.input';

export class CategoriesService {
  async createCategory(data: CreateCategoryInput, userId: string) {
    return prismaClient.category.create({
      data: {
        name: data.name,
        description: data.description,
        icon: data.icon,
        color: data.color,
        userId,
      },
    });
  }

  async getCategoryById(id: string) {
    const category = await prismaClient.category.findUnique({
      where: {
        id,
      },
    });

    if (!category) throw new Error('Categoria não existe');

    return category;
  }

  async getCategoriesByUserId(userId: string) {
    return prismaClient.category.findMany({
      where: {
        userId,
      },
    });
  }

  async updateCategoryById(id: string, data: UpdateCategoryInput) {
    const category = await prismaClient.category.findUnique({
      where: { id },
    });

    if (!category) throw new Error('Categoria não existe');

    return prismaClient.category.update({
      where: { id },
      data: {
        name: data.name ?? undefined,
        description: data.description ?? undefined,
        icon: data.icon ?? undefined,
        color: data.color ?? undefined,
      },
    });
  }

  async deleteCategoryById(id: string) {
    const category = await prismaClient.category.findUnique({
      where: { id },
    });

    if (!category) throw new Error('Categoria não existe');

    await prismaClient.category.delete({
      where: { id },
    });

    return true;
  }
}
