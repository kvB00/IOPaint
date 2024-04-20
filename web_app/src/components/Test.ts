// Cropper.test.js

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Cropper from './Cropper';

describe('Cropper', () => {
  it('renders without crashing', () => {
    const props = {
      maxHeight: 600,
      maxWidth: 800,
      scale: 1,
      minHeight: 100,
      minWidth: 100,
      show: true
    };

    render(<Cropper {...props} />);
  });

  it('resizes the cropping area on drag', () => {
    const props = {
      maxHeight: 600,
      maxWidth: 800,
      scale: 1,
      minHeight: 100,
      minWidth: 100,
      show: true
    };

    const { getByTestId } = render(<Cropper {...props} />);

    const cropSelection = getByTestId('crop-selection');

    // Simulate mouse down event
    fireEvent.pointerDown(cropSelection, { clientX: 100, clientY: 100 });

    // Simulate mouse move event
    fireEvent.pointerMove(window, { clientX: 150, clientY: 150 });

    // Assert the cropping area is resized accordingly
    expect(cropSelection).toHaveStyle('width: 50px');
    expect(cropSelection).toHaveStyle('height: 50px');

    // Simulate mouse up event
    fireEvent.pointerUp(window);
  });
});
