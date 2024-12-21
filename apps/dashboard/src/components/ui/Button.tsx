interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}

export const Button = (props: IButtonProps) => {
  const { children, variant = "primary", ...rest } = props;

  return (
    <button
      {...rest}
      className={`px-4 py-2 rounded-md ${
        variant === "primary"
          ? "bg-blue-500 text-white"
          : "bg-gray-300 text-gray-800"
      }`}
    >
      {children}
    </button>
  );
};
