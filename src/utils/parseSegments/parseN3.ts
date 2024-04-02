class N3 {
  address1: string;
  address2: string;

  constructor(address1: string, address2: string) {
    this.address1 = address1;
    this.address2 = address2;
  }
}

function parseN3(line: string[]): N3 {
  const address1 = line[1];
  const address2 = line[2];
  return new N3(address1, address2);
}

export { N3, parseN3 };
