import { BodyParams, Controller, Get, Inject, Post, QueryParams } from '@tsed/common';
import User from '../models/User';
import UsersService from '../services/UsersService';

@Controller('/users')
export default class UsersController {
	@Inject()
	usersService: UsersService;

	@Post('/')
	save(@BodyParams() user: User): void {
		this.usersService.save(user);
	}

	@Get('/')
	async getUser(): Promise<User | undefined> {
		return await this.usersService.getUser();
	}

	@Get('/:email')
	async getUserByEmail(@QueryParams() email: string): Promise<User | undefined> {
		return this.usersService.findByEmail(email); 
	}
}