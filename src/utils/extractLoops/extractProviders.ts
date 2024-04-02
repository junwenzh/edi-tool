// extract all providers from a transaction instance
// 2000A, 2010AB, 2310B, 2310C

import { Transaction } from '../parseTransaction';
import { Pairs, extractLoop2000A } from './extractLoop2000A';

class Provider {
  constructor(
    public recordType: string = '',
    public entityType: string = '',
    public firstName: string = '',
    public middleName: string = '',
    public lastName: string = '',
    public fullName: string = '',
    public specialty: string = '',
    public taxId: string = '',
    public npi: string = '',
    public address1: string = '',
    public address2: string = '',
    public city: string = '',
    public state: string = '',
    public zip: string = ''
  ) {
    this.recordType = recordType;
    this.entityType = entityType;
    this.firstName = firstName;
    this.middleName = middleName;
    this.lastName = lastName;
    this.fullName = fullName;
    this.specialty = specialty;
    this.taxId = taxId;
    this.npi = npi;
    this.address1 = address1;
    this.address2 = address2;
    this.city = city;
    this.state = state;
    this.zip = zip;
  }
}

function extractProviders(transaction: Transaction, lines: string[][]) {
  const results: Pairs[] = [];
  for (const loop of transaction.Loop2000A) {
    const pairs = extractLoop2000A(loop, lines);
    results.push(...pairs);
    // const key = `${provider.npi || ''}_${provider.taxId || ''}_${provider.firstName || ''}_${provider.middleName || ''}_${provider.lastName}`;
    // if (!(key in providers)) {
    //   providers[key] = provider;
    // }
  }

  // for (const loop of transaction.Loop2010AB) {
  //   const provider = extractLoop2010AB(loop, lines);
  //   const key = `${provider.npi || ''}_${provider.taxId || ''}_${provider.firstName || ''}_${provider.middleName || ''}_${provider.lastName}`;
  //   if (!(key in providers)) {
  //     providers[key] = provider;
  //   }
  // }

  // return providers;
  return results;
}

export { Provider, extractProviders };
