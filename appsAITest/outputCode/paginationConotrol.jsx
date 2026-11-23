"use client";

import React, { useState } from 'react';

export default function AppComponent() {
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const users = Array.from({
  length: 42
}, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  role: i % 2 === 0 ? "Admin" : "User"
}));
  const usersPerPage = 10
  const filteredUsers = users.filter(user => {
  const matchesTab = activeTab === "all" || user.role.toLowerCase() === activeTab;
  const matchesSearch = user.name.toLowerCase().includes(search.toLowerCase());
  return matchesTab && matchesSearch;
});
  const paginatedUsers = filteredUsers.slice((currentPage - 1) * usersPerPage, currentPage * usersPerPage);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const list = ["all","admin","user"]


  return (    <div
      style={{"width":"100%","height":"100%"}}
      data-component-id="root">
      <div
        className="p-6 max-w-5xl mx-auto text-white"
        data-component-id="element-1">
        <h1
          className="text-3xl font-bold mb-6"
          data-component-id="element-2">
          User Dashboard
        </h1>
        <span
          data-component-id="element-1-expr-1">
          {/* Tabs */}
        </span>
        <div
          className="flex gap-4 mb-4"
          data-component-id="element-3">
          {list.map((tab, index) => (
            <button
              key={tab}
              onClick={() => {
  setActiveTab(tab);
  setCurrentPage(1);
}}
              className={`px-4 py-2 rounded-lg ${activeTab === tab ? "bg-blue-600" : "bg-gray-700"} hover:bg-blue-500 transition`}
              data-component-id="element-4">
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}        </div>
        <span
          data-component-id="element-1-expr-3">
          {/* Search */}
        </span>
        <input
          type="text"
          placeholder="Search users..."
          className="w-full px-4 py-2 rounded-lg mb-4 bg-gray-800 border border-gray-600 focus:outline-none focus:border-blue-400"
          value={search}
          onChange={e => {
  setSearch(e.target.value);
  setCurrentPage(1);
}}
          data-component-id="element-5" />
        <span
          data-component-id="element-1-expr-5">
          {/* Table */}
        </span>
        <div
          className="overflow-x-auto rounded-lg border border-gray-600"
          data-component-id="element-6">
          <table
            className="w-full text-left bg-gray-900"
            data-component-id="element-7">
            <thead
              className="bg-gray-800 text-gray-300"
              data-component-id="element-8" />
            <tbody
              data-component-id="element-15">
              {paginatedUsers.map((user, index) => (
                <tr
                  key={user.id}
                  className="hover:bg-gray-700"
                  data-component-id="element-16">
                  <td
                    className="px-4 py-2"
                    data-component-id="element-17">
                    {user.id}
                  </td>
                  <td
                    className="px-4 py-2"
                    data-component-id="element-18">
                    {user.name}
                  </td>
                  <td
                    className="px-4 py-2"
                    data-component-id="element-19">
                    {user.email}
                  </td>
                  <td
                    className="px-4 py-2"
                    data-component-id="element-20">
                    {user.role}
                  </td>
                  <td
                    className="px-4 py-2"
                    data-component-id="element-21">
                    <button
                      onClick={() => setSelectedUser(user)}
                      className="text-blue-400 hover:underline"
                      data-component-id="element-22">
                      View
                    </button>
                  </td>
                </tr>
              ))}            </tbody>
          </table>
        </div>
        <span
          data-component-id="element-1-expr-7">
          {/* Pagination */}
        </span>
        <div
          className="flex justify-center mt-4 gap-2"
          data-component-id="element-23">
          {Array.from({
  length: totalPages
}, (_, i) => i).map((i, index) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded ${currentPage === i + 1 ? "bg-blue-600" : "bg-gray-700"} hover:bg-blue-500`}
              data-component-id="element-24">
              {i + 1}
            </button>
          ))}        </div>
        <span
          data-component-id="element-1-expr-9">
          {/* Modal */}
        </span>
        {selectedUser && (
          <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            data-component-id="element-25">
            <div
              className="bg-gray-800 p-6 rounded-lg w-full max-w-md relative"
              data-component-id="element-26">
              <h2
                className="text-2xl font-bold mb-4"
                data-component-id="element-27">
                User Details
              </h2>
              <p
                data-component-id="element-28">
                <strong
                  data-component-id="element-29">
                  ID:
                </strong>
                <span
                  data-component-id="element-28-expr-1">
                  {selectedUser.id}
                </span>
              </p>
              <p
                data-component-id="element-30">
                <strong
                  data-component-id="element-31">
                  Name:
                </strong>
                <span
                  data-component-id="element-30-expr-1">
                  {selectedUser.name}
                </span>
              </p>
              <p
                data-component-id="element-32">
                <strong
                  data-component-id="element-33">
                  Email:
                </strong>
                <span
                  data-component-id="element-32-expr-1">
                  {selectedUser.email}
                </span>
              </p>
              <p
                data-component-id="element-34">
                <strong
                  data-component-id="element-35">
                  Role:
                </strong>
                <span
                  data-component-id="element-34-expr-1">
                  {selectedUser.role}
                </span>
              </p>
              <button
                onClick={() => setSelectedUser(null)}
                className="absolute top-2 right-2 text-gray-400 hover:text-white text-lg"
                data-component-id="element-36">
                ×
              </button>
            </div>
          </div>
        )}      </div>
    </div>
  );
}