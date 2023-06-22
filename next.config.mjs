
/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.mjs");
import { env } from "./src/env.mjs";


/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,

  /**
   * If you have `experimental: { appDir: true }` set, then you must comment the below `i18n` config
   * out.
   *
   * @see https://github.com/vercel/next.js/issues/41980
   */
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  images: {
    dangerouslyAllowSVG: true,
    domains: [
      "ui-avatars.com",
      "cloudflareipfs.com",
      "cloudflare-ipfs.com",
      "t-2.tstatic.net",
      "www.ibanez.com",
    ],
  },
  rewrites: async () => {
    return [
      {
        source: "/backend/:path*",
        destination: env.NEXT_PUBLIC_APITEST + "/:path*",
      },
    ];
  },
};
export default config;
