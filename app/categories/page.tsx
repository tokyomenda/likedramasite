import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { MovieSection } from "@/components/movie/MovieSection";
import { categories, movies } from "@/data/movies";

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main className="space-y-10 pb-16 pt-28">
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-orange-300">
            Ангилал
          </p>
          <h1 className="mt-3 text-4xl font-black">Төрлөөр үзэх</h1>
          <div className="mt-6 flex flex-wrap gap-3">
            {categories.map((category) => (
              <a
                className="rounded-full border border-white/10 bg-white/[0.06] px-5 py-2.5 text-sm font-bold text-zinc-200 transition hover:border-orange-400/60 hover:text-white"
                href={`#${category}`}
                key={category}
              >
                {category}
              </a>
            ))}
          </div>
        </section>

        {categories.map((category) => (
          <div id={category} key={category}>
            <MovieSection
              movies={movies.filter((movie) => movie.genre === category).length ? movies.filter((movie) => movie.genre === category) : movies.slice(0, 6)}
              title={category}
            />
          </div>
        ))}
      </main>
      <Footer />
    </div>
  );
}
