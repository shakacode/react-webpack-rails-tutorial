// This test verifies that SWC is configured correctly for:
// 1. Stimulus controller class name preservation (keepClassNames: true)
// 2. React 19 compatibility (automatic runtime)

describe('SWC Configuration', () => {
  describe('Class name preservation (required for Stimulus)', () => {
    it('preserves class names when transpiled', () => {
      // Define a test class similar to Stimulus controllers
      class TestController {
        constructor() {
          this.name = 'test';
        }
      }

      // Verify class name is preserved (keepClassNames: true in swc.config.js)
      expect(TestController.name).toBe('TestController');
    });

    it('preserves class names for extended classes', () => {
      class BaseController {}
      class CommentsController extends BaseController {}

      // This is critical for Stimulus to discover controllers by name
      expect(CommentsController.name).toBe('CommentsController');
      expect(BaseController.name).toBe('BaseController');
    });
  });

  describe('React automatic runtime (React 19 compatibility)', () => {
    it('allows JSX without explicit React import', () => {
      // With automatic runtime, we don't need to import React
      // This test verifies that JSX works without "import React from 'react'"
      const element = <div>Test</div>;

      expect(element).toBeDefined();
      expect(element.type).toBe('div');
      expect(element.props.children).toBe('Test');
    });
  });
});
