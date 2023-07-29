import React from "react";

import style from "./main.module.scss";

type TProps = {
  children: React.ReactNode;
};

const Main = ({ children }: TProps) => {
  return (
    <main className={style.main}>
      <div className={style.container}>{children}</div>
    </main>
  );
};

export default Main;
