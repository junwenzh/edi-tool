// begins at NM1 * 87

class Loop2010AA {
  [key: string]: number | undefined;

  NM1?: number;
  N3?: number;
  N4?: number;
  TaxId?: number;
  NPI?: number;
  PER?: number;
  REF?: number;

  constructor() {
    this.NM1 = undefined;
    this.N3 = undefined;
    this.N4 = undefined;
    this.TaxId = undefined;
    this.NPI = undefined;
    this.PER = undefined;
    this.REF = undefined;
  }
}

function parseLoop2010AA(lines: string[][], index: number) {
  const loop = new Loop2010AA();

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
      if (line[1] === 'EI' || line[1] === 'SY') {
        loop.TaxId = i;
      } else if (line[1] === '0B' || line[1] === '1G') {
        loop.NPI = i;
      }
    } else if (segment === 'PER') {
      loop.PER = i;
    }
  }
}

export { Loop2010AA, parseLoop2010AA };
