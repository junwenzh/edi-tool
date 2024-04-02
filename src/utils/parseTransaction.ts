// takes in a file and parses the loops while keeping track of the hiearchy

import { Loop2000A, parseLoop2000A } from './parseLoops/parseLoop2000A';
import { Loop2000B, parseLoop2000B } from './parseLoops/parseLoop2000B';
import { Loop2010AB, parseLoop2010AB } from './parseLoops/parseLoop2010AB';
import { Loop2010BA, parseLoop2010BA } from './parseLoops/parseLoop2010BA';
import { Loop2300, parseLoop2300 } from './parseLoops/parseLoop2300';
import {
  LoopRenderingProvider,
  parseLoopRenderingProvider,
} from './parseLoops/parseLoopRenderingProvider';
import {
  LoopServiceFacility,
  parseLoopServiceFacility,
} from './parseLoops/parseLoopServiceFacility';

class Transaction {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any[];

  Loop2000A: Loop2000A[];
  Loop2010AB: Loop2010AB[];
  Loop2000B: Loop2000B[];
  Loop2010BA: Loop2010BA[];
  Loop2300: Loop2300[];

  constructor() {
    this.Loop2000A = [];
    this.Loop2010AB = [];
    this.Loop2000B = [];
    this.Loop2010BA = [];
    this.Loop2300 = [];
  }
}

function parseTransaction(lines: string[][], index: number) {
  const transaction = new Transaction();

  let currentBillingProvider: Loop2000A;
  let currentProviders: {
    rendering?: LoopRenderingProvider;
    serviceFacility?: LoopServiceFacility;
  };

  for (let i = index; i < lines.length; i++) {
    const line = lines[i];
    const segment = line[0];
    if (segment === 'SE') {
      return {
        index: i - 1,
        transaction: transaction,
      };
    } else if (segment === 'HL' && line[3] === '20') {
      const loop = parseLoop2000A(lines, i)!;
      transaction.Loop2000A.push(loop.loop);
      currentBillingProvider = loop.loop;
      i = loop.index;
    } else if (segment === 'NM1' && line[1] === '87') {
      const loop = parseLoop2010AB(lines, i)!;
      transaction.Loop2010AB.push(loop.loop);
      i = loop.index;
    } else if (segment === 'HL' && line[3] === '22') {
      const loop = parseLoop2000B(lines, i)!;
      transaction.Loop2000B.push(loop.loop);
      i = loop.index;
    } else if (segment === 'NM1' && line[1] === 'IL') {
      const loop = parseLoop2010BA(lines, i)!;
      transaction.Loop2010BA.push(loop.loop);
      i = loop.index;
    } else if (segment === 'CLM') {
      const loop = parseLoop2300(lines, i)!;
      transaction.Loop2300.push(loop.loop);
      currentProviders = {};
      i = loop.index;
    } else if (segment === 'NM1' && line[1] === '82') {
      const loop = parseLoopRenderingProvider(lines, i)!;
      // transaction.LoopRenderingProvider.push(loop.loop);
      currentProviders!.rendering = loop.loop;
      i = loop.index;
    } else if (segment === 'NM1' && line[1] === '77') {
      const loop = parseLoopServiceFacility(lines, i)!;
      // transaction.LoopServiceFacility.push(loop.loop);
      currentProviders!.serviceFacility = loop.loop;
      i = loop.index;
    } else if (segment === 'LX') {
      if (Object.keys(currentProviders!).length) {
        currentBillingProvider!.providers.push(currentProviders!);
      }
    }
  }
}

export { Transaction, parseTransaction };
