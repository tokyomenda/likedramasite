import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { MovieSection } from "@/components/movie/MovieSection";
import { movies } from "@/data/movies";

export default function VipPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main className="space-y-10 pb-16 pt-28">
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] border border-orange-300/25 bg-gradient-to-br from-orange-500/20 to-black p-6 shadow-[0_0_70px_rgba(249,115,22,0.25)] sm:p-8">
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-orange-300">
              VIP багц
            </p>
            <h1 className="mt-3 text-4xl font-black">30 хоног · бүх кино</h1>
            <p className="mt-4 max-w-2xl text-zinc-300">
              12,500₮ багц нь mock төлбөрийн мэдээлэл бөгөөд бодит төлбөр
              холбогдоогүй.
            </p>
          </div>
        </section>
        <MovieSection movies={movies.filter((movie) => movie.isVip)} title="VIP кинонууд" />
      </main>
      <Footer />
    </div>
  );
}
