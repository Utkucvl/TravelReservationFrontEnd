import { Card, Typography, Button } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles
import {
  deleteTestimonial,
  getTestimonials,
  saveTestimonial,
  updateTestimonial,
} from "../../store/testimonialSlice";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai"; // Importing icons
import { HiOutlinePlus } from "react-icons/hi"; // Importing plus icon
import TestimonialAdminForm from "./TestimonialAdminForm";
import { Modal } from "antd"; // Import Modal from 'antd'

const TestimonialAdminComp = () => {
  const testimonials = useSelector((state) => state.testimonial.testimonials);
  const loading = useSelector((state) => state.testimonial.loading);
  const dispatch = useDispatch();

  // State to manage search input
  const [searchQuery, setSearchQuery] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(null);


  useEffect(() => {
    fetchTestimonials(); // Initial fetch
  }, [dispatch]);

  const fetchTestimonials = async () => {
    await dispatch(getTestimonials());
  };

  useEffect(() => {
    AOS.init({ duration: 1000 }); // Initialize AOS with duration
  }, []);

  const handleDelete = (id) => {
    Modal.confirm({
      title: "Warning!",
      content: "Are you sure you want to delete this testimonial?",
      okText: "Yes",
      cancelText: "No",
      async onOk() {
        await dispatch(deleteTestimonial({ id }));
        fetchTestimonials(); // Refresh testimonials after deletion
      },
    });
  };

  const handleSubmit = async (values) => {
    // Include the id from currentTestimonial if editing
    if (isEditing && currentTestimonial) {
      values.id = currentTestimonial.id; // Add the id to values
    }

    if (isEditing) {
      const resultAction = await dispatch(updateTestimonial(values));
      if (updateTestimonial.fulfilled.match(resultAction)) {
        // Fetch testimonials only if the update was successful
        await fetchTestimonials();
      }
    } else {
      await dispatch(saveTestimonial(values));
    }

    setModalVisible(false);
    setIsEditing(false); // Resetting the editing state
    setCurrentTestimonial(null); // Resetting currentTestimonial for future adds
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };
  const handleModalOpen = () => {
    setCurrentTestimonial(null)
    setIsEditing(false)
    setModalVisible(true);
  };
  const handleEdit = (testimonial) => {
    setCurrentTestimonial(testimonial);
    setIsEditing(true);
    setModalVisible(true);
  };

  const filteredTestimonials = testimonials.filter((testimonial) => {
    const name = testimonial.name;
    return name && name.toLowerCase().includes(searchQuery.toLowerCase());
});

  // Table head titles
  const TABLE_HEAD = [
    "Testimonial ID",
    "Testimonial Name",
    "Testimonial Text",
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
                {filteredTestimonials.length > 0 ? (
                  filteredTestimonials.map(
                    (
                      { id, name, text,imageUrl },
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
                            {name}
                          </Typography>
                        </td>
                        <td className="p-4 border-b border-blue-gray-50">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {text}
                          </Typography>
                        </td>
                        
                        {/* Actions column with Edit and Delete icons */}
                        <td className="p-4 border-b border-blue-gray-50 flex gap-2">
                          <AiOutlineEdit
                            onClick={() =>
                              handleEdit({
                                id,
                                name,
                                text,
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
                        No Testimonial found.
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
        title={isEditing ? "Edit Testimonial" : "Add New Testimonial"}
        visible={modalVisible}
        onCancel={handleModalClose}
        footer={null}
      >
        <TestimonialAdminForm
          onSubmit={handleSubmit}
          initialValues={isEditing ? currentTestimonial : null} // Pass currentTestimonial when editing
        />
      </Modal>
    </div>
  );
};

export default TestimonialAdminComp;
