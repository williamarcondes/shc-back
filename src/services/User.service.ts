import { IUserBasicInformations } from '../models/IUser';
import User from '../models/User';
import UserRepository from '../repository/User.repository';
import UserValidation from '../validations/User.validations';

export default class UserService {
  constructor(private userRepository = new UserRepository()) {}

  public async create(user: User): Promise<IUserBasicInformations> {
    if (!UserValidation.validateUser(user.email, user.password, user.role)) {
      throw new Error('User, role or Password are wrong');
    }

    const result = await this.userRepository.create(user);
    return result;
  }

  public async findById(userId: number): Promise<IUserBasicInformations | null> {
    const result = await this.userRepository.findById(userId);
    return result ?? null;
  }

  // public async update(employeeId: number, employee: Employee): Promise<Employee | null> {
  //   const result = await this.repository.update(employeeId, employee);
  //   return result;
  // }

  // public async delete(employeeId: number): Promise<boolean> {
  //   const result = await this.repository.delete(employeeId);
  //   return result;
  // }
}