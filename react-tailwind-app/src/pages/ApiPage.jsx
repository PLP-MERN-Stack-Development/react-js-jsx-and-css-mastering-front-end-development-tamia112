import React, { useEffect, useState } from 'react';
import { fetchPosts } from '../api/fetchPosts';
import Card from '../components/Card';

export default function ApiPage() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetchPosts(page, 10).then(data => { if(mounted) setPosts(data); })
      .catch(e => setErr(e.message))
      .finally(() => setLoading(false));
    return () => mounted = false;
  }, [page]);

  const filtered = posts.filter(p => p.title.includes(q) || p.body.includes(q));

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search..." className="w-full p-2 mb-4 border rounded" />

      {loading && <div>Loading...</div>}
      {err && <div className="text-red-500">Error: {err}</div>}

      <div className="grid gap-4">
        {filtered.map(p => (
          <Card key={p.id}>
            <h3 className="font-bold">{p.title}</h3>
            <p>{p.body}</p>
          </Card>
        ))}
      </div>

      <div className="flex gap-2 justify-center mt-4">
        <button onClick={() => setPage(p => Math.max(1, p-1))} className="px-4 py-2 border rounded">Prev</button>
        <div className="px-4 py-2">Page {page}</div>
        <button onClick={() => setPage(p => p+1)} className="px-4 py-2 border rounded">Next</button>
      </div>
    </div>
  );
}
