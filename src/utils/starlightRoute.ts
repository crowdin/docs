type StarlightRouteLike = {
  slug: string;
  locale?: string;
  lang: string;
};

export function isStarlightHomepage(route: StarlightRouteLike): boolean {
  return (
    route.slug === '' ||
    (route.locale !== undefined &&
      (route.slug === route.locale || route.slug === `${route.locale}/index`))
  );
}

export function getStarlightLocaleForUrl(route: StarlightRouteLike): string {
  return route.lang;
}

export function getStarlightCurrentProduct(route: StarlightRouteLike): string | undefined {
  const slugSegments = route.slug.split('/').filter(Boolean);
  const nonLocaleSegments =
    route.locale && slugSegments[0] === route.locale
      ? slugSegments.slice(1)
      : slugSegments;

  return nonLocaleSegments[0];
}
