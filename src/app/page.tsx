"use client";

import { useState, FormEvent } from "react";
export default function Home() {
  const [message, setMessage] = useState("");
  const [colors, setColors] = useState([]);
  const getColors = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch("/api/colors", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: message.trim() }),
    });
    const data = await response.json();
    const colors = JSON.parse(data.data.content);
    setColors(colors);
  };

  return (
    <main className="grid grid-cols-5 relative h-screen w-screen">
      {colors?.map((color) => (
        <div
          key={color}
          className="h-screen bg-slate-500"
          style={{ backgroundColor: color }}
        ></div>
      ))}
      <form
        className="text-gray-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        onSubmit={getColors}
      >
        <input
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
        <button className="p-1 ml-4 bg-sky-400">Send</button>
      </form>
    </main>
  );
}
