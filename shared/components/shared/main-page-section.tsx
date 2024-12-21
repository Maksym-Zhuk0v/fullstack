import React from "react";
import Container from "./Container";
import Link from "next/link";
import { Button } from "../ui/button";
import CardHome from "./CardHome";

const cards = [
  {
    title: "Change Oil",
    img: "http://",
    body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt optio",
    href: "#get-in-line",
  },
  {
    title: "Make diagnosical",
    img: "http://",
    body: " elit. Incidunt optio Lorem ipsum dolor sit amet consectetur adipisicing",
    href: "#get-in-line",
  },
  {
    title: "Fix damages",
    img: "http://",
    body: "amet consectetur adipisicing Lorem ipsum dolor sit elit. Incidunt optio",
    href: "#get-in-line",
  },
];

const MainPageSection = () => {
  return (
    <div className="absolute mt-20 w-full">
      <Container className="flex justify-between p-24 items-start">
        <div className="max-w-[400px] flex flex-col gap-4 items-start blur-filter p-8 rounded-xl">
          <h2 className="text-5xl">You can get in line online</h2>
          <p className="text-lg">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum
            itaque illo consectetur, harum ullam facere voluptates natus aliquam
            veritatis quae ad quo, eveniet atque! Qui debitis sequi vero
            voluptates cumque!
          </p>
          <Link href={"/#get-in-line"}>
            <Button>Get in line</Button>
          </Link>
        </div>
        <div className="flex flex-col gap-4">
          {cards.map((card) => (
            <CardHome key={card.title} card={card} />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default MainPageSection;
