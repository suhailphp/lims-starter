// Test file to verify sidebar active state logic
// This file can be used for debugging the active state functionality

import { Path } from "../routes/path";
import type { SidebarMenuItem } from "../types/types";

// Mock location object for testing


// Test the isActive logic
const testIsActive = (item: SidebarMenuItem, location: { pathname: string }) => {
  // Check exact match for main link
  if (item.link && location.pathname === item.link) {
    return true;
  }

  // Check relativeLink (starts with) - handle both string and array
  if (item.relativeLink) {
    if (Array.isArray(item.relativeLink)) {
      if (item.relativeLink.some(link => location.pathname.startsWith(link))) {
        return true;
      }
    } else if (location.pathname.startsWith(item.relativeLink)) {
      return true;
    }
  }

  // Check childLink for backward compatibility (starts with)
  if (item.childLink && location.pathname.startsWith(item.childLink)) {
    return true;
  }
  
  return false;
};

// Test cases
const testCases = [
  {
    name: "All Agents with relativeLink",
    item: {
      label: "All Agents",
      icon: "icon-bot",
      link: Path.agents,
      relativeLink: Path.editAgent,
    },
    location: { pathname: "/edit-agent" },
    expected: true
  },
  {
    name: "All Agents on main page",
    item: {
      label: "All Agents",
      icon: "icon-bot",
      link: Path.agents,
      relativeLink: Path.editAgent,
    },
    location: { pathname: "/agents" },
    expected: true
  },
  {
    name: "All Generators with relativeLink",
    item: {
      label: "All Generators",
      icon: "icon-boxes",
      link: Path.allGenerators,
      relativeLink: Path.imageGenerator,
    },
    location: { pathname: "/image-generator" },
    expected: true
  },
  {
    name: "Non-matching path",
    item: {
      label: "All Agents",
      icon: "icon-bot",
      link: Path.agents,
      relativeLink: Path.editAgent,
    },
    location: { pathname: "/dashboard" },
    expected: false
  }
];

// Run tests
console.log("Running sidebar active state tests...");
testCases.forEach(test => {
  const result = testIsActive(test.item, test.location);
  const status = result === test.expected ? "PASS" : "FAIL";
  console.log(`${status}: ${test.name} - Expected: ${test.expected}, Got: ${result}`);
});

export { testIsActive, testCases };
