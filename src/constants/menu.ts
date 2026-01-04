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
		icon: 'folder'
	},
	{
		path: '/blog',
		name: 'Blog',
		icon: 'file-text'
	},
	{
		path: '/about',
		name: 'About Me',
		icon: 'save'
	}
];

export default menu;
