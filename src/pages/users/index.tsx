import type { NextPage, GetServerSideProps } from "next";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import { useCallback } from "react";

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/users`);
  const users = await res.json();
  return {
    props: { users },
  };
};

type User = {
  id: number;
  email: string;
  name: string;
};

type Props = { users: User[] };

const UserComponent: React.VFC<{ user: User }> = ({ user }) => {
  const router = useRouter();
  const destroyUser = useCallback(async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_HOST}/users/${user.id}`,
      {
        method: "DELETE",
      }
    );
    if (response.ok) {
      router.push(`/users`);
    } else {
      console.error("Could not obtain micropost info");
    }
  }, [user.id, router]);

  return (
    <tr>
      <td className="px-1">{user.name}</td>
      <td className="px-1">{user.email}</td>
      <td>
        <Link href={`/users/${user.id}`}>
          <a className="px-1 underline">Show</a>
        </Link>
      </td>
      <td>
        <Link href={`/users/${user.id}/edit`}>
          <a className="px-1 underline">Edit</a>
        </Link>
      </td>
      <td>
        <Link href="/users">
          <a className="px-1 underline" onClick={destroyUser}>
            Destroy
          </a>
        </Link>
      </td>
    </tr>
  );
};

const Users: NextPage<Props> = (props) => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-extrabold pb-2">Users</h1>
      <table className="pb-4 block">
        <thead>
          <th>Name</th>
          <th>Email</th>
          <th colSpan={3}></th>
        </thead>
        <tbody>
          {props.users.map((user) => {
            return <UserComponent key={user.id} user={user} />;
          })}
        </tbody>
      </table>
      <Link href="/users/new">
        <a className="underline text-gray-700 hover:text-black">New User</a>
      </Link>
    </div>
  );
};

export default Users;
