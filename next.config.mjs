/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.module.rules.push(
      {
        test: /\.d\.ts$/,
        use: "null-loader", // Ignore les fichiers TypeScript de définition de types
      },
      {
        test: /\.sh$/,
        use: "null-loader", // Ignore les scripts shell
      }
    );
    return config;
  },
};

export default nextConfig;
