import type { NextPage, GetServerSideProps } from "next";
import type { Micropost } from "../../types/micropost";
import Link from "next/link";
import { useCallback } from "react";
import { useRouter } from "next/dist/client/router";

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/microposts`);
  const microposts = await res.json();

  return {
    props: { microposts },
  };
};

const MicropostComponent: React.VFC<{ micropost: Micropost }> = ({
  micropost,
}) => {
  const router = useRouter();
  const destroyMicropost = useCallback(async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_HOST}/microposts/${micropost.id}`,
      {
        method: "DELETE",
      }
    );
    if (response.ok) {
      router.push(`/microposts`);
    } else {
      console.error("Could not obtain micropost info");
    }
  }, [micropost.id, router]);

  return (
    <tr>
      <td className="px-1">{micropost.content}</td>
      <td className="px-1">{micropost.userId}</td>
      <td>
        <Link href={`/microposts/${micropost.id}`}>
          <a className="px-1 underline">Show</a>
        </Link>
      </td>
      <td>
        <Link href={`/microposts/${micropost.id}/edit`}>
          <a className="px-1 underline">Edit</a>
        </Link>
      </td>
      <td>
        <Link href="/microposts">
          <a className="px-1 underline" onClick={destroyMicropost}>
            Destroy
          </a>
        </Link>
      </td>
    </tr>
  );
};

const Microposts: NextPage<{ microposts: Micropost[] }> = ({ microposts }) => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-extrabold pb-2">Microposts</h1>
      <table className="pb-4 block">
        <thead>
          <th className="px-1">Content</th>
          <th className="px-1">User</th>
          <th colSpan={3}></th>
        </thead>
        <tbody>
          {microposts.map((micropost) => {
            return (
              <MicropostComponent key={micropost.id} micropost={micropost} />
            );
          })}
        </tbody>
      </table>
      <Link href="/microposts/new">
        <a className="underline text-gray-700 hover:text-black">
          New Micropost
        </a>
      </Link>
    </div>
  );
};

export default Microposts;
