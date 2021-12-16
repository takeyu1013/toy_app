import type { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import { useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import type { Micropost } from "../../types/micropost";

const New: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Micropost>();
  const router = useRouter();

  const createMicropost: SubmitHandler<Micropost> = useCallback(
    async (data) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_HOST}/microposts`,
        {
          body: JSON.stringify({
            content: data.content,
            userId: data.userId,
          }),
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
        }
      );
      if (response.ok) {
        const micropost = (await response.json()) as Micropost;
        router.push(`/microposts/${micropost.id}`);
      } else {
        console.error("Could not obtain micropost info");
      }
    },
    [router]
  );

  return (
    <div className="p-8">
      <h1 className="font-extrabold text-3xl">New Micropost</h1>
      <form onSubmit={handleSubmit(createMicropost)}>
        {errors.userId && "User must exist"}
        {errors.content && "Content can't be blank"}
        {errors.content?.type === "maxLength" &&
          "Content is too long (maximum is 140 charactors"}
        <label className="pt-4 block" htmlFor="content">
          Content
        </label>
        <textarea
          className="border border-black block"
          {...register("content", { required: true, maxLength: 140 })}
        />
        <label className="pt-4 block" htmlFor="userId">
          User
        </label>
        <div className="pb-4">
          <input
            type="number"
            className="border border-black block"
            {...register("userId", { required: true })}
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
