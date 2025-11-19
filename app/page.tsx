import Cards from "@/components/Cards";
import Footer from "@/components/Footer";
import Intro from "@/components/Intro";
import { AwesomeKurds } from "@/lib/kurds";

const README_URL =
  "https://raw.githubusercontent.com/DevelopersTree/awesome-kurds/main/README.md";
const CONTRIBUTORS_URL =
  "https://api.github.com/repos/hezhamen/awesome-kurds/contributors";

export const revalidate = 3600;

async function getReadme() {
  const response = await fetch(README_URL, {
    next: { revalidate },
  });
  if (!response.ok) {
    throw new Error("Failed to load README content.");
  }
  return response.text();
}

async function getContributors() {
  const response = await fetch(CONTRIBUTORS_URL, {
    next: { revalidate },
  });
  if (!response.ok) {
    throw new Error("Failed to load contributors.");
  }
  const data = await response.json();
  return data.map((contributor: { login: string }) => contributor.login);
}

export default async function HomePage() {
  const [readme, contributors] = await Promise.all([
    getReadme(),
    getContributors(),
  ]);

  const awesomeKurds = new AwesomeKurds(readme);

  return (
    <>
      <Intro kurds={awesomeKurds.kurds} />
      <Cards
        kurds={awesomeKurds.kurds}
        topics={awesomeKurds.topics}
        tags={awesomeKurds.tags}
        contributors={contributors}
      />
      <Footer />
    </>
  );
}
