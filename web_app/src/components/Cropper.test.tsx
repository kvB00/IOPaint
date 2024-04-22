import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Cropper from './Cropper';

// Mocking dependencies
jest.mock('@/lib/states', () => ({
  useStore: jest.fn(),
}));
jest.mock('@/lib/utils', () => ({
  cn: jest.fn(),
}));
jest.mock('tailwind-merge', () => ({
  twMerge: jest.fn(),
}));

describe('Cropper Component', () => {
  // Test case 1: Rendering
  test('Renders properly when show prop is true', () => {
    const props = {
      maxHeight: 500,
      maxWidth: 500,
      scale: 1,
      minHeight: 100,
      minWidth: 100,
      show: true,
    };
    // Mocking useStore hook return values
    const mockUseStore = jest.fn().mockReturnValue([0, 0, false, true, {}, jest.fn(), jest.fn(), jest.fn(), jest.fn(), false, jest.fn()]);
    jest.spyOn(React, 'useEffect').mockImplementationOnce((f) => f());
    jest.spyOn(React, 'useState').mockImplementationOnce(() => [0, jest.fn()]); // Mocking isMoving state

    const { container } = render(<Cropper {...props} />);
    expect(container).toBeInTheDocument();
  });

  // Test case 2: Resize Handlers
  test('Calls onCropPointerDown when crop area is clicked', () => {
    const props = {
      maxHeight: 500,
      maxWidth: 500,
      scale: 1,
      minHeight: 100,
      minWidth: 100,
      show: true,
    };
    // Mocking useStore hook return values
    const mockUseStore = jest.fn().mockReturnValue([0, 0, false, true, {}, jest.fn(), jest.fn(), jest.fn(), jest.fn(), false, jest.fn()]);
    jest.spyOn(React, 'useEffect').mockImplementationOnce((f) => f());
    jest.spyOn(React, 'useState').mockImplementationOnce(() => [0, jest.fn()]); // Mocking isMoving state
    const onCropPointerDown = jest.fn();
    const { getByLabelText } = render(<Cropper {...props} />);
    const cropArea = getByLabelText('topleft');
    fireEvent.pointerDown(cropArea);
    expect(onCropPointerDown).toHaveBeenCalled();
  });

});
