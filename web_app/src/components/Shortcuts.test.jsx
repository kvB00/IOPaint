// Shortcuts.test.jsx
import '@testing-library/jest-dom'
import React from 'react';
import { render } from '@testing-library/react';
import Shortcuts from './Shortcuts'; // Assuming this is the JSX file you want to test

describe('Shortcuts', () => {
  it('renders correctly', () => {
    const { getByText } = render(<Shortcuts />);
    expect(getByText('Hotkeys')).toBeInTheDocument();
    expect(getByText('Pan')).toBeInTheDocument();
    // Add more assertions as needed
  });

  it('should toggle hotkeys dialog on pressing "h"', () => {
    const { getByLabelText, queryByText } = render(<Shortcuts />);

    // Initially, the dialog should not be visible
    expect(queryByText('Hotkeys')).not.toBeInTheDocument();

    // Trigger the hotkeys dialog by pressing "h"
    fireEvent.keyDown(getByLabelText('Hotkeys'), { key: 'h' });

    // After pressing "h", the dialog should be visible
    expect(queryByText('Hotkeys')).toBeInTheDocument();
  });

  
});
