import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import { useState } from 'react';
import { Loop2000A } from '../utils/parseEDI';
import CodeBlock from './CodeBlock';

type ProvidersDisplayProps = {
  providers: Record<string, Loop2000A>;
};

function ProvidersDisplay({ providers }: ProvidersDisplayProps) {
  const [showTable, setShowTable] = useState(false);
  const [showCode, setShowCode] = useState(false);

  const map = new Map<string, string>();

  for (const provider of Object.values(providers)) {
    if (provider.name) {
      map.set(provider.name, provider.npi || '');
    }
  }

  const rows: GridRowsProp = Array.from(map).map((provider, idx) => ({
    id: idx,
    providerName: provider[0],
    providerNpi: provider[1],
  }));

  const columns: GridColDef[] = [
    { field: 'providerName', headerName: 'Provider Name', width: 400 },
    { field: 'providerNpi', headerName: 'Provider NPI', width: 400 },
  ];

  const dataString = Object.values(providers)
    .filter(provider => provider.npi)
    .map(provider => `'${provider.npi}'`)
    .join(',\n');

  const sqlQuery = `Select *
From Genesis.dbo.factProviderNPI
Where NPI in (
${dataString}
)`;

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex gap-8 justify-center items-center w-full my-4">
        <button
          className="font-medium text-xl"
          onClick={() => setShowTable(!showTable)}
        >
          Providers
        </button>
        <button
          className="font-medium text-xl text-red-400"
          onClick={() => setShowCode(!showCode)}
        >
          SQL Query
        </button>
        {/* <DownloadButton
          data={providers}
          fileType="providers"
          filename="Query Providers.sql"
        /> */}
      </div>
      <div className={`mb-4 mx-auto ${showCode ? 'block' : 'hidden'}`}>
        <CodeBlock code={sqlQuery} />
      </div>
      <div className={`${showTable ? 'block' : 'hidden'}`}>
        <DataGrid rows={rows} columns={columns} />
      </div>
    </div>
  );
}

export default ProvidersDisplay;
