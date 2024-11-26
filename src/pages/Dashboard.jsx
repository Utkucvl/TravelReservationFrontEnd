import DashboardStatsGrid from "../components/DashboardStatsGrid/DashboardStatsGrid";
import TransactionChart from "../components/TransactionChart/TransactionChart";
import RecentOrders from "../components/RecentOrders/RecentOrders";
import BuyerProfilePieChart from "../components/BuyerProfilePieChart/BuyerProfilePieChart";
import PopularProducts from "../components/PopularProducts/PopularProducts";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
export default function Dashboard() {
  useEffect(() => {
    AOS.init({ duration: 1000 }); // Initialize AOS with duration
  }, []);
  return (
    <div
      className="flex flex-col gap-4"
      data-aos="fade-up"
      data-aos-delay="100"
    >
      <DashboardStatsGrid />
      <div className="flex flex-row gap-4 w-full">
        <TransactionChart />
        <BuyerProfilePieChart />
      </div>
      <div
        className="flex flex-row gap-4 w-full"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        <RecentOrders />
        <PopularProducts />
      </div>
    </div>
  );
}
