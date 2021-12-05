import { NextPage } from "next";

const User: NextPage = () => {
  return (
    <div>
      <p>User was successfully created.</p>
      <p>Name: {/* props.user.id */}</p>
      <p>Email: {/* props.user.email */}</p>
    </div>
  );
};

export default User;
