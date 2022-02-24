import React, { useEffect } from "react";
import Card from "./Card";

const CardContainer = ({ number }) => {

  const createCard = (num) => {
    let cards = [];
    for (let i = num; i > 0; i--) {
      cards.push(<Card  key={i}/>);
    }
    return cards;
  };
  return <div className="mt-3 mb-4 sm:mt-0 flex flex-col gap-y-4 min-w-full">{createCard(number)}</div>;
};

export default CardContainer;
