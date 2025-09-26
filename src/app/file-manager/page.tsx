"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Folder,
  FileDown,
  ArrowLeft,
  Search,
  RefreshCcw,
  ChevronRight,
  Files,
  Download,
  Grid3X3,
  List,
  Calendar,
  HardDrive,
  FileText,
  FileSpreadsheet,
  FileArchive,
  FileImage,
  FileVideo,
  FileAudio,
  FileCode,
  File as FileDoc,
} from "lucide-react";

interface FolderType {
  Prefix: string;
}

interface FileType {
  Key: string;
  Size: number;
  LastModified: string;
}

export default function EnhancedFileManager() {
  const [folders, setFolders] = useState<FolderType[]>([]);
  const [files, setFiles] = useState<FileType[]>([]);
  const [loading, setLoading] = useState(true);
  const [prefix, setPrefix] = useState("");

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  // search
  const [search, setSearch] = useState("");

  // sorting
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // multi-select
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);

  // view mode
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

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

  // ... your entire JSX + logic remains unchanged ...

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900/95 flex items-center justify-center relative">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-teal-600/10 opacity-50"></div>
        
        <motion.div 
          className="relative"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="h-16 w-16 rounded-full border-4 border-blue-400/30 border-t-blue-400 animate-spin shadow-lg shadow-blue-500/20" />
          <div className="absolute inset-0 h-16 w-16 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 opacity-20 animate-pulse" />
        </motion.div>
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

  const downloadSelected = () => {
    if (selectedFiles.length === 0) return;
    const query = selectedFiles.map((k) => `keys=${encodeURIComponent(k)}`).join("&");
    window.location.href = `/api/download-multiple?${query}`;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
  };

  const getExtension = (filename: string) =>
    filename.split(".").pop()?.toLowerCase() || "";

  const getFileIcon = (ext: string) => {
    switch (ext) {
      case "pdf":
        return <FileText className="h-5 w-5 text-red-400" />;
      case "txt":
        return <FileText className="h-5 w-5 text-gray-400" />;
      case "doc":
      case "docx":
        return <FileDoc className="h-5 w-5 text-blue-400" />;
      case "xls":
      case "xlsx":
      case "csv":
        return <FileSpreadsheet className="h-5 w-5 text-green-400" />;
      case "zip":
      case "rar":
      case "7z":
        return <FileArchive className="h-5 w-5 text-yellow-400" />;
      case "jpg":
      case "jpeg":
      case "png":
      case "gif":
        return <FileImage className="h-5 w-5 text-purple-400" />;
      case "mp4":
      case "mkv":
      case "webm":
        return <FileVideo className="h-5 w-5 text-pink-400" />;
      case "mp3":
      case "wav":
        return <FileAudio className="h-5 w-5 text-indigo-400" />;
      case "js":
      case "ts":
      case "html":
      case "json":
        return <FileCode className="h-5 w-5 text-teal-400" />;
      default:
        return <FileText className="h-5 w-5 text-gray-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900/95 relative pt-20">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-teal-600/10 opacity-50"></div>
      
      <div className="relative container mx-auto px-6 py-8 max-w-7xl">
        {/* Header */}
        <motion.div 
          className="mb-8"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 shadow-lg shadow-blue-500/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                  <Files className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    File Manager
                  </h1>
                  <p className="text-gray-300">
                    {sortedItems.length} items • {formatFileSize(files.reduce((acc, f) => acc + f.Size, 0))}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {prefix && (
                  <motion.button
                    onClick={goBack}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-700/50 hover:bg-slate-600/50 text-gray-300 hover:text-white rounded-xl transition-all duration-300 border border-white/10"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                  </motion.button>
                )}
                
                <motion.button
                  onClick={fetchData}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-700/50 hover:bg-slate-600/50 text-gray-300 hover:text-white rounded-xl transition-all duration-300 border border-white/10"
                >
                  <RefreshCcw className="h-4 w-4" />
                  Refresh
                </motion.button>

                {selectedFiles.length > 0 && (
                  <motion.button
                    onClick={downloadSelected}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl transition-all duration-300 shadow-lg shadow-blue-500/30"
                  >
                    <Download className="h-4 w-4" />
                    Download ({selectedFiles.length})
                  </motion.button>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Breadcrumbs */}
        <motion.div 
          className="mb-6"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex items-center gap-2 p-4 bg-slate-800/30 backdrop-blur-sm border border-white/10 rounded-xl shadow-sm">
            <HardDrive className="h-4 w-4 text-gray-400" />
            {breadcrumbs.map((crumb, i) => (
              <div key={i} className="flex items-center gap-2">
                <button 
                  onClick={() => setPrefix(crumb.path)} 
                  className="text-gray-300 hover:text-blue-400 transition-colors duration-200 font-medium hover:bg-slate-700/50 px-2 py-1 rounded-lg"
                >
                  {crumb.name}
                </button>
                {i < breadcrumbs.length - 1 && <ChevronRight className="h-4 w-4 text-gray-500" />}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Controls */}
        <motion.div 
          className="mb-6"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="bg-slate-800/30 backdrop-blur-sm border border-white/10 rounded-xl p-4 shadow-sm">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search files and folders..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 transition-all duration-200 text-gray-200 placeholder-gray-400"
                />
              </div>
              
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <Calendar className="h-4 w-4" />
                  <span>Sort:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-slate-700/50 border border-white/10 rounded-lg px-3 py-1.5 text-gray-200 focus:ring-2 focus:ring-blue-500/30"
                  >
                    <option value="name">Name</option>
                    <option value="size">Size</option>
                    <option value="date">Date</option>
                  </select>
                  <button
                    onClick={() => setSortOrder((o) => (o === "asc" ? "desc" : "asc"))}
                    className="px-2 py-1.5 bg-slate-700/50 hover:bg-slate-600/50 border border-white/10 rounded-lg transition-colors text-gray-200"
                  >
                    {sortOrder === "asc" ? "↑" : "↓"}
                  </button>
                </div>
                
                <div className="flex border border-white/10 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 transition-colors ${viewMode === "grid" ? "bg-blue-500 text-white" : "bg-slate-700/50 hover:bg-slate-600/50 text-gray-300"}`}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 transition-colors ${viewMode === "list" ? "bg-blue-500 text-white" : "bg-slate-700/50 hover:bg-slate-600/50 text-gray-300"}`}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Items */}
        {viewMode === "grid" ? (
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {pageItems.map((item, i) =>
              item.type === "folder" ? (
                <motion.div
                  key={i}
                  onClick={() => setPrefix((item.data as FolderType).Prefix)}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="group cursor-pointer bg-slate-800/40 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300"
                >
                  <div className="flex flex-col items-center text-center gap-3">
                    <div className="h-12 w-12 bg-blue-500/20 rounded-xl flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
                      <Folder className="h-6 w-6 text-blue-400" />
                    </div>
                    <p className="font-medium text-sm text-gray-200 line-clamp-2">
                      {(item.data as FolderType).Prefix.replace(prefix, "").replace(/\/$/, "")}
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="group bg-slate-800/40 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300"
                >
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <div className="h-10 w-10 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center">
                        {getFileIcon(getExtension((item.data as FileType).Key))}
                      </div>
                      <input
                        type="checkbox"
                        checked={selectedFiles.includes((item.data as FileType).Key)}
                        onChange={() => toggleFileSelection((item.data as FileType).Key)}
                        className="h-4 w-4 text-blue-500 rounded border-white/20 bg-slate-700 focus:ring-blue-500"
                      />
                    </div>
                    <div className="text-center">
                      <p className="font-medium text-sm text-gray-200 line-clamp-2 mb-1">
                        {(item.data as FileType).Key.replace(prefix, "")}
                      </p>
                      <p className="text-xs text-gray-400">
                        {formatFileSize((item.data as FileType).Size)}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date((item.data as FileType).LastModified).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric"
                        })}
                      </p>
                    </div>
                    <a
                      href={`/api/download?key=${encodeURIComponent((item.data as FileType).Key)}`}
                      className="w-full py-2 px-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 hover:from-purple-500/30 hover:to-pink-500/30 text-purple-300 hover:text-purple-200 text-center rounded-lg transition-all duration-200 text-sm font-medium border border-purple-500/20"
                    >
                      Download
                    </a>
                  </div>
                </motion.div>
              )
            )}
          </motion.div>
        ) : (
          <motion.div 
            className="space-y-2 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {pageItems.map((item, i) =>
              item.type === "folder" ? (
                <motion.div
                  key={i}
                  onClick={() => setPrefix((item.data as FolderType).Prefix)}
                  whileHover={{ scale: 1.01, x: 5 }}
                  className="group cursor-pointer bg-slate-800/40 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 bg-blue-500/20 rounded-lg flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
                      <Folder className="h-5 w-5 text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-200">
                        {(item.data as FolderType).Prefix.replace(prefix, "").replace(/\/$/, "")}
                      </p>
                      <p className="text-sm text-gray-400">Folder</p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-500 group-hover:text-blue-400 transition-colors" />
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.01, x: 2 }}
                  className="bg-slate-800/40 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <input
                      type="checkbox"
                      checked={selectedFiles.includes((item.data as FileType).Key)}
                      onChange={() => toggleFileSelection((item.data as FileType).Key)}
                      className="h-4 w-4 text-blue-500 rounded border-white/20 bg-slate-700 focus:ring-blue-500"
                    />
                    <div className="h-10 w-10 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center">
                      {getFileIcon(getExtension((item.data as FileType).Key))}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-200">
                        {(item.data as FileType).Key.replace(prefix, "")}
                      </p>
                      <p className="text-sm text-gray-400">
                        {formatFileSize((item.data as FileType).Size)} • {" "}
                        {new Date((item.data as FileType).LastModified).toLocaleDateString("en-US", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    <a
                      href={`/api/download?key=${encodeURIComponent((item.data as FileType).Key)}`}
                      className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 hover:from-purple-500/30 hover:to-pink-500/30 text-purple-300 hover:text-purple-200 rounded-lg transition-all duration-200 text-sm font-medium border border-purple-500/20"
                    >
                      Download
                    </a>
                  </div>
                </motion.div>
              )
            )}
          </motion.div>
        )}

        {/* Empty State */}
        {sortedItems.length === 0 && (
          <motion.div 
            className="text-center py-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="h-20 w-20 bg-slate-800/50 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Files className="h-10 w-10 text-gray-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-300 mb-2">No files found</h3>
            <p className="text-gray-500">Try adjusting your search or navigate to a different folder.</p>
          </motion.div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div 
            className="flex items-center justify-between mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <span>Items per page:</span>
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="bg-slate-700/50 border border-white/10 rounded-lg px-2 py-1 text-sm text-gray-200"
              >
                {[6, 12, 24, 48].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <motion.button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                whileHover={currentPage !== 1 ? { scale: 1.05 } : {}}
                whileTap={currentPage !== 1 ? { scale: 0.95 } : {}}
                className={`px-3 py-1 rounded-lg text-sm transition-all duration-200 ${
                  currentPage === 1
                    ? "bg-slate-800/50 text-gray-500 cursor-not-allowed"
                    : "bg-slate-700/50 hover:bg-slate-600/50 text-gray-300 hover:text-white border border-white/10"
                }`}
              >
                Previous
              </motion.button>
              <span className="text-sm text-gray-300 px-3">
                Page {currentPage} of {totalPages}
              </span>
              <motion.button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
                whileHover={currentPage !== totalPages ? { scale: 1.05 } : {}}
                whileTap={currentPage !== totalPages ? { scale: 0.95 } : {}}
                className={`px-3 py-1 rounded-lg text-sm transition-all duration-200 ${
                  currentPage === totalPages
                    ? "bg-slate-800/50 text-gray-500 cursor-not-allowed"
                    : "bg-slate-700/50 hover:bg-slate-600/50 text-gray-300 hover:text-white border border-white/10"
                }`}
              >
                Next
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}