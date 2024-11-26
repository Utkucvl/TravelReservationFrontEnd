import { Modal, Typography, Spin } from "antd"; // Ant Design'dan Modal ve Typography kullanıyoruz.
import PropTypes from "prop-types"; // Proptype ile doğrulama ekledik.

const UserReservationAdminHotelDetailsComp = ({ hotel, visible, onClose, loading }) => {
  return (
    <Modal
      title="Hotel Details"
      visible={visible}
      onCancel={onClose}
      footer={null}
    >
      {loading ? (
        <div style={{ textAlign: "center" }}>
          <Spin />
        </div>
      ) : hotel ? (
        <div>
          <p><strong>ID:</strong> {hotel.id}</p>
          <p><strong>Name:</strong> {hotel.name}</p>
          <p><strong>Street:</strong> {hotel.street}</p>
          <p><strong>City:</strong> {hotel.city}</p>
          <p><strong>State:</strong> {hotel.state}</p>
          <p><strong>Country:</strong> {hotel.country}</p>
          <p><strong>Postal Code:</strong> {hotel.postalCode}</p>
          <p><strong>Address:</strong> {hotel.address}</p>
          <p><strong>Neighborhood:</strong> {hotel.neighborhood}</p>
          <p><strong>Star Rating:</strong> {hotel.starRating}</p>
          <p><strong>Single Room Count:</strong> {hotel.singleRoomCount}</p>
          <p><strong>Double Room Count:</strong> {hotel.doubleRoomCount}</p>
          <p><strong>Family Room Count:</strong> {hotel.familyRoomCount}</p>
          <p><strong>Total Room Count:</strong> {hotel.totalRoomCount}</p>
          <p><strong>Main Image:</strong></p>
          <img src={hotel.mainImageUrl} alt="Main Hotel" style={{ width: "100%" }} />
          <p><strong>Other Images:</strong></p>
          {hotel.imageUrls && hotel.imageUrls.map((url, index) => (
            <img key={index} src={url} alt={`Hotel Image ${index + 1}`} style={{ width: "100%", marginBottom: "10px" }} />
          ))}
          <p><strong>Total Price:</strong> {hotel.totalPrice}</p>
          <p><strong>Single Room Price:</strong> {hotel.singleRoomPrice}</p>
          <p><strong>Double Room Price:</strong> {hotel.doubleRoomPrice}</p>
          <p><strong>Family Room Price:</strong> {hotel.familyRoomPrice}</p>
        </div>
      ) : (
        <Typography.Text>No hotel details available</Typography.Text>
      )}
    </Modal>
  );
};

// PropTypes ile doğrulama
UserReservationAdminHotelDetailsComp.propTypes = {
  hotel: PropTypes.object.isRequired,
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default UserReservationAdminHotelDetailsComp;
