import toast from 'react-hot-toast';

interface ExportButtonProps {
  data: string[];
  filename: string;
}

function ExportButton({ data, filename }: ExportButtonProps) {
  const createTextFile = () => {
    const dataString = data.join('~');

    const blob = new Blob([dataString], { type: 'text/plain' });
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
      className="border bg-blue-100 rounded-lg my-8 p-4 text-xl font-bold"
    >
      Export File
    </button>
  );
}

export default ExportButton;
