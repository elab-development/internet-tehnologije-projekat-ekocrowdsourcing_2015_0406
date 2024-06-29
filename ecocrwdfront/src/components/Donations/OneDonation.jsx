import React from 'react'

const OneDonation = ({donation, userRole, handleDelete, handleShowModal}) => {

  return (
    <tr>
    <td>{donation.email}</td>
    <td>{donation.description}</td>
    <td>{donation.project_id}</td>
    <td>{donation.amount}</td>
    {userRole === 'admin' && (
        <td>
          <div className="d-inline">
          <button
            className="btn btn-primary btn-sm mr-2"
              onClick={() => handleShowModal(donation.id)} 
          >
            Update
          </button>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => handleDelete(donation.id)} 
          >
            Delete
          </button>
          </div>
        </td>
      )}
  </tr>
  )
}

export default OneDonation
