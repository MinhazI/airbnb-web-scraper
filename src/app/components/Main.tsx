"use client";
import React, { useEffect, useState } from "react";
import Grid from "./Grid";
import { Loader } from "./Loader";
import RefreshButton from "./RefreshButton";
import iArticles from "../interfaces/iArticles";

export const Main = () => {
  const [articles, setArticles] = useState<iArticles[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchArticles = async () => {
    setLoading(true);
    setError("");
    setArticles([]);

    try {
      const response = await fetch("/api/scrape");
      if (!response.ok) {
        throw new Error("No articles found");
      }
      const data: iArticles[] = await response.json();
      setArticles(data);
      localStorage.setItem("articles", JSON.stringify(data));
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occured");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const storedArticles = localStorage.getItem("articles");
    if (storedArticles) {
      setArticles(JSON.parse(storedArticles));
    }
  }, []);

  useEffect(() => {
    if (articles.length === 0) {
      fetchArticles();
    }
  }, [articles.length]);
  return (
    <>
      <RefreshButton callback={fetchArticles} loading={loading} />
      <main className="flex flex-col items-center justify-center flex-1 w-full px-4 relative">
        {error && <p className="text-red-500">{error}</p>}
        {loading ? <Loader /> : <Grid articles={articles} />}
      </main>
    </>
  );
};
