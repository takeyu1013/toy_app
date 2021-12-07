import type { NextPage, GetServerSideProps } from "next";
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
  const destroyUser = useCallback(async () => {
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/users/${user.id}`, {
      method: "DELETE",
    });
  }, [user.id]);

  return (
    <tr>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>
        <Link href={`/users/${user.id}`}>
          <a>Show</a>
        </Link>
      </td>
      <td>
        <Link href={`/users/${user.id}/edit`}>
          <a>Edit</a>
        </Link>
      </td>
      <td>
        <Link href="/users">
          <a onClick={destroyUser}>Destroy</a>
        </Link>
      </td>
    </tr>
  );
};

const Users: NextPage<Props> = (props) => {
  return (
    <div>
      <h1>Users</h1>
      <table>
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
        <a>New User</a>
      </Link>
    </div>
  );
};

export default Users;
