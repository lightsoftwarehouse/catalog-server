import { EntityRepository, Repository } from 'typeorm';
import User from '../models/User';

@EntityRepository(User)
export default class UsersRepository extends Repository<User> {
	async findByEmail(email: string): Promise<User | undefined> {
		return await this.findOne({ where: { email }});
	}
}