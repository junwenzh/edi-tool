import {
  parseBht,
  parseCLM,
  parseHL,
  parseNM1,
  parseREF,
} from './parseSegments';

type Loop2000A = {
  start?: number;
  end?: number;
  name?: string;
  address1?: string;
  address2?: string;
  npi?: string;
  taxId?: string;
};

type Loop2000B = {
  start?: number;
  end?: number;
  name?: string;
  id?: string;
};

type Claim = {
  start?: number;
  end?: number;
  claimId?: string;
  billed?: number;
  referralId?: string;
  authorizationId?: string;
  provider?: number;
  subscriber?: number;
};

class Transaction {
  start?: number;
  end?: number;
  bht04?: Date;
  providers: Record<string, Loop2000A>;
  subscribers: Record<string, Loop2000B>;
  claims: Claim[];

  constructor() {
    this.providers = {};
    this.subscribers = {};
    this.claims = [];
  }
}

function parseEDI(fileText: string) {
  const text = fileText
    .replaceAll('\r\n', '')
    .replaceAll('\r', '')
    .replaceAll('\n', '');
  const lines = text.split('~');

  const transactions: Transaction[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].split('*');
    const segment = line[0];
    if (segment === 'ST') {
      const transaction = parseTransaction(i, lines);
      transactions.push(transaction);
      i = transaction.end || i;
    }
  }

  return { lines, transactions };
}

function parseTransaction(index: number, lines: string[]): Transaction {
  const transaction = new Transaction();
  transaction.start = index;

  let currentProvider = 0;
  let currentSubscriber = 0;

  for (let i = index; i < lines.length; i++) {
    const line = lines[i].split('*');
    const segment = line[0];
    if (segment === 'BHT') {
      transaction.bht04 = parseBht(line);
    } else if (segment === 'HL') {
      const hl = parseHL(line);
      const hlNum = hl.id;
      if (hl.levelCode === '20') {
        currentProvider = hlNum;
        const provider: Loop2000A = parse2000A(i, lines);
        transaction.providers[hlNum] = provider;
        i = provider.end || i;
      } else if (hl.levelCode === '22' || hl.levelCode === '23') {
        currentSubscriber = hlNum;
        const subscriber: Loop2000B = parse2000B(i, lines);
        transaction.subscribers[hlNum] = subscriber;
        i = subscriber.end || i;
      }
    } else if (segment === 'CLM') {
      const claim: Claim = parse2300(i, lines);
      claim.provider = currentProvider;
      claim.subscriber = currentSubscriber;
      transaction.claims.push(claim);
      i = claim.end || i;
    } else if (segment === 'SE') {
      transaction.end = i;
      break;
    }
  }

  return transaction;
}

function parse2000A(index: number, lines: string[]): Loop2000A {
  const loop2000A: Loop2000A = {};
  loop2000A.start = index;

  for (let i = index; i < lines.length; i++) {
    const line = lines[i].split('*');
    const segment = line[0];
    if (segment === 'NM1' && !loop2000A.name) {
      const nm1 = parseNM1(line);
      loop2000A.name = nm1.fullName;
    } else if (segment === 'REF' && !loop2000A.taxId) {
      const ref = parseREF(line);
      if (ref.qualifier === 'EI' || ref.qualifier === 'SY') {
        loop2000A.taxId = ref.id;
      }
    } else if (segment === 'HL' && i > index) {
      loop2000A.end = i - 1;
      break;
    }
  }

  return loop2000A;
}

function parse2000B(index: number, lines: string[]): Loop2000B {
  const loop2000B: Loop2000B = {};
  loop2000B.start = index;

  for (let i = index; i < lines.length; i++) {
    const line = lines[i].split('*');
    const segment = line[0];
    if (segment === 'NM1' && !loop2000B.name) {
      const nm1 = parseNM1(line);
      loop2000B.name = nm1.fullName;
      loop2000B.id = nm1.id;
    } else if (segment === 'CLM') {
      loop2000B.end = i - 1;
      break;
    }
  }

  return loop2000B;
}

function parse2300(index: number, lines: string[]): Claim {
  const claim: Claim = {};
  claim.start = index;

  for (let i = index; i < lines.length; i++) {
    const line = lines[i].split('*');
    const segment = line[0];
    if (segment === 'CLM' && i > index) {
      claim.end = i - 1;
      break;
    } else if (segment === 'SE') {
      claim.end = i - 1;
      break;
    } else if (segment === 'CLM') {
      const clm = parseCLM(line);
      claim.claimId = clm.claimId;
      claim.billed = clm.billed;
    } else if (
      segment === 'REF' &&
      !claim.referralId &&
      !claim.authorizationId
    ) {
      const ref = parseREF(line);
      if (ref.qualifier === '9F') {
        claim.referralId = ref.id;
      } else if (ref.qualifier === 'G1') {
        claim.authorizationId = ref.id;
      }
    }
  }

  return claim;
}

export default parseEDI;
export { Transaction };
export type { Claim, Loop2000A, Loop2000B };
