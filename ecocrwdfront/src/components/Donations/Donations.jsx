import React from 'react';
import OneDonation from './OneDonation';

const Donations = ({donations}) => {
  return (
    <div className="container mt-4">
    <h2 className="mb-4">Donations</h2>
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Email</th>
          <th>Description</th>
          <th>Project ID</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
      {donations=== null? "Nema donacija" : donations.map((donation)=>
      <OneDonation donation={donation} key={donation.id}/>
     )}
    </tbody>
      </table>
    </div>
  );
};

export default Donations
