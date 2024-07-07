import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [items, setItems] = useState([]);

  function itemsAxios() {
    axios
      .get("http://localhost:3001/api/items")
      .then((result) => {
        setItems(result.data);
      })
      .catch((error) => {
        console.log(error);
        alert("Server is not running.");
      });
  }
  useEffect(() => {
    itemsAxios();
  }, []);

  function createNewItem(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const item = {
      brand: formData.get("brand"),
      price: formData.get("price"),
    };
    axios.post("http://localhost:3001/api/add", item);

    itemsAxios();
  }
  function deleteHandler(id) {
    axios.get(`http://localhost:3001/api/delete/${id}`);
    itemsAxios();
  }
  return (
    <div className="App">
      <div>
        {items?.map((item, index) => (
          <div className="flex" key={index}>
            <h3>{item.brand}</h3>
            <p>{item.price}</p>
            <div onClick={deleteHandler.bind(null, item.id)}>delete</div>
          </div>
        ))}
      </div>
      <form onSubmit={createNewItem}>
        <div>
          <label htmlFor="brand">Brand</label>
          <input type="text" name="brand" id="brand" />
        </div>
        <div>
          <label htmlFor="price">price</label>
          <input type="number" name="price" id="price" />
        </div>
        <button type="submit">sub</button>
      </form>
    </div>
  );
}

export default App;
