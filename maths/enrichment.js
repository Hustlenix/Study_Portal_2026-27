window.MATH_EXTRA = {
  "polynomials": {
    "sections": [
      {
        "title": "A polynomial is a machine",
        "explain": "Give the machine a number x. The result is its output. A zero is an input that makes the output exactly zero.",
        "example": "For x² − 9, inputs 3 and −3 both give zero.",
        "method": "Put the polynomial equal to zero; use factorisation or a known identity."
      },
      {
        "title": "Splitting the middle term",
        "explain": "For ax²+bx+c, find two numbers whose product is a×c and sum is b. Split bx using those two numbers.",
        "example": "For 2x²−7x+3: product 6, sum −7, so use −6 and −1.",
        "method": "Rewrite 2x²−6x−x+3 and factor by grouping."
      },
      {
        "title": "Coefficients are shortcuts",
        "explain": "If roots are α and β, the coefficient of x determines their sum, and the constant determines their product.",
        "example": "For 2x²−7x+3: sum = 7/2; product = 3/2.",
        "method": "Use α+β=−b/a and αβ=c/a, then verify from your roots."
      }
    ],
    "worked": {
      "q": "One zero of x² + kx − 12 is 4. Find k and the other zero.",
      "steps": [
        "Since 4 is a zero, 4² + 4k − 12 = 0.",
        "16 + 4k − 12 = 0, so 4k = −4 and k = −1.",
        "Polynomial becomes x² − x − 12 = (x − 4)(x + 3).",
        "The other zero is −3."
      ],
      "answer": "k = −1; other zero = −3"
    },
    "challenge": [
      {
        "q": "Find the zeroes of x² − 9.",
        "a": "−3 and 3",
        "work": "Difference of squares: (x−3)(x+3)=0.",
        "level": "easy"
      },
      {
        "q": "Form a monic polynomial with zeroes 4 and −1.",
        "a": "x² − 3x − 4",
        "work": "(x−4)(x+1) = x²−3x−4.",
        "level": "easy"
      },
      {
        "q": "Find zeroes of 4x² − 4x − 3.",
        "a": "3/2 and −1/2",
        "work": "(2x−3)(2x+1)=0.",
        "level": "medium"
      },
      {
        "q": "Form a monic quadratic with sum of roots −2 and product −15.",
        "a": "x² + 2x − 15",
        "work": "Formula: x² − (sum)x + product.",
        "level": "medium"
      },
      {
        "q": "If 2 is a zero of 2x² + kx − 6, find k.",
        "a": "−1",
        "work": "Substitute x=2: 8+2k−6=0 → k=−1.",
        "level": "hard"
      }
    ],
    "mcq": [
      {
        "q": "Which number is a zero of p(x) = x² − 9?",
        "options": [
          "3",
          "9",
          "0",
          "1"
        ],
        "correct": 0,
        "explanation": "p(3) = 3² − 9 = 0. −3 is also a zero, but is not among the other options."
      },
      {
        "q": "Which are the zeroes of x² − 5x + 6?",
        "options": [
          "1 and 6",
          "2 and 3",
          "−2 and −3",
          "5 and 6"
        ],
        "correct": 1,
        "explanation": "Factor: (x − 2)(x − 3) = 0. The roots are 2 and 3."
      },
      {
        "q": "For x²−5x+6, the sum of zeroes is:",
        "options": [
          "−5",
          "6",
          "5",
          "−6"
        ],
        "correct": 2,
        "explanation": "Sum = −b/a = 5."
      }
    ]
  },
  "linear": {
    "sections": [
      {
        "title": "What do two equations mean?",
        "explain": "x and y are two mystery values. Each equation is a clue. A solution must satisfy BOTH clues simultaneously.",
        "example": "x+y=8 means many pairs work, but the second equation selects one pair (unless lines overlap or never meet).",
        "method": "Name variables, write two correct equations, check the final pair in both."
      },
      {
        "title": "Elimination without confusion",
        "explain": "Make the coefficient of one variable equal (or opposite) in both equations, then subtract (or add) the WHOLE equations.",
        "example": "2x+3y=13 and 2x+2y=10: subtract term by term to get y=3.",
        "method": "Use brackets whenever subtracting: (2x+3y)−(2x+2y)."
      },
      {
        "title": "Number of solutions",
        "explain": "Two lines cross once → one solution; are parallel → no solution; coincide → infinitely many solutions.",
        "example": "2x+4y=10 and x+2y=5 describe the same line.",
        "method": "For a₁x+b₁y+c₁=0 and a₂x+b₂y+c₂=0: unequal a₁/a₂ and b₁/b₂ → one; equal first two but unequal constants → none; all equal → infinitely many (when ratios are defined)."
      }
    ],
    "worked": {
      "q": "The sum of two numbers is 42. One number is 8 more than the other. Find them.",
      "steps": [
        "Let the larger number be x, smaller be y.",
        "Translate: x+y=42; x−y=8.",
        "Add equations: 2x=50 → x=25.",
        "Then y=42−25=17."
      ],
      "answer": "25 and 17"
    },
    "challenge": [
      {
        "q": "Solve x+y=12 and x−y=4.",
        "a": "x=8, y=4",
        "work": "Add equations: 2x=16, so x=8 and y=4.",
        "level": "easy"
      },
      {
        "q": "Solve 3x+2y=18 and x+y=7.",
        "a": "x=4, y=3",
        "work": "Double x+y=7: 2x+2y=14; subtract → x=4, y=3.",
        "level": "medium"
      },
      {
        "q": "How many solutions: 2x+4y=10 and x+2y=5?",
        "a": "Infinitely many",
        "work": "First equation is exactly twice the second; same line.",
        "level": "medium"
      },
      {
        "q": "A two-digit number has digit sum 9; tens digit is 3 more than units digit. Find it.",
        "a": "63",
        "work": "t+u=9 and t−u=3 → t=6,u=3.",
        "level": "medium"
      },
      {
        "q": "2 notebooks + 3 pens cost ₹96. 3 notebooks + 2 pens cost ₹104. Find unit prices.",
        "a": "Notebook ₹24; pen ₹16",
        "work": "2n+3p=96, 3n+2p=104. Eliminate n to find p=16, then n=24.",
        "level": "hard"
      }
    ],
    "mcq": [
      {
        "q": "Which is a solution of x+y=7 and x−y=1?",
        "options": [
          "(4,3)",
          "(3,4)",
          "(6,1)",
          "(7,0)"
        ],
        "correct": 0,
        "explanation": "4+3=7 and 4−3=1."
      },
      {
        "q": "Solve x + y = 7 and x − y = 1. What is y?",
        "options": [
          "1",
          "2",
          "3",
          "4"
        ],
        "correct": 2,
        "explanation": "Add equations: 2x = 8, so x = 4. Then y = 7 − 4 = 3."
      },
      {
        "q": "When both equations represent the same line, the number of solutions is:",
        "options": [
          "zero",
          "one",
          "two",
          "infinitely many"
        ],
        "correct": 3,
        "explanation": "Every point on the line satisfies both equations."
      }
    ]
  },
  "quadratics": {
    "sections": [
      {
        "title": "Why the square matters",
        "explain": "A quadratic equation contains x², so there may be two answers. First move every term to one side to get ax²+bx+c=0.",
        "example": "x²=9 has two answers, 3 and −3.",
        "method": "Never divide by x blindly: x²=3x means x(x−3)=0, so x=0 OR x=3."
      },
      {
        "title": "Factorisation: fastest when it works",
        "explain": "Find two numbers multiplying to a×c and adding to b. Split bx, group terms, and set both factors to zero.",
        "example": "x²−7x+12 = (x−3)(x−4), giving 3 and 4.",
        "method": "Always move the right-hand expression to the left first."
      },
      {
        "title": "Formula and discriminant",
        "explain": "When factoring is awkward, use x=(−b±√D)/(2a). D=b²−4ac predicts the number of real roots.",
        "example": "D>0 → two distinct real roots; D=0 → one repeated root; D<0 → no real roots.",
        "method": "For word problems, reject lengths, ages and counts that violate the situation."
      }
    ],
    "worked": {
      "q": "A positive INTEGER multiplied by the next consecutive integer is 72. Find the smaller integer.",
      "steps": [
        "Let the first positive integer be n. The next is n+1.",
        "n(n+1)=72 → n²+n−72=0.",
        "Factor: (n+9)(n−8)=0.",
        "n=−9 or n=8; choose 8 because the problem asks for a positive number."
      ],
      "answer": "8 (and the next integer is 9)"
    },
    "challenge": [
      {
        "q": "Solve x²−7x+12=0.",
        "a": "3 and 4",
        "work": "(x−3)(x−4)=0.",
        "level": "easy"
      },
      {
        "q": "Solve 2x²−5x−3=0.",
        "a": "3 and −1/2",
        "work": "Factor (2x+1)(x−3)=0.",
        "level": "medium"
      },
      {
        "q": "What is the nature of roots of x²+4x+4=0?",
        "a": "Real and equal, both −2",
        "work": "D=16−16=0; (x+2)²=0.",
        "level": "medium"
      },
      {
        "q": "Two consecutive positive integers have product 72. Find them.",
        "a": "8 and 9",
        "work": "n(n+1)=72 → (n−8)(n+9)=0; reject −9.",
        "level": "medium"
      },
      {
        "q": "Does x²+2x+5=0 have real roots?",
        "a": "No real roots",
        "work": "D=2²−4(1)(5)=−16.",
        "level": "hard"
      }
    ],
    "mcq": [
      {
        "q": "Which pair gives BOTH real solutions of x² = 9?",
        "options": [
          "only 3",
          "only −3",
          "−3 and 3",
          "0 and 9"
        ],
        "correct": 2,
        "explanation": "Both 3² = 9 and (−3)² = 9. Do not forget the negative root."
      },
      {
        "q": "What are the roots of x² − 5x + 6 = 0?",
        "options": [
          "1 and 6",
          "2 and 3",
          "−2 and −3",
          "3 and −2"
        ],
        "correct": 1,
        "explanation": "x² − 5x + 6 = (x − 2)(x − 3). So x = 2 or x = 3."
      },
      {
        "q": "For ax²+bx+c=0 with real coefficients and a≠0, what does D=b²−4ac<0 mean?",
        "options": [
          "two distinct real roots",
          "one repeated real root",
          "infinitely many solutions",
          "no real roots"
        ],
        "correct": 3,
        "explanation": "The quadratic formula has √D. When D is negative, there are no real roots."
      }
    ]
  },
  "ap": {
    "sections": [
      {
        "title": "Spot an AP",
        "explain": "An arithmetic progression moves by a constant step called the common difference d. It can go up, down or stay level.",
        "example": "7, 11, 15 has d=4; 18, 15, 12 has d=−3.",
        "method": "Subtract consecutive terms to find d."
      },
      {
        "title": "Find ANY term directly",
        "explain": "Do not write 50 terms. Use aₙ=a+(n−1)d; the first term starts at n=1, so there are n−1 jumps.",
        "example": "10th term of 3,7,11,... = 3+9×4=39.",
        "method": "If you need the position of a term, put its value equal to a+(n−1)d and solve for n."
      },
      {
        "title": "Adding a sequence quickly",
        "explain": "The first and last terms form pairs with the same total. Multiply the average by the number of terms.",
        "example": "3,7,11,15: sum is (3+15)/2×4=36.",
        "method": "Use Sₙ=n(a+l)/2, or Sₙ=n[2a+(n−1)d]/2 if l is unknown."
      }
    ],
    "worked": {
      "q": "Which term of 18,15,12,... is −9?",
      "steps": [
        "Identify a=18 and d=−3.",
        "Set aₙ = −9 = 18+(n−1)(−3).",
        "−27 = −3(n−1) → n−1=9.",
        "Therefore n=10."
      ],
      "answer": "10th term"
    },
    "challenge": [
      {
        "q": "Find the 15th term when a=5 and d=3.",
        "a": "47",
        "work": "5+(15−1)×3=47.",
        "level": "easy"
      },
      {
        "q": "Sum the first 20 terms of 2,5,8,...",
        "a": "610",
        "work": "S20=20/2[4+19(3)]=610.",
        "level": "medium"
      },
      {
        "q": "In 7,11,15,... which term is 63?",
        "a": "15th",
        "work": "7+(n−1)4=63 → n−1=14 → n=15.",
        "level": "medium"
      },
      {
        "q": "Sum the AP 5,10,15,...,50.",
        "a": "275",
        "work": "n=10; S=10(5+50)/2=275.",
        "level": "medium"
      },
      {
        "q": "In 18,15,12,... which term is −9?",
        "a": "10th",
        "work": "18−3(n−1)=−9 → n=10.",
        "level": "hard"
      }
    ],
    "mcq": [
      {
        "q": "Common difference of 20,16,12,... is:",
        "options": [
          "4",
          "−4",
          "−8",
          "16"
        ],
        "correct": 1,
        "explanation": "16−20=−4."
      },
      {
        "q": "The nth-term formula is:",
        "options": [
          "a+nd",
          "n(a+d)",
          "a+(n−1)d",
          "n/2(a+l)"
        ],
        "correct": 2,
        "explanation": "From term 1 to term n there are n−1 jumps."
      },
      {
        "q": "The sum of the first 5 natural numbers is:",
        "options": [
          "10",
          "15",
          "20",
          "25"
        ],
        "correct": 1,
        "explanation": "1+2+3+4+5=15."
      }
    ]
  },
  "triangles": {
    "sections": [
      {
        "title": "Similarity = same shape",
        "explain": "Two triangles are similar when their corresponding angles match and matching sides scale by the same factor.",
        "example": "A 3–4–5 right triangle and a 6–8–10 right triangle have the same shape.",
        "method": "Write matching vertex order (ABC ~ PQR) before matching sides."
      },
      {
        "title": "Basic Proportionality Theorem",
        "explain": "Draw a line parallel to one side of a triangle. It cuts the other two sides in the SAME ratio.",
        "example": "DE ∥ BC → AD/DB = AE/EC.",
        "method": "Label all four segments before cross-multiplying."
      },
      {
        "title": "Area and Pythagoras",
        "explain": "If lengths scale by k, area scales by k². In a right triangle the hypotenuse squared equals the sum of the two shorter sides squared.",
        "example": "Side ratio 2:3 implies area ratio 4:9; legs 3 and 4 give hypotenuse 5.",
        "method": "Check whether the question concerns SIDE ratio or AREA ratio."
      }
    ],
    "worked": {
      "q": "Similar triangles have side ratio 2:5. The smaller area is 16 cm². Find the larger area.",
      "steps": [
        "Area ratio = square of the side ratio = 2²:5² = 4:25.",
        "Write 16 / A = 4 / 25.",
        "Cross-multiply: 4A = 16×25.",
        "A = 100 cm²."
      ],
      "answer": "100 cm²"
    },
    "challenge": [
      {
        "q": "In △ABC, D is on AB and E is on AC. If DE ∥ BC, AD = 3 cm, DB = 4 cm and AE = 6 cm, find EC in cm.",
        "a": "8",
        "work": "3/4=6/EC → EC=8.",
        "level": "easy"
      },
      {
        "q": "Similar triangles have sides in ratio 2:5. Smaller area is 16 cm². Find larger area.",
        "a": "100 cm²",
        "work": "Area ratio 4:25; 16×25/4=100.",
        "level": "medium"
      },
      {
        "q": "Find the hypotenuse of a right triangle with legs 9 cm and 12 cm.",
        "a": "15 cm",
        "work": "√(9²+12²)=√225=15.",
        "level": "easy"
      },
      {
        "q": "Corresponding sides have ratio AB:DE = 3:4. If DE=20 cm, find AB.",
        "a": "15 cm",
        "work": "AB/20=3/4 → AB=15 cm.",
        "level": "medium"
      },
      {
        "q": "Are triangles with sides (3,4,5) and (6,8,10) similar?",
        "a": "Yes",
        "work": "All corresponding sides are in ratio 1:2, so SSS similarity applies.",
        "level": "hard"
      }
    ],
    "mcq": [
      {
        "q": "The side lengths (3,4,5) and (6,8,10) describe two triangles. Why are they similar?",
        "options": [
          "They have the same perimeter",
          "Their corresponding sides are proportional (SSS)",
          "Their areas are equal",
          "They are congruent"
        ],
        "correct": 1,
        "explanation": "All three corresponding side ratios are 3/6 = 4/8 = 5/10 = 1/2, so SSS similarity applies."
      },
      {
        "q": "A line parallel to one triangle side divides the other two sides:",
        "options": [
          "equally",
          "in any ratio",
          "proportionally",
          "at right angles"
        ],
        "correct": 2,
        "explanation": "That is BPT."
      },
      {
        "q": "If two similar triangles have corresponding sides in the ratio 3:4, what is their AREA ratio?",
        "options": [
          "9:16",
          "3:4",
          "6:8",
          "27:64"
        ],
        "correct": 0,
        "explanation": "Areas of similar triangles are in the square of the ratio of corresponding sides: 3²:4² = 9:16."
      }
    ]
  },
  "trig": {
    "sections": [
      {
        "title": "Choose the angle FIRST",
        "explain": "Opposite and adjacent sides depend on the chosen acute angle θ. The hypotenuse is always opposite the right angle.",
        "example": "In a 3–4–5 triangle, opposite 3 means sinθ=3/5.",
        "method": "Label P (opposite), B (adjacent), H (hypotenuse) before doing ratios."
      },
      {
        "title": "Learn the six ratios from three",
        "explain": "SOH CAH TOA: sin=P/H, cos=B/H, tan=P/B. The other ratios are reciprocals: cosec=H/P, sec=H/B, cot=B/P.",
        "example": "If sinθ=3/5, then cosecθ=5/3.",
        "method": "For an acute angle, sketch a right triangle to recover unknown sides."
      },
      {
        "title": "Special angles and identities",
        "explain": "You must know trig values at 0°, 30°, 45°, 60°, 90° and simple identities.",
        "example": "sin30°=1/2, cos60°=1/2, tan45°=1. sin²θ+cos²θ=1.",
        "method": "For identities, change the more complicated side using ratios and simplify; do not assume what you are proving."
      }
    ],
    "worked": {
      "q": "For acute θ, tanθ = 5/12. Find sinθ and cosθ.",
      "steps": [
        "tan=P/B, so let P=5 and B=12.",
        "Find hypotenuse: H=√(5²+12²)=13.",
        "sinθ=P/H=5/13.",
        "cosθ=B/H=12/13."
      ],
      "answer": "sinθ=5/13, cosθ=12/13"
    },
    "challenge": [
      {
        "q": "If tanθ=5/12 for acute θ, find sinθ and cosθ.",
        "a": "5/13 and 12/13",
        "work": "By Pythagoras H=13; sin=P/H and cos=B/H.",
        "level": "medium"
      },
      {
        "q": "Find sin30°+cos60°.",
        "a": "1",
        "work": "1/2+1/2=1.",
        "level": "easy"
      },
      {
        "q": "Evaluate 2sin30°cos60°.",
        "a": "1/2",
        "work": "2×(1/2)×(1/2)=1/2.",
        "level": "easy"
      },
      {
        "q": "If secθ=5/4 for acute θ, find sinθ and cosθ.",
        "a": "sinθ=3/5; cosθ=4/5",
        "work": "cos=1/sec=4/5. Opposite=3 from 3–4–5 triangle.",
        "level": "hard"
      },
      {
        "q": "If tanθ=1 and θ is acute, find θ.",
        "a": "45°",
        "work": "tan45°=1.",
        "level": "medium"
      }
    ],
    "mcq": [
      {
        "q": "sinθ is:",
        "options": [
          "P/H",
          "B/H",
          "P/B",
          "H/P"
        ],
        "correct": 0,
        "explanation": "SOH: opposite over hypotenuse."
      },
      {
        "q": "For an acute angle θ with cos θ = 4/5, what is sec θ?",
        "options": [
          "4/5",
          "5/4",
          "3/5",
          "5/3"
        ],
        "correct": 1,
        "explanation": "sec θ is reciprocal of cos θ, so 1/(4/5)=5/4."
      },
      {
        "q": "tan90° is:",
        "options": [
          "0",
          "1",
          "∞ as a number",
          "undefined"
        ],
        "correct": 3,
        "explanation": "cos90°=0, and tan=sin/cos cannot divide by zero."
      }
    ]
  },
  "coordinate": {
    "sections": [
      {
        "title": "Coordinates are map addresses",
        "explain": "(x,y) says go x units horizontally and y units vertically. Negative signs tell the direction.",
        "example": "A(−2,3) is 2 left, 3 up from the origin.",
        "method": "Always keep x before y: (x,y) is not generally (y,x)."
      },
      {
        "title": "Distance and midpoint",
        "explain": "Distance comes from a right triangle formed by the horizontal and vertical gaps. The midpoint averages matching coordinates.",
        "example": "From (1,2) to (4,6): Δx=3, Δy=4, distance=5.",
        "method": "d=√[(x₂−x₁)²+(y₂−y₁)²]; midpoint=((x₁+x₂)/2,(y₁+y₂)/2)."
      },
      {
        "title": "Internal division and area",
        "explain": "A point splitting A to B in ratio m:n is found by a weighted average. The larger weight is on the opposite endpoint.",
        "example": "For A(1,2), B(7,8), ratio 2:1 → ((2×7+1×1)/3, (2×8+1×2)/3)=(5,6).",
        "method": "Section formula uses denominator m+n; for area of triangle use the coordinate determinant formula when covered by your class."
      }
    ],
    "worked": {
      "q": "A(2,3) and B(8,9). Find P dividing AB internally in ratio AP:PB = 1:2.",
      "steps": [
        "m:n=1:2, A=(2,3), B=(8,9).",
        "x=[m×x₂+n×x₁]/(m+n)=(1×8+2×2)/3=4.",
        "y=[m×y₂+n×y₁]/(m+n)=(1×9+2×3)/3=5."
      ],
      "answer": "P=(4,5)"
    },
    "challenge": [
      {
        "q": "Distance from (0,0) to (6,8)?",
        "a": "10 units",
        "work": "√(6²+8²)=√100=10.",
        "level": "easy"
      },
      {
        "q": "Find midpoint of (−4,7) and (2,−1).",
        "a": "(−1,3)",
        "work": "x=(−4+2)/2=−1; y=(7−1)/2=3.",
        "level": "easy"
      },
      {
        "q": "A(2,3) and B(8,9). Find P on AB such that AP:PB = 1:2.",
        "a": "(4,5)",
        "work": "Section formula gives (8+4)/3=4, (9+6)/3=5.",
        "level": "medium"
      },
      {
        "q": "Are (1,1),(2,2),(3,3) collinear?",
        "a": "Yes",
        "work": "All satisfy y=x; their triangle area is zero.",
        "level": "medium"
      },
      {
        "q": "Find the area of triangle with vertices (0,0),(4,0),(0,3).",
        "a": "6 square units",
        "work": "Right triangle, area 1/2×4×3=6.",
        "level": "hard"
      }
    ],
    "mcq": [
      {
        "q": "Which quadrant contains the point (−2, 3)?",
        "options": [
          "I",
          "II",
          "III",
          "IV"
        ],
        "correct": 1,
        "explanation": "The x-coordinate is negative and the y-coordinate positive, placing it in Quadrant II."
      },
      {
        "q": "Distance between identical points is:",
        "options": [
          "0",
          "1",
          "undefined",
          "negative"
        ],
        "correct": 0,
        "explanation": "All coordinate differences are zero."
      },
      {
        "q": "In a section formula for ratio m:n, the denominator is:",
        "options": [
          "m−n",
          "mn",
          "m+n",
          "2"
        ],
        "correct": 2,
        "explanation": "Internal division uses m+n."
      }
    ]
  },
  "mensuration": {
    "sections": [
      {
        "title": "Surface area vs volume",
        "explain": "Surface area is how much paper covers a shape (cm²). Volume is how much space it fills (cm³).",
        "example": "A cylinder's volume is circular base area πr² times height h.",
        "method": "Underline whether the question asks for outer material or capacity."
      },
      {
        "title": "Know the main solids",
        "explain": "Cylinder V=πr²h, cone V=πr²h/3, sphere V=4πr³/3, hemisphere V=2πr³/3.",
        "example": "If radius doubles, a sphere's volume becomes 8 times, since volume depends on r³.",
        "method": "Use actual perpendicular height h for volumes; cone slant height l is used in curved area."
      },
      {
        "title": "Combined and melted solids",
        "explain": "When shapes are combined, add volumes. When metal is melted and recast without loss, original and final volumes are equal. For external area, count only visible faces.",
        "example": "Cone placed on a cylinder: total volume = V(cone)+V(cylinder). Shared circular face is hidden.",
        "method": "Draw the combination and cross out every touching/internal face for TSA."
      }
    ],
    "worked": {
      "q": "A cone has radius 3 cm and height 4 cm. Find slant height, curved surface area and volume.",
      "steps": [
        "Slant height l=√(r²+h²)=√(9+16)=5 cm.",
        "CSA=πrl=π×3×5=15π cm².",
        "Volume=(1/3)πr²h=(1/3)π×9×4=12π cm³."
      ],
      "answer": "l=5 cm; CSA=15π cm²; V=12π cm³"
    },
    "challenge": [
      {
        "q": "Volume of a cube of edge 4 cm?",
        "a": "64 cm³",
        "work": "4³=64.",
        "level": "easy"
      },
      {
        "q": "Volume of a cylinder with r=3 cm and h=10 cm, in π form?",
        "a": "90π cm³",
        "work": "πr²h=π×9×10.",
        "level": "easy"
      },
      {
        "q": "A right circular cone has radius 3 cm and perpendicular height 4 cm. Find its curved surface area in terms of π.",
        "a": "15π cm²",
        "work": "l=5; CSA=πrl=15π.",
        "level": "medium"
      },
      {
        "q": "Surface area of sphere radius 3 cm?",
        "a": "36π cm²",
        "work": "4πr²=4π×9.",
        "level": "medium"
      },
      {
        "q": "Volume of hemisphere radius 7 cm, in π form?",
        "a": "686π/3 cm³",
        "work": "(2/3)πr³=(2/3)π×343.",
        "level": "hard"
      }
    ],
    "mcq": [
      {
        "q": "The unit of volume is:",
        "options": [
          "cm",
          "cm²",
          "cm³",
          "degrees"
        ],
        "correct": 2,
        "explanation": "Volume measures three-dimensional space."
      },
      {
        "q": "A right circular cone and a cylinder have equal circular base area and equal perpendicular height. The cone's volume is what FRACTION of the cylinder's volume?",
        "options": [
          "same",
          "three times",
          "one-third of the cylinder's volume",
          "one-half"
        ],
        "correct": 2,
        "explanation": "Cone V=(1/3)πr²h."
      },
      {
        "q": "Slant height of a cone with r=3, h=4 is:",
        "options": [
          "7",
          "5",
          "1",
          "12"
        ],
        "correct": 1,
        "explanation": "l=√(9+16)=5."
      }
    ]
  },
  "statistics": {
    "sections": [
      {
        "title": "Mean balances the data",
        "explain": "The mean is the total of the observations divided by their number. Grouped mean uses frequency × class midpoint.",
        "example": "For 0–10, midpoint is 5; for 10–20, midpoint is 15.",
        "method": "Calculate Σfx and Σf carefully; mean = Σfx / Σf."
      },
      {
        "title": "Median finds the middle",
        "explain": "Sort raw values, or for a grouped table build cumulative frequencies to find the middle class.",
        "example": "If N=12, look for the class where cumulative frequency first reaches or exceeds N/2=6.",
        "method": "Grouped median = l + [(N/2−cf)/f]h, where cf is BEFORE median class."
      },
      {
        "title": "Mode finds what is common",
        "explain": "Mode is the most frequent value; with grouped data use the modal class with the largest frequency.",
        "example": "If 20–30 occurs 8 times and neighbouring classes occur 3 and 5 times, 20–30 is modal class.",
        "method": "Grouped mode = l + [(f₁−f₀)/(2f₁−f₀−f₂)]h."
      }
    ],
    "worked": {
      "q": "Grouped frequencies: 0–10:4, 10–20:6, 20–30:2. Find median.",
      "steps": [
        "Total frequency N=4+6+2=12; N/2=6.",
        "Cumulative frequencies: 4,10,12. Median class is 10–20.",
        "l=10, cf=4 (before the class), f=6, h=10.",
        "Median = 10 + ((6−4)/6)×10 = 13⅓."
      ],
      "answer": "Median = 13⅓"
    },
    "challenge": [
      {
        "q": "Mean of 2,4,6,8?",
        "a": "5",
        "work": "(2+4+6+8)/4=5.",
        "level": "easy"
      },
      {
        "q": "0–10 has f=3, 10–20 has f=1. Find grouped mean.",
        "a": "7.5",
        "work": "Midpoints 5,15. (3×5+1×15)/4=7.5.",
        "level": "medium"
      },
      {
        "q": "For 0–10:f=4, 10–20:f=6, 20–30:f=2, find median.",
        "a": "13⅓",
        "work": "N=12, median class 10–20. 10+((6−4)/6)×10=13⅓.",
        "level": "hard"
      },
      {
        "q": "For grouped classes 10–20, 20–30, 30–40 with respective frequencies 3, 8, 5, find the MODE.",
        "a": "26.25",
        "work": "20+((8−3)/(16−3−5))×10 = 26.25.",
        "level": "hard"
      },
      {
        "q": "Mean of 5,7,x is 8. Find x.",
        "a": "12",
        "work": "(5+7+x)/3=8 ⇒ x=12.",
        "level": "medium"
      }
    ],
    "mcq": [
      {
        "q": "The class mark (midpoint) of the interval 20–30 is:",
        "options": [
          "20",
          "25",
          "30",
          "10"
        ],
        "correct": 1,
        "explanation": "Class mark = (20 + 30)/2 = 25."
      },
      {
        "q": "Which measure divides ORDERED observations into two equal halves?",
        "options": [
          "Mean",
          "Mode",
          "Median",
          "Range"
        ],
        "correct": 2,
        "explanation": "Median is the centre: for an odd count use the central value; for an even count average the two central values."
      },
      {
        "q": "If a value repeats most often, it is the:",
        "options": [
          "mean",
          "median",
          "range",
          "mode"
        ],
        "correct": 3,
        "explanation": "Mode is the most frequent value."
      }
    ]
  },
  "probability": {
    "sections": [
      {
        "title": "Turn chance into a fraction",
        "explain": "Probability is how many wanted outcomes there are divided by how many equally likely outcomes are possible.",
        "example": "Fair die: six possible outcomes; even values are 2,4,6 → 3/6.",
        "method": "List the sample space before counting."
      },
      {
        "title": "Complements save time",
        "explain": "Sometimes it is easier to find the probability something DOES NOT happen, then subtract from 1.",
        "example": "If P(red)=3/10, then P(not red)=7/10.",
        "method": "All probabilities are between 0 and 1 inclusive."
      },
      {
        "title": "Two throws or two coins",
        "explain": "Order matters in multi-step experiments. HH, HT, TH, TT are four equally likely ordered outcomes for two fair coin tosses.",
        "example": "Two fair dice have 6×6=36 ordered outcomes, not 12.",
        "method": "Draw an ordered list or table; do not count repeated-looking outcomes only once."
      }
    ],
    "worked": {
      "q": "Two fair dice are rolled. Find probability their sum is 9.",
      "steps": [
        "Total ordered outcomes = 6×6=36.",
        "Wanted ordered pairs: (3,6), (4,5), (5,4), (6,3).",
        "Favourable outcomes = 4.",
        "Probability = 4/36 = 1/9."
      ],
      "answer": "1/9"
    },
    "challenge": [
      {
        "q": "One card is drawn uniformly at random from a well-shuffled standard deck of 52 cards (without jokers). What is the probability that it is red?",
        "a": "1/2",
        "work": "26 red cards / 52 cards = 1/2.",
        "level": "easy"
      },
      {
        "q": "Probability of a prime number when rolling a fair die?",
        "a": "1/2",
        "work": "Prime outcomes 2,3,5; so 3/6=1/2.",
        "level": "easy"
      },
      {
        "q": "Two fair coins tossed: probability of exactly one head?",
        "a": "1/2",
        "work": "HT and TH among HH, HT, TH, TT → 2/4.",
        "level": "medium"
      },
      {
        "q": "A bag has 4 black and 3 white identical balls. One is drawn uniformly at random. What is the probability it is black?",
        "a": "4/7",
        "work": "Favourable 4, total 7.",
        "level": "medium"
      },
      {
        "q": "Two fair dice: probability that sum is 9?",
        "a": "1/9",
        "work": "4 ordered outcomes / 36 total = 1/9.",
        "level": "hard"
      }
    ],
    "mcq": [
      {
        "q": "An impossible event has probability:",
        "options": [
          "0",
          "1/2",
          "1",
          "2"
        ],
        "correct": 0,
        "explanation": "No favourable outcomes."
      },
      {
        "q": "If P(A)=1/4, then P(not A) equals:",
        "options": [
          "1/4",
          "1/2",
          "3/4",
          "4"
        ],
        "correct": 2,
        "explanation": "P(not A)=1−P(A)=1−1/4=3/4."
      },
      {
        "q": "Two fair coins are tossed once each. How many equally likely ORDERED outcomes are possible?",
        "options": [
          "2",
          "4",
          "3",
          "8"
        ],
        "correct": 1,
        "explanation": "The four possibilities are HH, HT, TH and TT."
      }
    ]
  }
};
