import { useState } from "react";
import "./App.css";
import { Pagination } from "./components/Pagination";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Pagination
        totalItems={10}
        itemsPerPage={2}
        currentPage={1}
        setCurrentPage={(page) => setCount(page)}
        setItemsPerPage={(limit) => setCount(limit)}
        // color="red"
        // possibleLimits={[2, 4, 6]}
      />
    </div>
  );
}

export default App;
