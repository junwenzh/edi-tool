// rendering provider

class Loop2310B_F {
  [key: string]: number | undefined;

  NM1?: number;
  REF?: number;

  constructor() {
    this.NM1 = undefined;
    this.REF = undefined;
  }
}

function parseLoop2310B_F(lines: string[][], index: number) {
  const loop = new Loop2310B_F();

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
    } else if (segment === 'REF') {
      loop.REF = i;
    }
  }
}

export { Loop2310B_F, parseLoop2310B_F };
