function pokepediaLinkTransform(input) {
    if (!input) return "";
    // replace multiple spaces or hyphens with a an underscore
    var slug = input.replace(/'+/g, "%27");
    // replace multiple spaces or hyphens with a an underscore
    slug = slug.replace(/\s+/g, "_");
    return slug;
}

export default pokepediaLinkTransform