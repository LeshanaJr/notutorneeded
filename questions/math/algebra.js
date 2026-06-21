export const algebraQuestions = [
  {
    id: "alg-001",
    section: "Math",
    domain: "Algebra",
    skill: "Linear equations",
    difficulty: "Medium",
    module: 1,
    question:
      "For the equation \\(\\frac{3}{4}(x - 8) = 2x + 5\\), what is the value of \\(x\\)?",
    choices: [
      "\\(-\\frac{44}{5}\\)",
      "\\(-\\frac{32}{5}\\)",
      "\\(\\frac{32}{5}\\)",
      "\\(\\frac{44}{5}\\)"
    ],
    answer: "\\(-\\frac{44}{5}\\)",
    explanation:
      "Distribute to get \\(\\frac{3}{4}x - 6 = 2x + 5\\). Then \\(-11 = \\frac{5}{4}x\\), so \\(x = -\\frac{44}{5}\\)."
  },
  {
    id: "alg-002",
    section: "Math",
    domain: "Algebra",
    skill: "Systems of equations",
    difficulty: "Hard",
    module: 2,
    question:
      "The system \\(2x + 3y = 17\\) and \\(5x - 2y = 4\\) has solution \\((x, y)\\). What is the value of \\(x + y\\)?",
    choices: ["\\(3\\)", "\\(5\\)", "\\(7\\)", "\\(9\\)"],
    answer: "\\(5\\)",
    explanation:
      "Eliminating \\(y\\) gives \\(19x = 46\\), so \\(x = \\frac{46}{19}\\). Then \\(y = \\frac{49}{19}\\), and \\(x + y = 5\\)."
  },
  {
    id: "alg-003",
    section: "Math",
    domain: "Algebra",
    skill: "Linear functions",
    difficulty: "Medium",
    module: 1,
    question:
      "A line passes through \\((2, -1)\\) and \\((8, 11)\\). Which equation represents the line?",
    choices: [
      "\\(y = 2x - 5\\)",
      "\\(y = 2x + 5\\)",
      "\\(y = \\frac{1}{2}x - 2\\)",
      "\\(y = 3x - 7\\)"
    ],
    answer: "\\(y = 2x - 5\\)",
    explanation:
      "The slope is \\(\\frac{11 - (-1)}{8 - 2} = 2\\). Substituting \\((2,-1)\\) gives \\(-1 = 2(2) + b\\), so \\(b = -5\\)."
  },
  {
    id: "alg-004",
    section: "Math",
    domain: "Algebra",
    skill: "Interpreting linear models",
    difficulty: "Medium",
    module: 2,
    question:
      "A company charges \\(45\\) dollars plus \\(18\\) dollars per hour for equipment rental. If a customer paid \\(189\\) dollars, for how many hours was the equipment rented?",
    choices: ["\\(6\\)", "\\(7\\)", "\\(8\\)", "\\(9\\)"],
    answer: "\\(8\\)",
    explanation:
      "The model is \\(45 + 18h = 189\\). Subtracting \\(45\\) gives \\(18h = 144\\), so \\(h = 8\\)."
  },
  {
    id: "alg-005",
    section: "Math",
    domain: "Algebra",
    skill: "Inequalities",
    difficulty: "Hard",
    module: 2,
    question:
      "Which value of \\(x\\) is in the solution set of \\(-2(3x - 4) \\leq 5x + 19\\)?",
    choices: ["\\(-2\\)", "\\(-1\\)", "\\(0\\)", "\\(1\\)"],
    answer: "\\(1\\)",
    explanation:
      "Expand and solve: \\(-6x + 8 \\leq 5x + 19\\), so \\(-11 \\leq 11x\\), and \\(x \\geq -1\\). Of the choices, \\(1\\) is in the solution set."
  }
];
