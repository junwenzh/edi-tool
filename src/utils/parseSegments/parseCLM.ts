class CLM {
  claimId: string;
  billed: number;

  constructor(claimId: string, billed: string) {
    this.claimId = claimId;
    this.billed = Number(billed);
  }
}

function parseCLM(line: string[]): CLM {
  const claimId = line[1];
  const billed = line[2];
  return new CLM(claimId, billed);
}

export { CLM, parseCLM };
