// service facility

class Loop2310C {
  [key: string]: number | undefined;

  NM1?: number;
  N3?: number;
  N4?: number;
  REF?: number;
  PER?: number;

  constructor() {
    this.NM1 = undefined;
    this.N3 = undefined;
    this.N4 = undefined;
    this.REF = undefined;
    this.PER = undefined;
  }
}

function parseLoop2310C(lines: string[][], index: number) {
  const loop = new Loop2310C();

  for (let i = index; i < lines.length; i++) {
    const line = lines[i];
    const segment = line[0];

    if (loop[segment] || !(segment in loop)) {
      return {
        index: i,
        loop,
      };
    } else if (segment === 'NM1') {
      loop.NM1 = i;
    } else if (segment === 'N3') {
      loop.N3 = i;
    } else if (segment === 'N4') {
      loop.N4 = i;
    } else if (segment === 'REF') {
      loop.REF = i;
    } else if (segment === 'PER') {
      loop.PER = i;
    }
  }
}

export { Loop2310C, parseLoop2310C };
