import styles from "./page.module.scss";
import Login from "@/components/login";
import ProtectedContent from "@/components/protectedContent";

export default function Test() {
  return (
    <>
      <h1>Hello, world!</h1>
      <Login/>
      <ProtectedContent/>
    </>
  );
}
