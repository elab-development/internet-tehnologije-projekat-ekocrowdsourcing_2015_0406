import React from 'react';


const ProjectCard = ({project}) => {
  return (
    <div className="container mt-1">
    <div className="card" style={{ width: '18rem' }}>

      <img src="https://picsum.photos/200" className="card-img-top" alt="Project Image" style={{ height: '50%', objectFit: 'cover' }} />

      <div className="card-body">
        <h5 className="card-title"><strong>{project.name} </strong></h5>
        <p className="card-text"><strong>Type:</strong> {project.type}</p>
        <p className="card-text"><strong>Location:</strong> {project.location}</p>
        <p className="card-text"><strong>Description:</strong> {project.description}</p>
        <p className="card-text"><strong>Created by:</strong> {project.user}</p>

        <a href="#" className="btn btn-primary">Action Button</a>
      </div>
    </div>
  </div>
  )
}

export default ProjectCard
