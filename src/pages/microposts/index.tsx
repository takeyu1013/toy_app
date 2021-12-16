import type { NextPage, GetServerSideProps } from "next";
import type { Micropost } from "../../types/micropost";
import Link from "next/link";

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/microposts`);
  const microposts = await res.json();
  return {
    props: { microposts },
  };
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
          {microposts.map((microposts) => {
            return (
              <tr key={microposts.id}>
                <td className="px-1">{microposts.content}</td>
                <td className="px-1">{microposts.userId}</td>
                <td>
                  <Link href={`/microposts/${microposts.id}`}>
                    <a className="px-1 underline">Show</a>
                  </Link>
                </td>
                <td>
                  <Link href={`/microposts/${microposts.id}/edit`}>
                    <a className="px-1 underline">Edit</a>
                  </Link>
                </td>
                <td>
                  <Link href="#">
                    <a className="px-1 underline" onClick={() => {}}>
                      Destroy
                    </a>
                  </Link>
                </td>
              </tr>
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
