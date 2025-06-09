"use client";

import {
  useGetNotes,
  useCreateNote,
  useUpdateNote,
  useDeleteNote,
} from "@/hooks/usenotes";
import { useNoteStore } from "@/store/noteStore";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

type Note = {
  _id: string;
  title: string;
  content: string;
  updatedAt: string;
};

export default function HomePage() {
  const { data: notes, isLoading } = useGetNotes();
  const createNote = useCreateNote();
  const updateNote = useUpdateNote();
  const deleteNote = useDeleteNote();

  const { selectedNote, setSelectedNote } = useNoteStore();

  console.log(selectedNote, "selectedNote");
  const [form, setForm] = useState({ title: "", content: "", uid: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (selectedNote) {
      setForm({
        title: selectedNote.title,
        content: selectedNote.content,
        uid: selectedNote._id,
      });
      setIsModalOpen(true);
    } else {
      setForm({ title: "", content: "", uid: "" });
    }
  }, [selectedNote]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.content) return;

    console.log(selectedNote, "selectedNote");

    if (selectedNote) {
      updateNote.mutate({ id: selectedNote._id, ...form });
    } else {
      createNote.mutate(form);
    }

    setForm({ title: "", content: "", uid: "" });
    setSelectedNote(null);
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    deleteNote.mutate(id);
    if (selectedNote?._id === id) setSelectedNote(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.history.replaceState(null, "", "/");
    router.replace("/");
  };

  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();

    if (hour < 12) {
      setGreeting("Good Morning!");
    } else if (hour < 17) {
      setGreeting("Good Afternoon!");
    } else {
      setGreeting("Good Evening!");
    }
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header isLoggedIn={true} onLogout={handleLogout} />
      <div className="px-6 py-4">
        <h2 className="text-xl text-gray-500">Homepage / Your Notes</h2>
      </div>

      <main className="flex-grow w-auto mx-5 py-10 px-4">
        <h1 className="text-4xl font-bold mb-6">{greeting}</h1>

        {isLoading ? (
          <div className="w-full flex justify-center items-center">
            <motion.button
              disabled
              className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-br  from-purple-300 to-violet-50 text-black rounded-full shadow-md cursor-not-allowed">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  repeat: Infinity,
                  ease: "linear",
                  duration: 1,
                }}>
                <AiOutlineLoading3Quarters className="text-lg" />
              </motion.div>

              <motion.span
                className="p-2 text-[15px]"
                initial={{ opacity: 0.6 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}>
                Loading Notes...
              </motion.span>
            </motion.button>
          </div>
        ) : (
          <div className="flex flex-wrap gap-6">
            {notes?.map((note: Note, index: number) => (
              <motion.div
                key={note._id}
                onClick={() => setSelectedNote(note)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
                className="relative break-words overflow-hidden h-50 w-80 bg-gradient-to-br cursor-pointer hover:scale-110 transition-all duration-300 from-purple-300 to-violet-50 p-4 rounded shadow flex flex-col justify-between items-start">
                <div>
                  <h3 className="font-bold text-xl mb-2">{note.title}</h3>
                  <p className="text-gray-700 text-sm mb-4 break-words overflow-hidden">
                    {note.content}
                  </p>
                </div>
                <div className="text-[12px] text-gray-500 absolute top-1 right-2 font-bold">
                  Last Modified:{" "}
                  {new Date(note.updatedAt).toLocaleString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>

      {isModalOpen && (
        <div className="fixed inset-0 bg-white/20 backdrop-blur-sm bg-opacity-70 overflow-y-auto h-full w-full flex items-center justify-center">
          <div className="bg-gradient-to-r from-purple-300 to-violet-200 transition-colors p-8 rounded-xl shadow-xl relative w-120 border border-purple-950">
            <h3 className="text-2xl font-bold mb-4 text-gray-800 text-start">
              {selectedNote ? "Edit Note" : "Add Notes"}
            </h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="bg-white p-2 border border-gray-400 rounded"
              />
              <textarea
                placeholder="Content"
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                className="bg-white p-2 border border-gray-400 rounded h-34"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="submit"
                  className="bg-green-500 cursor-pointer bg-gradient-to-br from-green-400 to-green-500 text-white font-bold py-2 px-4 rounded border border-gray-300">
                  {selectedNote ? "Save" : "Add"}
                </button>
                {!selectedNote && (
                  <button
                    type="button"
                    onClick={() => {
                      setIsModalOpen(false);
                      setSelectedNote(null);
                      setForm({ title: "", content: "", uid: "" });
                    }}
                    className="bg-red-500 cursor-pointer hover:bg-red-600 text-white font-bold py-2 px-4 rounded border border-gray-300">
                    Cancel
                  </button>
                )}
                {selectedNote && (
                  <button
                    type="button"
                    onClick={() => {
                      handleDelete(form.uid);
                      setIsModalOpen(false);
                      setSelectedNote(null);
                    }}
                    className="bg-red-500 cursor-pointer hover:bg-red-600 text-white font-bold py-2 px-4 rounded border border-gray-300">
                    Delete
                  </button>
                )}
              </div>
            </form>

            <motion.button
              onClick={() => {
                setIsModalOpen(false);
                setSelectedNote(null);
                setForm({ title: "", content: "", uid: "" });
              }}
              whileHover={{ scale: 1.2, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              className="absolute top-4 right-4 cursor-pointer text-red-700 hover:text-red-800 text-3xl rounded-full p-1">
              &times;
            </motion.button>
          </div>
        </div>
      )}

      <motion.button
        onClick={() => setIsModalOpen(true)}
        initial={{ opacity: 0, scale: 0.5, y: 100 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-8 right-8 bg-gradient-to-r from-purple-500 to-violet-200 transition-colors hover:bg-orange-600 text-white p-4 rounded-full shadow-lg cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
      </motion.button>
    </div>
  );
}
