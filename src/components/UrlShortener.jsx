import axios from "axios";
import React, { useState } from "react";

const UrlShortener = () => {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");

  const handleShortenUrl = async () => {
    if (!longUrl) {
      setError("Vui lòng nhập URL.");
      return;
    }

    try {
      // Gửi yêu cầu tới TinyURL API
      const response = await axios.post(
        "https://api.tinyurl.com/create",
        {
          url: longUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_TINYURL_API_TOKEN}`, // Tạo token từ TinyURL
            "Content-Type": "application/json",
          },
        }
      );

      setShortUrl(response.data.data.tiny_url);
      setError("");
    } catch (err) {
      setError("Có lỗi xảy ra khi rút gọn URL.");
      setShortUrl("");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h1>Rút Gọn Link</h1>
      <div style={{ marginBottom: "10px" }}>
        <input
          type="text"
          placeholder="Nhập URL của bạn..."
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            fontSize: "16px",
          }}
        />
      </div>
      <button
        onClick={handleShortenUrl}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          cursor: "pointer",
        }}
      >
        Rút Gọn
      </button>
      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
      {shortUrl && (
        <div style={{ marginTop: "20px" }}>
          <h3>Link Rút Gọn:</h3>
          <a href={shortUrl} target="_blank" rel="noopener noreferrer">
            {shortUrl}
          </a>
        </div>
      )}
    </div>
  );
};

export default UrlShortener;
