import clsx from "clsx";
import { PropsWithChildren } from "react";

type Props = {
  className?: string;
};

const Container: React.FC<PropsWithChildren<Props>> = ({ children, className }) => {
  return (
    <div className={clsx(`max-w-[1443px] mx-auto px-4 md:px-5 lg:px-6 2xl:px-0`, className)}>
      {children}
    </div>
  );
};

export default Container;
