import toast from 'react-hot-toast';
import { Loop2000A, Loop2000B } from '../utils/parseEDI';

type Data = Loop2000A & Loop2000B;

interface DownloadButtonProps {
  data: Record<string, Data>;
  filename: string;
  fileType: 'members' | 'providers';
}

function DownloadButton({ data, filename, fileType }: DownloadButtonProps) {
  const createTextFile = () => {
    let sqlQuery = '';

    if (fileType === 'members') {
      const dataString = Object.values(data)
        .map(member => `'${member.id}'`)
        .join(',');
      sqlQuery = `Select * From Genesis.dbo.luPersonXref Where SourcePersonKey in (${dataString})`;
    } else if (fileType === 'providers') {
      const dataString = Object.values(data)
        .map(provider => `'${provider.npi}'`)
        .join('');
      sqlQuery = `Select * From Genesis.dbo.factProviderNPI Where NPI in (${dataString})`;
    }

    const blob = new Blob([sqlQuery], { type: 'text/plain' });
    const fileUrl = URL.createObjectURL(blob);

    const linkElement = document.createElement('a');
    linkElement.href = fileUrl;
    linkElement.download = filename;
    linkElement.click();

    URL.revokeObjectURL(fileUrl); // Cleanup

    toast('Downloading file', { duration: 1500 });
  };

  return (
    <button
      onClick={createTextFile}
      className="whitespace-nowrap ml-4 text-xl text-red-400"
    >
      Download SQL Query
    </button>
  );
}

export default DownloadButton;
