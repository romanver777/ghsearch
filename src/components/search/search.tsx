import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import style from "./search.module.scss";

const Search = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [value, setValue] = useState("");
  const page = 1;
  const perPage = 100;

  const handleFilterUpdate = () => {
    const queryParams = new URLSearchParams(location.search);

    queryParams.set("q", value);
    queryParams.set("per_page", String(perPage));
    queryParams.set("page", String(page));

    navigate(`/search?${queryParams.toString()}`);
  };

  const handleSearchClick = () => {
    if (value.trim().length > 0) {
      handleFilterUpdate();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.code == "Enter" && value.trim().length > 0) {
      handleFilterUpdate();
    }
  };

  return (
    <div className={style.searchBlock}>
      <div className={style.inputWrap}>
        <input
          type="text"
          name="search"
          className={style.search}
          placeholder="Введите текст поиска"
          value={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setValue(e.target.value)
          }
          onKeyDown={handleKeyDown}
        />
        {!!value.length && (
          <button className={style["btn-svg"]} onClick={() => setValue("")}>
            <svg
              aria-hidden="true"
              height="16"
              viewBox="0 0 16 16"
              version="1.1"
              width="16"
              data-view-component="true"
              className={style.closeIcon}
              fill="rgba(208, 215, 222, 0.7)"
            >
              <path d="M2.343 13.657A8 8 0 1 1 13.658 2.343 8 8 0 0 1 2.343 13.657ZM6.03 4.97a.751.751 0 0 0-1.042.018.751.751 0 0 0-.018 1.042L6.94 8 4.97 9.97a.749.749 0 0 0 .326 1.275.749.749 0 0 0 .734-.215L8 9.06l1.97 1.97a.749.749 0 0 0 1.275-.326.749.749 0 0 0-.215-.734L9.06 8l1.97-1.97a.749.749 0 0 0-.326-1.275.749.749 0 0 0-.734.215L8 6.94Z"></path>
            </svg>
          </button>
        )}
      </div>
      <button className={style.btnSearch} onClick={handleSearchClick}>
        Поиск
      </button>
    </div>
  );
};

export default Search;
