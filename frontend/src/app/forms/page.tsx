'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchForm, submitForm } from '@/lib/api';

export default function FormDetailPage() {
  const { id } = useParams();
  const [form, setForm] = useState<any>(null);
  const [data, setData] = useState<Record<string, any>>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetchForm(Number(id))
      .then(setForm)
      .catch(console.error);
  }, [id]);

  const handleChange = (label: string, value: any) => {
    setData((prev) => ({ ...prev, [label]: value }));
  };

  const handleSubmit = async () => {
    await submitForm(Number(id), data);
    setSubmitted(true);
  };

  if (!form) return <p className="p-4">Loading form...</p>;
  if (submitted) return <p className="p-4 text-green-600">Form submitted successfully!</p>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{form.title}</h1>
      <p className="text-gray-600 mb-4">{form.description}</p>
      <div className="space-y-3">
        {form.fields.map((field: any) => (
          <div key={field.id}>
            <label className="block text-gray-700 mb-1">{field.label}</label>
            {field.field_type === 'text' && (
              <input
                type="text"
                className="border rounded w-full p-2"
                onChange={(e) => handleChange(field.label, e.target.value)}
              />
            )}
            {field.field_type === 'number' && (
              <input
                type="number"
                className="border rounded w-full p-2"
                onChange={(e) => handleChange(field.label, e.target.value)}
              />
            )}
            {field.field_type === 'file' && (
              <input
                type="file"
                className="border rounded w-full p-2"
                onChange={(e) => handleChange(field.label, e.target.files?.[0]?.name || '')}
              />
            )}
          </div>
        ))}
      </div>
      <button
        onClick={handleSubmit}
        className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        Submit
      </button>
    </div>
  );
}
