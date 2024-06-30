import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

const DonationModal = ({project, show, handleCloseDonationModal, handleSaveDonation, donationFormData, setDonationFormData }) => {

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDonationFormData(prevState => ({
        ...prevState,
        [name]: value
    }));
};

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataWithProjectId = {
      ...donationFormData,
      project_id: project.id,
    };
    handleSaveDonation(formDataWithProjectId);
    handleCloseDonationModal();
  };
    
  return (
    <Modal show={show} onHide={handleCloseDonationModal}>
      <Modal.Header closeButton>
          <Modal.Title>Donating to "{project.name}"</Modal.Title>
      </Modal.Header>
      <Modal.Body>
          <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                      type="email"
                      placeholder="Enter email"
                      name="email"
                      value={donationFormData.email}
                      onChange={handleChange}
                      required
                  />
              </Form.Group>

              <Form.Group controlId="formBasicAmount">
                  <Form.Label>Amount</Form.Label>
                  <Form.Control
                      type="number"
                      placeholder="Enter amount"
                      name="amount"
                      value={donationFormData.amount}
                      onChange={handleChange}
                      required
                  />
              </Form.Group>

              <Form.Group controlId="formBasicDescription">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Enter description"
                      name="description"
                      value={donationFormData.description}
                      onChange={handleChange}
                  />
              </Form.Group>

              <Button variant="primary" type="submit">
                  Donate
              </Button>
          </Form>
      </Modal.Body>
    </Modal>
  )
}

export default DonationModal
