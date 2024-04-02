class REF {
  qualifier: string;
  id: string;

  constructor(qualifier: string, id: string) {
    this.qualifier = qualifier;
    this.id = id;
  }
}

function parseREF(line: string[]): REF {
  const qualifier = line[1];
  const id = line[2];
  return new REF(qualifier, id);
}

export { REF, parseREF };
