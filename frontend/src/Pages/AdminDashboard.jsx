import { useEffect, useState } from "react";
import { getCandidates, addCandidate, updateCandidate, deleteCandidate } from "../API/api";

export default function AdminDashboard() {
  const [candidates, setCandidates] = useState([]);
  const [newCandidate, setNewCandidate] = useState("");

  useEffect(() => {
    refresh();
  }, []);

  const refresh = async () => {
    const data = await getCandidates();
    setCandidates(data);
  };

  const handleAdd = async () => {
    if (!newCandidate) return;
    await addCandidate({ name: newCandidate });
    setNewCandidate("");
    refresh();
  };

  const handleUpdate = async (id) => {
    const newName = prompt("Enter new name:");
    if (newName) {
      await updateCandidate(id, { name: newName });
      refresh();
    }
  };

  const handleDelete = async (id) => {
    await deleteCandidate(id);
    refresh();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      
      {/* Add candidate */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={newCandidate}
          onChange={(e) => setNewCandidate(e.target.value)}
          placeholder="Candidate Name"
          className="border p-2 rounded w-64"
        />
        <button onClick={handleAdd}>Add Candidate</button>
      </div>

      {/* Candidate list */}
      <div className="space-y-3">
        {candidates.map((c) => (
          <div key={c._id} className="card flex justify-between items-center px-4">
            <span>{c.name}</span>
            <div className="flex gap-2">
              <button onClick={() => handleUpdate(c._id)}>Edit</button>
              <button
                className="bg-red-500 hover:opacity-90"
                onClick={() => handleDelete(c._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
