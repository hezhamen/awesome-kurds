/**
 * @type import("next").NextConfig
 */
module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "facebook.com",
      "github.com",
      "twitter.com",
      "linkedin.com",
      "res.cloudinary.com",
      "avatars.dicebear.com",
    ],
  },
};
