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

function parseNM1(line: string[]): NM1 {
  const entityCode = line[1];
  const entityType = line[2];
  const lastName = line[3];
  const firstName = line[4];
  const middleName = line[5];
  const id = line[9];
  return new NM1(entityCode, entityType, lastName, firstName, middleName, id);
}

export { NM1, parseNM1 };
