"use client";
import React, { useEffect, useState } from "react";
import Grid from "./Grid";
import { Loader } from "./Loader";
import RefreshButton from "./RefreshButton";
import iListings from "../interfaces/iListings";

export const Main = () => {
  const [listings, setListings] = useState<iListings[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchListings = async () => {
    setLoading(true);
    setError("");
    setListings([]);

    try {
      const response = await fetch("http://localhost:5001/scrape");
      if (!response.ok) {
        throw new Error("No listings found");
      }
      const data: iListings[] = await response.json();
      setListings(data);
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
    const storedListings = localStorage.getItem("properties");
    if (storedListings) {
      setListings(JSON.parse(storedListings));
    }

    if (listings.length === 0) {
      fetchListings();
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("properties", JSON.stringify(listings));
  }, [listings]);
  return (
    <>
      <RefreshButton callback={fetchListings} loading={loading} />
      <main className="flex flex-col items-center justify-center flex-1 w-full px-4 relative">
        {error && <p className="text-red-500">{error}</p>}
        {loading ? <Loader /> : <Grid listings={listings} />}
      </main>
    </>
  );
};
