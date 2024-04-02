// get contact information

class PER {
  telephone: string;
  fax: string;

  constructor(telephone: string = '', fax: string = '') {
    this.telephone = telephone;
    this.fax = fax;
  }
}

function parsePER(line: string[]): PER {
  const per = new PER();

  const qualifier1 = line[3];
  const qualifier2 = line[5];
  const qualifier3 = line[7];

  if (qualifier1 === 'FX') {
    per.fax = line[4];
  } else if (qualifier2 === 'FX') {
    per.fax = line[6];
  } else if (qualifier3 === 'FX') {
    per.fax = line[8];
  }

  if (qualifier1 === 'TE') {
    per.telephone = line[4];
  } else if (qualifier2 === 'TE') {
    per.telephone = line[6];
  } else if (qualifier3 === 'TE') {
    per.telephone = line[8];
  }

  return per;
}

export { PER, parsePER };
