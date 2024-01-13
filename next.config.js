/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    includePaths: ["./src"],
    prependData:`@import "@/shared/styles/globals.scss";`
  },
};
module.exports = nextConfig
