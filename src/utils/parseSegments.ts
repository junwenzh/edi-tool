class HL {
  id: number;
  parentId: number;
  levelCode: string;

  constructor(id: string, parentId: string, levelCode: string) {
    this.id = Number(id);
    this.parentId = Number(parentId);
    this.levelCode = levelCode;
  }
}

class NM1 {
  entityCode: string;
  entityType: string;
  lastName: string;
  firstName: string;
  middleName: string;
  fullName: string;
  id?: string;

  constructor(
    entityCode: string,
    entityType: string,
    lastName: string,
    firstName: string,
    middleName: string,
    id?: string
  ) {
    this.entityCode = entityCode;
    this.entityType = entityType;
    this.lastName = lastName;
    this.firstName = firstName;
    this.middleName = middleName;
    this.fullName = `${lastName}, ${firstName}${middleName ? ' ' + middleName : ''}`;
    this.id = id || '';
  }
}

class CLM {
  claimId: string;
  billed: number;

  constructor(claimId: string, billed: string) {
    this.claimId = claimId;
    this.billed = Number(billed);
  }
}

class REF {
  qualifier: string;
  id: string;

  constructor(qualifier: string, id: string) {
    this.qualifier = qualifier;
    this.id = id;
  }
}

function parseBht(line: string[]): Date {
  const dateString = line[4];
  const date = new Date(
    Number(dateString.slice(0, 4)),
    Number(dateString.slice(4, 6)),
    Number(dateString.slice(6))
  );
  return date;
}

function parseHL(line: string[]): HL {
  const id = line[1];
  const parentId = line[2];
  const levelCode = line[3];
  return new HL(id, parentId, levelCode);
}

function parseNM1(line: string[]): NM1 {
  const entityCode = line[1];
  const entityType = line[2];
  const lastName = line[3];
  const firstName = line[4];
  const middleName = line[5];
  const id = line[9];
  return new NM1(entityCode, entityType, lastName, firstName, middleName, id);
}

function parseCLM(line: string[]): CLM {
  const claimId = line[1];
  const billed = line[2];
  return new CLM(claimId, billed);
}

function parseREF(line: string[]): REF {
  const qualifier = line[1];
  const id = line[2];
  return new REF(qualifier, id);
}

export { parseBht, parseCLM, parseHL, parseNM1, parseREF };
