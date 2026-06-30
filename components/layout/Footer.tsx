const quickLinks = ["Нүүр", "Кино", "Ангилал", "VIP", "Тусламж"];
const genres = ["Романс", "Драма", "Инээдэм", "Гэмт хэрэг"];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-black">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange-400/70 to-transparent" />
      <div className="absolute -top-24 right-8 h-56 w-56 rounded-full bg-orange-500/12 blur-3xl" />

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-[1.6fr_0.8fr_0.8fr_1fr] lg:px-8">
        <div>
          <p className="text-2xl font-black tracking-wide text-white">
            Like<span className="text-orange-400">Drama</span>
          </p>
          <p className="mt-4 max-w-md text-sm leading-7 text-zinc-400">
            LikeDrama бол кино, олон ангит бүтээл, VIP контентыг нэг дороос
            үзэхэд зориулсан орчин үеийн стриминг платформын эхлэл юм.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {["HD", "VIP", "Шинэ анги", "Монгол хадмал"].map((item) => (
              <span
              className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs font-semibold text-zinc-300 shadow-lg shadow-black/10"
                key={item}
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-[0.24em] text-zinc-500">
            Холбоос
          </h2>
          <div className="mt-4 grid gap-3">
            {quickLinks.map((link) => (
              <a
                className="text-sm font-medium text-zinc-300 transition duration-300 hover:text-orange-300"
                href="#"
                key={link}
              >
                {link}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-[0.24em] text-zinc-500">
            Төрөл
          </h2>
          <div className="mt-4 grid gap-3">
            {genres.map((genre) => (
              <a
                className="text-sm font-medium text-zinc-300 transition duration-300 hover:text-orange-300"
                href="#"
                key={genre}
              >
                {genre}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-[0.24em] text-zinc-500">
            Холбоо барих
          </h2>
          <a
            className="mt-4 inline-block text-sm font-medium text-zinc-300 transition hover:text-orange-300"
            href="mailto:hello@likedrama.mn"
          >
            hello@likedrama.mn
          </a>
          <p className="mt-4 text-sm leading-6 text-zinc-500">
            Шинэ кино, эрхийн мэдээлэл, хамтын ажиллагааны санал хүлээн авна.
          </p>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl flex-col gap-3 border-t border-white/10 px-4 py-6 text-xs text-zinc-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p>© 2026 LikeDrama. Бүх эрх хуулиар хамгаалагдсан.</p>
        <div className="flex gap-4">
          <a className="transition hover:text-orange-300" href="#">
            Үйлчилгээний нөхцөл
          </a>
          <a className="transition hover:text-orange-300" href="#">
            Нууцлал
          </a>
        </div>
      </div>
    </footer>
  );
}
