import React from "react";
import { Link } from "react-router-dom";

import Search from "../search/search";
import style from "./header.module.scss";

const Header = () => {
  return (
    <header className={style.header}>
      <div className={style.container}>
        <Link to="/" className={style.title}>
          Github search
        </Link>
        <Search />
      </div>
    </header>
  );
};

export default Header;
