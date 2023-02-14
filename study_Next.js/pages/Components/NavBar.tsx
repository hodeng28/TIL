import Link from "next/Link";
import { useRouter } from "next/router";
import styles from "./NavBar.module.css";

const NavBar = () => {
  const router = useRouter();

  return (
    <nav>
      <Link href="/">
        <a className={router.pathname === "/" ? "active" : ""}>Home</a>
      </Link>
      <Link href="/about">
        <a className={router.pathname === "/about" ? "active" : ""}>page</a>
      </Link>
      {/* <style>
        {`
          a {
            font-size: 30px;
            text-decoration: none;
          }
          .active {
            color: blue;
          }
        `}
      </style> */}
    </nav>
  );
};

export default NavBar;
