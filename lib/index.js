//helper functions here
//function to convert blog title to a slug
 export function slugify(blogTitle) {
    blogTitle = blogTitle.toLowerCase();
    blogTitle = blogTitle.replace(/[^\w-]/g, '-');
    blogTitle = blogTitle.replace(/-+/g, '-');
    return blogTitle;
  }