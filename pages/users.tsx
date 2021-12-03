import type { NextPage, GetServerSideProps } from "next";
import Link from "next/link";

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
            return (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <Link href={`/user/${user.id}`}>
                    <a>Show</a>
                  </Link>
                </td>
                <td>
                  <Link href={`/user/${user.id}/edit`}>
                    <a>Edit</a>
                  </Link>
                </td>
                <td>
                  <Link href="">
                    <a>Destroy</a>
                  </Link>
                </td>
              </tr>
            );
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
