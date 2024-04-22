// Mock the context object
const mockContext = {
    lineCap: '',
    lineJoin: '',
    moveTo: jest.fn(),
    lineTo: jest.fn(),
    stroke: jest.fn(),
    beginPath: jest.fn(),
  };
  
  // Mock the canvasRef.current
  const canvasRef = {
    current: {
      getBoundingClientRect: () => ({ left: 0, top: 0 }), // Mock the bounding rect
    },
  };
  
  describe('handleBrushMouseMove', () => {
    it('should draw a line on the canvas context', () => {
      // Mock isDragging to be true
      const isDragging = true;
  
      // Mock coordinates
      const coords = { x: 50, y: 50 };
  
      // Render the function with mocked dependencies
      const { canvas, context } = renderHandleBrushMouseMove(isDragging);
  
      // Call the function with mock coordinates
      handleBrushMouseMove(coords);
  
      // Assert that the canvas context is updated correctly
      expect(context.lineTo).toHaveBeenCalledWith(50, 50);
      expect(context.stroke).toHaveBeenCalled();
      expect(context.beginPath).toHaveBeenCalled();
      expect(context.moveTo).toHaveBeenCalledWith(50, 50);
    });
  });
  
  // Helper function to render the handleBrushMouseMove function with mocked dependencies
  const renderHandleBrushMouseMove = (isDragging) => {
    // Mock canvas element
    const canvas = document.createElement('canvas');
  
    // Attach canvas to the document body
    document.body.appendChild(canvas);
  
    // Set up mocked context
    const context = mockContext;
  
    // Call handleBrushMouseMove with mocked dependencies
    handleBrushMouseMove({ x: 0, y: 0 });
  
    // Return canvas and context for assertions
    return { canvas, context };
  };
  