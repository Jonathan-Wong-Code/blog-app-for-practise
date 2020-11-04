import {
  render,
  screen,
  waitForElementToBeRemoved,
  fireEvent,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "./App";

async function waitForLoadingToFinish() {
  await waitForElementToBeRemoved(() => [
    ...screen.queryAllByText(/loading/i),
    ...screen.queryAllByLabelText(/loading/i),
  ]);
}

test("renders the dashboard and allows delete post to be clicked", async () => {
  // Land on homepage
  window.history.pushState({}, "test-page", "/");
  render(<App />);

  await waitForLoadingToFinish();

  let blogLink = screen.getByRole("link", { name: /hello world/i });
  expect(blogLink).toBeInTheDocument();

  const deleteButton = screen.getByRole("button", { name: /delete post/i });
  userEvent.click(deleteButton);

  blogLink = screen.queryByRole("link", { name: /hello world/i });
  await waitForElementToBeRemoved(blogLink);

  expect(blogLink).not.toBeInTheDocument();

  userEvent.click(screen.getByRole("link", { name: /create post/i }));

  // Should be on create post screen
  const heading = screen.getByRole("heading", { name: /create a new post/i });
  expect(heading).toBeInTheDocument();

  // Type into create post form
  let titleInput = screen.getByLabelText(/enter title:/i);
  let blogPostInput = screen.getByLabelText(/enter body:/i);

  userEvent.type(titleInput, "test title");
  userEvent.type(blogPostInput, "test blogPost");

  expect(titleInput).toHaveValue("test title");
  expect(blogPostInput).toHaveValue("test blogPost");

  //submit form and create new post. Redirect to dashboard
  fireEvent.submit(screen.getByTestId("post-form"));
  await waitForElementToBeRemoved(screen.getByText(/creating new post.../i));

  // Navigated back to dashboard
  const newPost = screen.getByRole("link", { name: "test title" });
  expect(newPost).toBeInTheDocument();

  //Click it and navigate to single post page
  userEvent.click(newPost);

  await waitForLoadingToFinish();

  const editPostLink = screen.getByRole("link", { name: /edit post/i });
  expect(editPostLink).toBeInTheDocument();

  // Link edit post and land on edit post form.

  userEvent.click(editPostLink);
  titleInput = screen.getByLabelText(/enter title:/i);
  blogPostInput = screen.getByLabelText(/enter body:/i);

  userEvent.clear(titleInput);
  userEvent.type(titleInput, "new title");

  userEvent.clear(blogPostInput);
  userEvent.type(blogPostInput, "new blog");
  //Submit and update the post
  fireEvent.submit(screen.getByTestId("post-form"));
  await waitForElementToBeRemoved(screen.getByText(/updating post.../i));

  // Land back on dashboard and assert title has changed
  const headingLink = screen.getByRole("link", { name: /new title/i });
  expect(headingLink).toBeInTheDocument();

  // Navigate to single post and assert that title and body has changed
  userEvent.click(headingLink);

  expect(screen.getByText(/new blog/i)).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { name: "new title" })
  ).toBeInTheDocument();
});
