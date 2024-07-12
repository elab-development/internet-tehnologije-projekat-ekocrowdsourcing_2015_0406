import React from 'react'

const OneDonation = ({donation, userRole, handleDelete, handleOpenDonationEditModal}) => {

    const handleUpdateClick = () => {
      handleOpenDonationEditModal(donation);
  };

  return (
    <tr>
    <td>{donation.email}</td>
    <td>{donation.description}</td>
    <td>{donation.project}</td>
    <td>{donation.amount}</td>
    {userRole === 'admin' && (
        <td>
          <div className="d-inline">
          <button
            className="btn btn-primary btn-sm mr-2"
            onClick={handleUpdateClick}
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
