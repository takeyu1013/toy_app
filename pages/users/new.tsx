import type { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import React, { useCallback, useState } from "react";

type User = {
  id: number;
  email: string;
  name: string;
};

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
  const router = useRouter();
  const createUser = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_HOST}/users`,
        {
          body: JSON.stringify({
            name: name,
            email: email,
          }),
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
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
