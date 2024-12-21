import Link from "next/link";
import React from "react";

const CardHome = ({
  card,
}: {
  card: { title: string; img: string; body: string; href: string };
}) => {
  return (
    <Link
      href={card.href}
      className="w-[240px] h-[160px] blur-filter rounded-2xl p-4"
    >
      <h2 className="text-lg font-bold">{card.title}</h2>
      <p className="text-sm font-light">{card.body}</p>
    </Link>
  );
};

export default CardHome;
