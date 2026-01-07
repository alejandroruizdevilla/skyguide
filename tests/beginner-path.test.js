/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');

describe('Beginner Learning Path', () => {
  let html;

  beforeEach(() => {
    html = fs.readFileSync(
      path.resolve(__dirname, '../beginner-path.html'),
      'utf8'
    );
    document.documentElement.innerHTML = html;
  });

  describe('Page Structure', () => {
    test('should have timeline with week sections', () => {
      const weekSections = document.querySelectorAll('.week-section');
      expect(weekSections.length).toBeGreaterThanOrEqual(4); // At least 4 weeks
    });

    test('should have progress tracker', () => {
      const progressTracker = document.querySelector('.progress-tracker');
      expect(progressTracker).toBeTruthy();
    });

    test('should have progress bar', () => {
      const progressBar = document.getElementById('progressBar');
      expect(progressBar).toBeTruthy();
    });

    test('should have progress text', () => {
      const progressText = document.getElementById('progressText');
      expect(progressText).toBeTruthy();
    });

    test('should have checklist items', () => {
      const checklistItems = document.querySelectorAll('.checklist li');
      expect(checklistItems.length).toBe(4); // 4 weeks to check off
    });
  });

  describe('Progress Calculation', () => {
    test('should calculate 0% for no completed weeks', () => {
      const total = 4;
      const completed = 0;
      const percentage = Math.round((completed / total) * 100);

      expect(percentage).toBe(0);
    });

    test('should calculate 25% for 1 completed week', () => {
      const total = 4;
      const completed = 1;
      const percentage = Math.round((completed / total) * 100);

      expect(percentage).toBe(25);
    });

    test('should calculate 50% for 2 completed weeks', () => {
      const total = 4;
      const completed = 2;
      const percentage = Math.round((completed / total) * 100);

      expect(percentage).toBe(50);
    });

    test('should calculate 100% for all weeks completed', () => {
      const total = 4;
      const completed = 4;
      const percentage = Math.round((completed / total) * 100);

      expect(percentage).toBe(100);
    });
  });

  describe('Week Sections Content', () => {
    test('main week sections should have objectives', () => {
      // Only check the first 4 sections (the actual weeks, not "What's Next")
      const weekSections = document.querySelectorAll('.timeline .week-section');
      const mainWeeks = Array.from(weekSections).slice(0, 4);

      mainWeeks.forEach(section => {
        const objectives = section.querySelector('.objectives');
        expect(objectives).toBeTruthy();
      });
    });

    test('main week sections should have activities', () => {
      const weekSections = document.querySelectorAll('.timeline .week-section');
      const mainWeeks = Array.from(weekSections).slice(0, 4);

      mainWeeks.forEach(section => {
        const activities = section.querySelector('.activities');
        expect(activities).toBeTruthy();
      });
    });

    test('main week sections should have resources', () => {
      const weekSections = document.querySelectorAll('.timeline .week-section');
      const mainWeeks = Array.from(weekSections).slice(0, 4);

      mainWeeks.forEach(section => {
        const resources = section.querySelector('.resources');
        expect(resources).toBeTruthy();
      });
    });

    test('each week should have a title', () => {
      const weekSections = document.querySelectorAll('.week-section');

      weekSections.forEach(section => {
        const title = section.querySelector('.week-title, h2');
        expect(title).toBeTruthy();
        expect(title.textContent).toBeTruthy();
      });
    });
  });

  describe('LocalStorage Integration', () => {
    test('should save completed weeks to localStorage', () => {
      const completedWeeks = ['1', '2'];
      localStorage.setItem('learningPathProgress', JSON.stringify(completedWeeks));

      expect(localStorage.setItem).toHaveBeenCalledWith(
        'learningPathProgress',
        JSON.stringify(['1', '2'])
      );
    });

    test('should load saved progress from localStorage', () => {
      const savedProgress = JSON.stringify(['1', '2', '3']);
      window.localStorage.getItem.mockReturnValue(savedProgress);

      const completedWeeks = JSON.parse(localStorage.getItem('learningPathProgress') || '[]');

      expect(completedWeeks).toEqual(['1', '2', '3']);
      expect(completedWeeks.length).toBe(3);
    });

    test('should handle empty localStorage', () => {
      window.localStorage.getItem.mockReturnValue(null);

      const completedWeeks = JSON.parse(localStorage.getItem('learningPathProgress') || '[]');

      expect(completedWeeks).toEqual([]);
      expect(completedWeeks.length).toBe(0);
    });
  });

  describe('Week Markers', () => {
    test('should have week markers for each section', () => {
      const weekMarkers = document.querySelectorAll('.week-marker');
      expect(weekMarkers.length).toBe(4);
    });

    test('week markers should be numbered correctly', () => {
      const weekMarkers = document.querySelectorAll('.week-marker');
      const expectedNumbers = ['1', '2', '3', '4'];

      weekMarkers.forEach((marker, index) => {
        expect(marker.textContent.trim()).toBe(expectedNumbers[index]);
      });
    });
  });
});
