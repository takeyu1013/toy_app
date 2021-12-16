import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import React, { useCallback, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import type { Micropost } from "../../../types/micropost";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id } = ctx.query;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_HOST}/microposts/${id}`
  );
  const micropost = await res.json();
  return {
    props: {
      micropost,
    },
  };
};

const Edit: NextPage<{ micropost: Micropost }> = ({ micropost }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Micropost>();
  const router = useRouter();

  const updateMicropost: SubmitHandler<Micropost> = async (data) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_HOST}/microposts/${micropost.id}`,
      {
        body: JSON.stringify({
          content: data.content,
          userId: data.userId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "PATCH",
      }
    );
    if (response.ok) {
      router.push(`/microposts`);
    } else {
      console.error("Could not obtain micropost info");
    }
  };
  return (
    <div className="p-8">
      <h1 className="font-extrabold text-3xl">New Micropost</h1>
      <form onSubmit={handleSubmit(updateMicropost)}>
        {errors.userId && "User must exist"}
        {errors.content && "Content can't be blank"}
        {errors.content?.type === "maxLength" &&
          "Content is too long (maximum is 140 charactors"}
        <label className="pt-4 block" htmlFor="content">
          Content
        </label>
        <textarea
          className="border border-black block"
          defaultValue={micropost.content}
          {...register("content", { required: true, maxLength: 140 })}
        />
        <label className="pt-4 block" htmlFor="userId">
          User
        </label>
        <div className="pb-4">
          <input
            type="number"
            className="border border-black block"
            defaultValue={micropost.userId}
            {...register("userId", { required: true })}
          />
        </div>
        <button className="block border rounded-lg px-2 text-sm" type="submit">
          Update Micropost
        </button>
      </form>
      <Link href="/microposts">
        <a className="underline pt-4 block">Back</a>
      </Link>
    </div>
  );
};

export default Edit;
