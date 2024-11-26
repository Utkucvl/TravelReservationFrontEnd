import { Card, Typography, Button } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles
import {
  deleteReservation,
  getReservationsByHotelId,
  saveReservation,
  updateReservation,
} from "../../store/reservationSlice";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai"; // Importing icons
import { HiOutlinePlus } from "react-icons/hi"; // Importing plus icon
import { Modal } from "antd"; // Import Modal from 'antd'
import { getUser } from "../../store/userSlice";
import { getHotel } from "../../store/hotelSlice";
import { useParams } from "react-router-dom";
import HotelReservationAdminForm from "./HotelReservationAdminForm";
import HotelReservationAdminHotelDetailsComp from "./HotelReservationAdminHotelDetailsComp";
import HotelReservationAdminUserDetailsComp from "./HotelReservationAdminUserDetailsComp";

const HotelReservationAdminComp = () => {
  const reservations = useSelector((state) => state.reservation.reservations);
  const user = useSelector((state) => state.user.user);
  const hotel = useSelector((state) => state.hotel.hotel);
  const loading3 = useSelector((state) => state.hotel.loading);
  const loading2 = useSelector((state) => state.user.loading);
  const loading = useSelector((state) => state.reservation.loading);
  const dispatch = useDispatch();

  const [searchQuery, setSearchQuery] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentReservation, setCurrentReservation] = useState(null);
  const [userModalVisible, setUserModalVisible] = useState(false);
  const [hotelModalVisible, setHotelModalVisible] = useState(false);
  const { hotelId } = useParams();

  useEffect(() => {
    fetchReservations(); // Initial fetch
  }, [dispatch, hotelId]);

  const fetchReservations = async () => {
    await dispatch(getReservationsByHotelId(hotelId));
  };

  useEffect(() => {
    AOS.init({ duration: 1000 }); // Initialize AOS with duration
  }, []);

  const handleDelete = (id) => {
    Modal.confirm({
      title: "Warning!",
      content: "Are you sure you want to delete this reservation?",
      okText: "Yes",
      cancelText: "No",
      async onOk() {
        await dispatch(deleteReservation({ id }));
        fetchReservations(); // Refresh reservations after deletion
      },
    });
  };

  const handleSubmit = async (values) => {
    if (isEditing && currentReservation) {
      values.id = currentReservation.id;
    }

    if (isEditing) {
      if (values.entryDate == null) {
        values.entryDate = currentReservation.entryDate;
      } else if (values.outDate == null) {
        values.outDate = currentReservation.outDate;
      }
      const resultAction = await dispatch(updateReservation(values));
      if (updateReservation.fulfilled.match(resultAction)) {
        await fetchReservations();
      }
    } else {
      await dispatch(saveReservation(values));
    }

    setModalVisible(false);
    setIsEditing(false); 
    setCurrentReservation(null); 
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };
  const handleModalOpen = () => {
    setCurrentReservation(null);
    setIsEditing(false);
    setModalVisible(true);
  };
  const handleEdit = (reservation) => {
    setCurrentReservation(reservation);
    setIsEditing(true);
    setModalVisible(true);
  };

  const handleUserClick = async (userId) => {
    setUserModalVisible(true);
    await dispatch(getUser(userId));
  };

  const handleUserModalClose = () => {
    setUserModalVisible(false);
  };

  const handleHotelClick = async (hotelId) => {
    setHotelModalVisible(true);
    await dispatch(getHotel(hotelId));
  };

  const handleHotelModalClose = () => {
    setHotelModalVisible(false);
  };

  const filteredReservations = reservations && reservations.length > 0 
  ? reservations.filter((reservation) => 
      reservation.hotelId && reservation.hotelId.toString().includes(searchQuery)
    )
  : [];


  const TABLE_HEAD = [
    "Reservation ID",
    "User Id",
    "Hotel Id",
    "Guest Count",
    "Total Price",
    "Entry Date",
    "Out Date",
    "Actions",
  ];

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} 
          className="text-sm focus:outline-none active:outline-none border border-gray-300 w-2/6 h-10 pl-4 pr-4 rounded-sm"
        />

        <Button
          onClick={handleModalOpen}
          className="flex items-center bg-gradient-to-r from-primary to-secondary text-white hover:bg-blue-400 text-white px-4 py-2 rounded-sm"
        >
          <HiOutlinePlus className="mr-1" size={20} />
          Add
        </Button>
      </div>

      <Card className="h-full w-full overflow-hidden">
        {loading ? (
          <Typography variant="small" color="blue-gray" className="font-normal">
            Loading...
          </Typography>
        ) : reservations.length > 0 ? (
          <div className="overflow-auto max-h-full">
            <table className="w-full min-w-max table-auto text-left h-full">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
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
                {filteredReservations.map(
                  (
                    {
                      id,
                      userId,
                      hotelId,
                      guessCount,
                      totalPrice,
                      entryDate,
                      outDate,
                    },
                    index
                  ) => (
                    <tr
                      key={id}
                      data-aos="fade-up"
                      data-aos-delay={index * 100}
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
                      <td
                        className="p-4 border-b border-blue-gray-50 cursor-pointer text-blue-500"
                        onClick={() => handleUserClick(userId)}
                      >
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {userId}
                        </Typography>
                      </td>
                      <td
                        className="p-4 border-b border-blue-gray-50 cursor-pointer text-blue-500"
                        onClick={() => handleHotelClick(hotelId)}
                      >
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {hotelId}
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
                          {totalPrice}
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
                      <td className="p-4 border-b border-blue-gray-50 flex gap-2">
                        <AiOutlineEdit
                          onClick={() =>
                            handleEdit({
                              id,
                              userId,
                              hotelId,
                              guessCount,
                              totalPrice,
                              entryDate,
                              outDate,
                            })
                          }
                          className="text-blue-600 cursor-pointer"
                          size={20}
                          title="Edit"
                        />
                        <AiOutlineDelete
                          onClick={() => handleDelete(id)}
                          className="text-red-500 cursor-pointer"
                          size={20}
                          title="Delete"
                        />
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <Typography variant="small" color="red" className="font-normal text-center p-4">
            Reservations could not be found for that hotel
          </Typography>
        )}
      </Card>
      <HotelReservationAdminUserDetailsComp
        visible={userModalVisible}
        onClose={handleUserModalClose}
        user={user} // Kullanıcı bilgilerini geçir
        loading={loading2}
      />
      <HotelReservationAdminHotelDetailsComp
        visible={hotelModalVisible}
        onClose={handleHotelModalClose}
        hotel={hotel} // Kullanıcı bilgilerini geçir
        loading={loading3}
      />
      <Modal
        title={isEditing ? "Edit Reservation" : "Add New Reservation"}
        visible={modalVisible}
        onCancel={handleModalClose}
        footer={null}
      >
        <HotelReservationAdminForm
          onSubmit={handleSubmit}
          initialValues={isEditing ? currentReservation : null} // Pass currentReservation when editing
        />
      </Modal>
    </div>
  );
};

export default HotelReservationAdminComp;
