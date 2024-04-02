// takes in pairs[] and creates a csv

import { Pairs } from './extractLoops/extractLoop2000A';

function exportCsv(providers: Pairs[]): string {
  const lines: string[][] = [];

  lines.push([
    'recordType',
    'entityType',
    'firstName',
    'middleName',
    'lastName',
    'specialty',
    'taxId',
    'npi',
    'address1',
    'address2',
    'city',
    'state',
    'zip',
    'telephone',
    'fax',
    'recordType',
    'entityType',
    'firstName',
    'middleName',
    'lastName',
    'specialty',
    'taxId',
    'npi',
    'recordType',
    'lastName',
    'address1',
    'address2',
    'city',
    'state',
    'zip',
    'telephone',
    'fax',
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
      pair.billing.telephone || '',
      pair.billing.fax || '',
      pair.rendering?.recordType || '',
      pair.rendering?.entityType || '',
      pair.rendering?.firstName || '',
      pair.rendering?.middleName || '',
      pair.rendering?.lastName || '',
      pair.rendering?.specialty || '',
      pair.rendering?.taxId || '',
      pair.rendering?.npi || '',
      pair.facility?.recordType || '',
      pair.facility?.lastName || '',
      pair.facility?.address1 || '',
      pair.facility?.address2 || '',
      pair.facility?.city || '',
      pair.facility?.state || '',
      pair.facility?.zip || '',
      pair.facility?.telephone || '',
      pair.facility?.fax || '',
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
