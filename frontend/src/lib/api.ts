const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';

export async function fetchForms() {
  const res = await fetch(`${API_URL}/forms/`);
  if (!res.ok) throw new Error('Failed to fetch forms');
  return res.json();
}

export async function fetchForm(id: number) {
  const res = await fetch(`${API_URL}/forms/${id}/`);
  if (!res.ok) throw new Error('Failed to fetch form');
  return res.json();
}

export async function submitForm(id: number, data: any) {
  const res = await fetch(`${API_URL}/submissions/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ form: id, data }),
  });
  if (!res.ok) throw new Error('Failed to submit form');
  return res.json();
}
