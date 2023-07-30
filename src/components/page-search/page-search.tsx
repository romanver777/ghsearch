import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

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
  const filter = useSelector((state: TRootState) => state.sort.active);
  const filterList = useSelector((state: TRootState) => state.sort.list);

  const { search } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const defaultParams = search.split("&").slice(0, 1).join("&");
    const sortMax = "&sort=repositories&order=desc";
    const sortMin = "&sort=repositories&order=asc";

    switch (filter) {
      case filterList[1]:
        navigate(`/search/users${defaultParams}${sortMax}`);
        break;
      case filterList[2]:
        navigate(`/search/users${defaultParams}${sortMin}`);
        break;
      default:
        navigate(`/search/users${defaultParams}`);
    }
  }, [filter]);

  useEffect(() => {
    if (search.length) {
      void dispatch(fetchUsers(search));
    }
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
