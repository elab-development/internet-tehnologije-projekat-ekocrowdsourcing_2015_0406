import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

const DonationModal = ({selectedProject, show, handleCloseDonationModal, handleSaveDonation, donationFormData, setDonationFormData }) => {

  const handleChange = (e) => {   //popunjava DonationFormData na osnovu unesenog u polja
    const { name, value } = e.target;
    setDonationFormData(prevState => ({
        ...prevState,
        [name]: value
    }));
};

  const handleSubmit = (e) => { //dodaje project_id u donationFormData i prosledjuje ga funckiji handleSaveDonation
    e.preventDefault();
    const formDataWithProjectId = {
      ...donationFormData,
      project_id: selectedProject.id,
    };
    handleSaveDonation(formDataWithProjectId);
    handleCloseDonationModal();
  };
    
  return (
    <Modal show={show} onHide={handleCloseDonationModal}>
      <Modal.Header closeButton>
          <Modal.Title>{donationFormData.id ? 'Edit Donation' : `Donating to "${selectedProject.name}"`}</Modal.Title>
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
                {donationFormData.id ? 'Update' : 'Donate'}
              </Button>
          </Form>
      </Modal.Body>
    </Modal>
  )
}

export default DonationModal
