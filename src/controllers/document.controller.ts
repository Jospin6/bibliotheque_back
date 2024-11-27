import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class DocumentController {
  async create(req: Request, res: Response): Promise<any> {
    try {
      const { title, author } = req.body;
      const file = req.file;
      const userId = req.user!.userId;

      if (!file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }

      const document = await prisma.document.create({
        data: {
          title,
          author,
          filePath: file.path,
          userId
        }
      });

      res.status(201).json(document);
    } catch (error) {
      res.status(500).json({ message: 'Error creating document' });
    }
  }

  async getAll(req: Request, res: Response): Promise<any> {
    try {
      const documents = await prisma.document.findMany({
        include: {
          user: {
            select: {
              firstName: true,
              lastName: true,
              faculty: true
            }
          }
        }
      });

      res.json(documents);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching documents' });
    }
  }

  async getById(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;
      const userId = req.user!.userId;

      const document = await prisma.document.findUnique({
        where: { id },
        include: {
          user: {
            select: {
              firstName: true,
              lastName: true,
              faculty: true
            }
          }
        }
      });

      if (!document) {
        return res.status(404).json({ message: 'Document not found' });
      }

      await prisma.consultation.create({
        data: {
          userId,
          documentId: id
        }
      });

      res.json(document);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching document' });
    }
  }
}