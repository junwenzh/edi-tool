// import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
// import { useState } from 'react';
// import { Loop2000B } from '../utils/parseEDI';
// import CodeBlock from './CodeBlock';

// type MembersDisplayProps = {
//   members: Record<string, Loop2000B>;
// };

// function MembersDisplay({ members }: MembersDisplayProps) {
//   const [showTable, setShowTable] = useState(false);
//   const [showCode, setShowCode] = useState(false);

//   const map = new Map<string, string>();

//   for (const member of Object.values(members)) {
//     if (member.id && member.name) {
//       map.set(member.id, member.name);
//     }
//   }

//   const rows: GridRowsProp = Array.from(map).map((member, idx) => ({
//     id: idx,
//     memberName: member[1],
//     memberId: member[0],
//   }));

//   const columns: GridColDef[] = [
//     { field: 'memberName', headerName: 'Member Name', width: 400 },
//     { field: 'memberId', headerName: 'Member ID', width: 400 },
//   ];

//   const dataString = Object.values(members)
//     .map(member => `'${member.id}'`)
//     .join(',\n');

//   const sqlQuery = `Select *
// From Genesis.dbo.luPersonXref
// Where SourcePersonKey in (
//   ${dataString}
// )`;

//   return (
//     <div className="flex-1 flex flex-col">
//       <div className="flex gap-8 justify-center items-center w-full my-4">
//         <button
//           className="font-medium text-xl"
//           onClick={() => setShowTable(!showTable)}
//         >
//           Members
//         </button>
//         <button
//           className="font-medium text-xl text-red-400"
//           onClick={() => setShowCode(!showCode)}
//         >
//           SQL Query
//         </button>
//         {/* <DownloadButton
//           data={members}
//           fileType="members"
//           filename="Query Members.sql"
//         /> */}
//       </div>
//       <div className={`mb-4 mx-auto ${showCode ? 'block' : 'hidden'}`}>
//         <CodeBlock code={sqlQuery} />
//       </div>
//       <div className={`${showTable ? 'block' : 'hidden'}`}>
//         <DataGrid rows={rows} columns={columns} />
//       </div>
//     </div>
//   );
// }

// export default MembersDisplay;
