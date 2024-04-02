// takes in pairs[] and creates a csv

import { Pairs } from './extractLoops/extractLoop2000A';

function exportCsv(providers: Pairs[]): string {
  const lines: string[][] = [];

  lines.push([
    'recordType',
    'entityType',
    'firstName',
    'middleName',
    'specialty',
    'taxId',
    'npi',
    'address1',
    'address2',
    'city',
    'state',
    'zip',
    'recordType',
    'entityType',
    'firstName',
    'middleName',
    'specialty',
    'taxId',
    'npi',
    'address1',
    'address2',
    'city',
    'state',
    'zip',
    'recordType',
    'entityType',
    'firstName',
    'middleName',
    'specialty',
    'taxId',
    'npi',
    'address1',
    'address2',
    'city',
    'state',
    'zip',
  ]);

  providers.forEach(pair => {
    lines.push([
      pair.billing.recordType || '',
      pair.billing.entityType || '',
      pair.billing.firstName || '',
      pair.billing.middleName || '',
      pair.billing.lastName || '',
      pair.billing.specialty || '',
      pair.billing.taxId || '',
      pair.billing.npi || '',
      pair.billing.address1 || '',
      pair.billing.address2 || '',
      pair.billing.city || '',
      pair.billing.state || '',
      pair.billing.zip || '',
      pair.rendering?.recordType || '',
      pair.rendering?.entityType || '',
      pair.rendering?.firstName || '',
      pair.rendering?.middleName || '',
      pair.rendering?.lastName || '',
      pair.rendering?.specialty || '',
      pair.rendering?.taxId || '',
      pair.rendering?.npi || '',
      pair.rendering?.address1 || '',
      pair.rendering?.address2 || '',
      pair.rendering?.city || '',
      pair.rendering?.state || '',
      pair.rendering?.zip || '',
      pair.facility?.recordType || '',
      pair.facility?.entityType || '',
      pair.facility?.firstName || '',
      pair.facility?.middleName || '',
      pair.facility?.lastName || '',
      pair.facility?.specialty || '',
      pair.facility?.taxId || '',
      pair.facility?.npi || '',
      pair.facility?.address1 || '',
      pair.facility?.address2 || '',
      pair.facility?.city || '',
      pair.facility?.state || '',
      pair.facility?.zip || '',
    ]);
  });

  const set = new Set();

  lines.forEach(line => {
    const text = line.join('|');
    set.add(text);
  });

  return Array.from(set).join('\n');
}

export { exportCsv };
