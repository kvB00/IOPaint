import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { EraserButton } from './button'; // Import the EraserButton component

describe('EraserButton', () => {
  it('renders without crashing', () => {
    render(<EraserButton tooltip="Eraser Tool" />); // Render the EraserButton component with a tooltip
  });

  it('triggers the action when clicked', () => {
    const mockOnClick = jest.fn(); // Mock function to simulate click action
    const { getByText } = render(<EraserButton tooltip="Eraser Tool" onClick={mockOnClick} />); // Render the EraserButton component with a mock click action

    fireEvent.click(getByText('Eraser')); // Simulate a click on the button

    expect(mockOnClick).toHaveBeenCalled(); // Verify that the mock function was called
  });

  it('displays the tooltip', () => {
    const { getByText } = render(<EraserButton tooltip="Eraser Tool" />); // Render the EraserButton component with a tooltip

    fireEvent.mouseOver(getByText('Eraser')); // Simulate mouse over event

    expect(getByText('Eraser Tool')).toBeInTheDocument(); // Verify that the tooltip content is displayed
  });
});
