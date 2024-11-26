import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { getChartStats } from '../../store/reservationSlice';

const RADIAN = Math.PI / 180;
const COLORS = ['#00C49F', '#FFBB28', '#FF8042'];

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
	const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
	const x = cx + radius * Math.cos(-midAngle * RADIAN);
	const y = cy + radius * Math.sin(-midAngle * RADIAN);

	return (
		<text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
			{`${(percent * 100).toFixed(0)}%`}
		</text>
	);
};

export default function BuyerProfilePieChart() {
	const stats = useSelector((state) => state.reservation.chartStats); // Fetch stats from Redux store
	const loading = useSelector((state) => state.reservation.loading);
	const [formattedData, setFormattedData] = useState([]);
	const dispatch = useDispatch();

	useEffect(() => {
		fetchStats(); // Initial fetch
	}, [dispatch]);

	const fetchStats = async () => {
		await dispatch(getChartStats());

		// Convert stats to the format [{name: 'The Ritz-Carltons', value: 2}, {name: 'The Savoy', value: 6}]
		const transformedData = Object.keys(stats[0]).map((key) => ({
			name: key,
			value: stats[0][key],
		}));
		setFormattedData(transformedData);
	};

	return (
		<div className="w-[20rem] h-[22rem] bg-white p-4 rounded-sm border border-gray-200 flex flex-col">
			<strong className="text-gray-700 font-medium">Buyer Profile</strong>
			<div className="mt-3 w-full flex-1 text-xs">
				{loading ? (
					<div className="flex items-center justify-center h-full">
						<span className="text-gray-500">Loading...</span>
					</div>
				) : (
					<ResponsiveContainer width="100%" height="100%">
						<PieChart width={400} height={300}>
							<Pie
								data={formattedData} // Use the formatted data
								cx="50%"
								cy="45%"
								labelLine={false}
								label={renderCustomizedLabel}
								outerRadius={105}
								fill="#8884d8"
								dataKey="value"
							>
								{formattedData.map((_, index) => (
									<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
								))}
							</Pie>
							<Legend />
						</PieChart>
					</ResponsiveContainer>
				)}
			</div>
		</div>
	);
}
