import React from 'react';
import ProjectCard from './Reusable/ProjectCard';

const Homepage = ({latestProjects}) => {



  return (
    <div className="container mt-5">
      <h2>3 latest projects on our platform:</h2>
      <div className="row">
        {latestProjects.map((proj) => (
          <div className="col-md-4" key={proj.id}>
            <ProjectCard project={proj} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Homepage
