import styles from "./Button.module.css";

interface ButtonProps {
  name: string;
  onClick: (name: string) => void;
  variant?: "default" | "orange" | "gray";
  wide?: boolean;
}

export function Button({ name, onClick, variant = "default", wide = false }: ButtonProps) {
  const classNames = [
    styles.button,
    variant === "orange" ? styles.orange : "",
    variant === "gray" ? styles.gray : "",
    wide ? styles.wide : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={classNames} onClick={() => onClick(name)}>
      {name}
    </button>
  );
}
