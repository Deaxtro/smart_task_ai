import React, { useState } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';
import Papa from 'papaparse';

export default function App() {
  const [tasks, setTasks] = useState('');
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/summarize', {
        tasks: tasks.split('\n').filter(line => line.trim() !== '')
      });
      setResult(response.data);
    } catch (err) {
      alert('Error: ' + err.message);
    }
    setLoading(false);
  };

  const exportCSV = () => {
    const csv = Papa.unparse(result.map(r => ({
      summary: r.summary,
      tags: r.tags.join(' '),
      priority: r.priority
    })));
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'task_summary.csv');
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Smart Task Summarizer + Tagger</h1>
      <textarea
        className="w-full border rounded p-2 mb-4"
        rows="8"
        placeholder="Paste raw tasks, one per line..."
        value={tasks}
        onChange={(e) => setTasks(e.target.value)}
      />
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? 'Processing...' : 'Summarize & Tag'}
      </button>
      {result.length > 0 && (
        <button
          className="bg-green-600 text-white px-4 py-2 rounded ml-2"
          onClick={exportCSV}
        >
          Export CSV
        </button>
      )}
      <div className="mt-6">
        {result.map((task, idx) => (
          <div key={idx} className="border p-4 mb-3 rounded shadow">
            <p><strong>Summary:</strong> {task.summary}</p>
            <p><strong>Tags:</strong> {task.tags.join(', ')}</p>
            <p><strong>Priority:</strong> {task.priority}</p>
          </div>
        ))}
      </div>
    </div>
  );
}