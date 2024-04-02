class PRV {
  specialty: string;

  constructor(specialty: string) {
    this.specialty = specialty;
  }
}

function parsePRV(line: string[]): PRV {
  const specialty = line[3];
  return new PRV(specialty);
}

export { PRV, parsePRV };
