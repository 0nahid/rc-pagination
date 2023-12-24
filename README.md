# **rc-paginate**

## A simple and customizable React pagination component.

### **Installation**

```markdown
yarn add rc-paginate
or
npm i rc-paginate
```

## Usage

### Example

```jsx
import React, { useState, useEffect } from "react";
import { Pagination } from "rc-paginate";

const MyComponent = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(100);
  const [users, setUsers] = useState([]);

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
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>

      {/* Pagination Component */}
      <Pagination
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage} // just pass the state
        setItemsPerPage={setItemsPerPage} // just pass the state
        color="red" // Optional & dynamic: you can pass any color name or hex value
        possibleLimits={[2, 4, 6]} // Optional: array of possible items per page
      />
    </div>
  );
};

export default MyComponent;
```

### Props

- `totalItems`: The total number of items in your dataset.
- `itemsPerPage`: Number of items to display per page.
- `currentPage`: Current active page.
- `setCurrentPage`: Function to update the current page.
- `setItemsPerPage`: Function to update the items per page.
- `color` (Optional): Color of the pagination buttons. You can pass any color name or hex value.
- `possibleLimits` (Optional): Array of possible items per page. If you pass a number in the array then then the dropdown menu will not be displayed. If more than one number is passed then the dropdown menu will be displayed.

### Example Explanation

In this example, we have a component (`MyComponent`) with a state managing the current page, items per page, and total items. The `<Pagination>` component is integrated to handle the pagination functionality. Adjust the `color` and `possibleLimits` props based on your preferences.

Feel free to customize the component's appearance and behavior by updating the state variables and props according to your application's needs.

# Contributions

If you want to contribute to this project,fork the [repository](https://github.com/0nahid/rc-pagination) and clone it to your local machine. Commit your changes and push your changes to your forked repository. Finally, open a pull request with a detailed description of your changes. I highly appreciate any contributions.
