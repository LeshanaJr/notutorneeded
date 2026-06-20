import { algebraQuestions } from "./questions/math/algebra.js";
import { advancedMathQuestions } from "./questions/math/advanced-math.js";
import { geometryQuestions } from "./questions/math/geometry.js";
import { problemSolvingQuestions } from "./questions/math/problem-solving.js";
import { boundariesQuestions } from "./questions/reading-writing/boundaries.js";
import { inferencesQuestions } from "./questions/reading-writing/inferences.js";
import { rhetoricQuestions } from "./questions/reading-writing/rhetoric.js";
import { transitionsQuestions } from "./questions/reading-writing/transitions.js";

export const questionBank = [
  ...algebraQuestions,
  ...advancedMathQuestions,
  ...geometryQuestions,
  ...problemSolvingQuestions,
  ...boundariesQuestions,
  ...inferencesQuestions,
  ...rhetoricQuestions,
  ...transitionsQuestions
];

export const satDomains = [
  {
    id: "Algebra",
    section: "Math",
    description: "Linear equations, systems, inequalities, slope, and functions.",
    lesson: [
      "Isolate the variable before calculating.",
      "For systems, substitute or set equal when both equations equal the same expression.",
      "Check whether the question asks for a value, point, or interpretation."
    ]
  },
  {
    id: "Advanced Math",
    section: "Math",
    description: "Quadratics, nonlinear functions, radicals, equivalent expressions, and polynomials.",
    lesson: [
      "Look for factoring patterns before expanding.",
      "Use roots and function notation to avoid unnecessary steps.",
      "When choices are expressions, test structure and equivalent forms."
    ]
  },
  {
    id: "Problem-Solving and Data Analysis",
    section: "Math",
    description: "Percentages, ratios, rates, probability, averages, and data interpretation.",
    lesson: [
      "Write units next to every number.",
      "Turn percent changes into multipliers.",
      "For tables or word problems, name what one unit represents first."
    ]
  },
  {
    id: "Geometry and Trigonometry",
    section: "Math",
    description: "Area, volume, circles, triangles, angles, and right-triangle relationships.",
    lesson: [
      "Mark the figure with every known value.",
      "Look for special triangles and circle formulas.",
      "Use the formula that matches what the question asks, not just what is visible."
    ]
  },
  {
    id: "Information and Ideas",
    section: "Reading and Writing",
    description: "Central ideas, details, inferences, evidence, and text-based conclusions.",
    lesson: [
      "Use only what the text supports.",
      "Eliminate choices that go beyond the evidence.",
      "For inference questions, choose the safest conclusion."
    ]
  },
  {
    id: "Craft and Structure",
    section: "Reading and Writing",
    description: "Words in context, text structure, author purpose, and cross-text connections.",
    lesson: [
      "Replace the target word with a simple meaning first.",
      "Ask why the author included the detail.",
      "Compare claims before comparing tone or examples."
    ]
  },
  {
    id: "Expression of Ideas",
    section: "Reading and Writing",
    description: "Transitions, rhetorical synthesis, purpose, organization, and concise revision.",
    lesson: [
      "Identify the relationship between ideas: contrast, cause, addition, or example.",
      "Use the stated goal to decide which details matter.",
      "Prefer clear, specific, non-repetitive answers."
    ]
  },
  {
    id: "Standard English Conventions",
    section: "Reading and Writing",
    description: "Grammar, punctuation, sentence boundaries, agreement, and modifiers.",
    lesson: [
      "Find the subject and verb before judging agreement.",
      "Use punctuation to separate complete thoughts correctly.",
      "Check what each modifier describes."
    ]
  }
];
