import { FormEvent, useState } from 'react';
import { api } from '../api/client';
import { SectionHeader } from '../components/SectionHeader';

export function DocumentsPage() {
  const [beneficiaryId, setBeneficiaryId] = useState('1');
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<any>(null);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (!file) return;
    const formData = new FormData();
    formData.append('beneficiary_id', beneficiaryId);
    formData.append('file', file);
    const { data } = await api.post('/documents/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
    setResult(data);
  };

  return (
    <div>
      <SectionHeader title="OCR Document Digitization" subtitle="Upload PDF, PNG, or JPG files and extract FRA land record fields." />
      <div className="glass-panel rounded-3xl p-6 max-w-2xl">
        <form onSubmit={submit} className="grid gap-4">
          <input value={beneficiaryId} onChange={(event) => setBeneficiaryId(event.target.value)} placeholder="Beneficiary ID" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3" />
          <input type="file" accept=".pdf,.png,.jpg,.jpeg" onChange={(event) => setFile(event.target.files?.[0] ?? null)} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3" />
          <button className="rounded-2xl bg-emerald-500 px-4 py-3 font-semibold text-slate-950">Upload and Extract</button>
        </form>
        {result ? <pre className="mt-6 overflow-auto rounded-2xl bg-black/30 p-4 text-xs text-emerald-100">{JSON.stringify(result, null, 2)}</pre> : null}
      </div>
    </div>
  );
}
