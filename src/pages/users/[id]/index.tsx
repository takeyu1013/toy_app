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
    <div className="p-8">
      <p className="pb-4">
        <strong>Name:</strong> {props.user.name}
      </p>
      <p className="pb-4">
        <strong>Email:</strong> {props.user.email}
      </p>
      <Link href={`/users/${router.query}/edit`}>
        <a className="underline">Edit</a>
      </Link>
      {" | "}
      <Link href="/users">
        <a className="underline">Back</a>
      </Link>
    </div>
  );
};

export default User;
