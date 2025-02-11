interface props {
  callback: () => Promise<void>;
  loading: boolean;
}

const RefreshButton = ({ callback, loading }: props) => {
  return (
    <button
      className={`bg-slate-950 text-white py-2 px-4 rounded absolute top-4 right-4 ${
        loading ? "disabled:opacity-50" : "hover:bg-slate-700"
      }`}
      onClick={callback}
      disabled={loading}
    >
      {loading ? "Refreshing..." : "Refresh"}
    </button>
  );
};

export default RefreshButton;
