const getNewGameSlug = async (level: "easy" | "hard") => {
  const res = await fetch("/api/games", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      level,
    }),
  });

  if (res.ok) {
    const json = await res.json();
    const slug = json.slug;
    return slug
  }
  else {
    throw new Error("Unable to create a game")
  }
}

export default getNewGameSlug