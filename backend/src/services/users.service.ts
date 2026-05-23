import { prismaClient } from '../../prisma/prisma';
import { UpdateUserInput } from '../dtos/input/user.input';

export class UsersService {
  async getUserById(id: string) {
    const user = await prismaClient.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) throw new Error('Usuário não existe');

    return user;
  }

  async updateUserById(id: string, data: UpdateUserInput) {
    const user = await prismaClient.user.findUnique({
      where: { id },
    });

    if (!user) throw new Error('Usuário não existe');

    return prismaClient.user.update({
      where: { id },
      data: {
        name: data.name ?? undefined,
      },
    });
  }
}
