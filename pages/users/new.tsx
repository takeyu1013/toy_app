import type { NextPage } from "next";
import Link from "next/link";
import React from "react";

const New: NextPage = () => {
  const createUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(
      JSON.stringify({
        name: event.target.name.value,
        email: event.target.email.value,
      })
    );
    console.log(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/user`);

    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/user`, {
      body: JSON.stringify({
        name: event.target.name.value,
        email: event.target.email.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
  };
  return (
    <div>
      <h1>New User</h1>
      <form onSubmit={createUser}>
        <div className="field">
          <label htmlFor="name">Name</label>
          <input id="name" type="text" autoComplete="name" required />
        </div>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input id="email" type="text" autoComplete="email" required />
        </div>
        <div className="actions">
          <button type="submit">Create User</button>
        </div>
      </form>
      <Link href="/users">
        <a>Back</a>
      </Link>
    </div>
  );
};

export default New;
