export const algebraQuestions = [
  {
    id: "alg-001",
    section: "Math",
    domain: "Algebra",
    skill: "Linear equations",
    difficulty: "Easy",
    module: 1,

    question:
      "If 4x + 9 = 29, what is the value of x?",

    choices: [
      "4",
      "5",
      "6",
      "7"
    ],

    answer: "5",

    explanation:
      "Subtracting 9 from both sides gives 4x = 20, so x = 5."
  },

  {
    id: "alg-002",
    section: "Math",
    domain: "Algebra",
    skill: "Systems of equations",
    difficulty: "Medium",
    module: 1,

    question:
      "What is the solution to the system y = x + 3 and y = 2x - 1?",

    choices: [
      "(2, 5)",
      "(3, 6)",
      "(4, 7)",
      "(1, 4)"
    ],

    answer: "(4, 7)",

    explanation:
      "Setting x + 3 equal to 2x - 1 gives x = 4. Substituting gives y = 7."
  },

  {
    id: "alg-003",
    section: "Math",
    domain: "Algebra",
    skill: "Slope",
    difficulty: "Easy",
    module: 1,

    question:
      "What is the slope of the line passing through (2, 5) and (6, 13)?",

    choices: [
      "1",
      "2",
      "3",
      "4"
    ],

    answer: "2",

    explanation:
      "Using the slope formula gives (13 - 5)/(6 - 2) = 8/4 = 2."
  },

  {
    id: "alg-004",
    section: "Math",
    domain: "Algebra",
    skill: "Exponential growth",
    difficulty: "Medium",
    module: 2,

    question:
      "A population doubles every 4 years. If the initial population is 200, what is the population after 8 years?",

    choices: [
      "400",
      "600",
      "800",
      "1600"
    ],

    answer: "800",

    explanation:
      "The population doubles twice in 8 years, so 200 × 2 × 2 = 800."
  },

  {
    id: "alg-005",
    section: "Math",
    domain: "Algebra",
    skill: "Inequalities",
    difficulty: "Medium",
    module: 2,

    question:
      "Which value satisfies the inequality 3x - 5 > 16?",

    choices: [
      "5",
      "6",
      "7",
      "4"
    ],

    answer: "8",

    explanation:
      "Adding 5 gives 3x > 21, then dividing by 3 gives x > 7."
  }
];
