"use client";
import { useState } from "react";

// Use environment variable or default to Docker service name
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://backend:8000";


export default function Home() {
  // State for calculator
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [calcResult, setCalcResult] = useState(null);

  // State for text analyzer
  const [text, setText] = useState("");
  const [textResult, setTextResult] = useState(null);

  // Call FastAPI calculate endpoint
  const handleCalculate = async () => {
    const response = await fetch(`${API_URL}/calculate/${num1}/${num2}`);
    const data = await response.json();
    setCalcResult(data);
  };

  // Call FastAPI analyze endpoint
  const handleAnalyze = async () => {
    const response = await fetch(`${API_URL}/analyze/${text}`);
    const data = await response.json();
    setTextResult(data);
  };

  return (
    <main className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">FastAPI + Next.js Demo</h1>

      {/* Calculator Section */}
      <div className="mb-12 p-6 border rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Calculator</h2>
        
        <div className="space-y-4">
          <input
            type="number"
            placeholder="Enter first number"
            value={num1}
            onChange={(e) => setNum1(e.target.value)}
            className="w-full p-2 border rounded"
          />
          
          <input
            type="number"
            placeholder="Enter second number"
            value={num2}
            onChange={(e) => setNum2(e.target.value)}
            className="w-full p-2 border rounded"
          />
          
          <button
            onClick={handleCalculate}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Calculate
          </button>

          {calcResult && (
            <div className="mt-4 p-4 bg-gray-100 rounded">
              <pre className="text-sm">{JSON.stringify(calcResult, null, 2)}</pre>
            </div>
          )}
        </div>
      </div>

      {/* Text Analyzer Section */}
      <div className="p-6 border rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Text Analyzer</h2>
        
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Enter some text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full p-2 border rounded"
          />
          
          <button
            onClick={handleAnalyze}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Analyze
          </button>

          {textResult && (
            <div className="mt-4 p-4 bg-gray-100 rounded">
              <p><strong>Original:</strong> {textResult.original}</p>
              <p><strong>Uppercase:</strong> {textResult.uppercase}</p>
              <p><strong>Word count:</strong> {textResult.word_count}</p>
              <p><strong>Character count:</strong> {textResult.character_count}</p>
              <p><strong>Reversed:</strong> {textResult.reversed}</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
