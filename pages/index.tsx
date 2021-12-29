import Intro from "../components/Intro";
import Cards from "../components/Cards";
import Footer from "../components/Footer";

import { AwesomeKurds } from "../kurds";

type Props = {
  readme: string;
};

export default function Home({ readme }: Props) {
  const awesomeKurds = new AwesomeKurds(readme);

  return (
    <>
      <Intro kurds={awesomeKurds.kurds} />
      <Cards awesomeKurds={awesomeKurds} />
      <Footer />
    </>
  );
}

export const getStaticProps = async () => {
  const readme = await (
    await fetch(
      "https://raw.githubusercontent.com/DevelopersTree/awesome-kurds/main/README.md"
    )
  ).text();

  return {
    props: { readme },
  };
};
