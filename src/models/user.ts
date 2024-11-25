import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

class UserModel {
  static async findAll() {
    return await prisma.user.findMany();
  }

  static async createUser(data: { name: string; email: string; password: string }) {
    return await prisma.user.create({ data });
  }
}

export default UserModel;