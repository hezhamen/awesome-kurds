import Head from "next/head";
import Intro from "../components/Intro";
import Cards from "../components/Cards";
import Footer from "../components/Footer";
import { AwesomeKurds } from "../kurds";

type Props = {
  readme: string;
};

const BUBBLE_UI_OPTIONS = {
  size: 200,
  minSize: 25,
  gutter: 20,
  provideProps: true,
  numCols: 8,
  fringeWidth: 200,
  yRadius: 130,
  xRadius: 220,
  cornerRadius: 50,
  showGuides: false,
  compact: false,
  gravitation: 5,
};

export default function Home({ readme }: Props) {
  const awesomeKurds = new AwesomeKurds(readme);

  return (
    <>
      <Head>
        <title>Awesome Kurds</title>
      </Head>
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
    revalidate: 3600, // seconds
    //Next.js will attempt to re-generate the page
    //when a request comes in atmost every 1 hour
  };
};
