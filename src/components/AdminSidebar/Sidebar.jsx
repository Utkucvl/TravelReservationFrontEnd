import classNames from 'classnames';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { HiOutlineLogout } from 'react-icons/hi';
import { DASHBOARD_SIDEBAR_LINKS, DASHBOARD_SIDEBAR_BOTTOM_LINKS } from '../../lib/constants';
import PropTypes from 'prop-types';
import { logout } from '../../store/securitySlice';
import { useDispatch } from 'react-redux';
import LogoImg from "../../assets/logo.png";

const linkClass =
	'flex items-center gap-2 font-light px-3 py-2 hover:bg-blue-300 hover:no-underline active:bg-blue-300 rounded-sm text-base';

export default function Sidebar({ handleIsAdminFalse }) {
	const dispatch = useDispatch(); // Initialize dispatch
	const navigate = useNavigate(); // Initialize navigate

	const handleLogout = async () => {
		handleIsAdminFalse();
		await dispatch(logout()); // Dispatch logout action
		navigate("/");
	};

	return (
		<div className="w-60 p-3 flex flex-col bg-gradient-to-r from-primary to-secondary text-white">
			<div className="flex items-center gap-2 px-1 py-3">
				<div className="">
					<Link to="/admin" onClick={() => window.scrollTo(0, 0)}>
						<img src={LogoImg} alt="" className="h-16" />
					</Link>
				</div>
			</div>
			<div className="py-8 flex flex-1 flex-col gap-0.5">
				{DASHBOARD_SIDEBAR_LINKS.map((link) => (
					<SidebarLink key={link.key} link={link} />
				))}
			</div>
			<div className="flex flex-col gap-0.5 pt-2 border-t border-neutral-700">
				{DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((link) => (
					<SidebarLink key={link.key} link={link} />
				))}
				<div className={classNames(linkClass, 'cursor-pointer text-red-500')} onClick={handleLogout}>
					<span className="text-xl">
						<HiOutlineLogout />
					</span>
					Logout
				</div>
			</div>
		</div>
	);
}

Sidebar.propTypes = {
	handleIsAdminFalse: PropTypes.func.isRequired,
};

function SidebarLink({ link }) {
	const { pathname } = useLocation();

	return (
		<Link
			to={link.path}
			className={classNames(
				pathname === link.path ? 'bg-blue-300	 text-white' : 'text-white',
				linkClass
			)}
		>
			<span className="text-xl">{link.icon}</span>
			{link.label}
		</Link>
	);
}

SidebarLink.propTypes = {
	link: PropTypes.shape({
		key: PropTypes.string.isRequired,
		path: PropTypes.string.isRequired,
		icon: PropTypes.element.isRequired,
		label: PropTypes.string.isRequired,
	}).isRequired,
};
