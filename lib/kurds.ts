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
    this.topics = Array.from(readme.matchAll(/\n## (.+)\n/g)).map(v => v[1]);

    for (const topic of this.topics) {
      for (const kurd of this.getKurdsInTopic(topic)) {
        if (!this.has(kurd)) {
          this.kurds.push({ ...kurd, topics: [topic] });
        } else {
          const i = this.kurds.findIndex(
            k => k.name == kurd.name && k.link == kurd.link
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
      this.kurds.filter(k => k.name == kurd.name && k.link == kurd.link)
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
      .filter(l => l != "" && !l.startsWith("## "))
      .map(i => i.split(": ", 2))
      .map(i => {
        try {
          return {
            name: i[0]
              .split("](")[0]
              .slice(1)
              .trim()
              .slice(1),
            link: i[0].split("](")[1].slice(0, -1),
            tags: (typeof i[1] === "string"
              ? i[1].split(",").map(tag => tag.trim())
              : []
            ).map(t => t.toLowerCase()),
          };
        } catch (err) {
          return undefined;
        }
      })
      .filter((i): i is Kurd => Boolean(i));
  }

  getKurdsWithTag(tag: string) {
    return this.kurds.filter(k =>
      k.tags.includes(tag.toLowerCase())
    );
  }

  searchForKurd(query: string) {
    return this.kurds.filter(k =>
      k.name.toLowerCase().includes(query.toLowerCase())
    );
  }
}

