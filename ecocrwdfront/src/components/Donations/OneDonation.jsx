import React from 'react'

const OneDonation = ({donation}) => {
  return (
    <tr>
    <td>{donation.email}</td>
    <td>{donation.description}</td>
    <td>{donation.project_id}</td>
    <td>{donation.amount}</td>
  </tr>
  )
}

export default OneDonation
