// begins at NM1 * 85

class Loop2010AB {
  [key: string]: number | undefined;

  NM1?: number;
  N3?: number;
  N4?: number;

  constructor() {
    this.NM1 = undefined;
    this.N3 = undefined;
    this.N4 = undefined;
  }
}

function parseLoop2010AB(lines: string[][], index: number) {
  const loop = new Loop2010AB();

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
    }
  }
}

export { Loop2010AB, parseLoop2010AB };
