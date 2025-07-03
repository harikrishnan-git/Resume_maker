import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import bin from "../assets/bin.png";
import toast from "react-hot-toast";

export default function UserHistory() {
  const userId = localStorage.getItem("userId");
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchUserHistory = async () => {
      try {
        const response = await fetch(`/api/${userId}/history`);
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

  const handleDelete = async (historyId) => {
    try {
      const response = await fetch(`/api/historydelete/${historyId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        toast.error("Failed to delete resume");
        throw new Error("Failed to delete resume");
      }
      toast.success("Resume deleted successfully");
      setHistory((prevHistories) =>
        prevHistories.filter((history) => history._id !== historyId)
      );
    } catch (err) {
      toast.error("Failed to delete resume");
    }
  };
  return (
    <div className="w-full text-white">
      <ul className="space-y-6 sm:space-y-4 sm:flex sm:flex-col sm:gap-4">
        {history.map((item, index) => (
          <Link to={`/history/${item._id}`}>
            <li
              key={index}
              className="border border-zinc-600 p-4 rounded bg-zinc-900 "
            >
              <div className="flex">
                <p className="text-xl mb-3">
                  <strong> {item.companyName}</strong>
                </p>
                <div className="rounded ml-auto flex w-[30px] h-[30px] justify-center items-center hover:bg-zinc-800 ">
                  <button
                    className="w-[20px] h-[20px]"
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      handleDelete(item._id);
                    }}
                  >
                    <img src={bin} alt="delete" width={30} height={30} />
                  </button>
                </div>
              </div>

              <div className="flex gap-2">
                <p className="w-[700px]">{trimText(item.jobDescription)}</p>
                <div className="overflow-hidden rounded shadow-lg w-full max-w-[500px] h-[300px]">
                  <iframe
                    src={getPdfBlobUrl(item.resumePdf)}
                    width="500px"
                    height="500px"
                    title={`Resume ${index + 1}`}
                    className="rounded shadow-lg"
                  />
                </div>
              </div>
              <p className="text-sm text-gray-400 mt-2">
                Created at: {new Date(item.createdAt).toLocaleDateString()}
              </p>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
