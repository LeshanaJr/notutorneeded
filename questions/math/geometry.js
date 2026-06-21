export const geometryQuestions = [
  {
    id: "geo-001",
    section: "Math",
    domain: "Geometry and Trigonometry",
    skill: "Area and scale",
    difficulty: "Medium",
    module: 1,
    question:
      "A rectangle has perimeter \\(54\\). Its length is \\(3\\) more than twice its width. What is the area of the rectangle?",
    choices: ["\\(144\\)", "\\(152\\)", "\\(162\\)", "\\(180\\)"],
    answer: "\\(152\\)",
    explanation:
      "Let the width be \\(w\\). Then the length is \\(2w + 3\\), and \\(2(w + 2w + 3) = 54\\). Thus \\(6w + 6 = 54\\), so \\(w = 8\\) and the length is \\(19\\). The area is \\(8 \\times 19 = 152\\)."
  },
  {
    id: "geo-002",
    section: "Math",
    domain: "Geometry and Trigonometry",
    skill: "Circles",
    difficulty: "Hard",
    module: 2,
    question:
      "A circle has area \\(64\\pi\\). What is the circumference of the circle?",
    choices: ["\\(8\\pi\\)", "\\(16\\pi\\)", "\\(32\\pi\\)", "\\(64\\pi\\)"],
    answer: "\\(16\\pi\\)",
    explanation:
      "Since \\(\\pi r^2 = 64\\pi\\), \\(r = 8\\). The circumference is \\(2\\pi r = 16\\pi\\)."
  },
  {
    id: "geo-003",
    section: "Math",
    domain: "Geometry and Trigonometry",
    skill: "Right triangles",
    difficulty: "Medium",
    module: 1,
    question:
      "In right triangle \\(ABC\\), \\(\\angle C\\) is a right angle, \\(AC = 9\\), and \\(BC = 12\\). What is \\(\\sin A\\)?",
    choices: ["\\(\\frac{3}{5}\\)", "\\(\\frac{4}{5}\\)", "\\(\\frac{5}{4}\\)", "\\(\\frac{5}{3}\\)"],
    answer: "\\(\\frac{4}{5}\\)",
    explanation:
      "The hypotenuse is \\(15\\). Relative to \\(\\angle A\\), the opposite side is \\(BC = 12\\), so \\(\\sin A = \\frac{12}{15} = \\frac{4}{5}\\)."
  },
  {
    id: "geo-004",
    section: "Math",
    domain: "Geometry and Trigonometry",
    skill: "Volume",
    difficulty: "Hard",
    module: 2,
    question:
      "A right circular cylinder has radius \\(3\\) and volume \\(90\\pi\\). What is the height of the cylinder?",
    choices: ["\\(5\\)", "\\(10\\)", "\\(15\\)", "\\(30\\)"],
    answer: "\\(10\\)",
    explanation:
      "The volume is \\(\\pi r^2h\\). Since \\(90\\pi = \\pi(3)^2h = 9\\pi h\\), \\(h = 10\\)."
  },
  {
    id: "geo-005",
    section: "Math",
    domain: "Geometry and Trigonometry",
    skill: "Angles",
    difficulty: "Medium",
    module: 1,
    question:
      "Two parallel lines are cut by a transversal. One interior angle measures \\((5x + 12)^\\circ\\), and the same-side interior angle measures \\((3x + 24)^\\circ\\). What is \\(x\\)?",
    choices: ["\\(12\\)", "\\(15\\)", "\\(18\\)", "\\(21\\)"],
    answer: "\\(18\\)",
    explanation:
      "Same-side interior angles are supplementary, so \\((5x + 12) + (3x + 24) = 180\\). Thus \\(8x + 36 = 180\\), so \\(x = 18\\)."
  }
];
