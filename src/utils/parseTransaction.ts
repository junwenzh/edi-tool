// takes in a file and parses the loops while keeping track of the hiearchy

import { Loop2310B, parseLoop2310B } from './parse2310B';
import { Loop2310C, parseLoop2310C } from './parse2310C';
import { Loop2000A, parseLoop2000A } from './parseLoop2000A';
import { Loop2000B, parseLoop2000B } from './parseLoop2000B';
import { Loop2010AA, parseLoop2010AA } from './parseLoop2010AA';
import { Loop2010AB, parseLoop2010AB } from './parseLoop2010AB';
import { Loop2010BA, parseLoop2010BA } from './parseLoop2010BA';
import { Loop2300, parseLoop2300 } from './parseLoop2300';

class Transaction {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any[];

  Loop2000A: Loop2000A[];
  Loop2010AA: Loop2010AA[];
  Loop2010AB: Loop2010AB[];
  Loop2000B: Loop2000B[];
  Loop2010BA: Loop2010BA[];
  Loop2300: Loop2300[];
  Loop2310B: Loop2310B[];
  Loop2310C: Loop2310C[];

  constructor() {
    this.Loop2000A = [];
    this.Loop2010AA = [];
    this.Loop2010AB = [];
    this.Loop2000B = [];
    this.Loop2010BA = [];
    this.Loop2300 = [];
    this.Loop2310B = [];
    this.Loop2310C = [];
  }
}

function parseTransaction(lines: string[][], index: number) {
  const transaction = new Transaction();

  for (let i = index; i < lines.length; i++) {
    const line = lines[i];
    const segment = line[0];
    if (segment === 'SE') {
      return {
        index: i,
        transaction: transaction,
      };
    } else if (segment === 'HL' && line[3] === '20') {
      const loop = parseLoop2000A(lines, i)!;
      transaction.Loop2000A.push(loop.loop);
      i = loop.index;
    } else if (segment === 'NM1' && line[1] === '85') {
      const loop = parseLoop2010AA(lines, i)!;
      transaction.Loop2010AA.push(loop.loop);
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
      i = loop.index;
    } else if (segment === 'NM1' && line[1] === '82') {
      const loop = parseLoop2310B(lines, i)!;
      transaction.Loop2310B.push(loop.loop);
      i = loop.index;
    } else if (segment === 'NM1' && line[1] === '77') {
      const loop = parseLoop2310C(lines, i)!;
      transaction.Loop2310C.push(loop.loop);
      i = loop.index;
    }
  }
}

export { Transaction, parseTransaction };
