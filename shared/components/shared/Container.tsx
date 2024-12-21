import React, { ReactNode } from "react";

const Container = ({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) => {
  return (
    <div className={className + " max-w-[1280px] mx-auto"}>{children}</div>
  );
};

export default Container;
