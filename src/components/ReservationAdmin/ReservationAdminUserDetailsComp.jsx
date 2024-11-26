import { Modal, Typography, Spin } from "antd"; // Ant Design'dan Modal ve Typography kullanıyoruz.
import PropTypes from "prop-types"; // Proptype ile doğrulama ekledik.

const ReservationAdminUserDetailsComp = ({ user, visible, onClose,loading2 }) => {


  
  return (
    <Modal
      title="User Details"
      visible={visible}
      onCancel={onClose}
      footer={null}
    >
      {loading2 ? (
        <div style={{ textAlign: "center" }}>
          <Spin />
        </div>
      ) : user ? (
        <div>
          <p><strong>ID:</strong> {user.id}</p>
          <p><strong>Username:</strong> {user.userName}</p>
          <p><strong>Surname:</strong> {user.surname}</p>
          <p><strong>Role:</strong> {user.role}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>TC No:</strong> {user.tcNo}</p>
          <p><strong>Age:</strong> {user.age}</p>
        </div>
      ) : (
        <Typography.Text>No user details available</Typography.Text>
      )}
    </Modal>
  );
};

// PropTypes ile doğrulama
ReservationAdminUserDetailsComp.propTypes = {
  user: PropTypes.any.isRequired,
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  loading2:PropTypes.bool.isRequired
};

export default ReservationAdminUserDetailsComp;
