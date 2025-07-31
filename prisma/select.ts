export const blogSelect = {
  id: true,
  uuid: true,
  title: true,
  path: true,
  tags: true,
  description: true,
  reading_time: true,
  createdAt: true,
  views: true,
  likes: true,
  image: true,
  author: {
    select: {
      username: true,
      picture: true,
    },
  },
  _count: {
    select: {
      comments: true,
    },
  },
};
