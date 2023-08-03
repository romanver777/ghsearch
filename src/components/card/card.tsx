import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../store/fetch-user-reducer";
import { TUser } from "../../store/fetch-users-reducer";
import { TAppDispatch } from "../../store/store";
import * as selectors from "../../store/selectors";

import Message from "../message/message";
import style from "./card.module.scss";

type TProps = {
  user: TUser;
  key: number;
};

const Card = (props: TProps) => {
  const dispatch: TAppDispatch = useDispatch();
  const loading = useSelector(selectors.getUserLoading(props.user.url));
  const error = useSelector(selectors.getUserError(props.user.url));
  const info = useSelector(selectors.getUserInfo(props.user.id));

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open && !info) {
      void dispatch(fetchUser(props.user.url));
    }
  }, [open]);

  return (
    <div className={style.card}>
      <div className={style.header}>
        <div className={style.imgWrap}>
          <img src={props.user.avatar_url} width="30px" height="30px" />
        </div>
        <span className={style.login}>{props.user.login}</span>
        <button className={style.btnSort} onClick={() => setOpen(!open)}>
          {open ? "Скрыть" : "Подробнее"}
        </button>
      </div>
      {open && loading && !info && <Message text="Загружаем..." />}
      {open && error && <Message text="Что-то пошло не так..." />}
      {open && info && (
        <div className={style.body}>
          <div className={style.bio}>{info.bio}</div>
          {!!info.location && (
            <div className={style.location}>{info.location}</div>
          )}
          <div className={style.content}>
            <div className={style.prop + " " + style.publicRepos}>
              public repos: {info.public_repos}
            </div>
            <div className={style.prop + " " + style.followers}>
              followers: {info.followers}
            </div>
            <div className={style.prop + " " + style.following}>
              following: {info.following}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
