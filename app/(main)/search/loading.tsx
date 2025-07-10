"use client";
import React, { useState, useEffect } from "react";
import { File, FileText, Check } from "lucide-react";

interface Document {
  id: number;
  position: number;
  isScanned: boolean;
  type: "file" | "text";
}

export default function Loading() {
  const [documents, setDocuments] = useState<Document[]>([]);

  // Initialize documents
  useEffect(() => {
    const initialDocs: Document[] = [];
    for (let i = 0; i < 6; i++) {
      initialDocs.push({
        id: i,
        position: i * 200 - 800, // Start further left
        isScanned: false,
        type: i % 2 === 0 ? "text" : "file",
      });
    }
    setDocuments(initialDocs);
  }, []);

  // Animation loop
  useEffect(() => {
    const interval = setInterval(() => {
      setDocuments((prevDocs) => {
        const updatedDocs = prevDocs
          .map((doc) => {
            const newPosition = doc.position + 2;
            const scannerCenter = 400;
            const scanZone = 80;
            const hasPassedScanner = newPosition > scannerCenter + scanZone / 2;
            const isScanned = hasPassedScanner || doc.isScanned;

            return {
              ...doc,
              position: newPosition,
              isScanned,
            };
          })
          .filter((doc) => doc.position < 1200); // Remove docs that are far off-screen
        // 👇 Add new document if the rightmost one has moved enough
        const lastDoc = updatedDocs[updatedDocs.length - 1];
        if (!lastDoc || lastDoc.position > 200) {
          const newDoc: Document = {
            id: Date.now(), // Unique ID
            position: -200,
            isScanned: false,
            type: Math.random() > 0.5 ? "file" : "text",
          };
          updatedDocs.push(newDoc);
        }

        return updatedDocs;
      });
    }, 40);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen  dark:bg-black/20  bg-opacity-50 flex items-center justify-center">
      <div className="relative w-full max-w-5xl h-40 overflow-clip">
        {/* Documents */}
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="absolute top-1/2 transform -translate-y-1/2 transition-all duration-300"
            style={{
              left: `${doc.position}px`,
            }}>
            <div className="relative p-4 rounded-xl bg-slate-800 shadow-xl border border-slate-700">
              {doc.type === "text" ? (
                <FileText className="w-12 h-12 text-slate-300" />
              ) : (
                <File className="w-12 h-12 text-slate-300" />
              )}

              {/* Document Content Lines */}
              <div className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none">
                <div className="w-6 h-0.5 bg-slate-600 mb-1 rounded"></div>
                <div className="w-5 h-0.5 bg-slate-600 mb-1 rounded"></div>
                <div className="w-6 h-0.5 bg-slate-600 rounded"></div>
              </div>

              {/* Checkmark for scanned documents */}
              {doc.isScanned && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
          </div>
        ))}
        {/* Magnifying Glass Scanner */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="relative">
            {/* Main Glass Circle - Transparent */}
            <div className="w-32 h-32 border-4 border-teal-500 rounded-full bg-transparent  relative">
              {/* Glass shine effect */}
            </div>
            {/* Handle */}
            <div className="absolute -bottom-2 -right-5 w-2 h-16 bg-teal-500 rounded-full transform -rotate-45" />
            {/* Scanning ring effect */}
            <div className="absolute inset-0 w-32 h-32 border-2 border-teal-300 rounded-full opacity-20 animate-ping" />
          </div>
        </div>
      </div>
    </div>
  );
}
