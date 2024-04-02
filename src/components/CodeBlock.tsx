// import ContentPasteIcon from '@mui/icons-material/ContentPaste';
// import Prism from 'prismjs';
// import 'prismjs/components/prism-sql'; // Example highlighting language
// import React, { useEffect } from 'react';
// import toast from 'react-hot-toast';

// interface CodeBlockProps {
//   code: string;
//   language?: string; // Optional for syntax highlighting
// }

// const CodeBlock: React.FC<CodeBlockProps> = ({ code, language }) => {
//   useEffect(() => {
//     Prism.highlightAll();
//   }, [code]); // Rerun highlighting when code changes

//   const handleCopy = async () => {
//     try {
//       await navigator.clipboard.writeText(code);
//       toast.success('Copied!', { duration: 1500 });
//     } catch (err) {
//       toast.error('Failed to copy', { duration: 1500 });
//     }
//   };

//   return (
//     <div className="relative">
//       <pre className="code-block">
//         <code className={`language-${language}`}>{code}</code>
//         <button onClick={handleCopy} className="copy-button">
//           <ContentPasteIcon />
//         </button>
//       </pre>
//     </div>
//   );
// };

// export default CodeBlock;
