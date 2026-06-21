export const advancedMathQuestions = [
  {
    id: "adv-001",
    section: "Math",
    domain: "Advanced Math",
    skill: "Quadratics",
    difficulty: "Hard",
    module: 2,
    question:
      "The quadratic function \\(f\\) is defined by \\(f(x) = x^2 - 10x + c\\), where \\(c\\) is a constant. If the minimum value of \\(f\\) is \\(-9\\), what is \\(c\\)?",
    choices: ["\\(16\\)", "\\(25\\)", "\\(34\\)", "\\(41\\)"],
    answer: "\\(16\\)",
    explanation:
      "Complete the square: \\(x^2 - 10x + c = (x - 5)^2 + c - 25\\). The minimum is \\(c - 25\\), so \\(c - 25 = -9\\), and \\(c = 16\\)."
  },
  {
    id: "adv-002",
    section: "Math",
    domain: "Advanced Math",
    skill: "Equivalent expressions",
    difficulty: "Medium",
    module: 1,
    question:
      "Which expression is equivalent to \\((2x - 3)^2 - (x + 4)(x - 4)\\)?",
    choices: [
      "\\(3x^2 - 12x + 25\\)",
      "\\(3x^2 - 12x - 7\\)",
      "\\(5x^2 - 12x + 25\\)",
      "\\(5x^2 - 12x - 7\\)"
    ],
    answer: "\\(3x^2 - 12x + 25\\)",
    explanation:
      "\\((2x - 3)^2 = 4x^2 - 12x + 9\\) and \\((x + 4)(x - 4) = x^2 - 16\\). Subtracting gives \\(3x^2 - 12x + 25\\)."
  },
  {
    id: "adv-003",
    section: "Math",
    domain: "Advanced Math",
    skill: "Radicals and exponents",
    difficulty: "Medium",
    module: 1,
    question:
      "If \\(\\sqrt{4x + 4} = x - 2\\), what is the value of \\(x\\)?",
    choices: ["\\(4\\)", "\\(5\\)", "\\(8\\)", "\\(10\\)"],
    answer: "\\(8\\)",
    explanation:
      "Squaring gives \\(4x + 4 = (x - 2)^2 = x^2 - 4x + 4\\), so \\(x^2 - 8x = 0\\). Since \\(x = 0\\) does not satisfy the original equation, \\(x = 8\\)."
  },
  {
    id: "adv-004",
    section: "Math",
    domain: "Advanced Math",
    skill: "Functions",
    difficulty: "Hard",
    module: 2,
    question:
      "For the function \\(g(x) = ax^2 + bx\\), where \\(a\\) and \\(b\\) are constants, \\(g(2) = 14\\) and \\(g(5) = 65\\). What is \\(a + b\\)?",
    choices: ["\\(3\\)", "\\(5\\)", "\\(7\\)", "\\(9\\)"],
    answer: "\\(5\\)",
    explanation:
      "From \\(g(2)=14\\), \\(4a + 2b = 14\\). From \\(g(5)=65\\), \\(25a + 5b = 65\\). Solving gives \\(a = 4\\) and \\(b = 1\\), so \\(a + b = 5\\)."
  },
  {
    id: "adv-005",
    section: "Math",
    domain: "Advanced Math",
    skill: "Polynomial factors",
    difficulty: "Hard",
    module: 2,
    question:
      "If \\(x - 3\\) is a factor of \\(x^2 + kx - 18\\), what is the value of \\(k\\)?",
    choices: ["\\(-3\\)", "\\(3\\)", "\\(6\\)", "\\(9\\)"],
    answer: "\\(3\\)",
    explanation:
      "If \\(x - 3\\) is a factor, then \\(x = 3\\) is a root. So \\(3^2 + 3k - 18 = 0\\), which gives \\(3k = 9\\), and \\(k = 3\\)."
  }
];
