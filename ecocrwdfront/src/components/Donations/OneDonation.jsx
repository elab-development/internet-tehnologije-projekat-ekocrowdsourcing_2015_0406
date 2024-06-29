import React from 'react'

const OneDonation = ({donation, userRole, handleDelete, handleShowModal}) => {
  
  return (
    <tr>
    <td>{donation.email}</td>
    <td>{donation.description}</td>
    <td>{donation.project}</td>
    <td>{donation.amount}</td>
    {userRole === 'admin' && (
        <td>
          <button
            className="btn btn-primary mr-2"
             onClick={() => handleShowModal(donation.id)}  
          >
            Update
          </button>
          <button
            className="btn btn-danger"
            onClick={() => handleDelete(donation.id)} 
          >
            Delete
          </button>
        </td>
      )}
  </tr>
  )
}

export default OneDonation
