import { useEffect, useState } from "react";
import { Pagination } from "rc-paginate";
interface iUser {
  username: string;
}
const MyComponent = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(100);
  const [users, setUsers] = useState<Array<iUser>>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/users?_page=${currentPage}&_limit=${itemsPerPage}`
        );
        const data = await response.json();
        setUsers(data);
        setTotalItems(100); // Update totalItems based on the total count from your API or set it to a static value
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [currentPage, itemsPerPage]);

  return (
    <div>
      {/* Display your fetched data */}
      <ul>
        {users.map((user, index) => (
          <li key={index + 1}>
            {index + 1} -  {user.username}
          </li>
        ))}
      </ul>

      {/* Pagination Component */}
      <Pagination
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage} // just pass the state
        setItemsPerPage={setItemsPerPage} // just pass the state
        color="purple" // Optional & dynamic: you can pass any color name or hex value
        possibleLimits={[2, 4, 6,10]} // Optional: array of possible items per page
      />
    </div>
  );
};

export default MyComponent;
