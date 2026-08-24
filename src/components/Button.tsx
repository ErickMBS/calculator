import styles from "./Button.module.css";

interface ButtonProps {
  name: string;
  onClick: (name: string) => void;
  variant?: "default" | "orange" | "gray";
  wide?: boolean;
  small?: boolean;
}

export function Button({
  name,
  onClick,
  variant = "default",
  wide = false,
  small = false,
}: ButtonProps) {
  const classNames = [
    styles.button,
    variant === "orange" ? styles.orange : "",
    variant === "gray" ? styles.gray : "",
    wide ? styles.wide : "",
    small ? styles.small : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={classNames} onClick={() => onClick(name)} type="button">
      {name}
    </button>
  );
}
