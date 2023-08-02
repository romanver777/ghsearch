import React, { ReactNode } from "react";

import style from "./pagination.module.scss";

type TProps = {
  children: ReactNode;
};
const Pagination = ({ children }: TProps) => {
  return <div className={style.pagination}>{children}</div>;
};

export default Pagination;
