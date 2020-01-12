import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

export function dateTimeFormat(date) {
  return format(parseISO(date), "d 'de' MMMM', às' HH'h'", {
    locale: pt,
  });
}

export function dateFormat(date) {
  return format(date, "d 'de' MMMM", { locale: pt });
}
