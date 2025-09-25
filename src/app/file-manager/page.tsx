"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Folder,
  FileDown,
  ArrowLeft,
  Search,
  RefreshCcw,
  ChevronRight,
} from "lucide-react";

interface FolderType {
  Prefix: string;
}

interface FileType {
  Key: string;
  Size: number;
  LastModified: string;
}

export default function FileManager() {
  const [folders, setFolders] = useState<FolderType[]>([]);
  const [files, setFiles] = useState<FileType[]>([]);
  const [loading, setLoading] = useState(true);
  const [prefix, setPrefix] = useState("");

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // search
  const [search, setSearch] = useState("");

  // sorting
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // multi-select
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/objects?prefix=${encodeURIComponent(prefix)}`);
      const data = await res.json();
      setFolders(data.folders || []);
      setFiles(data.files || []);
      setCurrentPage(1);
      setSearch("");
      setSelectedFiles([]);
    } catch (err) {
      console.error("Error fetching objects:", err);
    } finally {
      setLoading(false);
    }
  }, [prefix]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div
          className="h-10 w-10 rounded-full border-4 border-t-transparent animate-spin"
          style={{ borderColor: "#2B7FFF", borderTopColor: "transparent" }}
        />
      </div>
    );
  }

  const goBack = () => {
    if (!prefix) return;
    const parts = prefix.split("/").filter(Boolean);
    parts.pop();
    setPrefix(parts.length ? parts.join("/") + "/" : "");
  };

  const parts = prefix.split("/").filter(Boolean);
  const breadcrumbs = [{ name: "Home", path: "" }];
  parts.forEach((part, i) => {
    const path = parts.slice(0, i + 1).join("/") + "/";
    breadcrumbs.push({ name: part, path });
  });

  const combinedItems = [
    ...folders.map((f) => ({ type: "folder", data: f })),
    ...files.map((f) => ({ type: "file", data: f })),
  ];

  const filteredItems = combinedItems.filter((item) => {
    if (item.type === "folder") {
      return (item.data as FolderType).Prefix.toLowerCase().includes(search.toLowerCase());
    }
    return (item.data as FileType).Key.toLowerCase().includes(search.toLowerCase());
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    let valA: string | number | Date;
    let valB: string | number | Date;

    if (a.type === "folder" && b.type !== "folder") return -1;
    if (b.type === "folder" && a.type !== "folder") return 1;

    if (sortBy === "name") {
      valA = a.type === "folder" ? (a.data as FolderType).Prefix : (a.data as FileType).Key;
      valB = b.type === "folder" ? (b.data as FolderType).Prefix : (b.data as FileType).Key;
    } else if (sortBy === "size") {
      valA = a.type === "file" ? (a.data as FileType).Size : 0;
      valB = b.type === "file" ? (b.data as FileType).Size : 0;
    } else {
      valA = a.type === "file" ? new Date((a.data as FileType).LastModified) : new Date(0);
      valB = b.type === "file" ? new Date((b.data as FileType).LastModified) : new Date(0);
    }

    if (valA < valB) return sortOrder === "asc" ? -1 : 1;
    if (valA > valB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const totalPages = Math.ceil(sortedItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const pageItems = sortedItems.slice(startIndex, startIndex + itemsPerPage);

  const toggleFileSelection = (key: string) => {
    setSelectedFiles((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const handleDownload = async (key: string) => {
    const res = await fetch(`/api/download?key=${encodeURIComponent(key)}`);
    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    }
  };

  const downloadSelected = () => {
    if (selectedFiles.length === 0) return;
    selectedFiles.forEach((key) => handleDownload(key));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">📂 File Manager</h1>
        <div className="flex gap-2">
          {prefix && (
            <button
              onClick={goBack}
              className="flex items-center gap-1 px-3 py-1.5 text-sm rounded-lg bg-gray-100 hover:bg-gray-200 transition"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
          )}
          <button
            onClick={fetchData}
            className="flex items-center gap-1 px-3 py-1.5 text-sm rounded-lg bg-gray-100 hover:bg-gray-200 transition"
          >
            <RefreshCcw className="h-4 w-4" /> Reload
          </button>

          {selectedFiles.length > 0 && (
            <button
              onClick={downloadSelected}
              className="flex items-center gap-1 px-3 py-1.5 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              <FileDown className="h-4 w-4" /> Download Selected ({selectedFiles.length})
            </button>
          )}
        </div>
      </div>

      {/* Breadcrumbs */}
      <div className="flex items-center gap-1 text-sm text-gray-600 mb-4 flex-wrap">
        {breadcrumbs.map((crumb, i) => (
          <div key={i} className="flex items-center gap-1">
            <button onClick={() => setPrefix(crumb.path)} className="hover:underline">
              {crumb.name}
            </button>
            {i < breadcrumbs.length - 1 && <ChevronRight className="h-4 w-4" />}
          </div>
        ))}
      </div>

      {/* Search + Sort */}
      <div className="flex items-center justify-between mb-6 gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search files and folders..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-9 pr-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600">Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border rounded-lg px-2 py-1 text-sm"
          >
            <option value="name">Name</option>
            <option value="size">Size</option>
            <option value="date">Date</option>
          </select>
          <button
            onClick={() => setSortOrder((o) => (o === "asc" ? "desc" : "asc"))}
            className="px-2 py-1 text-sm border rounded-lg"
          >
            {sortOrder === "asc" ? "↑" : "↓"}
          </button>
        </div>
      </div>

      {/* Items */}
      <div className="space-y-3">
        {pageItems.map((item, i) =>
          item.type === "folder" ? (
            <div
              key={i}
              onClick={() => setPrefix((item.data as FolderType).Prefix)}
              className="flex items-center gap-2 p-3 border rounded-lg shadow-sm hover:shadow-md cursor-pointer bg-white transition"
            >
              <Folder className="h-5 w-5 text-blue-500" />
              <span className="font-medium">
                {(item.data as FolderType).Prefix.replace(prefix, "").replace(/\/$/, "")}
              </span>
            </div>
          ) : (
            <div
              key={i}
              className="flex items-center justify-between p-3 border rounded-lg shadow-sm hover:shadow-md bg-white transition"
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={selectedFiles.includes((item.data as FileType).Key)}
                  onChange={() => toggleFileSelection((item.data as FileType).Key)}
                  className="h-4 w-4"
                />
                <FileDown className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium">
                    {(item.data as FileType).Key.replace(prefix, "")}
                  </p>
                  <p className="text-xs text-gray-500">
                    {((item.data as FileType).Size / 1024).toFixed(1)} KB •{" "}
                    {new Date((item.data as FileType).LastModified).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleDownload((item.data as FileType).Key)}
                className="text-sm text-blue-600 hover:underline z-10 pointer-events-auto"
              >
                Download
              </button>
            </div>
          )
        )}
      </div>

      {/* Empty State */}
      {sortedItems.length === 0 && (
        <p className="text-gray-500 text-center mt-6">No matching results.</p>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Items per page:</span>
            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="border rounded-lg px-2 py-1 text-sm"
            >
              {[5, 10, 20, 50].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className={`px-3 py-1 rounded-lg text-sm ${
                currentPage === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              Prev
            </button>
            <span className="text-sm">
              Page {currentPage} of {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className={`px-3 py-1 rounded-lg text-sm ${
                currentPage === totalPages
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
