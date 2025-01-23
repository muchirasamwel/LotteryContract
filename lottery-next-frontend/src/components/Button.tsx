import React from "react";

interface Props
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  loading?: boolean;
}

const Button = (props: Props) => {
  const { loading, className, children, ...rest } = props;
  return (
    <button
      {...rest}
      className={
        "py-2 px-3 my-2 bg-green-700 rounded-full font-semibold hover:bg-green-500 transition-all flex flex-row justify-center items-center " +
        props.className
      }
    >
      {children}
      {props.loading && (
        <div className="ml-2 w-3 h-3 border-l-2 border-r-2 border-l-white rounded-full animate-spin " />
      )}
    </button>
  );
};

export default Button;
