import { Pairs } from './extractLoops/extractLoop2000A';

function exportTemplateCsv(providers: Pairs[]) {
  const lines: string[] = [];

  for (const provider of providers) {
    // extract billing, rendering, facility separately
    // billing
    const billing = provider.billing;
    const rendering = provider.rendering;
    const facility = provider.facility;

    const billingLine = Array(21).fill('');
    billingLine[0] = 'ProviderAdd';
    billingLine[1] = billing.npi;
    billingLine[2] = billing.taxId;
    billingLine[3] = billing.lastName;
    billingLine[4] = billing.firstName;
    billingLine[5] = billing.middleName;
    billingLine[12] = billing.address1;
    billingLine[13] = billing.address2;
    billingLine[14] = billing.city;
    billingLine[15] = billing.state;
    billingLine[16] = billing.zip;
    billingLine[17] = billing.telephone;
    billingLine[18] = billing.fax;
    billingLine[20] = 'Billing';

    lines.push(billingLine.join('|'));

    if (rendering) {
      const renderingLine = Array(21).fill('');
      renderingLine[0] = 'ProviderAdd';
      renderingLine[1] = rendering.npi;
      renderingLine[3] = rendering.lastName;
      renderingLine[4] = rendering.firstName;
      renderingLine[5] = rendering.middleName;
      renderingLine[20] = 'Rendering';
      if (facility) {
        // take the facility address
        renderingLine[12] = facility.address1;
        renderingLine[13] = facility.address2;
        renderingLine[14] = facility.city;
        renderingLine[15] = facility.state;
        renderingLine[16] = facility.zip;
        renderingLine[17] = facility.telephone;
        renderingLine[18] = facility.fax;
      } else {
        // take the pay to address
        renderingLine[12] = billing.address1;
        renderingLine[13] = billing.address2;
        renderingLine[14] = billing.city;
        renderingLine[15] = billing.state;
        renderingLine[16] = billing.zip;
        renderingLine[17] = billing.telephone;
        renderingLine[18] = billing.fax;
      }

      lines.push(renderingLine.join('|'));
    }

    if (facility) {
      const facilityLine = Array(21).fill('');
      facilityLine[0] = 'ProviderAdd';
      facilityLine[3] = facility.lastName;
      facilityLine[12] = facility.address1;
      facilityLine[13] = facility.address2;
      facilityLine[14] = facility.city;
      facilityLine[15] = facility.state;
      facilityLine[16] = facility.zip;
      facilityLine[17] = facility.telephone;
      facilityLine[18] = facility.fax;
      facilityLine[20] = 'Facility';

      lines.push(facilityLine.join('|'));
    }
  }

  const deduped = removeDuplicateLines(lines);

  return deduped.join('\n');
}

function removeDuplicateLines(lines: string[]) {
  const set = new Set();

  for (const line of lines) {
    set.add(line);
  }

  return Array.from(set);
}

export { exportTemplateCsv };
