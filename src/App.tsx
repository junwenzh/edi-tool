import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import ExportButton from './components/ExportButton';
import FilePicker from './components/FilePicker';
import { exportCsv } from './utils/exportCsv';
import { Pairs } from './utils/extractLoops/extractLoop2000A';
import { extractProviders } from './utils/extractLoops/extractProviders';
import { parseFile } from './utils/parseFile';

function App() {
  const [csv, setCsv] = useState<string>('');
  const handleFileSelected = async (file: File) => {
    console.log('start');
    const content = await readFileContent(file);
    const cleanedContent = content.replace(/\r\n/g, '');
    const transactions = parseFile(cleanedContent);
    const lines = cleanedContent.split('~').map(line => line.split('*'));

    const results: Pairs[] = [];

    for (const transaction of transactions) {
      const pairs = extractProviders(transaction, lines);
      results.push(...pairs);
    }

    const csv = exportCsv(results);

    setCsv(csv);
  };

  const readFileContent = (file: File): Promise<string> => {
    const reader = new FileReader();

    return new Promise((resolve, reject) => {
      reader.onload = event => resolve(event.target?.result as string);
      reader.onerror = error => reject(error);
      reader.readAsText(file);
    });
  };

  return (
    <main className="flex flex-col items-center justify-center py-10">
      <div className="flex gap-8">
        <FilePicker name="Import File" onFileSelected={handleFileSelected} />
      </div>
      <ExportButton data={csv} filename="Providers.txt" />
      <Toaster />
    </main>
  );
}

export default App;
