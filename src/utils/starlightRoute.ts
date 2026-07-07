type StarlightRouteLike = {
  id: string;
  locale?: string;
  lang: string;
};

export function isStarlightHomepage(route: StarlightRouteLike): boolean {
  return (
    route.id === '' ||
    (route.locale !== undefined &&
      (route.id === route.locale || route.id === `${route.locale}/index`))
  );
}

export function getCurrentProduct(route: StarlightRouteLike): string | undefined {
  const slugSegments = route.id.split('/').filter(Boolean);
  const nonLocaleSegments =
    route.locale && slugSegments[0] === route.locale
      ? slugSegments.slice(1)
      : slugSegments;

  return nonLocaleSegments[0];
}
