'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import axios from 'axios'

export default function FormDetailPage() {
  const { id } = useParams()
  const [form, setForm] = useState<any>(null)
  const [formData, setFormData] = useState<Record<string, any>>({})
  const [loading, setLoading] = useState(true)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (!id) return
    axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/forms/${id}/`)
      .then(res => {
        setForm(res.data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [id])

  const handleChange = (label: string, value: any) => {
    setFormData(prev => ({ ...prev, [label]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/submissions/`, {
      form: form.id,
      data: formData
    }).then(() => setSubmitted(true))
  }

  if (loading) return <p className="p-4">Loading form...</p>
  if (!form) return <p className="p-4">Form not found.</p>
  if (submitted) return <p className="p-4 text-green-600">Form submitted successfully!</p>

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">{form.title}</h1>
      <p className="text-gray-600 mb-6">{form.description}</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {form.fields.map((field: any) => (
          <div key={field.id}>
            <label className="block font-medium mb-1">{field.label}</label>
            {field.field_type === 'text' && (
              <input
                type="text"
                required={field.required}
                className="border p-2 w-full rounded"
                onChange={e => handleChange(field.label, e.target.value)}
              />
            )}
            {field.field_type === 'number' && (
              <input
                type="number"
                required={field.required}
                className="border p-2 w-full rounded"
                onChange={e => handleChange(field.label, e.target.value)}
              />
            )}
            {field.field_type === 'file' && (
              <input
                type="file"
                required={field.required}
                className="border p-2 w-full rounded"
                onChange={e => handleChange(field.label, e.target.files?.[0])}
              />
            )}
          </div>
        ))}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  )
}
