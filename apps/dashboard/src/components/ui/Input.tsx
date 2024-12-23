import React, { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface IInputGroupProps {
  children: React.ReactNode;
}

export const InputGroup: React.FC<IInputGroupProps> = ({ children }) => {
  return <div className="my-2">{children}</div>;
};

export const TextInput = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>((props, ref) => {
  return (
    <input
      {...props}
      ref={ref}
      className={twMerge(
        `px-4 py-2 rounded-md border border-gray-300 w-full`,
        props.className,
      )}
    />
  );
});

interface ISelectInputProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  values: [string, string][];
}

export const SelectInput = forwardRef<HTMLSelectElement, ISelectInputProps>(
  (props, ref) => {
    const { values, ...rest } = props;
    return (
      <select
        {...rest}
        ref={ref}
        className={twMerge(
          `px-4 py-2 rounded-md border border-gray-300 w-full`,
          props.className,
        )}
      >
        {values.map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    );
  },
);
