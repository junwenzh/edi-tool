import toast from 'react-hot-toast';

interface ExportButtonProps {
  data: string;
  filename: string;
}

function ExportButton({ data, filename }: ExportButtonProps) {
  const createTextFile = () => {
    const blob = new Blob([data], { type: 'text/plain' });
    const fileUrl = URL.createObjectURL(blob);

    const linkElement = document.createElement('a');
    linkElement.href = fileUrl;
    linkElement.download = `${filename}.txt`;
    linkElement.click();

    URL.revokeObjectURL(fileUrl); // Cleanup

    toast('Downloading file...', { duration: 1500 });
  };

  return (
    <button
      onClick={createTextFile}
      className="border bg-blue-100 rounded-lg my-8 p-4 text-xl font-bold"
    >
      {`Export File ${filename}`}
    </button>
  );
}

export default ExportButton;
