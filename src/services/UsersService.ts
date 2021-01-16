import { Inject, Injectable, Service } from '@tsed/di';
import User from '../models/User';
import UsersRepository from '../repositories/UsersRepository';

@Service()
@Injectable()
export default class UsersService {
	@Inject()
	usersRepository: UsersRepository;

	async save(user: User) {
		await this.usersRepository.save(user);
	}

	async getUser(): Promise<User | undefined> {
		return await this.usersRepository.findOne({ where: { id: ' '}});
	}

	async findByEmail(email: string): Promise<User | undefined> {
		return await this.usersRepository.findByEmail(email);
	}
}