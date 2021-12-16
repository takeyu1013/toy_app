import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import React, { useCallback, useState } from "react";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id } = ctx.query;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_HOST}/users/${id}`
  );
  const user = await res.json();
  return {
    props: { user },
  };
};

type User = {
  id: number;
  email: string;
  name: string;
};

type Props = { user: User };

const Edit: NextPage<Props> = (props) => {
  const [name, setName] = useState(props.user.name);
  const [email, setEmail] = useState(props.user.email);
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
        `${process.env.NEXT_PUBLIC_BACKEND_HOST}/users/${router.query.id}`,
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
    <div className="p-8">
      <h1 className="font-extrabold text-3xl pb-4">Editing User</h1>
      <form className="pb-4" onSubmit={updateUser}>
        <div className="pb-4">
          <label htmlFor="name" className="block">
            Name
          </label>
          <input
            id="name"
            type="text"
            autoComplete="name"
            required
            value={name}
            onChange={handleName}
            className="border border-black"
          />
        </div>
        <div className="pb-4">
          <label htmlFor="email" className="block">
            Email
          </label>
          <input
            id="email"
            type="text"
            autoComplete="email"
            required
            value={email}
            onChange={handleEmail}
            className="border border-black"
          />
        </div>
        <button className="block border rounded-lg px-2 text-sm" type="submit">
          Update User
        </button>
      </form>
      <Link href={`/users/${props.user.id}`}>
        <a className="underline">Show</a>
      </Link>
      {" | "}
      <Link href="/users">
        <a className="underline">Back</a>
      </Link>
    </div>
  );
};

export default Edit;
