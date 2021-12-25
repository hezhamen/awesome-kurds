export async function getKurds() {
  const markdown = await getMarkdown(
    "https://raw.githubusercontent.com/DevelopersTree/awesome-kurds/main/README.md"
  );
  return parse(markdown);
}

async function getMarkdown(url) {
  let response = await fetch(url);
  return await response.text();
}

function parse(markdown) {
  const sections = getSections(markdown);

  // https://stackoverflow.com/a/70326197/7003797
  const regex = /-\s*\[([^\]]+)\]\(([^)]+)\)(?::\s*(.*))?/gi;
  const matches = [...markdown.matchAll(regex)];

  const kurds = matches.map((m) => {
    let profile = getProfile(m[2]);

    return {
      name: m[1],
      link: m[2],
      tags: m[3] ? m[3].split(",").map((t) => t.trim()) : [],
      image: profile.image,
      username: profile.username,
      titles: [
        lastElementOf(sections.filter((s) => s.line < getLineNumber(m))).name,
      ],
    };
  });

  return deduplicate(kurds);
}

function lastElementOf(array) {
  return array[array.length - 1];
}

function deduplicate(kurds) {
  let map = {};

  for (const kurd of kurds) {
    let existing = map[kurd.link];

    if (existing) {
      existing.titles = [...existing.titles, ...kurd.titles];
    } else {
      map[kurd.link] = kurd;
    }
  }

  return Object.values(map);
}

function getProfile(link) {
  let image = null;
  let username = null;

  if (/twitter.com/gi.test(link)) {
    // https://stackoverflow.com/a/9396453/7003797
    username = link.match(
      /https?:\/\/(www\.)?twitter\.com\/(#!\/)?@?([^\/]*)/
    )[3];
    image = `https://res.cloudinary.com/mhmd-azeez/image/twitter_name/${username}.jpg`;
  } else if (/github.com/gi.test(link)) {
    username = link.match(
      /https?:\/\/(www\.)?github\.com\/(#!\/)?@?([^\/]*)/
    )[3];
    image = `https://github.com/${username}.png`;
  }

  return {
    image,
    username,
  };
}

// https://stackoverflow.com/a/57594471/7003797
function getLineNumber(match) {
  if (!match) {
    return -1;
  }

  let line = 1;
  for (let i = 0; i < match.index; i++) {
    if (match.input[i] == "\n") {
      line++;
    }
  }

  return line;
}

function getSections(markdown) {
  let matches = [...markdown.matchAll(/##\s+(.*)/gi)];

  return matches.map((m) => {
    return {
      name: m[1],
      line: getLineNumber(m),
    };
  });
}
