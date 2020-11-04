import { rest } from "msw";

const delay = process.env.NODE_ENV === "test" ? 0 : 1000;
const endpoint = process.env.REACT_APP_API_URL;

let posts = [
  {
    title: "Hello world",
    blogPost: "This is my post description",
    createdAt: Date.now(),
    id: "abc123",
  },
];

const handlers = [
  rest.get(endpoint, (req, res, ctx) => {
    return res(ctx.delay(delay), ctx.status(200), ctx.json({ posts: posts }));
  }),

  rest.get(`${endpoint}/:id`, (req, res, ctx) => {
    const singlePost = posts.find((post) => post.id === req.params.id);
    return res(
      ctx.delay(delay),
      ctx.status(200),
      ctx.json({ post: singlePost })
    );
  }),

  rest.post(endpoint, (req, res, ctx) => {
    if (!req.body.title || !req.body.blogPost) {
      return res(
        ctx.status(400),
        ctx.delay(delay),
        ctx.json({ message: "Please fill out all required fields" })
      );
    }

    posts.push(req.body);
    return res(ctx.status(200), ctx.delay(delay), ctx.json({ post: req.body }));
  }),

  rest.delete(`${endpoint}/:id`, (req, res, ctx) => {
    posts = posts.filter((post) => post.id !== req.params.id);
    return res(ctx.json({ message: "item deleted" }), ctx.delay(delay));
  }),

  rest.put(`${endpoint}/:id`, (req, res, ctx) => {
    if (!req.body.title || !req.body.blogPost) {
      return res(
        ctx.status(400),
        ctx.delay(delay),
        ctx.json({ message: "Please fill out all required fields" })
      );
    }
    posts = posts.map((post) => (post.id === req.params.id ? req.body : post));
    return res(ctx.status(200), ctx.delay(delay), ctx.json({ post: req.body }));
  }),
];

export default handlers;
