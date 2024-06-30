import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const ProjectModal = ({ show, handleClose, handleSave, types, formData, setFormData }) => {

      const handleChange = (e) => {
        const { name, value } = e.target; 
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };

      const handleSubmit = (e) => {
        e.preventDefault();
        handleSave(formData);
        handleClose();
      };


  return (
    <Modal show={show} onHide={handleClose} aria-labelledby="projectModalLabel">
    <Modal.Header closeButton>
        <Modal.Title id="projectModalLabel">Project Details</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="projectName">
                <Form.Label>Project name</Form.Label>
                <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="projectType">
            <Form.Label>Type</Form.Label>
            <Form.Select
              name="type_id"
              value={formData.type_id}
              onChange={handleChange}
              required
            >
              <option value="">Select a type...</option>
              {types.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

            <Form.Group className="mb-3" controlId="projectLocation">
                <Form.Label>Location</Form.Label>
                <Form.Control
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="projectDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                />
            </Form.Group>

            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" type="submit">
                Save changes
            </Button>
        </Form>
    </Modal.Body>
</Modal>
  )
}

export default ProjectModal
