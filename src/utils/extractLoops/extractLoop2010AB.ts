import { Loop2010AB } from '../parseLoops/parseLoop2010AB';
import { parseN3 } from '../parseSegments/parseN3';
import { parseN4 } from '../parseSegments/parseN4';
import { parseNM1 } from '../parseSegments/parseNM1';
import { Provider } from './extractProviders';

function extractLoop2010AB(loop: Loop2010AB, lines: string[][]): Provider {
  const provider = new Provider();

  provider.recordType = 'Pay To';

  if (loop.NM1) {
    const line = lines[loop.NM1];
    const nm1 = parseNM1(line);
    provider.entityType = nm1.entityType;
  }

  if (loop.N3) {
    const line = lines[loop.N3];
    const n3 = parseN3(line);
    const address = `${n3.address1} ${n3.address2 || ''}`.trim();
    provider.address1 = address;
  }

  if (loop.N4) {
    const line = lines[loop.N4];
    const n4 = parseN4(line);
    const address = `${n4.city}, ${n4.state} ${n4.zip}`;
    provider.address2 = address;
  }

  return provider;
}

export { extractLoop2010AB };
