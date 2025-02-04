import React, { useState } from "react";

interface CommandsFormProps {
  onSubmit: (title: string, description: string, file: File | null) => void;
}

const CommandsForm: React.FC<CommandsFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0] || null;
    setFile(uploadedFile);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(title, description, file);
    setTitle("");
    setDescription("");
    setFile(null);
  };

  const handleBack = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default behavior
    console.log("Back button clicked");
    window.history.back(); // Navigate back
  };

  return (
    <>
      <button
        type="button"
        onClick={handleBack}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Back
      </button>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="ชื่อ สกุล"
          className="border p-2 w-full"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="ตำแหน่ง"
          className="border p-2 w-full"
        />
        <input type="file" onChange={handleFileChange} className="block" />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default CommandsForm;
