import type { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import React, { useCallback, useState } from "react";

const New: NextPage = () => {
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");
  const handleContent = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setContent(event.target.value);
    },
    []
  );
  const handleUserId = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setUserId(event.target.value);
    },
    []
  );
  const router = useRouter();
  const createUser = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_HOST}/microposts`,
        {
          body: JSON.stringify({
            content: content,
            user_id: userId,
          }),
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
        }
      );
      if (response.ok) {
        router.push(`/microposts`);
      } else {
        console.error("Could not obtain micropost info");
      }
    },
    [content, userId, router]
  );

  return (
    <div className="p-8">
      <h1 className="font-extrabold text-3xl">New Micropost</h1>
      <form onSubmit={createUser}>
        <label className="pt-4 block" htmlFor="content">
          Content
        </label>
        <textarea
          className="border border-black block"
          id="content"
          required
          value={content}
          onChange={handleContent}
        />
        <label className="pt-4 block" htmlFor="userId">
          User
        </label>
        <div className="pb-4">
          <input
            className="border border-black block"
            id="userId"
            type="number"
            required
            value={userId}
            onChange={handleUserId}
          />
        </div>
        <button className="block border rounded-lg px-2 text-sm" type="submit">
          Create Micropost
        </button>
      </form>
      <Link href="/microposts">
        <a className="underline pt-4 block">Back</a>
      </Link>
    </div>
  );
};

export default New;
