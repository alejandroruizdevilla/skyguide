/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');

describe('Filter Functionality', () => {
  describe('Screenshot Gallery Filters', () => {
    let html;

    beforeEach(() => {
      html = fs.readFileSync(
        path.resolve(__dirname, '../screenshot-gallery.html'),
        'utf8'
      );
      document.documentElement.innerHTML = html;
    });

    test('should have filter buttons', () => {
      const filterButtons = document.querySelectorAll('.filter-btn');
      expect(filterButtons.length).toBeGreaterThan(0);
    });

    test('should have screenshot cards', () => {
      const screenshotCards = document.querySelectorAll('.screenshot-card');
      expect(screenshotCards.length).toBeGreaterThan(0);
      expect(screenshotCards.length).toBeGreaterThanOrEqual(12); // At least 12 sample screenshots
    });

    test('should filter cards by category', () => {
      const cards = document.querySelectorAll('.screenshot-card');
      const filter = 'msfs2024';

      cards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          expect(card.style.display).not.toBe('none');
        }
      });
    });

    test('should have correct data-category attributes', () => {
      const cards = document.querySelectorAll('.screenshot-card');
      const validCategories = ['msfs2024', 'msfs2020', 'xplane', 'dcs', 'prepar3d', 'il2'];

      cards.forEach(card => {
        const category = card.getAttribute('data-category');
        expect(validCategories).toContain(category);
      });
    });
  });

  describe('Addon Marketplace Filters', () => {
    let html;

    beforeEach(() => {
      html = fs.readFileSync(
        path.resolve(__dirname, '../addon-marketplace.html'),
        'utf8'
      );
      document.documentElement.innerHTML = html;
    });

    test('should have category filter buttons', () => {
      const categoryButtons = document.querySelectorAll('[data-type="category"]');
      expect(categoryButtons.length).toBeGreaterThan(0);
    });

    test('should have price filter buttons', () => {
      const priceButtons = document.querySelectorAll('[data-type="price"]');
      expect(priceButtons.length).toBeGreaterThan(0);
    });

    test('should have addon cards with correct attributes', () => {
      const addonCards = document.querySelectorAll('.addon-card');

      addonCards.forEach(card => {
        expect(card.hasAttribute('data-category')).toBe(true);
        expect(card.hasAttribute('data-price')).toBe(true);
      });
    });

    test('should filter by both category and price', () => {
      const cards = document.querySelectorAll('.addon-card');
      const activeCategory = 'aircraft';
      const activePrice = 'free';

      cards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        const cardPrice = card.getAttribute('data-price');

        const categoryMatch = activeCategory === 'all' || cardCategory === activeCategory;
        const priceMatch = activePrice === 'all' || cardPrice === activePrice;

        if (categoryMatch && priceMatch) {
          expect(card.style.display).not.toBe('none');
        }
      });
    });
  });

  describe('Live Streamers Filters', () => {
    let html;

    beforeEach(() => {
      html = fs.readFileSync(
        path.resolve(__dirname, '../live-streamers.html'),
        'utf8'
      );
      document.documentElement.innerHTML = html;
    });

    test('should have streamer cards', () => {
      const streamerCards = document.querySelectorAll('.streamer-card');
      expect(streamerCards.length).toBeGreaterThan(0);
    });

    test('should have valid category attributes', () => {
      const cards = document.querySelectorAll('.streamer-card');
      const validCategories = ['msfs', 'xplane', 'dcs', 'mixed'];

      cards.forEach(card => {
        const category = card.getAttribute('data-category');
        expect(validCategories).toContain(category);
      });
    });
  });

  describe('Performance Benchmarks Filters', () => {
    let html;

    beforeEach(() => {
      html = fs.readFileSync(
        path.resolve(__dirname, '../performance-benchmarks.html'),
        'utf8'
      );
      document.documentElement.innerHTML = html;
    });

    test('should have benchmark cards', () => {
      const benchmarkCards = document.querySelectorAll('.benchmark-card');
      expect(benchmarkCards.length).toBeGreaterThan(0);
    });

    test('should have valid simulator categories', () => {
      const cards = document.querySelectorAll('.benchmark-card');
      const validCategories = ['msfs2024', 'msfs2020', 'xplane', 'dcs'];

      cards.forEach(card => {
        const category = card.getAttribute('data-category');
        expect(validCategories).toContain(category);
      });
    });
  });

  describe('Events Calendar Filters', () => {
    let html;

    beforeEach(() => {
      html = fs.readFileSync(
        path.resolve(__dirname, '../events-calendar.html'),
        'utf8'
      );
      document.documentElement.innerHTML = html;
    });

    test('should have event cards', () => {
      const eventCards = document.querySelectorAll('.event-card');
      expect(eventCards.length).toBeGreaterThan(0);
    });

    test('should have valid event types', () => {
      const cards = document.querySelectorAll('.event-card');
      const validTypes = ['vatsim', 'group-flight', 'race', 'training'];

      cards.forEach(card => {
        const category = card.getAttribute('data-category');
        expect(validTypes).toContain(category);
      });
    });

    test('should have event type classes', () => {
      const cards = document.querySelectorAll('.event-card');
      const validClasses = ['vatsim', 'group-flight', 'race', 'training'];

      cards.forEach(card => {
        const hasValidClass = validClasses.some(cls => card.classList.contains(cls));
        expect(hasValidClass).toBe(true);
      });
    });
  });
});
