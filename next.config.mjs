const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const isProjectPage =
  process.env.GITHUB_ACTIONS === "true" &&
  repositoryName.length > 0 &&
  !repositoryName.endsWith(".github.io");
const basePath = isProjectPage ? `/${repositoryName}` : "";

/** @type {import("next").NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  assetPrefix: basePath,
  images: {
    unoptimized: true
  }
};

export default nextConfig;
