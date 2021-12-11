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
    <div>
      <h1>New Micropost</h1>
      <form onSubmit={createUser}>
        <div className="field">
          <label htmlFor="name">Name</label>
          <textarea required value={content} onChange={handleContent} />
        </div>
        <div className="field">
          <label htmlFor="email">User</label>
          <input
            id="userId"
            type="number"
            required
            value={userId}
            onChange={handleUserId}
          />
        </div>
        <div className="actions">
          <button type="submit">Create Micropost</button>
        </div>
      </form>
      <Link href="/microposts">
        <a>Back</a>
      </Link>
    </div>
  );
};

export default New;
