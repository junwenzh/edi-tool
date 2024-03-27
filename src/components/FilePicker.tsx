import { ChangeEvent, useRef } from 'react';

interface FilePickerProps {
  onFileSelected: (file: File) => void;
  name: string;
}

function FilePicker({ onFileSelected, name }: FilePickerProps) {
  const inputFileRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputFileRef.current?.click();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      onFileSelected(file);
    }
  };

  return (
    <div className="border bg-blue-100 rounded-lg my-8 p-4 text-xl font-bold">
      <button onClick={handleClick}>{name}</button>
      <input
        type="file"
        ref={inputFileRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
    </div>
  );
}

export default FilePicker;
