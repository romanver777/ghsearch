import React from "react";

import { useSelector } from "react-redux/es/hooks/useSelector";
import { TRootState } from "../../store/store";

import style from "./filter.module.scss";

const Filter = () => {
  const totalUsers = useSelector(
    (state: TRootState) => state.users.users?.total_count
  );

  return (
    <div className={style.filter}>
      {totalUsers != undefined && (
        <>
          <div
            className={style.totalUsers}
          >{`${totalUsers} пользователей`}</div>
          <button className={style.btnSort}>
            <span className={style.sortby}>Сортировать по: &nbsp;</span>
            <span className={style.sortName}>some name&nbsp;</span>
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
        </>
      )}
    </div>
  );
};

export default Filter;
