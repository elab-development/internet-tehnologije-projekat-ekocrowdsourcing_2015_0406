import React from 'react'
import {useState, useEffect} from 'react';

const EditDonationModal = ({ donation, isVisible, handleClose, handleUpdate }) => {
  const [formData, setFormData] = useState({
    email: '',
    description: '',
    project: '',
    amount: ''
  });

  useEffect(() => {
    if (donation) {
      setFormData({
        email: donation.email,
        description: donation.description,
        project: donation.project,
        amount: donation.amount
      });
    }
  }, [donation]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdate(donation.id, formData);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="modal show" style={{ display: 'block' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Donation</h5>
            <button type="button" className="close" onClick={handleClose}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <input
                  type="text"
                  className="form-control"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Project</label>
                <input
                  type="text"
                  className="form-control"
                  name="project"
                  value={formData.project}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Amount</label>
                <input
                  type="number"
                  className="form-control"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">Save changes</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditDonationModal;

