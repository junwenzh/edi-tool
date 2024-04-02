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
    public zip: string = '',
    public telephone: string = '',
    public fax: string = ''
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
    this.telephone = telephone;
    this.fax = fax;
  }
}

function extractProviders(transaction: Transaction, lines: string[][]) {
  const results: Pairs[] = [];

  for (const loop of transaction.Loop2000A) {
    const pairs = extractLoop2000A(loop, lines);
    results.push(...pairs);
  }

  return results;
}

export { Provider, extractProviders };
