import { Request, Response } from 'express';
import { compare } from 'bcryptjs';
import { prismaClient } from '../config/prisma-config';
import { sign } from 'jsonwebtoken';

export class AuthController {
  async authenticate(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = await prismaClient.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) return res.status(404).json({ message: 'Invalid credentials' });

    const token = sign({ sub: { id: user.id, email: user.email } }, 'secret', { expiresIn: '1d' });

    res.status(200).json({ token });
  }
}
