// starts with CLM

class Loop2300 {
  [key: string]: number | undefined;

  CLM?: number;
  DTP?: number;
  PWK?: number;
  CN1?: number;
  AMT?: number;
  REF?: number;
  K3?: number;
  NTE?: number;
  CR1?: number;
  CR2?: number;
  CRC?: number;
  HI?: number;
  HCP?: number;
  referral?: number;
  authorization?: number;

  constructor() {
    this.CLM = undefined;
    this.DTP = undefined;
    this.PWK = undefined;
    this.CN1 = undefined;
    this.AMT = undefined;
    this.REF = undefined;
    this.K3 = undefined;
    this.NTE = undefined;
    this.CR1 = undefined;
    this.CR2 = undefined;
    this.CRC = undefined;
    this.HI = undefined;
    this.HCP = undefined;
    this.referral = undefined;
    this.authorization = undefined;
  }
}

function parseLoop2300(lines: string[][], index: number) {
  const loop = new Loop2300();

  for (let i = index; i < lines.length; i++) {
    const line = lines[i];
    const segment = line[0];

    if (loop[segment] || !(segment in loop)) {
      return {
        index: i - 1,
        loop,
      };
    } else if (segment === 'CLM') {
      loop.CLM = i;
    } else if (segment === 'AMT') {
      loop.AMT = i;
    } else if (segment === 'REF') {
      if (line[1] === '9F') {
        loop.referral = i;
      } else if (line[1] === 'G1') {
        loop.authorization = i;
      }
    }
  }
}

export { Loop2300, parseLoop2300 };
