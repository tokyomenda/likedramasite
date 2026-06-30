import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { MovieSection } from "@/components/movie/MovieSection";
import { movies } from "@/data/movies";

export default function MyListPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main className="space-y-10 pb-16 pt-28">
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-orange-300">
            Миний кинонууд
          </p>
          <h1 className="mt-3 text-4xl font-black">Хадгалсан mock жагсаалт</h1>
          <p className="mt-3 max-w-2xl text-zinc-400">
            Одоогоор mock байдлаар санал болгосон кинонуудыг харуулж байна.
          </p>
        </section>
        <MovieSection movies={movies.slice(0, 8)} title="Миний жагсаалт" />
      </main>
      <Footer />
    </div>
  );
}
