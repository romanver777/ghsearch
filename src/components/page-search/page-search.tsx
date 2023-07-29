import React, { useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";

import { useSelector } from "react-redux/es/hooks/useSelector";
import { TRootState, TAppDispatch } from "../../store/store";
import { useDispatch } from "react-redux";
import { fetchUsers } from "../../store/fetch-users-reducer";

import Filter from "../filter/filter";
import CardList from "../card-list/card-list";
import Message from "../message/message";

import style from "./page-search.module.scss";

const PageSearch = () => {
  const dispatch: TAppDispatch = useDispatch();
  const users = useSelector((state: TRootState) => state.users.users?.items);
  const loading = useSelector((state: TRootState) => state.users.loading);
  const error = useSelector((state: TRootState) => state.users.error);

  const { search } = useLocation();
  const searchParams = useMemo(() => new URLSearchParams(search), [search]);

  const getParams = (searchParams: URLSearchParams) => {
    const q = searchParams.get("q");
    const perPage = searchParams.get("per_page");
    const page = searchParams.get("page");

    return { q, perPage, page };
  };

  useEffect(() => {
    void dispatch(fetchUsers(getParams(searchParams)));
  }, [search]);

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
        </>
      )}
    </>
  );
};

export default PageSearch;
