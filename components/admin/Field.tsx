import styles from "@/app/admin/admin.module.css";

type Common = {
  label: string;
  hint?: string;
};

export function TextField({
  label,
  hint,
  value,
  onChange,
  multiline,
}: Common & {
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
}) {
  return (
    <div className={styles.field}>
      <label>{label}</label>
      {hint ? <p className={styles.hint}>{hint}</p> : null}
      {multiline ? (
        <textarea
          className={styles.textarea}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input
          className={styles.input}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </div>
  );
}

export function LinesField({
  label,
  hint,
  value,
  onChange,
}: Common & {
  value: string[];
  onChange: (value: string[]) => void;
}) {
  return (
    <TextField
      label={label}
      hint={hint || "Um item por linha"}
      value={value.join("\n")}
      onChange={(text) =>
        onChange(
          text
            .split("\n")
            .map((line) => line.trim())
            .filter(Boolean),
        )
      }
      multiline
    />
  );
}
