// begins at HL * * * 20
// combined with 2010AA

class Loop2000A {
  [key: string]: number | undefined;

  HL?: number;
  PRV?: number;
  CUR?: number;
  NM1?: number;
  N3?: number;
  N4?: number;
  TaxId?: number;
  NPI?: number;
  PER?: number;
  REF?: number;

  constructor() {
    this.HL = undefined;
    this.PRV = undefined;
    this.CUR = undefined;
    this.NM1 = undefined;
    this.N3 = undefined;
    this.N4 = undefined;
    this.TaxId = undefined;
    this.NPI = undefined;
    this.PER = undefined;
    this.REF = undefined;
  }
}

function parseLoop2000A(lines: string[][], index: number) {
  const loop = new Loop2000A();

  for (let i = index; i < lines.length; i++) {
    const line = lines[i];
    const segment = line[0];

    if (
      loop[segment] ||
      !(segment in loop) ||
      (segment === 'NM1' && line[1] !== '85')
    ) {
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

export { Loop2000A, parseLoop2000A };
