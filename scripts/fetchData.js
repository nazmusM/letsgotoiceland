const { createClient } = require("@prismicio/client");
const config = require("../slicemachine.config.json");
const fs = require("fs");
const path = require("path");

const repositoryName =
  process.env.NEXT_PUBLIC_PRISMIC_ENVIRONMENT || config.repositoryName;

const fetchData = async (type) => {
  const client = createClient(repositoryName, config);
  const navbarData = await client.getSingle(type);

  const filePath = path.join(process.cwd(), "public", `${type}Data.json`);
  fs.writeFileSync(filePath, JSON.stringify(navbarData));
};

// fetchData("navbar").catch((error) => {
//   process.env.NODE_ENV === "development" && console.error("Failed to fetch navbar data:", error);
//   process.exit(1);
// });

fetchData("footer").catch((error) => {
  process.env.NODE_ENV === "development" && console.error("Failed to fetch footer data:", error);
  process.exit(1);
});
