import { GetServerSideProps, NextPage } from "next";
import Link from "next/dist/client/link";
import { useRouter } from "next/dist/client/router";
import type { Micropost } from "../../../types/micropost";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id } = ctx.query;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_HOST}/microposts/${id}`
  );
  const micropost = await res.json();
  return {
    props: { micropost },
  };
};

const Micropost: NextPage<{ micropost: Micropost }> = ({ micropost }) => {
  const router = useRouter();
  return (
    <div className="p-8">
      <p className="pb-4">
        <strong>Content: </strong> {micropost.content}
      </p>
      <p className="pb-4">
        <strong>User: </strong> {micropost.userId}
      </p>
      <Link href={`/microposts/${router.query}/edit`}>
        <a className="underline">Edit</a>
      </Link>
      {" | "}
      <Link href="/microposts">
        <a className="underline">Back</a>
      </Link>
    </div>
  );
};

export default Micropost;
