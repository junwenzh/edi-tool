/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from 'fs';
import { Loop2310B, parseLoop2310B } from './parse2310B';
import { Loop2310C, parseLoop2310C } from './parse2310C';
import { parseFile } from './parseFile';
import { Loop2000A, parseLoop2000A } from './parseLoop2000A';
import { Loop2000B, parseLoop2000B } from './parseLoop2000B';
import { Loop2010AA, parseLoop2010AA } from './parseLoop2010AA';
import { Loop2010AB, parseLoop2010AB } from './parseLoop2010AB';
import { Loop2010BA, parseLoop2010BA } from './parseLoop2010BA';
import { Loop2300, parseLoop2300 } from './parseLoop2300';

function test() {
  const path =
    '/Users/jun/Downloads/P.CB77244.T77244.PB.D240319.T0135061.11341049';
  const file = fs.readFileSync(path, 'utf-8').replace(/\r\n/g, '');
  const lines = file.split('~').map(line => line.split('*'));
  // console.log(lines.slice(0, 20));

  // test2000A(lines);
  // test2010AA(lines);
  // test2010AB(lines);
  // test2000B(lines);
  // test2010BA(lines);
  // test2300(lines);
  // test2310B(lines);
  // test2310C(lines);

  const result = parseFile(file);
  console.log(result);
}

function test2000A(lines: string[][]) {
  const results: Loop2000A[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const segment = line[0];
    if (segment === 'HL' && line[3] === '20') {
      const loop = parseLoop2000A(lines, i)!;
      results.push(loop.loop);
      i = loop.index;
    }
  }

  return results;
}

function test2010AA(lines: string[][]) {
  const results: Loop2010AA[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const segment = line[0];
    if (segment === 'NM1' && line[1] === '85') {
      const loop = parseLoop2010AA(lines, i)!;
      results.push(loop.loop);
      i = loop.index;
    }
  }

  return results;
}

function test2010AB(lines: string[][]) {
  const results: Loop2010AB[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const segment = line[0];
    if (segment === 'NM1' && line[1] === '87') {
      const loop = parseLoop2010AB(lines, i)!;
      results.push(loop.loop);
      i = loop.index;
    }
  }

  return results;
}

function test2000B(lines: string[][]) {
  const results: Loop2000B[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const segment = line[0];
    if (segment === 'HL' && line[3] === '22') {
      const loop = parseLoop2000B(lines, i)!;
      results.push(loop.loop);
      i = loop.index;
    }
  }

  return results;
}

function test2010BA(lines: string[][]) {
  const results: Loop2010BA[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const segment = line[0];
    if (segment === 'NM1' && line[1] === 'IL') {
      const loop = parseLoop2010BA(lines, i)!;
      results.push(loop.loop);
      i = loop.index;
    }
  }

  return results;
}

function test2300(lines: string[][]) {
  const results: Loop2300[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const segment = line[0];
    if (segment === 'CLM') {
      const loop = parseLoop2300(lines, i)!;
      results.push(loop.loop);
      i = loop.index;
    }
  }

  return results;
}

function test2310B(lines: string[][]) {
  const results: Loop2310B[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const segment = line[0];
    if (segment === 'NM1' && line[1] === '82') {
      const loop = parseLoop2310B(lines, i)!;
      results.push(loop.loop);
      i = loop.index;
    }
  }

  return results;
}

function test2310C(lines: string[][]) {
  const results: Loop2310C[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const segment = line[0];
    if (segment === 'NM1' && line[1] === '77') {
      const loop = parseLoop2310C(lines, i)!;
      results.push(loop.loop);
      i = loop.index;
    }
  }

  return results;
}

test();
