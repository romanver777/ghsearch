import React from "react";

import Card from "../card/card";
import { TUser } from "../../store/fetch-users-reducer";

import style from "./card-list.module.scss";

type TProps = {
  users?: TUser[];
};

const CardList = ({ users }: TProps) => {
  return (
    <div className={style.cards}>
      {users?.map((user) => (
        <Card user={user} key={user.id} />
      ))}
    </div>
  );
};

export default CardList;
