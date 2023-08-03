import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { useSelector } from "react-redux/es/hooks/useSelector";
import { TRootState, TAppDispatch } from "../../store/store";
import { useDispatch } from "react-redux";
import { fetchUsers } from "../../store/fetch-users-reducer";
import { setActive } from "../../store/sort-users-reducer";

import Filter from "../filter/filter";
import CardList from "../card-list/card-list";
import Message from "../message/message";
import Pagination from "../pagination/pagination";
import AFPagination from "af-pagination";

import style from "./page-search.module.scss";

const PageSearch = () => {
  const dispatch: TAppDispatch = useDispatch();
  const users = useSelector((state: TRootState) => state.users.users?.items);
  const usersLength = useSelector(
    (state: TRootState) => state.users.users?.total_count
  );
  const loading = useSelector((state: TRootState) => state.users.loading);
  const error = useSelector((state: TRootState) => state.users.error);
  const filter = useSelector((state: TRootState) => state.sort.active);
  const sortList = useSelector((state: TRootState) => state.sort.list);

  const perPage = 30;
  const limitUsers = 1000;

  const { search } = useLocation();
  const navigate = useNavigate();

  const getPage = () => {
    const url = new URLSearchParams(search);
    const currentPage = url.get("page") || 1;

    return +currentPage;
  };

  const [page, setPage] = useState(getPage());

  useEffect(() => {
    if (search.length) {
      const url = new URLSearchParams(search);
      const user = url.get("q") || "";
      const sort = url.get("order") || "";
      const currPage = url.get("page") || "";

      if (sort == "desc") {
        dispatch(setActive(sortList[1]));
      }
      if (sort == "asc") {
        dispatch(setActive(sortList[2]));
      }
      if (!sort && filter !== sortList[0]) {
        dispatch(setActive(sortList[0]));
      }

      if (!currPage) setPage(1);

      let params = `?q=${user}`;
      if (sort) params += `&sort=repositories&order=${sort}`;
      if (+currPage > 1) params += `&page=${currPage}`;

      void dispatch(fetchUsers(params));
    }
  }, [search]);

  const getTotalPages = (length: number | undefined, perPage: number) => {
    if (length == undefined) return;
    if (length > limitUsers) {
      return Math.ceil(limitUsers / perPage);
    }
    return Math.ceil(length / perPage);
  };

  const handleSetPage = (page: string) => {
    let params;
    if (search.includes("&page")) {
      params = search.split("&").slice(0, -1).join("&");
    } else {
      params = search;
    }
    if (+page > 1) {
      navigate(`${params}&page=${page}`);
    } else {
      navigate(`${params}`);
    }
    setPage(+page);
  };

  if (loading) return <Message text="Загружаем..." />;
  if (error) return <Message text="Что-то пошло не так..." />;

  return (
    <>
      {!users?.length ? (
        <Message text="Пока нет данных" />
      ) : (
        <>
          <Filter />
          <div className={style.content}>
            <CardList users={users} />
          </div>
          <Pagination>
            <AFPagination
              current_page={page}
              set_page={(page: string) => handleSetPage(page)}
              total_pages={getTotalPages(usersLength, perPage)}
              activeStyles={{
                color: "blue",
                backgroundColor: "rgba(208, 215, 222, 0.35)",
                border: "none",
              }}
              hoverStyles={{ backgroundColor: "rgba(208, 215, 222, 0.35)" }}
              style={{ border: "none" }}
            />
          </Pagination>
        </>
      )}
    </>
  );
};

export default PageSearch;
