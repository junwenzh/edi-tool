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

function parseHL(line: string[]): HL {
  const id = line[1];
  const parentId = line[2];
  const levelCode = line[3];
  return new HL(id, parentId, levelCode);
}

export { HL, parseHL };
