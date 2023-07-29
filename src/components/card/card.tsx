import React from "react";

import { TUser } from "../../store/fetch-users-reducer";
import style from "./card.module.scss";

type TProps = {
  user: TUser;
  key: number;
};

const Card = (props: TProps) => {
  return (
    <div className={style.card}>
      <div className={style.imgWrap}>
        <img src={props.user.avatar_url} width="30px" height="30px" />
      </div>
      <span className={style.login}>{props.user.login}</span>
    </div>
  );
};

export default Card;
