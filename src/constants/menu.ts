import type Menu from '~/interfaces/menu.interface';

const menu: Menu[] = [
	{
		path: '/',
		name: 'Home',
		icon: 'house'
	},
	{
		path: '/projects',
		name: 'Projects',
		icon: 'cpu'
	},
	{
		path: '/blog',
		name: 'Blog',
		icon: 'newspaper'
	}
];

export default menu;
