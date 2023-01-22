import { Fragment } from "react";
import Link from "next/link";

const HomePage = () => {
  return (
    <Fragment>
      <h1>The home page</h1>
      <ul>
        <li>
          <Link href="/news/next-js-is-a-great-framwork">
            NextJs is a great framework
          </Link>
        </li>
        <li>
          <Link href="/news/something-else">Something Else</Link>
        </li>
      </ul>
    </Fragment>
  );
};
export default HomePage;
