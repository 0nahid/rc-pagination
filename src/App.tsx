// App.tsx

import React, { useEffect, useState } from "react";
import "./App.css"; // Import the custom styles
import Pagination from "./components/Pagination";

interface User {
  username: string;
  // Add other properties here if needed
}

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(100);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/users?_page=${currentPage}&_limit=${itemsPerPage}`
        );
        const data = await response.json();
        console.log(data);
        setUsers(data);
        setItemsPerPage(itemsPerPage);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [currentPage, itemsPerPage]);


  return (
    <div className="app">
      <h1>React Pagination Example</h1>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        <Pagination
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          setItemsPerPage={setItemsPerPage}
          color="#e77"
          // possibleLimits={[2, 4, 6]}
        />
      </div>

      <ul>
        {users?.map((user, index) => (
          <li key={index + 1}>{user?.username}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
