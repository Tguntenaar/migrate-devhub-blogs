import fs from "fs";

function convertToNewStructure(input) {
  const snapshot = JSON.parse(input.snapshot.description);
  // const snapshotHistory = JSON.parse(input.snapshot_history[0].description);
  const titleId = `${snapshot.title.toLowerCase().replace(/\s+/g, "-")}-${
    input.id
  }`;

  const newStructure = {
    handle: input.snapshot.labels[1],
    data: {
      blog: {
        [titleId]: {
          "": snapshot.content,
          metadata: {
            title: snapshot.title,
            createdAt: new Date(Number(input.snapshot.timestamp) / 1e6)
              .toISOString()
              .slice(0, 10),
            updatedAt: new Date(Number(input.snapshot.timestamp) / 1e6)
              .toISOString()
              .slice(0, 10),
            publishedAt: new Date(Number(input.snapshot.timestamp) / 1e6)
              .toISOString()
              .slice(0, 10),
            status: "DRAFT",
            subtitle: snapshot.subtitle,
            description: snapshot.description || snapshot.subtitle,
            author: input.author_id,
            id: `${snapshot.id}`,
            category: snapshot?.category || "blog",
            communityAddonId: "blogv2",
          },
        },
      },
    },
  };

  return newStructure;
}

// Read input JSON file
fs.readFile("posts.json", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading input file:", err);
    return;
  }

  try {
    const inputArray = JSON.parse(data);
    const outputArray = inputArray.map(convertToNewStructure)
          .filter(entry => Object.keys(entry.data.blog)[0].match(/[^A-Za-z0-9-]+/g))
          .map(entry => {
            const originalKey = Object.keys(entry.data.blog)[0];
            const newKey = originalKey.replace(/[^A-Za-z0-9-]+/g, "-").replace(/\-+/g, "-");
            entry.data.blog[newKey] = entry.data.blog[originalKey];
            delete entry.data.blog[originalKey];
            return entry;
          });
    // const filteredOutput = outputArray.filter(
    //   (item) => item.handle === "devhub-test"
    // );

    
    // Write output JSON file
    fs.writeFile(
      "socialdb-structured.json",
      JSON.stringify(outputArray, null, 2),
      (err) => {
        if (err) {
          console.error("Error writing output file:", err);
          return;
        }
        console.log("Transformation complete. Output written to socialdb-structured.json");
      }
    );
  } catch (err) {
    console.error("Error parsing JSON data:", err);
  }
});
