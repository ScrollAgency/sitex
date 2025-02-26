/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    // Ajoute des règles pour ignorer certains fichiers
    config.module.rules.push(
      {
        test: /\.d\.ts$/,
        use: "null-loader", // Ignore les fichiers .d.ts
      },
      {
        test: /\.sh$/,
        use: "null-loader", // Ignore les fichiers .sh
      }
    );

    // Ajoute les extensions TypeScript
    config.resolve.extensions.push(".ts", ".tsx");

    return config;
  },
};

export default nextConfig;
