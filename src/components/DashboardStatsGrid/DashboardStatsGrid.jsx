import { IoBagHandle, IoPieChart, IoPeople, IoCart } from 'react-icons/io5';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getReservationsStats } from '../../store/reservationSlice';

export default function DashboardStatsGrid() {
  const stats = useSelector((state) => state.reservation.reservationStats);
  const loading = useSelector((state) => state.reservation.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchStats(); // Initial fetch
  }, [dispatch]);

  const fetchStats = async () => {
    await dispatch(getReservationsStats());
  };

  return (
    <div className="flex gap-4">
      {loading ? (
        <div className="flex items-center justify-center w-full h-full">
          <span className="text-gray-500">Loading...</span>
        </div>
      ) : (
        <>
          <BoxWrapper>
            <div className="rounded-full h-12 w-12 flex items-center justify-center bg-sky-500">
              <IoBagHandle className="text-2xl text-white" />
            </div>
            <div className="pl-4">
              <span className="text-sm text-gray-500 font-light">Total Sales Monthly</span>
              <div className="flex items-center">
                <strong className="text-xl text-gray-700 font-semibold">{stats.totalSalesMonthly}</strong>
                <span className="text-sm text-green-500 pl-2">+343</span>
              </div>
            </div>
          </BoxWrapper>

          <BoxWrapper>
            <div className="rounded-full h-12 w-12 flex items-center justify-center bg-orange-600">
              <IoPieChart className="text-2xl text-white" />
            </div>
            <div className="pl-4">
              <span className="text-sm text-gray-500 font-light">Total Sales Weekly</span>
              <div className="flex items-center">
                <strong className="text-xl text-gray-700 font-semibold">{stats.totalSalesWeekly}</strong>
                <span className="text-sm text-green-500 pl-2">-343</span>
              </div>
            </div>
          </BoxWrapper>

          <BoxWrapper>
            <div className="rounded-full h-12 w-12 flex items-center justify-center bg-yellow-400">
              <IoPeople className="text-2xl text-white" />
            </div>
            <div className="pl-4">
              <span className="text-sm text-gray-500 font-light">Num Of Reservation Monthly</span>
              <div className="flex items-center">
                <strong className="text-xl text-gray-700 font-semibold">{stats.numOfReservationsMonthly}</strong>
                <span className="text-sm text-red-500 pl-2">-30</span>
              </div>
            </div>
          </BoxWrapper>

          <BoxWrapper>
            <div className="rounded-full h-12 w-12 flex items-center justify-center bg-green-600">
              <IoCart className="text-2xl text-white" />
            </div>
            <div className="pl-4">
              <span className="text-sm text-gray-500 font-light">Num Of Reservation Weekly</span>
              <div className="flex items-center">
                <strong className="text-xl text-gray-700 font-semibold">{stats.numOfReservationsWeekly}</strong>
                <span className="text-sm text-red-500 pl-2">-43</span>
              </div>
            </div>
          </BoxWrapper>
        </>
      )}
    </div>
  );
}

function BoxWrapper({ children }) {
  return <div className="bg-white rounded-sm p-4 flex-1 border border-gray-200 flex items-center">{children}</div>;
}

BoxWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};
