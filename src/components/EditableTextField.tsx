import { ChangeEvent, KeyboardEvent, useState } from 'react';

interface EditableTextFieldProps {
  text: string;
  onUpdate: (newText: string) => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function EditableTextField({
  text,
  onUpdate,
  onChange,
}: EditableTextFieldProps) {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSave();
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    onUpdate(text);
  };

  return (
    <div className="inline-block">
      {isEditing ? (
        <input
          type="text"
          value={text}
          onChange={onChange}
          onBlur={handleSave}
          className="border border-gray-300 p-2"
          onKeyDown={handleEnter}
        />
      ) : (
        <span onClick={handleEditClick} className="cursor-pointer">
          {text || 'Click to edit'}
        </span>
      )}
    </div>
  );
}

export default EditableTextField;
