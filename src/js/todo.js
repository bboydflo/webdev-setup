import nanoid from "nanoid";

export const Todo = (text, done = false) => {
  return {
    text,
    done,
    id: nanoid()
  };
};
