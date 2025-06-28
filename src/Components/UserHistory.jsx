import React, { useEffect, useState } from "react";

export default function UserHistory() {
  const userId = localStorage.getItem("userId");
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchUserHistory = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/api/${userId}/history`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setHistory(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching user history:", error);
      }
    };

    fetchUserHistory();
  }, []);

  const getPdfBlobUrl = (pdfBuffer) => {
    const byteArray = new Uint8Array(pdfBuffer.data);
    const blob = new Blob([byteArray], { type: "application/pdf" });
    return URL.createObjectURL(blob);
  };
  const trimText = (text, wordLimit = 70) => {
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
  };
  return (
    <div className="w-full text-white">
      <ul className="space-y-6 sm:space-y-4 sm:flex sm:flex-col sm:gap-4">
        {history.map((item, index) => (
          <li
            key={index}
            className="border border-zinc-600 p-4 rounded bg-zinc-900"
          >
            <p className="text-xl mb-3 font-semibold">{item.companyName}</p>
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="w-full lg:w-[500px] max-w-full overflow-hidden rounded shadow-lg sm:mb-2">
                <iframe
                  src={getPdfBlobUrl(item.resumePdf)}
                  title={`Resume ${index + 1}`}
                  className="w-full h-[300px] rounded shadow-lg"
                />
              </div>
              <p className="w-full lg:w-[700px]">
                {trimText(item.jobDescription)}
              </p>
            </div>
            <p className="text-sm text-gray-400 mt-2">
              Created at: {new Date(item.createdAt).toLocaleDateString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
