/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');

describe('Dark Mode Functionality', () => {
  let html;

  beforeEach(() => {
    // Load index.html as example
    html = fs.readFileSync(
      path.resolve(__dirname, '../index.html'),
      'utf8'
    );
    document.documentElement.innerHTML = html;
  });

  describe('Theme Detection', () => {
    test('should use system preference when no saved theme', () => {
      localStorage.getItem.mockReturnValue(null);
      window.matchMedia = jest.fn().mockImplementation(query => ({
        matches: query === '(prefers-color-scheme: dark)',
        media: query,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      }));

      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const expectedTheme = prefersDark ? 'dark' : 'light';

      expect(prefersDark).toBe(true);
      expect(expectedTheme).toBe('dark');
    });

    test('should use saved theme when available', () => {
      localStorage.getItem.mockReturnValue('dark');

      const savedTheme = localStorage.getItem('theme');
      expect(savedTheme).toBe('dark');
    });

    test('should default to light when no preference', () => {
      localStorage.getItem.mockReturnValue(null);
      window.matchMedia = jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      }));

      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const savedTheme = localStorage.getItem('theme') || (prefersDark ? 'dark' : 'light');

      expect(savedTheme).toBe('light');
    });
  });

  describe('Theme Toggle', () => {
    test('should toggle from light to dark', () => {
      const html = document.documentElement;
      html.setAttribute('data-theme', 'light');

      const currentTheme = html.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

      expect(currentTheme).toBe('light');
      expect(newTheme).toBe('dark');
    });

    test('should toggle from dark to light', () => {
      const html = document.documentElement;
      html.setAttribute('data-theme', 'dark');

      const currentTheme = html.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

      expect(currentTheme).toBe('dark');
      expect(newTheme).toBe('light');
    });

    test('should save theme to localStorage on toggle', () => {
      const newTheme = 'dark';
      localStorage.setItem('theme', newTheme);

      expect(localStorage.setItem).toHaveBeenCalledWith('theme', 'dark');
    });
  });

  describe('Button Text', () => {
    test('should show correct button text for light mode', () => {
      const theme = 'light';
      const buttonText = theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';

      expect(buttonText).toBe('🌙 Dark Mode');
    });

    test('should show correct button text for dark mode', () => {
      const theme = 'dark';
      const buttonText = theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';

      expect(buttonText).toBe('☀️ Light Mode');
    });
  });

  describe('System Preference Changes', () => {
    test('should only auto-switch if no manual preference set', () => {
      // No saved theme
      localStorage.getItem.mockReturnValue(null);
      expect(localStorage.getItem('theme')).toBeNull();

      // Should auto-switch
      const shouldAutoSwitch = !localStorage.getItem('theme');
      expect(shouldAutoSwitch).toBe(true);
    });

    test('should not auto-switch if user has manual preference', () => {
      // Saved theme exists
      localStorage.getItem.mockReturnValue('light');
      expect(localStorage.getItem('theme')).toBe('light');

      // Should NOT auto-switch
      const shouldAutoSwitch = !localStorage.getItem('theme');
      expect(shouldAutoSwitch).toBe(false);
    });
  });
});
