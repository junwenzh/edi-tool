// begins at HL * * * 20

class Loop2000A {
  [key: string]: number | undefined;

  HL?: number;
  PRV?: number;
  CUR?: number;

  constructor() {
    this.HL = undefined;
    this.PRV = undefined;
    this.CUR = undefined;
  }
}

function parseLoop2000A(lines: string[][], index: number) {
  const loop = new Loop2000A();

  for (let i = index; i < lines.length; i++) {
    const line = lines[i];
    const segment = line[0];

    if (loop[segment] || !(segment in loop)) {
      return {
        index: i - 1,
        loop,
      };
    } else if (segment === 'HL') {
      loop.HL = i;
    } else if (segment === 'PRV') {
      loop.PRV = i;
    } else if (segment === 'CUR') {
      loop.CUR = i;
    }
  }
}

export { Loop2000A, parseLoop2000A };
