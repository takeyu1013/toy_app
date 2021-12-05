import { GetServerSideProps, NextPage } from "next";
import Link from "next/dist/client/link";
import { useRouter } from "next/dist/client/router";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id } = ctx.query;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_HOST}/users/${id}`
  );
  const user = await res.json();
  return {
    props: { user },
  };
};

type User = {
  id: number;
  email: string;
  name: string;
};

type Props = { user: User };

const User: NextPage<Props> = (props) => {
  const router = useRouter();
  return (
    <div>
      <p>User was successfully created.</p>
      <p>
        <strong>Name:</strong> {props.user.name}
      </p>
      <p>
        <strong>Email:</strong> {props.user.email}
      </p>
      <Link href={`/users/${router.query}/edit`}>
        <a>Edit</a>
      </Link>
      <Link href="/users">Back</Link>
    </div>
  );
};

export default User;
