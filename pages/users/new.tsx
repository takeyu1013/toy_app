import type { NextPage } from "next";
import Link from "next/link";
import React, { useCallback, useState } from "react";

const New: NextPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const handleName = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setName(event.target.value);
    },
    []
  );
  const handleEmail = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(event.target.value);
    },
    []
  );
  const createUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/user`, {
      body: JSON.stringify({
        name: name,
        email: email,
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
          <input
            id="name"
            type="text"
            autoComplete="name"
            required
            value={name}
            onChange={handleName}
          />
        </div>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="text"
            autoComplete="email"
            required
            value={email}
            onChange={handleEmail}
          />
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
