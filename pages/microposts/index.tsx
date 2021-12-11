import type { NextPage, GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};

type Props = {};

const Microposts: NextPage<Props> = ({}) => {
  return (
    <tr>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
  );
};

export default Microposts;
