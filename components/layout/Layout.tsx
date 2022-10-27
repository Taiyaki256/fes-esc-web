import { ReactNode } from "react";
import styles from "./Layout.module.scss";

type Props = {
  children: ReactNode;
  title?: string;
  back?: boolean;
  url?: string;
  noshow?: boolean;
};

const Layout = ({ children, title, back, url, noshow }: Props) => {
  return (
    <>
      <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Ubuntu+Mono" />
      <div className={styles.container}>
        {children}
      </div>
    </>
  );
};

export default Layout;
