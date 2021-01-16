export default class StatusMessage<T> {
	constructor (
		private status: number,
		private message: string = '',
		private data: T
	) {}
}