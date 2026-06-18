import { FormEvent, useEffect, useMemo, useState } from 'react';
import { api } from '../api/client';
import { SectionHeader } from '../components/SectionHeader';
import type { Beneficiary } from '../types';

const emptyForm = {
  name: '',
  village: '',
  district: '',
  state: '',
  land_area: 0,
  latitude: 0,
  longitude: 0,
  approval_status: 'Pending',
  scheme_eligibility: '',
};

export function BeneficiariesPage() {
  const [items, setItems] = useState<Beneficiary[]>([]);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);

  const loadBeneficiaries = async () => {
    const { data } = await api.get<{ items: Beneficiary[] }>('/beneficiaries', { params: { search, status } });
    setItems(data.items);
  };

  useEffect(() => {
    void loadBeneficiaries();
  }, [search, status]);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    const payload = {
      ...form,
      land_area: Number(form.land_area),
      latitude: Number(form.latitude),
      longitude: Number(form.longitude),
      scheme_eligibility: form.scheme_eligibility,
    };
    if (editingId) {
      await api.put(`/beneficiaries/${editingId}`, payload);
    } else {
      await api.post('/beneficiaries', payload);
    }
    setForm(emptyForm);
    setEditingId(null);
    await loadBeneficiaries();
  };

  const editItem = (item: Beneficiary) => {
    setEditingId(item.id);
    setForm({
      name: item.name,
      village: item.village,
      district: item.district,
      state: item.state,
      land_area: item.land_area,
      latitude: item.latitude ?? 0,
      longitude: item.longitude ?? 0,
      approval_status: item.approval_status,
      scheme_eligibility: item.scheme_eligibility,
    });
  };

  const removeItem = async (id: number) => {
    await api.delete(`/beneficiaries/${id}`);
    await loadBeneficiaries();
  };

  const total = useMemo(() => items.length, [items]);

  return (
    <div>
      <SectionHeader title="Beneficiary Management" subtitle={`Search, filter, and manage land records. Total loaded: ${total}.`} />

      <div className="grid gap-4 xl:grid-cols-[1fr_360px]">
        <div className="glass-panel rounded-3xl p-5">
          <div className="grid gap-3 md:grid-cols-3">
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search beneficiaries" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3" />
            <input value={status} onChange={(event) => setStatus(event.target.value)} placeholder="Filter by approval status" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3" />
            <button onClick={() => void loadBeneficiaries()} className="rounded-2xl bg-emerald-500 px-4 py-3 font-semibold text-slate-950">
              Refresh
            </button>
          </div>
          <div className="mt-5 overflow-x-auto rounded-2xl border border-white/10">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-white/5 text-white/70">
                <tr>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Village</th>
                  <th className="px-4 py-3">District</th>
                  <th className="px-4 py-3">Area</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} className="border-t border-white/10">
                    <td className="px-4 py-3">{item.name}</td>
                    <td className="px-4 py-3">{item.village}</td>
                    <td className="px-4 py-3">{item.district}</td>
                    <td className="px-4 py-3">{item.land_area}</td>
                    <td className="px-4 py-3">{item.approval_status}</td>
                    <td className="px-4 py-3 space-x-2">
                      <button onClick={() => editItem(item)} className="rounded-lg bg-white/10 px-3 py-1.5">Edit</button>
                      <button onClick={() => void removeItem(item.id)} className="rounded-lg bg-red-500/20 px-3 py-1.5 text-red-200">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <form onSubmit={submit} className="glass-panel rounded-3xl p-5">
          <p className="font-display text-xl font-bold text-emerald-200">{editingId ? 'Edit beneficiary' : 'Create beneficiary'}</p>
          <div className="mt-4 grid gap-3">
            {['name', 'village', 'district', 'state'].map((field) => (
              <input
                key={field}
                value={(form as any)[field]}
                onChange={(event) => setForm({ ...form, [field]: event.target.value })}
                placeholder={field.replace('_', ' ')}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
              />
            ))}
            <input type="number" step="0.01" value={form.land_area} onChange={(event) => setForm({ ...form, land_area: Number(event.target.value) })} placeholder="Land area" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3" />
            <div className="grid grid-cols-2 gap-3">
              <input type="number" step="0.0001" value={form.latitude} onChange={(event) => setForm({ ...form, latitude: Number(event.target.value) })} placeholder="Latitude" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3" />
              <input type="number" step="0.0001" value={form.longitude} onChange={(event) => setForm({ ...form, longitude: Number(event.target.value) })} placeholder="Longitude" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3" />
            </div>
            <input value={form.approval_status} onChange={(event) => setForm({ ...form, approval_status: event.target.value })} placeholder="Approval status" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3" />
            <input value={form.scheme_eligibility} onChange={(event) => setForm({ ...form, scheme_eligibility: event.target.value })} placeholder="Scheme eligibility" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3" />
            <button type="submit" className="rounded-2xl bg-emerald-500 px-4 py-3 font-semibold text-slate-950">
              {editingId ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
