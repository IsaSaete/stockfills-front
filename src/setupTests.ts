import "@testing-library/jest-dom/vitest";
import { setupServer } from "msw/node";
import { filamentsHandlers } from "./features/stock/mocks/handlers";

export const server = setupServer(...filamentsHandlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
