// import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
// import { useState } from 'react';
// import { Transaction } from '../utils/parseEDI';

// type ClaimsDisplayProps = {
//   transaction: Transaction;
// };

// function ClaimsDisplay({ transaction }: ClaimsDisplayProps) {
//   const [showComponent, setShowComponent] = useState(false);

//   const rows: GridRowsProp = transaction.claims.map(claim => {
//     const provider = transaction.providers[claim.provider || 0];
//     const member = transaction.subscribers[claim.subscriber || 0];
//     return {
//       id: claim.claimId!,
//       claimId: claim.claimId!,
//       providerName: provider.name || '',
//       providerNPI: provider.npi || '',
//       providerTaxId: provider.taxId || '',
//       memberName: member.name || '',
//       memberId: member.id || '',
//       billed: `$ ${claim.billed || 0}`,
//     };
//   });

//   const columns: GridColDef[] = [
//     { field: 'claimId', headerName: 'Claim ID', width: 200 },
//     { field: 'providerName', headerName: 'Provider Name', width: 150 },
//     { field: 'providerNPI', headerName: 'Provider NPI', width: 150 },
//     { field: 'providerTaxId', headerName: 'Provider Tax ID', width: 150 },
//     { field: 'memberName', headerName: 'Member Name', width: 150 },
//     { field: 'memberId', headerName: 'Member ID', width: 150 },
//     { field: 'billed', headerName: 'Claim Billed', width: 150 },
//   ];

//   return (
//     <div>
//       <button
//         className="font-medium text-center text-xl w-full my-4"
//         onClick={() => setShowComponent(!showComponent)}
//       >
//         Claims
//       </button>
//       <div className={`${showComponent ? 'block' : 'hidden'}`}>
//         <DataGrid rows={rows} columns={columns} />
//       </div>
//     </div>
//   );
// }

// export default ClaimsDisplay;
