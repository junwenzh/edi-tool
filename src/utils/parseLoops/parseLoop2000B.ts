// begins at HL * * * 20

class Loop2000B {
  [key: string]: number | undefined;

  HL?: number;
  SBR?: number;
  PAT?: number;

  constructor() {
    this.HL = undefined;
    this.SBR = undefined;
    this.PAT = undefined;
  }
}

function parseLoop2000B(lines: string[][], index: number) {
  const loop = new Loop2000B();

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
    } else if (segment === 'SBR') {
      loop.SBR = i;
    } else if (segment === 'PAT') {
      loop.PAT = i;
    }
  }
}

export { Loop2000B, parseLoop2000B };
