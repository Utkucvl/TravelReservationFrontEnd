import { Outlet } from 'react-router-dom'
import Sidebar from '../AdminSidebar/Sidebar'
import Header from '../AdminHeader/Header'
import PropTypes from 'prop-types'
export default function Layout({handleIsAdminFalse}) {
	return (
		<div className="bg-neutral-100 h-screen w-screen overflow-hidden flex flex-row">
			<Sidebar handleIsAdminFalse={handleIsAdminFalse}/>
			<div className="flex flex-col flex-1">
				<Header />
				<div className="flex-1 p-4 min-h-0 overflow-auto">
					<Outlet />
				</div>
			</div>
		</div>
	)
}
Layout.propTypes = {
	handleIsAdminFalse:PropTypes.func.isRequired
  };
