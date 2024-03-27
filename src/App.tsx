import { ChangeEvent, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import EditableTextField from './components/EditableTextField';
import ExportButton from './components/ExportButton';
import FilePicker from './components/FilePicker';
import SummaryDisplay from './components/SummaryDisplay';
import TransactionDisplay from './components/TransactionDisplay';
import parseEDI, { Transaction } from './utils/parseEDI';

function App() {
  const [transaction, setTransction] = useState<Transaction>();
  const [transactionCount, setTransactionCount] = useState<number>(0);
  const [providerCount, setProviderCount] = useState<number>(0);
  const [memberCount, setMemberCount] = useState<number>(0);
  const [claimCount, setClaimCount] = useState<number>(0);
  const [lines, setLines] = useState<string[]>([]);
  const [transactionDate, setTransctionDate] = useState<string>('');
  const [fileName, setFileName] = useState<string>('');

  const handleFileSelected = async (file: File) => {
    setFileName(file.name);
    const content = await readFileContent(file);
    const { lines, transactions } = parseEDI(content);
    setLines(lines);

    const combinedTransaction = transactions.reduce((prev, curr) => {
      prev.providers = Object.assign({}, prev.providers, curr.providers);
      prev.subscribers = Object.assign({}, prev.subscribers, curr.subscribers);
      prev.claims.push(...prev.claims, ...curr.claims);
      return prev;
    });

    setTransction(combinedTransaction);

    setTransactionCount(transactions.length);

    const provCount = transactions.reduce(
      (prev, curr) => prev + Object.keys(curr.providers).length,
      0
    );
    setProviderCount(provCount);
    const mbrCount = transactions.reduce(
      (prev, curr) => prev + Object.keys(curr.subscribers).length,
      0
    );
    setMemberCount(mbrCount);
    const clmCount = transactions.reduce(
      (prev, curr) => prev + curr.claims.length,
      0
    );
    setClaimCount(clmCount);

    const dateString = transactions[0].bht04!.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });

    setTransctionDate(dateString);
  };

  const handleMemberFileSelected = async (file: File) => {
    const content = await readFileContent(file);
    const rows = content.replaceAll('\r\n', '\n').split('\n');
    const map = new Map<string, string>();

    for (const row of rows) {
      const elements = row.split('\t');
      map.set(elements[0], elements[1]);
    }

    const newLines: string[] = [];

    let count = 0;

    for (let i = 0; i < lines.length; i++) {
      const elements = lines[i].split('*');
      if (elements[0] === 'NM1') {
        const oldId = elements[9];
        const newId = map.get(oldId);
        if (newId) {
          elements[9] = newId;
          const newLine = elements.join('*');
          newLines.push(newLine);
          count++;
        } else {
          newLines.push(lines[i]);
        }
      } else {
        newLines.push(lines[i]);
      }
    }

    setLines(() => newLines);

    toast(`Updated ${count} segments`, { duration: 1500 });
  };

  const readFileContent = (file: File): Promise<string> => {
    const reader = new FileReader();

    return new Promise((resolve, reject) => {
      reader.onload = event => resolve(event.target?.result as string);
      reader.onerror = error => reject(error);
      reader.readAsText(file);
    });
  };

  const updateBhtDate = (date: string) => {
    const newLines: string[] = [];

    const dateParts = date.split('/');
    const month = dateParts[0].padStart(2, '0');
    const day = dateParts[1].padStart(2, '0');
    const year = dateParts[2];

    for (let i = 0; i < lines.length; i++) {
      const elements = lines[i].split('*');
      if (elements[0] === 'BHT') {
        elements[4] = `${year}${month}${day}`;
        const newLine = elements.join('*');
        newLines.push(newLine);
      } else {
        newLines.push(lines[i]);
      }
    }

    setLines(() => newLines);

    toast.success('Updated transaction date', { duration: 1500 });
  };

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTransctionDate(e.target.value);
  };

  return (
    <main className="flex flex-col items-center justify-center py-10">
      <div className="flex gap-8">
        <FilePicker name="Import File" onFileSelected={handleFileSelected} />
        <FilePicker
          name="Import Member IDs"
          onFileSelected={handleMemberFileSelected}
        />
        <ExportButton data={lines} filename={`837_${fileName}.txt`} />
      </div>
      <SummaryDisplay
        transactions={transactionCount}
        providers={providerCount}
        members={memberCount}
        claims={claimCount}
      />
      <div
        className={`font-medium my-4 ${transactionDate ? 'block' : 'hidden'}`}
      >
        Transaction Date:{' '}
        <EditableTextField
          text={transactionDate}
          onUpdate={updateBhtDate}
          onChange={handleDateChange}
        />
      </div>
      {transaction ? <TransactionDisplay transaction={transaction!} /> : ''}
      {/* <CodeBlock code="select * from claims" language="sql" /> */}
      <Toaster />
    </main>
  );
}

export default App;
