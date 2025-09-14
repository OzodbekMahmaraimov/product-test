"use client";
import React, { useEffect, useState } from "react";


const Card = () => {
  const [state, setstate] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    createdAt: 'Sunday',
  });

  const BASE_URL = "http://45.138.159.183:6061/api/Product";

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      let response = await fetch(BASE_URL, {
        method: "GET"
      });

      let data = await response.json();
      setstate(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteData(id) {
    try {
      await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
      });
      getData();
    } catch (err) {
      console.log(err);
    }
  }

  async function addData() {
    try {
      await fetch(BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      setForm({ name: "", description: "", price: "", category: "" }); // reset form
      getData();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <div className="flex flex-col gap-3 w-80 mb-6">
        <input
          className="border p-2 rounded"
          type="text"
          value={form.name}
          placeholder="Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          className="border p-2 rounded"
          type="text"
          value={form.description}
          placeholder="Description"
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <input
          className="border p-2 rounded"
          type="text"
          value={form.price}
          placeholder="Price"
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />
        <input
          className="border p-2 rounded"
          type="text"
          value={form.category}
          placeholder="Category"
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />
        <button
          type="button"
          onClick={addData}
          className="bg-amber-800 text-white p-3 rounded"
        >
          Add
        </button>
      </div>

      {state.map((item) => (
        <ul
          key={item.id}
          className="border p-3 mb-3 rounded shadow-md max-w-md"
        >
          <li>
            <strong>Name:</strong> {item.name}
          </li>
          <li>
            <strong>Description:</strong> {item.description}
          </li>
          <li>
            <strong>Price:</strong> {item.price}
          </li>
          <li>
            <strong>Category:</strong> {item.category}
          </li>
          <li>
            <strong>Created At:</strong> {item.createdAt}
          </li>
          <button
            type="button"
            onClick={() => deleteData(item.id)}
            className="mt-2 bg-red-600 text-white px-3 py-1 rounded"
          >
            Delete
          </button>
        </ul>
      ))}
    </>
  );
};

export default Card;
