import nanoid from "nanoid";

export const Todo = (text, done = false, userId) => {
  const id = nanoid();
  return {
    id,
    text,
    done,
    userId
  };
};
