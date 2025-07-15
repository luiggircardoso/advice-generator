'use client';

import Image from "next/image";
import React, { useEffect } from "react";
import AdviceCard from "./components/AdviceCard";
import { gsap } from "gsap";
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
    const apiURL = "https://api.adviceslip.com/advice";
    const [advice, setAdvice] = React.useState("");
    const [loading, setLoading] = React.useState(false);

    const fetchAdvice = async () => {
      setLoading(true);
      try {
        const response = await fetch(apiURL);
        const data = await response.json();
        setAdvice(data.slip.advice);
      } catch (error) {
        console.error("Error fetching advice:", error);
        setAdvice("Failed to fetch advice. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

  React.useEffect(() => {
    gsap.to('.title', {
      duration: 1,
      opacity: 1.5,
      y: 0,
    });
  }, []);

    React.useEffect(() => {
      fetchAdvice();
    }, []);
 
  return (
    <main className={`bg-stone-900 text-white min-h-screen flex items-center justify-center ${inter.className}`}>
      <header>
        <h1 className="text-4xl title opacity-5 font-semibold">Advice Generator</h1>
        <div className="mt-6">
          <AdviceCard props={{ advice, loading }} />
          <RerollButton onClick={fetchAdvice} disabled={loading} />
        </div>
      </header>
    </main>
  );
}

function RerollButton({ onClick, disabled }) {
  useEffect(() => {
    gsap.to('.reroll-button', {
      duration: 0.5,
      scale: disabled ? 0.95 : 1,
      ease: "power2.out"
    });
  }, [disabled]);

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`mt-4 font-bold py-2 px-4 rounded ${
        disabled 
          ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
          : 'bg-blue-600 hover:bg-blue-700 text-white'
      }`}
    >
      {disabled ? 'Loading...' : 'Reroll Advice'}
    </button>
  );
}