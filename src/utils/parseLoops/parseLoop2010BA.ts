// subscriber
// starts with NM1*IL

class Loop2010BA {
  [key: string]: number | undefined;

  NM1?: number;
  N3?: number;
  N4?: number;
  DMG?: number;
  SSN?: number;
  PER?: number;
  REF?: number;

  constructor() {
    this.NM1 = undefined;
    this.N3 = undefined;
    this.N4 = undefined;
    this.DMG = undefined;
    this.REF = undefined;
    this.PER = undefined;
  }
}

function parseLoop2010BA(lines: string[][], index: number) {
  const loop = new Loop2010BA();

  for (let i = index; i < lines.length; i++) {
    const line = lines[i];
    const segment = line[0];

    if (loop[segment] || !(segment in loop)) {
      return {
        index: i - 1,
        loop,
      };
    } else if (segment === 'NM1') {
      loop.NM1 = i;
    } else if (segment === 'N3') {
      loop.N3 = i;
    } else if (segment === 'N4') {
      loop.N4 = i;
    } else if (segment === 'REF') {
      if (line[1] === 'SY') {
        loop.SSN = i;
      }
    } else if (segment === 'PER') {
      loop.PER = i;
    }
  }
}

export { Loop2010BA, parseLoop2010BA };
