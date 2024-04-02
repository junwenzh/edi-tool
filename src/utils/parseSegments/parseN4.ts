class N4 {
  city: string;
  state: string;
  zip: string;

  constructor(city: string, state: string, zip: string) {
    this.city = city;
    this.state = state;
    this.zip = zip;
  }
}

function parseN4(line: string[]): N4 {
  const city = line[1];
  const state = line[2];
  const zip = line[3];

  return new N4(city, state, zip);
}

export { N4, parseN4 };
