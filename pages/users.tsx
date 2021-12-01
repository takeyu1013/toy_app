import type { NextPage } from "next";
import Link from "next/link";

const Users: NextPage = () => {
  return (
    <div>
      <h1>Users</h1>
      <table>
        <thead>
          <th>Name</th>
          <th>Email</th>
          <th colSpan={3}></th>
        </thead>
        <tbody></tbody>
      </table>
      <Link href="/users/new">
        <a>New User</a>
      </Link>
    </div>
  );
};

export default Users;
