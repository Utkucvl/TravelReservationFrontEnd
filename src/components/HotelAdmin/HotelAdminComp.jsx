import { Card, Typography, Button } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles
import {
  deleteHotel,
  getHotels,
  saveHotel,
  updateHotel,
} from "../../store/hotelSlice";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai"; // Importing icons
import { HiOutlinePlus } from "react-icons/hi"; // Importing plus icon
import HotelAdminForm from "./HotelAdminForm";
import { Modal } from "antd"; // Import Modal from 'antd'
import { BsFillEyeFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const HotelAdminComp = () => {
  const hotels = useSelector((state) => state.hotel.hotels);
  const loading = useSelector((state) => state.hotel.loading);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State to manage search input
  const [searchQuery, setSearchQuery] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentHotel, setCurrentHotel] = useState(null);

  useEffect(() => {
    fetchHotels(); // Initial fetch
  }, [dispatch]);

  const fetchHotels = async () => {
    await dispatch(getHotels());
  };

  useEffect(() => {
    AOS.init({ duration: 1000 }); // Initialize AOS with duration
  }, []);

  const handleDelete = (id) => {
    Modal.confirm({
      title: "Warning!",
      content: "Are you sure you want to delete this hotel?",
      okText: "Yes",
      cancelText: "No",
      async onOk() {
        await dispatch(deleteHotel({ id }));
        fetchHotels(); // Refresh hotels after deletion
      },
    });
  };

  const handleSubmit = async (values) => {
    // Include the id from currentHotel if editing
    if (isEditing && currentHotel) {
      values.id = currentHotel.id; // Add the id to values
    }

    if (isEditing) {
      values.reservations=currentHotel.reservations
      values.totalPrice=0;
      values.imageUrls=[];
      console.log(values)
      const resultAction = await dispatch(updateHotel(values));
      if (updateHotel.fulfilled.match(resultAction)) {
        // Fetch hotels only if the update was successful
        await fetchHotels();
      }
    } else {
      console.log(values)
      values.totalPrice = 0;
      values.reservations = [];
      values.imageUrls=[];
      await dispatch(saveHotel(values));
    }

    setModalVisible(false);
    setIsEditing(false); // Resetting the editing state
    setCurrentHotel(null); // Resetting currentHotel for future adds
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };
  const handleModalOpen = () => {
    setCurrentHotel(null);
    setIsEditing(false);
    setModalVisible(true);
  };
  const handleEdit = (hotel) => {
    setCurrentHotel(hotel);
    setIsEditing(true);
    setModalVisible(true);
  };
  const handleViewReservations = (id) => {
    navigate(`/adminreservations/hotel/${id}`);
  };

  const filteredHotels = hotels.filter((hotel) => {
    const name = hotel.name;
    return name && name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  // Table head titles
  const TABLE_HEAD = [
    "ID",
    "Name",
    "Country",
    "Add.",
    "Star",
    "SRC",
    "DRC",
    "FRC",
    "TRC",
    "SRP",
    "DRP",
    "FRP",
    "Actions"
  ];

  return (
    <div className="p-4">
      {/* Search Bar and Add Button Wrapper */}
      <div className="flex justify-between items-center mb-4">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search by title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Update searchQuery state
          className="text-sm focus:outline-none active:outline-none border border-gray-300 w-2/6 h-10 pl-4 pr-4 rounded-sm"
        />

        {/* Add Button */}
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
        ) : (
          // Tabloyu içeren div'e overflow-x: auto ekliyoruz
          <div className="overflow-x-auto max-h-full">
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
                {filteredHotels.length > 0 ? (
                  filteredHotels.map(
                    (
                      {
                        id,
                        name,
                        street,
                        city,
                        state,
                        country,
                        postalCode,
                        address,
                        neighborhood,
                        starRating,
                        singleRoomCount,
                        doubleRoomCount,
                        familyRoomCount,
                        totalRoomCount,
                        mainImageUrl,
                        imageUrls,
                        totalPrice,
                        singleRoomPrice,
                        doubleRoomPrice,
                        familyRoomPrice,
                        reservations,
                      },
                      index
                    ) => (
                      <tr
                        key={id}
                        data-aos="fade-up"
                        data-aos-delay={index * 100} // Delays the animation for each row
                      >
                        <td className="p-4 border-b border-blue-gray-50">
                          {id}
                        </td>
                        <td className="p-4 border-b border-blue-gray-50">
                          {name}
                        </td>
                        <td className="p-4 border-b border-blue-gray-50">
                          {country}
                        </td>
                        <td className="p-4 border-b border-blue-gray-50">
                          {address}
                        </td>
                        <td className="p-4 border-b border-blue-gray-50">
                          {starRating}
                        </td>
                        <td className="p-4 border-b border-blue-gray-50">
                          {singleRoomCount}
                        </td>
                        <td className="p-4 border-b border-blue-gray-50">
                          {doubleRoomCount}
                        </td>
                        <td className="p-4 border-b border-blue-gray-50">
                          {familyRoomCount}
                        </td>
                        <td className="p-4 border-b border-blue-gray-50">
                          {totalRoomCount}
                        </td>
                        <td className="p-4 border-b border-blue-gray-50">
                          {singleRoomPrice}
                        </td>
                        <td className="p-4 border-b border-blue-gray-50">
                          {doubleRoomPrice}
                        </td>
                        <td className="p-4 border-b border-blue-gray-50">
                          {familyRoomPrice}
                        </td>

                        {/* Actions column with Edit and Delete icons */}
                        <td className="p-4 border-b border-blue-gray-50 flex gap-2">
                          <AiOutlineEdit
                            onClick={() =>
                              handleEdit({
                                id,
                                name,
                                street,
                                city,
                                state,
                                country,
                                postalCode,
                                address,
                                neighborhood,
                                starRating,
                                singleRoomCount,
                                doubleRoomCount,
                                familyRoomCount,
                                totalRoomCount,
                                mainImageUrl,
                                imageUrls,
                                totalPrice,
                                singleRoomPrice,
                                doubleRoomPrice,
                                familyRoomPrice,
                                reservations,
                              })
                            }
                            className="text-blue-700 cursor-pointer"
                            size={20}
                            title="Edit"
                          />
                          <AiOutlineDelete
                            onClick={() => handleDelete(id)}
                            className="text-red-500 cursor-pointer"
                            size={20}
                            title="Delete"
                          />
                          <BsFillEyeFill
                            onClick={() => handleViewReservations(id)} // Navigate to reservations page
                            className="text-blue-400 cursor-pointer"
                            size={20}
                            title="View Reservations"
                          />
                        </td>
                      </tr>
                    )
                  )
                ) : (
                  <tr>
                    <td colSpan={TABLE_HEAD.length} className="p-4 text-center">
                      No Hotel found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <Modal
        title={isEditing ? "Edit Hotel" : "Add New Hotel"}
        visible={modalVisible}
        onCancel={handleModalClose}
        footer={null}
      >
        <HotelAdminForm
          onSubmit={handleSubmit}
          initialValues={isEditing ? currentHotel : null} // Pass currentHotel when editing
        />
      </Modal>
    </div>
  );
};

export default HotelAdminComp;
