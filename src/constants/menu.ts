import type Menu from '~/interfaces/menu.interface';

const menu: Menu[] = [
	{
		path: '/',
		name: 'home',
		icon: 'house'
	},
	{
		path: '/projects',
		name: 'projects',
		icon: 'folder'
	},
	{
		path: '/blog',
		name: 'blog',
		icon: 'file-text'
	},
	{
		path: '/about',
		name: 'about',
		icon: 'save'
	}
];

export default menu;
