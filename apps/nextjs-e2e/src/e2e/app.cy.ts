import { getGreeting } from "../support/app.po";

describe("nextjs", () => {
  beforeEach(() => {
    return cy.visit("/");
  });

  it("should display наши книги", () => {
    // Function helper example, see `../support/app.po.ts` file
    getGreeting().contains("Наши книги");
  });
});
