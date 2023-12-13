export type Post = {
  guid: string;
  title: string;
  pub_date: string;
  link: string;
  author: string;
  thumbnail: string;
  description: string;
  content: string;
  enclosure: any;
  categories: string[];
};

export type GetPosts = {
  success: boolean;
  data: Post[];
  pagination: {
    count: string;
    total: string;
  };
};
