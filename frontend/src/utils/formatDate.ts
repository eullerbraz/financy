export const formatDate = (date: Date) => {
  const tzoffset = date.getTimezoneOffset() * 60000;

  const withoutTimezone = new Date(
    date.valueOf() + tzoffset,
  ).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
  });

  return withoutTimezone;
};
