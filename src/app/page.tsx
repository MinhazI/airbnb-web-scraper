import Footer from "./components/Footer";
import { Header } from "./components/Header";
import { Main } from "./components/Main";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Header />
      <Main />
      <Footer />
    </div>
  );
}
