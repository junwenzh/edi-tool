import { Transaction, parseTransaction } from './parseTransaction';

function parseFile(file: string) {
  const lines = file.split('~').map(line => line.split('*'));

  const transactions: Transaction[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const segment = line[0];
    if (segment === 'ST') {
      // new transaction begins
      const transaction = parseTransaction(lines, i)!;
      transactions.push(transaction.transaction);
      i = transaction.index;
    }
  }

  return transactions;
}

export { parseFile };
