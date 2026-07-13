// app\_components\ConvertDate\index.tsx
import { format, parseISO } from "date-fns";
import { ja } from "date-fns/locale";

type ConvertDateProps = {
  dateISO: string;
};

export default function ConvertDate({ dateISO }: ConvertDateProps) {
  return (
    <time dateTime={dateISO}>
      {format(parseISO(dateISO), "yyyy.MM.dd", {
        locale: ja,
      })}
    </time>
  );
}
