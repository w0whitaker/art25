/** All blog posts as a collection. */
export const getAllPosts = collection => {
  return collection.getFilteredByGlob('./src/posts/**/*.md').reverse();
};

/** All relevant pages as a collection for sitemap.xml */
export const showInSitemap = collection => {
  return collection.getFilteredByGlob('./src/**/*.{md,njk}');
};

/** All tags from all posts as a collection - excluding custom collections */
export const tagList = collection => {
  const tagsSet = new Set();
  collection.getAll().forEach(item => {
    if (!item.data.tags) return;
    item.data.tags.filter(tag => !['posts', 'docs', 'all'].includes(tag)).forEach(tag => tagsSet.add(tag));
  });
  return Array.from(tagsSet).sort();
};

/** Create a collection for each 'year' of the artworks */
// thank you @hamatti@hamatti.org!
// https://hamatti.org/posts/list-blog-posts-grouped-by-year-with-eleventy/
export const paintingsByYear = collection => {
  const allPaintings = collection.getFilteredByTag('paintings');

  const paintingYear = {};

  allPaintings.forEach(item => {
    if (!item.data.painting['year']) return;
    const year = item.data.painting['year'];

    if (!paintingYear[year]) {
      paintingYear[year] = [];
    }

    paintingYear[year].push(item);
  });
  return paintingYear;
};

export const paperByYear = collection => {
  const allPaper = collection.getFilteredByTag('works-on-paper');
  const paperYear = {};

  allPaper.forEach(item => {
    if (!item.data.paper['year']) return;
    const year = item.data.paper['year'];
    if (!paperYear[year]) {
      paperYear[year] = [];
    }

    paperYear[year].push(item);
  });
  return paperYear;
};
