import { LoopServiceFacility } from '../parseLoops/parseLoopServiceFacility';
import { parseN3 } from '../parseSegments/parseN3';
import { parseN4 } from '../parseSegments/parseN4';
import { parseNM1 } from '../parseSegments/parseNM1';
import { Provider } from './extractProviders';

function extractServiceFacility(idx: LoopServiceFacility, lines: string[][]) {
  const provider = new Provider();

  provider.recordType = 'Service Facility';

  if (idx.NM1) {
    const line = lines[idx.NM1];
    const nm1 = parseNM1(line);
    provider.lastName = nm1.lastName;
  }

  if (idx.N3) {
    const line = lines[idx.N3];
    const n3 = parseN3(line);
    provider.address1 = n3.address1;
    provider.address2 = n3.address2;
  }

  if (idx.N4) {
    const line = lines[idx.N4];
    const n4 = parseN4(line);
    provider.city = n4.city;
    provider.state = n4.state;
    provider.zip = n4.zip;
  }

  return provider;
}

export { extractServiceFacility };
