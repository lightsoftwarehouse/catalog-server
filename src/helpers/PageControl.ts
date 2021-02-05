export default interface PageControl {
	page: number;
	limit: number;
	order: 'ASC' | 'DESC';
}