export function createSlug(name: string): string {
  let slug = name.toLowerCase();

  slug = slug.replace(/\s+/g, '-');

  slug = slug.replace(/[^\w-]/g, '');

  return slug;
}
