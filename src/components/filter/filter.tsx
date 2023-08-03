import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useSelector } from "react-redux/es/hooks/useSelector";
import { TRootState } from "../../store/store";

import style from "./filter.module.scss";

const Filter = () => {
  const totalUsers = useSelector(
    (state: TRootState) => state.users.users?.total_count
  );
  const sortType = useSelector((state: TRootState) => state.sort.active);
  const sortList = useSelector((state: TRootState) => state.sort.list);

  const { search } = useLocation();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(e.target as Element) &&
        !btnRef.current?.contains(e.target as Element)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [filterRef]);

  const handleFilterClick = (item: string) => {
    setOpen(false);

    const defaultParams = search.split("&").slice(0, 1).join("&");
    const sortMax = "&sort=repositories&order=desc";
    const sortMin = "&sort=repositories&order=asc";

    switch (item) {
      case sortList[1]:
        {
          navigate(`/search/users${defaultParams}${sortMax}`);
        }
        break;
      case sortList[2]:
        {
          navigate(`/search/users${defaultParams}${sortMin}`);
        }
        break;
      default: {
        navigate(`/search/users${defaultParams}`);
      }
    }
  };

  return (
    <div className={style.filter}>
      {totalUsers != undefined && (
        <>
          <div
            className={style.totalUsers}
          >{`${totalUsers} пользователей`}</div>
          <button
            className={style.btnSort}
            onClick={() => setOpen(!open)}
            ref={btnRef}
          >
            <span className={style.sortby}>Сортировать по: &nbsp;</span>
            <span className={style.sortName}>{sortType}&nbsp;</span>
            <svg
              aria-hidden="true"
              focusable="false"
              role="img"
              className={style.filterIcon}
              viewBox="0 0 16 16"
              width="16px"
              height="16px"
            >
              <path d="m4.427 7.427 3.396 3.396a.25.25 0 0 0 .354 0l3.396-3.396A.25.25 0 0 0 11.396 7H4.604a.25.25 0 0 0-.177.427Z"></path>
            </svg>
          </button>
          {open && (
            <div className={style.filterMenu} ref={filterRef}>
              <ul className={style.menuList}>
                {sortList.map((item) => {
                  const linkStyle =
                    item == sortType
                      ? style.itemLink + " " + style.active
                      : style.itemLink;
                  return (
                    <li className={style.menuItem} key={item}>
                      <a
                        className={linkStyle}
                        onClick={() => handleFilterClick(item)}
                      >
                        {item}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Filter;
