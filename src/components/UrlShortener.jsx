import axios from "axios";
import React, { useState } from "react";
import { FaCopy, FaPaste, FaTrash } from "react-icons/fa";

const UrlShortener = () => {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleShortenUrl = async () => {
    if (!longUrl) {
      setError("Please enter a valid URL.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "https://api.tinyurl.com/create",
        {
          url: longUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_TINYURL_API_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );

      setShortUrl(response.data.data.tiny_url);
    } catch (err) {
      setError("An error occurred while shortening the URL. Please try again.");
      setShortUrl("");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (shortUrl) {
      navigator.clipboard.writeText(shortUrl);
      alert("Shortened URL copied to clipboard!");
    }
  };

  const handlePaste = async () => {
    const text = await navigator.clipboard.readText();
    setLongUrl(text);
  };

  const handleClear = () => {
    setLongUrl("");
    setShortUrl("");
    setError("");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">URL Shortener</h1>
        <p className="text-gray-600 mb-4">
          Paste your long URL below to get a shorter version.
        </p>
        <div className="flex items-center mb-4">
          <input
            type="text"
            placeholder="Enter your URL here..."
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            className="w-full px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handlePaste}
            className="bg-gray-200 px-4 py-2 border-l border-gray-300 rounded-r-lg hover:bg-gray-300"
            title="Paste from clipboard"
          >
            <FaPaste />
          </button>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={handleShortenUrl}
            disabled={loading}
            className={`flex-1 py-2 text-white font-semibold rounded-lg ${
              loading
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {loading ? "Shortening..." : "Shorten URL"}
          </button>
          <button
            onClick={handleClear}
            className="flex-1 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600"
            title="Clear"
          >
            <FaTrash className="inline mr-2" />
            Clear
          </button>
        </div>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        {shortUrl && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-700">
              Shortened URL:
            </h3>
            <div className="flex items-center mt-2">
              <a
                href={shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline break-all flex-1"
              >
                {shortUrl}
              </a>
              <button
                onClick={handleCopy}
                className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300"
                title="Copy to clipboard"
              >
                <FaCopy />
              </button>
            </div>
          </div>
        )}
      </div>
      <footer className="mt-8 text-gray-500 text-sm">
        © 2024 Phùng Khánh - No ads
      </footer>
    </div>
  );
};

export default UrlShortener;
