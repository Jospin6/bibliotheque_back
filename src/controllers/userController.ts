import { Request, Response } from 'express';
import UserModel from '../models/user';

class UserController {
  static async getUsers(req: Request, res: Response) {
    try {
      const users = await UserModel.findAll();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs.' });
    }
  }

  static async createUser(req: Request, res: Response) {
    try {
      const user = await UserModel.createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la création de l’utilisateur.' });
    }
  }
}

export default UserController;