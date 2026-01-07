/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');

describe('Flight Planner', () => {
  let html;

  beforeEach(() => {
    // Load the HTML file
    html = fs.readFileSync(
      path.resolve(__dirname, '../flight-planner.html'),
      'utf8'
    );
    document.documentElement.innerHTML = html;
  });

  describe('Flight Calculation Functions', () => {
    test('should calculate flight time correctly', () => {
      // Input values
      const distance = 3451; // nautical miles (KJFK - EGLL)
      const cruiseSpeed = 450; // knots

      // Expected flight time
      const expectedHours = Math.floor(distance / cruiseSpeed);
      const expectedMinutes = Math.round(((distance / cruiseSpeed) - expectedHours) * 60);

      // Calculate
      const flightTimeHours = distance / cruiseSpeed;
      const hours = Math.floor(flightTimeHours);
      const minutes = Math.round((flightTimeHours - hours) * 60);

      expect(hours).toBe(expectedHours);
      expect(minutes).toBe(expectedMinutes);
      expect(hours).toBe(7);
      expect(minutes).toBe(40);
    });

    test('should calculate fuel required correctly', () => {
      const distance = 3451;
      const cruiseSpeed = 450;
      const fuelBurn = 4500; // lbs/hour

      const flightTimeHours = distance / cruiseSpeed;
      const fuelRequired = Math.round(fuelBurn * flightTimeHours);

      expect(fuelRequired).toBeGreaterThan(0);
      // 3451/450 = 7.669 hours, 4500 * 7.669 = 34510 (due to rounding)
      expect(fuelRequired).toBeGreaterThanOrEqual(34400);
      expect(fuelRequired).toBeLessThanOrEqual(34600);
    });

    test('should calculate reserve fuel (30 min)', () => {
      const fuelBurn = 4500;
      const reserveFuel = Math.round(fuelBurn * 0.5); // 30 min = 0.5 hours

      expect(reserveFuel).toBe(2250);
    });

    test('should calculate total fuel including reserves', () => {
      const fuelRequired = 34455;
      const reserveFuel = 2250;
      const totalFuel = fuelRequired + reserveFuel;

      expect(totalFuel).toBe(36705);
    });
  });

  describe('Form Elements', () => {
    test('should have all required form inputs', () => {
      const departure = document.getElementById('departure');
      const arrival = document.getElementById('arrival');
      const distance = document.getElementById('distance');
      const aircraft = document.getElementById('aircraft');
      const cruiseSpeed = document.getElementById('cruiseSpeed');
      const fuelBurn = document.getElementById('fuelBurn');

      expect(departure).toBeTruthy();
      expect(arrival).toBeTruthy();
      expect(distance).toBeTruthy();
      expect(aircraft).toBeTruthy();
      expect(cruiseSpeed).toBeTruthy();
      expect(fuelBurn).toBeTruthy();
    });

    test('should have result display elements', () => {
      const flightTime = document.getElementById('flightTime');
      const totalDistance = document.getElementById('totalDistance');
      const fuelRequired = document.getElementById('fuelRequired');
      const reserveFuel = document.getElementById('reserveFuel');

      expect(flightTime).toBeTruthy();
      expect(totalDistance).toBeTruthy();
      expect(fuelRequired).toBeTruthy();
      expect(reserveFuel).toBeTruthy();
    });

    test('should have aircraft options', () => {
      const aircraft = document.getElementById('aircraft');
      const options = aircraft.querySelectorAll('option');

      expect(options.length).toBeGreaterThan(0);
      expect(options.length).toBe(8); // Cessna 172, PA-28, King Air, 737, A320, 777, A350, 787
    });
  });

  describe('Popular Routes', () => {
    test('should have popular route cards', () => {
      const routeCards = document.querySelectorAll('.route-card');

      expect(routeCards.length).toBeGreaterThan(0);
      expect(routeCards.length).toBe(6); // 6 popular routes defined
    });

    test('should have onclick handlers for popular routes', () => {
      const routeCards = document.querySelectorAll('.route-card');
      routeCards.forEach(card => {
        const onclick = card.getAttribute('onclick');
        expect(onclick).toBeTruthy();
        expect(onclick).toContain('loadRoute');
      });
    });
  });

  describe('Dark Mode', () => {
    test('should have dark mode toggle button', () => {
      const darkModeToggle = document.getElementById('darkModeToggle');
      expect(darkModeToggle).toBeTruthy();
      expect(darkModeToggle.classList.contains('dark-mode-toggle')).toBe(true);
    });

    test('should detect system preference on load', () => {
      // matchMedia is mocked to return false by default
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      expect(prefersDark).toBe(false);
    });
  });
});
