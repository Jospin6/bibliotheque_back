import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class FacultyController {
  async create(req: Request, res: Response) {
    try {
      const { title } = req.body;

      const faculty = await prisma.faculty.create({
        data: { title }
      });

      res.status(201).json(faculty);
    } catch (error) {
      res.status(500).json({ message: 'Error creating faculty' });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const faculties = await prisma.faculty.findMany({
        include: {
          users: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              role: true
            }
          }
        }
      });

      res.json(faculties);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching faculties' });
    }
  }
}