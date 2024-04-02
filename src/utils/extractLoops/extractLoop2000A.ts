import { Loop2000A } from '../parseLoops/parseLoop2000A';
import { parseN3 } from '../parseSegments/parseN3';
import { parseN4 } from '../parseSegments/parseN4';
import { parseNM1 } from '../parseSegments/parseNM1';
import { parsePRV } from '../parseSegments/parsePRV';
import { parseREF } from '../parseSegments/parseREF';
import { Provider } from './extractProviders';
import { extractRenderingProvider } from './extractRenderingProvider';
import { extractServiceFacility } from './extractServiceFacility';

type Pairs = { billing: Provider; rendering?: Provider; facility?: Provider };

function extractLoop2000A(loop: Loop2000A, lines: string[][]): Pairs[] {
  const results: Pairs[] = [];

  const provider = new Provider();

  provider.recordType = 'Billing';

  if (loop.NM1) {
    const line = lines[loop.NM1];
    const nm1 = parseNM1(line);
    provider.entityType = nm1.entityType;
    provider.firstName = nm1.firstName;
    provider.middleName = nm1.middleName;
    provider.lastName = nm1.lastName;
    provider.npi = nm1.id || '';

    if (provider.entityType === '2') {
      provider.fullName = provider.lastName;
    } else {
      provider.fullName =
        `${provider.lastName}, ${provider.firstName} ${provider.middleName || ''}`.trim();
    }
  }

  if (loop.PRV) {
    const line = lines[loop.PRV];
    const prv = parsePRV(line);
    provider.specialty = prv.specialty;
  }

  if (loop.TaxId) {
    const line = lines[loop.TaxId];
    const ref = parseREF(line);
    provider.taxId = ref.id;
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

  if (loop.providers) {
    for (const pair of loop.providers) {
      let rendering;
      let facility;
      if (pair.rendering) {
        rendering = extractRenderingProvider(pair.rendering, lines);
      }
      if (pair.serviceFacility) {
        facility = extractServiceFacility(pair.serviceFacility, lines);
      }
      results.push({ billing: provider, rendering, facility });
    }
  } else {
    results.push({ billing: provider });
  }

  return results;
}

export { extractLoop2000A };

export type { Pairs };