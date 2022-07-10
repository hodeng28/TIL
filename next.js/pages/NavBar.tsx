import Link from "next/Link";
import { useRouter } from "next/router";

const NavBar = () => {
  const router = useRouter();

  return (
    <nav>
      <Link href="/">
        <a style={{ color: router.pathname === "/" ? "red" : "blue" }}>Home</a>
      </Link>
      <Link href="/page">
        <a style={{ color: router.pathname === "/page" ? "red" : "blue" }}>
          page
        </a>
      </Link>
    </nav>
  );
};

export default NavBar;
