import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { v4 as uuidv4 } from 'uuid'; // Para gerar IDs únicos

@Injectable()
export class UsersService {
  private users: User[] = []; // Nosso "banco de dados" em memória

  constructor() {
    // Para ter alguns dados iniciais para testar
    this.users.push({ id: uuidv4(), name: 'Ronildo', email: 'ronildo@example.com.br' });
    this.users.push({ id: uuidv4(), name: 'Maria', email: 'maria@example.com.br' });
  }

  create(createUserDto: CreateUserDto): User {
    const newUser: User = {
      id: uuidv4(),
      ...createUserDto,
    };
    this.users.push(newUser);
    return newUser;
  }

  findAll(): User[] {
    return this.users;
  }

  findOne(id: string): User {
    const user = this.users.find(user => user.id === id);
    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
    return user;
  }

  remove(id: string): void {
    const initialLength = this.users.length;
    this.users = this.users.filter(user => user.id !== id);
    if (this.users.length === initialLength) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
  }
}