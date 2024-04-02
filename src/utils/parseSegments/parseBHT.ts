function parseBHT(line: string[]): Date {
  const dateString = line[4];
  const date = new Date(
    Number(dateString.slice(0, 4)),
    Number(dateString.slice(4, 6)),
    Number(dateString.slice(6))
  );
  return date;
}

export { parseBHT };
