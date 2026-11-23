"use client"
import { useState } from "react";


export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const users = Array.from({ length: 42 }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    role: i % 2 === 0 ? "Admin" : "User",
  }));

  const usersPerPage = 10;

  const filteredUsers = users.filter((user) => {
    const matchesTab = activeTab === "all" || user.role.toLowerCase() === activeTab;
    const matchesSearch = user.name.toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const list = ["all", "admin", "user"]

  return (
    <div className="p-6 max-w-5xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-6">User Dashboard</h1>

      {/* Tabs */}
      <div className="flex gap-4 mb-4">
        {list.map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              setCurrentPage(1);
            }}
            className={`px-4 py-2 rounded-lg ${activeTab === tab ? "bg-blue-600" : "bg-gray-700"
              } hover:bg-blue-500 transition`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search users..."
        className="w-full px-4 py-2 rounded-lg mb-4 bg-gray-800 border border-gray-600 focus:outline-none focus:border-blue-400"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setCurrentPage(1);
        }}
      />

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-600">
        <table className="w-full text-left bg-gray-900">
          <thead className="bg-gray-800 text-gray-300">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-700">
                <td className="px-4 py-2">{user.id}</td>
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.role}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => setSelectedUser(user)}
                    className="text-blue-400 hover:underline"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4 gap-2">
        {Array.from({ length: totalPages }, (_, i) => i).map((i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded ${currentPage === i + 1 ? "bg-blue-600" : "bg-gray-700"
              } hover:bg-blue-500`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md relative">
            <h2 className="text-2xl font-bold mb-4">User Details</h2>
            <p><strong>ID:</strong> {selectedUser.id}</p>
            <p><strong>Name:</strong> {selectedUser.name}</p>
            <p><strong>Email:</strong> {selectedUser.email}</p>
            <p><strong>Role:</strong> {selectedUser.role}</p>
            <button
              onClick={() => setSelectedUser(null)}
              className="absolute top-2 right-2 text-gray-400 hover:text-white text-lg"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

