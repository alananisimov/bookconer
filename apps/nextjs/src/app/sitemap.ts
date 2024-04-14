import type { MetadataRoute } from "next";

import { api } from "~/trpc/server";
import { SITE_URL } from "../constants";

const staticRoutes = ["/", "/my"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const books = await api.book.all();

  const bookPages = books.map((book) => {
    return {
      url: new URL(`/${book.title}`, SITE_URL).toString(),
      lastModified: book.updatedAt?.toISOString(),
    };
  });

  const staticUrls = staticRoutes.map((route) => {
    return {
      url: new URL(route, SITE_URL).toString(),
      lastModified: new Date().toISOString(),
    };
  });

  return [...staticUrls, ...bookPages];
}
