import { twMerge } from "tailwind-merge";

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  as?: React.ElementType;
  variant?: "primary" | "secondary";
}

export const Button = (props: IButtonProps) => {
  const { children, variant = "primary", ...rest } = props;

  if (props.as) {
    return (
      <props.as
        {...rest}
        className={twMerge(
          `px-4 py-2 rounded-md`,
          variant === "primary"
            ? "bg-blue-500 text-white"
            : "bg-gray-300 text-gray-800",
          props.className,
        )}
      >
        {children}
      </props.as>
    );
  }

  return (
    <button
      {...rest}
      className={twMerge(
        `px-4 py-2 rounded-md`,
        variant === "primary"
          ? "bg-blue-500 text-white"
          : "bg-gray-300 text-gray-800",
        props.className,
      )}
    >
      {children}
    </button>
  );
};
