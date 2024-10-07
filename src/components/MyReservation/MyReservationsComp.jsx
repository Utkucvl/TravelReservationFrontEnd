import { Card, Typography } from "@material-tailwind/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFutureReservationsByUserId } from "../../store/reservationSlice";
import { useParams } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles

const MyReservationsComp = () => {
  const reservations = useSelector((state) => state.reservation.reservations);
  const loading = useSelector((state) => state.reservation.loading);
  const { userId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMyReservations = async () => {
      await dispatch(getFutureReservationsByUserId(userId));
    };
    fetchMyReservations();
  }, [dispatch, userId]);

  useEffect(() => {
    AOS.init({ duration: 1000 }); // Initialize AOS with duration
  }, []);

  // Table head titles
  const TABLE_HEAD = [
    "Reservation ID",
    "Hotel Name",
    "Country",
    "City",
    "Guest Count",
    "Entry Date",
    "Out Date",
    "Actions",
  ];

  return (
    <Card className="h-full w-full overflow-hidden"> {/* overflow-hidden to prevent unnecessary scroll bars */}
      {loading ? (
        <Typography variant="small" color="blue-gray" className="font-normal">
          Loading...
        </Typography>
      ) : (
        <div className="overflow-auto max-h-[600px]"> {/* Div wrapping the table to handle scrolling */}
          <table className="w-full min-w-max table-auto text-left h-full">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 pt-16"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {reservations.length > 0 ? (
                reservations.map(
                  (
                    {
                      id,
                      hotelName,
                      country,
                      city,
                      guessCount,
                      entryDate,
                      outDate,
                    },
                    index
                  ) => (
                    <tr
                      key={id}
                      data-aos="fade-up"
                      data-aos-delay={index * 100} // Delays the animation for each row
                    >
                      <td className="p-4 border-b border-blue-gray-50">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {id}
                        </Typography>
                      </td>
                      <td className="p-4 border-b border-blue-gray-50">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {hotelName}
                        </Typography>
                      </td>
                      <td className="p-4 border-b border-blue-gray-50">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {country}
                        </Typography>
                      </td>
                      <td className="p-4 border-b border-blue-gray-50">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {city}
                        </Typography>
                      </td>
                      <td className="p-4 border-b border-blue-gray-50">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {guessCount}
                        </Typography>
                      </td>
                      <td className="p-4 border-b border-blue-gray-50">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {entryDate}
                        </Typography>
                      </td>
                      <td className="p-4 border-b border-blue-gray-50">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {outDate}
                        </Typography>
                      </td>
                      <td className="p-4 border-b border-blue-gray-50">
                        <Typography
                          as="a"
                          href="#"
                          variant="small"
                          color="blue-gray"
                          className="font-medium"
                        >
                          Edit
                        </Typography>
                      </td>
                    </tr>
                  )
                )
              ) : (
                <tr>
                  <td colSpan={TABLE_HEAD.length} className="p-4 text-center">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      No reservations found.
                    </Typography>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
};

export default MyReservationsComp;
