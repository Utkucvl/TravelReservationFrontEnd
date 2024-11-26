import { Card, Typography, Button } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles
import {
  deleteToVisit,
  getToVisits,
  saveToVisit,
  updateToVisit,
} from "../../store/toVisitSlice";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai"; // Importing icons
import { HiOutlinePlus } from "react-icons/hi"; // Importing plus icon
import ToVisitAdminForm from "./ToVisitAdminForm";
import { Modal } from "antd"; // Import Modal from 'antd'

const ToVisitAdminComp = () => {
  const toVisits = useSelector((state) => state.toVisit.toVisits);
  const loading = useSelector((state) => state.toVisit.loading);
  const dispatch = useDispatch();

  // State to manage search input
  const [searchQuery, setSearchQuery] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentToVisit, setCurrentToVisit] = useState(null);

  useEffect(() => {
    fetchToVisits(); // Initial fetch
  }, [dispatch]);

  const fetchToVisits = async () => {
    await dispatch(getToVisits());
  };

  useEffect(() => {
    AOS.init({ duration: 1000 }); // Initialize AOS with duration
  }, []);

  const handleDelete = (id) => {
    Modal.confirm({
      title: "Warning!",
      content: "Are you sure you want to delete this toVisit?",
      okText: "Yes",
      cancelText: "No",
      async onOk() {
        await dispatch(deleteToVisit({ id }));
      },
    });
  };

  const handleSubmit = async (values) => {
    // Include the id from currentTestimonial if editing
    if (isEditing && currentToVisit) {
      values.id = currentToVisit.id; // Add the id to values
    }

    if (isEditing) {
      const resultAction = await dispatch(updateToVisit(values));
      if (updateToVisit.fulfilled.match(resultAction)) {
        // Fetch testimonials only if the update was successful
        await fetchToVisits();
      }
    } else {
      await dispatch(saveToVisit(values));
    }

    setModalVisible(false);
    setIsEditing(false); // Resetting the editing state
    setCurrentToVisit(null); // Resetting currentTestimonial for future adds
  };
  const handleModalClose = () => {
    setModalVisible(false);
  };
  const handleModalOpen = () => {
    setCurrentToVisit(null)
    setIsEditing(false)
    setModalVisible(true);
  };
  const handleEdit = (toVisit) => {
    setCurrentToVisit(toVisit);
    setIsEditing(true);
    setModalVisible(true);
  };

  // Filtered toVisits based on the search query
  const filteredToVisits = toVisits.filter((toVisit) =>
    toVisit.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Table head titles
  const TABLE_HEAD = [
    "ToVisit ID",
    "ToVisit Title",
    "ToVisit Description",
    "Type",
    "Price",
    "Location",
    "Actions",
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
                {filteredToVisits.length > 0 ? (
                  filteredToVisits.map(
                    (
                      { id, title, description, type, price, location,imageUrl },
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
                            {title}
                          </Typography>
                        </td>
                        <td className="p-4 border-b border-blue-gray-50">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {description}
                          </Typography>
                        </td>
                        <td className="p-4 border-b border-blue-gray-50">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {type}
                          </Typography>
                        </td>
                        <td className="p-4 border-b border-blue-gray-50">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {price}
                          </Typography>
                        </td>
                        <td className="p-4 border-b border-blue-gray-50">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {location}
                          </Typography>
                        </td>
                        {/* Actions column with Edit and Delete icons */}
                        <td className="p-4 border-b border-blue-gray-50 flex gap-2">
                          <AiOutlineEdit
                            onClick={() =>
                              handleEdit({
                                id,
                                title,
                                description,
                                type,
                                price,
                                location,
                                imageUrl
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
                  )
                ) : (
                  <tr>
                    <td colSpan={TABLE_HEAD.length} className="p-4 text-center">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        No ToVisit found.
                      </Typography>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </Card>
      <Modal
        title={isEditing ? "Edit ToVisit" : "Add New ToVisit"}
        visible={modalVisible}
        onCancel={handleModalClose}
        footer={null}
      >
        <ToVisitAdminForm
          onSubmit={handleSubmit}
          initialValues={isEditing ? currentToVisit : null} // Pass currentToVisit when editing
        />
      </Modal>
    </div>
  );
};

export default ToVisitAdminComp;
