import type { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import React, { useCallback, useState } from "react";

type User = {
  id: number;
  email: string;
  name: string;
};

const Edit: NextPage = () => {
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
  const router = useRouter();
  const updateUser = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_HOST}/user/${router.query.id}/edit`,
        {
          body: JSON.stringify({
            name: name,
            email: email,
          }),
          headers: {
            "Content-Type": "application/json",
          },
          method: "PATCH",
        }
      );
      if (response.ok) {
        const user = (await response.json()) as User;
        router.push(`/users/${user.id}`);
      } else {
        console.error("Could not obtain user info");
      }
    },
    [name, email, router]
  );
  return (
    <div>
      <h1>Editing User</h1>
      <form onSubmit={updateUser}>
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
          <button type="submit">Update User</button>
        </div>
      </form>
      <Link href="/users">
        <a>Back</a>
      </Link>
    </div>
  );
};

export default Edit;
