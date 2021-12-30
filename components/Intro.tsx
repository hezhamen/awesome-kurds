import Head from "next/head";
import { KurdsWithTopics } from "../kurds";

export default function Intro({ kurds }: { kurds: KurdsWithTopics }) {
  return (
    <>
      <Head>
        <meta
          name="description"
          content={`Meet ${kurds.length}+ awesome Kurds.`}
        />
      </Head>
      <div className="intro">
        <div>
          <h1>Awesome Kurds</h1>
          <h3>Meet {kurds.length}+ awesome Kurds.</h3>
          <p>
            <a href="https://github.com/DevelopersTree/awesome-kurds">
              Add Yourself
            </a>{" "}
            &middot;{" "}
            <a href="https://github.com/hezhamen/awesome-kurds">Contribute</a>
          </p>
        </div>
        <div className="scroll-down"></div>
      </div>
    </>
  );
}
