import React, { useState } from "react";
import * as api from "../utils/api";
const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    try {
      const response = await api.search(query); // Gọi API với query
      if (!response.ok) throw new Error("Lỗi gọi API");

      const data = await response.json();
      console.log("data", data);

      setResults(data); // giả định API trả về mảng kết quả
    } catch (err) {
      console.error("Lỗi tìm kiếm:", err.message);
    }
  };

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit} className="relative">
        <button
          type="submit"
          className="absolute inset-y-0 left-3 flex items-center text-gray-400 hover:text-gray-600"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z"
            />
          </svg>
        </button>
        <input
          type="text"
          value={query}
          onInput={(e) => setQuery(e.target.value)}
          placeholder="Tìm kiếm bạn bè, bài viết..."
          className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
        />
      </form>

      {/* Hiển thị kết quả */}
      {results.users?.length > 0 || results.posts?.length > 0 ? (
        <div className="absolute left-0 right-0 mt-1 bg-white border rounded shadow z-10 max-h-80 overflow-y-auto text-sm">
          {/* Người dùng */}
          {results.users.length > 0 && (
            <>
              <div className="px-4 pt-2 font-semibold text-gray-700">
                Người dùng
              </div>
              {results.users.map((user) => (
                <a
                  key={user.id}
                  href={`/profile/${user.id}`}
                  className="flex items-center px-4 py-2 hover:bg-gray-100"
                >
                  <img
                    src={user.profiepic || "/images/avatar/avatar-0.png"}
                    alt={user.name}
                    className="w-8 h-8 rounded-full mr-2 object-cover border-2"
                  />
                  <span className="text-gray-800">{user.name}</span>
                </a>
              ))}
            </>
          )}

          {/* Bài viết */}
          {results.posts.length > 0 && (
            <>
              <div className="px-4 pt-2 font-semibold text-gray-700">
                Bài viết
              </div>
              {results.posts.map((post) => (
                <div
                  key={post.id}
                  className="px-4 py-2 border-t hover:bg-gray-50"
                >
                  <p className="text-gray-800">{post.description}</p>
                  {post.img && (
                    <img
                      src={post.img}
                      alt="post"
                      className="mt-2 rounded max-h-40 object-cover"
                    />
                  )}
                  <a
                    href={`/profile/${post.id_user}`}
                    className="text-xs text-blue-600 hover:underline mt-1 block"
                  >
                    Người đăng: {post.name}
                  </a>
                </div>
              ))}
            </>
          )}
        </div>
      ) : query.trim() !== "" ? (
        <div className="absolute left-0 right-0 mt-1 bg-white border rounded shadow px-4 py-2 text-gray-500 text-sm z-10">
          Không tìm thấy kết quả nào phù hợp.
        </div>
      ) : null}
    </div>
  );
};

export default SearchBar;
