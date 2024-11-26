import {
	HiOutlineViewGrid,
	HiOutlineCube,
	HiOutlineShoppingCart,
	HiOutlineUsers,
	HiOutlineDocumentText,
	HiOutlineAnnotation,
	HiOutlineQuestionMarkCircle,
	HiOutlineCog
} from 'react-icons/hi'

export const DASHBOARD_SIDEBAR_LINKS = [
	{
		key: 'dashboard',
		label: 'Dashboard',
		path: '/admin',
		icon: <HiOutlineViewGrid />
	},
	{
		key: 'reservations',
		label: 'Reservations',
		path: '/adminreservations',
		icon: <HiOutlineCube />
	},
	{
		key: 'hotels',
		label: 'Hotels',
		path: '/adminhotels',
		icon: <HiOutlineShoppingCart />
	},
	{
		key: 'users',
		label: 'Users',
		path: '/adminusers',
		icon: <HiOutlineUsers />
	},
	{
		key: 'blogs',
		label: 'Blogs',
		path: '/adminblogs',
		icon: <HiOutlineDocumentText />
	},
	{
		key: 'testimonial',
		label: 'Testimonial',
		path: '/admintestimonials',
		icon: <HiOutlineAnnotation />
	},
	{
		key: 'toVisit',
		label: 'ToVisit',
		path: '/admintovisits',
		icon: <HiOutlineAnnotation />
	}
]

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
	{
		key: 'settings',
		label: 'Settings',
		path: '/settings',
		icon: <HiOutlineCog />
	},
	{
		key: 'support',
		label: 'Help & Support',
		path: '/support',
		icon: <HiOutlineQuestionMarkCircle />
	}
]
