const Image = require("@11ty/eleventy-img");

async function imageShortcode(src, alt, sizes = "100vw", loading = "lazy") {
  const srcPath = src.startsWith("/") ? `.${src}` : src;

  let metadata = await Image(srcPath, {
    widths: [400, 800, 1200, 1600],
    formats: ["avif", "webp", "jpeg"],
    outputDir: "./_site/images/opt/",
    urlPath: "/images/opt/",
  });

  let imageAttributes = {
    alt,
    sizes,
    loading,
    decoding: "async",
  };

  return Image.generateHTML(metadata, imageAttributes);
}

module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/assets");

  eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);

  eleventyConfig.addFilter("readableDate", (dateObj) => {
    const d = new Date(dateObj);
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  });

  return {
    dir: { input: "src", output: "_site", includes: "_includes", data: "_data" },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};
