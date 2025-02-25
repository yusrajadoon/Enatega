describe("Basic UI Visibility Test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/", { failOnStatusCode: false });
  });

  it("Checks if the homepage is visible", () => {
    // Ensure the main page content is loaded
    cy.get("body").should("be.visible");
  });
});

describe("Skipped Tests (For Future Implementation)", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it.skip("Gets the current location of the user and displays it", () => {});

  it.skip("Displays user location in the dropdown", () => {});

  it.skip("Clicks 'Find Restaurants' and queries the endpoint", () => {});

  it.skip("Displays restaurants in a grid format", () => {});

  it.skip("Checks if the login button is visible", () => {});

  it.skip("Checks if the signup button is visible", () => {});

  it.skip("Checks if the location bar is visible on the homepage", () => {});
});
