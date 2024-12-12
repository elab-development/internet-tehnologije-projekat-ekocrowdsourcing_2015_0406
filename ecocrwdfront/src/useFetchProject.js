import axios from "axios";
import { useEffect, useState } from "react";

export default function useFetchProjects(initialPage = 1){ //starts with use, camleCase, and doesn't return jsx otherwise this would be a component
    const [projects, setProjects] = useState([]);
    const [currentPage, setCurrentPage] = useState(initialPage);
    const [totalPages, setTotalPages] = useState(1);

    const fetchProjects = async (page = 1) => {
        try {
          const response = await axios.get(`/api/projects?page=${page}`);
          setProjects(response.data.Projects);
          setTotalPages(response.data.meta.last_page);
        } catch (error) {
          console.error('Error fetching projects:', error);
        }
      };

    useEffect(()=> {
        setProjects();
    }, [currentPage]);

    return {
        projects,
        setProjects,
        currentPage,
        setCurrentPage,
        totalPages,
        fetchProjects,
      };
}