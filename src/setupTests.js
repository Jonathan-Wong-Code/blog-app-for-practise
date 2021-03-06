// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import { server } from "./tests/test-server";
import "@testing-library/jest-dom";

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());
