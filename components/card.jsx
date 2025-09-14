"use client";
import React, { useEffect, useState } from "react";

const Card = () => {
  const [state, getState] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
  });
  let url = "http://45.138.159.183:6061/api/Product";

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      let response = await fetch(url, {
        method: "GET",
      });

      let data = await response.json();
      getState(data);

      console.log(data.name);
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteData(od) {
    try {
      await fetch("/api/Products", {
        method: "Delete",
        body: JSON.stringify({ od }),
      });
      getData();
    } catch (err) {
      console.log(err);
    }
  }

  async function addData() {

    try {
      await fetch("/api/Products", {
        method: "POST",
        body: JSON.stringify(form),
      });
      getData();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      {/* <form className="w-100" action="POST"> */}
        <input className="border-5"
          type="text"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input className="border-5"
          type="text"
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <input className="border-5"
          type="text"
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />
        <input className="border-5"
          type="text"
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />
        <button
          onClick={() => addData()}
          className="bg-amber-800 text-white p-5"
        >
          Add
        </button>
      {/* </form> */}

      {state.map((data) => (
        <ul key={data.id}>
          <li>{data.name}</li>
          <li>{data.description}</li>
          <li>{data.price}</li>
          <li>{data.createdAt}</li>
          <li>{data.category}</li>
          <button onClick={() => deleteData(p.id)}>Delete</button>
        </ul>
      ))}
    </>
  );
};

export default Card;
