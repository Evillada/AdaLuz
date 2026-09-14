export function onlyPublished<T extends { published: boolean }>(items: T[]): T[] {
  return items.filter((item) => item.published);
}
