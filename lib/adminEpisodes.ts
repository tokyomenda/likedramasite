export type AdminEpisodeVideo = {
  movieId: string;
  number: number;
  title: string;
  duration: string;
  videoUrl: string;
  videoSource: string;
  videoFileName: string;
  subtitleUrl: string;
  isVipLocked: boolean;
  isPublished: boolean;
};

export type AdminEpisodeFormValues = {
  movieId: string;
  number: string;
  title: string;
  duration: string;
  videoUrl: string;
  videoSource: string;
  videoFileName: string;
  subtitleUrl: string;
  isVipLocked: boolean;
  isPublished: boolean;
};

export const ADMIN_EPISODES_STORAGE_KEY = "likedrama-admin-episodes";

export const emptyAdminEpisodeForm: AdminEpisodeFormValues = {
  movieId: "",
  number: "1",
  title: "1-р анги",
  duration: "46 мин",
  videoUrl: "",
  videoSource: "",
  videoFileName: "",
  subtitleUrl: "",
  isVipLocked: false,
  isPublished: true,
};

export function loadAdminEpisodes() {
  const rawEpisodes = localStorage.getItem(ADMIN_EPISODES_STORAGE_KEY);

  if (!rawEpisodes) {
    return [];
  }

  try {
    return JSON.parse(rawEpisodes) as AdminEpisodeVideo[];
  } catch {
    return [];
  }
}

export function saveAdminEpisodes(episodes: AdminEpisodeVideo[]) {
  localStorage.setItem(ADMIN_EPISODES_STORAGE_KEY, JSON.stringify(episodes));
}

export function formValuesToEpisode(
  values: AdminEpisodeFormValues,
): AdminEpisodeVideo {
  return {
    movieId: values.movieId,
    number: Number(values.number),
    title: values.title.trim() || `${values.number}-р анги`,
    duration: values.duration.trim() || "46 мин",
    videoUrl: values.videoUrl.trim(),
    videoSource: values.videoSource,
    videoFileName: values.videoFileName,
    subtitleUrl: values.subtitleUrl.trim(),
    isVipLocked: values.isVipLocked,
    isPublished: values.isPublished,
  };
}

export function getEpisodeVideoSource(movieId: string, episodeNumber: number) {
  const episode = loadAdminEpisodes().find(
    (item) => item.movieId === movieId && item.number === episodeNumber,
  );

  return episode?.videoSource || episode?.videoUrl || "";
}
