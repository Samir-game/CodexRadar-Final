import React from 'react';
import '../styles/ContactUs.css';

const ContactUs = () => {
  return (
    <div className="contactus-container">
      <h2 className="contactus-title">Contact Us</h2>
      <p className="contactus-message">
        We'd love to hear from you! Whether you have a question about features,
        need support, or just want to share feedback — feel free to reach out.
      </p>

      <div className="contactus-details">
        <p className="contactus-detail-item">
          <strong>Email:</strong> <b><u>gotmyself4276@gmail.com</u></b>
        </p>
      </div>
    </div>
  );
};

export default ContactUs;

