"use client";
import React, { useEffect, useRef, useState } from "react";
import Grid from "./Grid";
import { Loader } from "./Loader";
import RefreshButton from "./RefreshButton";
import iArticles from "../interfaces/iArticles";

export const Main = () => {
  const [articles, setArticles] = useState<iArticles[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const isFetched = useRef(false);

  const fetchArticles = async () => {
    setLoading(true);
    setError("");
    setArticles([]);

    try {
      const response = await fetch("/api/scrape");
      if (!response.ok) throw new Error("No articles found");

      const data: iArticles[] = await response.json();
      setArticles(data);
      localStorage.setItem("articles", JSON.stringify(data));
    } catch (err: unknown) {
      if (err instanceof DOMException && err.name === "AbortError") return;
      if (err instanceof Error) setError(err.message);
      else {
        setError("An unexpected error occured");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    const storedArticles = localStorage.getItem("articles");
    if (storedArticles) {
      setArticles(JSON.parse(storedArticles));
      setLoading(false);
    } else if (!isFetched.current) {
      fetchArticles();
      isFetched.current = true;
      setLoading(false);
    }
  }, []);
  return (
    <>
      {!loading && (
        <div className="flex flex-column">
          <RefreshButton callback={fetchArticles} />
        </div>
      )}
      <main className="flex flex-col items-center justify-center flex-1 w-full px-4 relative bg-slate-50 dark:bg-gray-700">
        {error && <p className="text-red-500">{error}</p>}
        {loading ? <Loader /> : <Grid articles={articles} />}
      </main>
    </>
  );
};
