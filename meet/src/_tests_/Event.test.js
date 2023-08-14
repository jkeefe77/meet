import React from "react";
import Event from "../components/Event";
import { render, screen, fireEvent } from "@testing-library/react";
import mockData from "../mock-data";
import "@testing-library/jest-dom";

describe("<Event /> component", () => {
  test("render event location", () => {
    const { container } = render(<Event event={mockData[0]} />);
    expect(container.querySelector(".location")).toBeInTheDocument();
  });

  test("render event details button with the title (show details)", () => {
    const { container } = render(<Event event={mockData[0]} />);
    expect(container.querySelector(".show-details-button")).toBeInTheDocument();
  });

  test("by default, event's detailed section should be hidden and becomes visible when the user clicks on the 'Show Details' button", () => {
    render(<Event event={mockData[0]} />);
    const showDetailsButton = screen.getByText("Show Details");
    fireEvent.click(showDetailsButton);
    const detailsSection = screen.getByTestId("details-section"); // Assuming you added a testID to the details section, otherwise use the class name
    expect(detailsSection).toBeInTheDocument(); // The details section should be in the document when it becomes visible
  });

  test("the 'Show Details' button should be hidden by default and becomes visible when the user clicks on the 'Hide Details' button", () => {
    render(<Event event={mockData[0]} />);

    const showDetailsButton = screen.getByText(/show details/i);
    expect(showDetailsButton).toBeInTheDocument(); // The 'Show Details' button should be in the document by default

    const hideDetailsButton = screen.queryByText(/hide details/i);
    expect(hideDetailsButton).toBeNull(); // The 'Hide Details' button should not be in the document by default

    fireEvent.click(showDetailsButton);

    const hideDetailsButtonAfterClick = screen.getByText(/hide details/i);
    expect(hideDetailsButtonAfterClick).toBeInTheDocument(); // The 'Hide Details' button should be in the document after clicking 'Show Details'
  });

  test("by default, event's detailed section should be visible and becomes hidden when the user clicks on the 'Hide Details' button", async () => {
    render(<Event event={mockData[0]} />);

    // Ensure that the description is not in the document when showDetails is false
    const description = screen.queryByText(mockData[0].description);
    expect(description).not.toBeInTheDocument();

    const showDetailsButton = screen.getByText("Show Details");
    fireEvent.click(showDetailsButton);

    // Wait for the description element to appear in the document
    const visibleDescription = await screen.findByTestId("details-section");

    // After clicking the "Show Details" button, the description should be visible
    expect(visibleDescription).toBeInTheDocument();

    // Access the description text
    const descriptionText = visibleDescription.textContent;
    expect(descriptionText).toBe(mockData[0].description);

    const hideDetailsButton = screen.getByText("Hide Details");
    fireEvent.click(hideDetailsButton);

    // After clicking the "Hide Details" button, the description should be hidden
    expect(visibleDescription).not.toBeInTheDocument();
  });
});
