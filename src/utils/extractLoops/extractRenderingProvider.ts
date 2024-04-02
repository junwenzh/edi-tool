import { LoopRenderingProvider } from '../parseLoops/parseLoopRenderingProvider';
import { parseNM1 } from '../parseSegments/parseNM1';
import { parsePRV } from '../parseSegments/parsePRV';
import { Provider } from './extractProviders';

function extractRenderingProvider(
  idx: LoopRenderingProvider,
  lines: string[][]
) {
  const provider = new Provider();

  provider.recordType = 'Rendering';

  if (idx.NM1) {
    const line = lines[idx.NM1];
    const nm1 = parseNM1(line);
    provider.firstName = nm1.firstName;
    provider.middleName = nm1.middleName;
    provider.lastName = nm1.lastName;
    provider.npi = nm1.id || '';
  }

  if (idx.PRV) {
    const line = lines[idx.PRV];
    const prv = parsePRV(line);
    provider.specialty = prv.specialty;
  }

  return provider;
}

export { extractRenderingProvider };
