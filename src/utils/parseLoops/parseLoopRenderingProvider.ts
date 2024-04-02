// rendering provider

class LoopRenderingProvider {
  [key: string]: number | undefined;

  NM1?: number;
  PRV?: number;
  REF?: number;

  constructor() {
    this.NM1 = undefined;
    this.PRV = undefined;
    this.REF = undefined;
  }
}

function parseLoopRenderingProvider(lines: string[][], index: number) {
  const loop = new LoopRenderingProvider();

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
    } else if (segment === 'PRV') {
      loop.PRV = i;
    } else if (segment === 'REF') {
      loop.REF = i;
    }
  }
}

export { LoopRenderingProvider, parseLoopRenderingProvider };
