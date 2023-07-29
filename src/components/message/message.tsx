import React from "react";

import style from "./message.module.scss";

type TProps = {
  text: string;
};

const Message = ({ text }: TProps) => {
  return (
    <div className={style.message}>
      <span className={style.text}>{text}</span>
    </div>
  );
};

export default Message;
