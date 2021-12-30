export interface Kurd {
  name: string;
  link: string;
  tags: string[];
}

export type Kurds = Kurd[];

export interface KurdWithTopics extends Kurd {
  topics: string[];
}

export type KurdsWithTopics = KurdWithTopics[];

export class AwesomeKurds {
  public topics: string[];
  public tags = new Array<string>();
  public kurds: KurdsWithTopics = [];

  private lines: string[];

  constructor(readme: string) {
    this.lines = readme.split("\n");
    this.topics = Array.from(readme.matchAll(/\n## (.+)\n/g)).map((v) => v[1]); // taken from @hezhamen, and modified

    for (const topic of this.topics) {
      for (const kurd of this.getKurdsInTopic(topic)) {
        if (!this.has(kurd)) {
          this.kurds.push({ ...kurd, topics: [topic] });
        } else {
          const i = this.kurds.findIndex(
            (k) => k.name == kurd.name && k.link == kurd.link,
          );

          this.kurds[i].topics.push(topic);

          for (const tag of kurd.tags) {
            if (!this.kurds[i].tags.includes(tag)) {
              this.kurds[i].tags.push(tag);
            }
          }
        }
      }
    }

    for (const kurd of this.kurds) {
      for (const tag of kurd.tags) {
        if (!this.tags.includes(tag)) {
          this.tags.push(tag);
        }
      }
    }
  }

  has(kurd: Kurd) {
    return (
      this.kurds.filter((k) => k.name == kurd.name && k.link == kurd.link)
        .length != 0
    );
  }

  getKurdsInTopic(topic: string): Kurds {
    const fromLine = this.lines.indexOf(`## ${topic}`);

    if (fromLine == -1) {
      throw new Error(`The topic ${topic} is not existing`);
    }

    const index = this.topics.indexOf(topic);
    const nextIndex = this.topics[index + 1];
    const toLine = nextIndex ? this.lines.indexOf(`## ${nextIndex}`) : -1;

    return this.lines
      .slice(fromLine, toLine)
      .filter((l) => l != "" && !l.startsWith("## ")) // remove empty lines and the heading
      .map((i) => i.split(": ", 2)) // split to name-link and tags
      .map((i) => {
        try {
          return {
            name: i[0]
              .split("](")[0] // get the name part
              .slice(1) // remove markdown statement (e.g. "-", "*" or "+")
              .trim() // remove leading whitespace
              .slice(1), // remove the closing square bracket
            link: i[0]
              .split("](")[1] // get the link part
              .slice(0, -1), // remove the closing bracket
            tags: (typeof i[1] === "string"
              ? i[1].split(",").map((i) =>
                i.trim()
              )
              : []) // if the tags part is not undefined, split it with "," and trim its members, otherwise, just make it an empty array
              .map((t) => t.toLowerCase()), // convert tags to lowercase to make them case-insensitive
          };
        } catch (err) {
          return undefined;
        }
      }).filter((i) => i);
  }

  getKurdsWithTag(tag: string) {
    return this.kurds.filter((k) =>
      k.tags.includes(
        tag.toLowerCase(), // convert the input tag to lowercase for better match
      )
    );
  }

  // Reading says it all.
  searchForKurd(query: string) {
    return this.kurds.filter((k) =>
      k.name.toLowerCase().includes(query.toLowerCase())
    );
  }
}
