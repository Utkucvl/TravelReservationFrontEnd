import { Card, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles
import { getUsers } from "../../store/userSlice";
import { BsFillEyeFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const UserAdminComp = () => {
  const users = useSelector((state) => state.user.users);
  const loading = useSelector((state) => state.user.loading);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // State to manage search input
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchUsers(); // Initial fetch
  }, [dispatch]);

  const fetchUsers = async () => {
    await dispatch(getUsers());
  };
  const handleViewReservations = (id) => {
    navigate(`/adminreservations/user/${id}`);
  };

  useEffect(() => {
    AOS.init({ duration: 1000 }); // Initialize AOS with duration
  }, []);

  const filteredUsers = users.filter((user) => {
    const userName = user.userName;
    return (
      userName && userName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // Table head titles
  const TABLE_HEAD = [
    "User ID",
    "User Name",
    "User Surname",
    "User Role",
    "User Email",
    "User TcNo",
    "User Age",
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
                {filteredUsers.length > 0 ? (
                  filteredUsers.map(
                    (
                      {
                        id,
                        userName,
                        surname,
                        role,
                        email,
                        tcNo,
                        age,
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
                            {userName}
                          </Typography>
                        </td>
                        <td className="p-4 border-b border-blue-gray-50">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {surname}
                          </Typography>
                        </td>
                        <td className="p-4 border-b border-blue-gray-50">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {role}
                          </Typography>
                        </td>
                        <td className="p-4 border-b border-blue-gray-50">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {email}
                          </Typography>
                        </td>
                        <td className="p-4 border-b border-blue-gray-50">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {tcNo}
                          </Typography>
                        </td>
                        <td className="p-4 border-b border-blue-gray-50">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {age}
                          </Typography>
                        </td>
                        <td className="p-4 border-b border-blue-gray-50 flex gap-2">
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
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        No User found.
                      </Typography>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
};

export default UserAdminComp;
