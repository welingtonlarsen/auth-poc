import { hash } from 'bcryptjs';
import { Request, Response } from 'express';
import { prismaClient } from '../config/prisma-config';

interface CreateUserRequest extends Request {
  body: {
    name: string;
    email: string;
    password: string;
  };
}

export class UserController {
  async create(req: CreateUserRequest, res: Response) {
    const { name, email, password } = req.body;

    const userExists = await prismaClient.user.findUnique({ where: { email } });

    if (userExists) {
      return res.status(422).json({ message: 'User already exists' });
    }

    const hashPassword = await hash(password, 8);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...user } = await prismaClient.user.create({
      data: {
        name,
        email,
        password: hashPassword,
      },
    });

    return res.status(201).json(user);
  }

  async me(req: Request, res: Response) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const { userId } = req;
    const user = await prismaClient.user.findUnique({ where: { id: userId } });
    if (user) user.password = undefined!;
    return res.status(200).json(user);
  }
}
