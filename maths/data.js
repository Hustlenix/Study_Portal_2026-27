window.MATH_LESSONS = [
  {
    "id": "polynomials",
    "code": "01",
    "title": "Polynomials",
    "tag": "Roots + factors",
    "minute": 2,
    "hook": "A zero is just an x-value that makes the whole polynomial equal 0.",
    "tiny": "Set the expression to zero. Factor it. Each factor gives one zero.",
    "rules": [
      "For a quadratic polynomial ax² + bx + c with a ≠ 0 and roots α, β, their SUM is −b/a.",
      "Product of zeroes = c/a.",
      "Given zeroes p and q: polynomial = k(x − p)(x − q), where k ≠ 0."
    ],
    "example": {
      "q": "Find the zeroes of 2x² − 7x + 3.",
      "steps": [
        "Split the middle term: 2x² − 6x − x + 3 = 0.",
        "Group: 2x(x − 3) − 1(x − 3) = 0.",
        "Factor: (2x − 1)(x − 3) = 0.",
        "So x = 1/2 or x = 3."
      ],
      "answer": "x = 1/2, 3"
    },
    "trap": "The constant term alone is NOT the product of the zeroes; divide it by a.",
    "formula": "α + β = −b/a; αβ = c/a",
    "practice": [
      {
        "q": "Find both zeroes of 3x² − 10x + 3.",
        "a": "3 and 1/3",
        "work": "(3x − 1)(x − 3) = 0, so x = 1/3, 3."
      },
      {
        "q": "Form a monic quadratic polynomial with zeroes −2 and 5.",
        "a": "x² − 3x − 10",
        "work": "(x + 2)(x − 5) = x² − 3x − 10."
      }
    ]
  },
  {
    "id": "linear",
    "code": "02",
    "title": "Pair of Linear Equations",
    "tag": "Word problems",
    "minute": 3,
    "hook": "Two clues about two unknowns. Combine the clues until only one unknown remains.",
    "tiny": "Choose x and y, write two equations, eliminate one letter, substitute back.",
    "rules": [
      "Elimination: make coefficients of one variable equal, then add or subtract equations.",
      "Substitution: rearrange one equation for x or y, then substitute into the other.",
      "Word problems: always state what x and y represent before writing equations."
    ],
    "example": {
      "q": "Solve 2x + 3y = 13 and x + y = 5.",
      "steps": [
        "Multiply the second equation by 2: 2x + 2y = 10.",
        "Subtract it from the first: y = 3.",
        "Substitute into x + y = 5: x + 3 = 5, so x = 2.",
        "Check: 2(2) + 3(3) = 13."
      ],
      "answer": "x = 2, y = 3"
    },
    "trap": "When subtracting one equation, change the sign of EVERY term, not just the first.",
    "formula": "a₁x + b₁y = c₁ and a₂x + b₂y = c₂",
    "practice": [
      {
        "q": "Two adult tickets and three child tickets cost ₹390. Three adult tickets and two child tickets cost ₹460. Find both prices.",
        "a": "Adult ₹120; child ₹50",
        "work": "Let a,c be prices. 2a + 3c = 390 and 3a + 2c = 460. Eliminate a to get 5c = 250, so c = 50 and a = 120."
      },
      {
        "q": "Five pens and two erasers cost ₹64; three pens and four erasers cost ₹58. Find each price.",
        "a": "Pen ₹10; eraser ₹7",
        "work": "5p + 2e = 64 and 3p + 4e = 58. Double the first: 10p + 4e = 128. Subtract the second: 7p = 70; p = 10 and e = 7."
      }
    ]
  },
  {
    "id": "quadratics",
    "code": "03",
    "title": "Quadratic Equations",
    "tag": "Most important",
    "minute": 3,
    "hook": "A quadratic is an x² equation. Your job is to find which x-values make it zero.",
    "tiny": "Move everything to one side → factor if possible → otherwise use the formula.",
    "rules": [
      "Standard form: ax² + bx + c = 0, with a ≠ 0.",
      "Quadratic formula: x = (−b ± √(b² − 4ac)) / 2a.",
      "D = b² − 4ac: D > 0 two distinct real roots; D = 0 equal roots; D < 0 no real roots."
    ],
    "example": {
      "q": "Solve x² − 5x + 6 = 0.",
      "steps": [
        "Find two numbers that multiply to +6 and add to −5: −2 and −3.",
        "Write (x − 2)(x − 3) = 0.",
        "Set either factor to zero: x = 2 or x = 3.",
        "Check: 4 − 10 + 6 = 0, and 9 − 15 + 6 = 0."
      ],
      "answer": "x = 2 or 3"
    },
    "trap": "For 1/x − 1/y, the combined fraction is (y − x)/xy, NOT (x − y)/xy.",
    "formula": "x = (−b ± √D) / (2a), D = b² − 4ac",
    "practice": [
      {
        "q": "A rectangle has area 84 cm². Its length is 5 cm more than its breadth. Find its dimensions.",
        "a": "Breadth 7 cm; length 12 cm",
        "work": "Let breadth = b, length = b + 5. b(b + 5) = 84 → b² + 5b − 84 = 0 → (b + 12)(b − 7) = 0. Reject negative breadth, b = 7; length = 12."
      },
      {
        "q": "Solve x − y = 5 and 1/x − 1/y = 1/10 for real x,y.",
        "a": "No real solution",
        "work": "(y − x)/xy = 1/10. Since y − x = −5, xy = −50. Put y = x − 5: x² − 5x + 50 = 0. D = 25 − 200 = −175 < 0, so no real solution. Also x,y must be nonzero."
      }
    ]
  },
  {
    "id": "ap",
    "code": "04",
    "title": "Arithmetic Progressions",
    "tag": "Patterns",
    "minute": 2,
    "hook": "An AP is a number pattern that changes by the same amount every time.",
    "tiny": "Find first term a, common difference d, and number of terms n.",
    "rules": [
      "nth term: aₙ = a + (n − 1)d.",
      "Sum: Sₙ = n/2 [2a + (n − 1)d].",
      "If last term l is known: Sₙ = n(a + l)/2."
    ],
    "example": {
      "q": "For 3, 7, 11, 15, … find the 10th term and sum of the first 10 terms.",
      "steps": [
        "First term a = 3; difference d = 4.",
        "10th term = 3 + 9(4) = 39.",
        "Sum = 10(3 + 39)/2 = 210."
      ],
      "answer": "a₁₀ = 39; S₁₀ = 210"
    },
    "trap": "Use (n − 1)d for the nth term, NOT nd.",
    "formula": "aₙ = a + (n−1)d; Sₙ = n[2a+(n−1)d]/2",
    "practice": [
      {
        "q": "In the AP 7, 11, 15, … find the 20th term and the sum of 20 terms.",
        "a": "20th term 83; sum 900",
        "work": "a = 7, d = 4. a₂₀ = 7 + 19(4) = 83. S₂₀ = 20(7 + 83)/2 = 900."
      },
      {
        "q": "An auditorium has 12 seats in its first row and 3 MORE seats in every following row. How many seats are there in TOTAL across the first 15 rows?",
        "a": "495 seats",
        "work": "AP: a = 12, d = 3, n = 15. Last row = 12 + 14(3) = 54. S₁₅ = 15(12 + 54)/2 = 495."
      }
    ]
  },
  {
    "id": "triangles",
    "code": "05",
    "title": "Triangles",
    "tag": "Similarity + BPT",
    "minute": 2,
    "hook": "Similar triangles have the same shape, even when one is bigger.",
    "tiny": "Look for parallel lines or equal angles; match corresponding sides carefully.",
    "rules": [
      "Similarity tests: AA (two corresponding angles equal); SAS (two pairs of corresponding sides proportional AND included angles equal); SSS (all three pairs of corresponding sides proportional).",
      "BPT: if DE ∥ BC in triangle ABC, AD/DB = AE/EC.",
      "Similar triangles' areas are in the SQUARE of the matching sides' ratio; right triangle: a² + b² = c²."
    ],
    "example": {
      "q": "In △ABC, D lies on AB and E lies on AC, DE ∥ BC, AD = 4 cm, DB = 6 cm and AE = 6 cm. Find EC.",
      "steps": [
        "Use Basic Proportionality Theorem: AD/DB = AE/EC.",
        "Substitute: 4/6 = 6/EC.",
        "Cross-multiply: 4EC = 36.",
        "So EC = 9."
      ],
      "answer": "EC = 9"
    },
    "trap": "Areas use SQUARED side ratios: sides 2:3 mean areas 4:9, not 2:3.",
    "formula": "AD/DB = AE/EC when DE ∥ BC; Area ratio = side ratio²",
    "practice": [
      {
        "q": "In △ABC, D lies on AB and E lies on AC, with DE ∥ BC. If AD = 4 cm, DB = 6 cm and AE = 6 cm, find EC.",
        "a": "9 cm",
        "work": "AD/DB = AE/EC → 4/6 = 6/EC → EC = 9 cm."
      },
      {
        "q": "Two similar triangles have corresponding sides in ratio 3:5. Smaller area is 36 cm². Find the larger area.",
        "a": "100 cm²",
        "work": "Area ratio = 3²:5² = 9:25. Larger area = 36 × 25/9 = 100 cm²."
      }
    ]
  },
  {
    "id": "trig",
    "code": "06",
    "title": "Introduction to Trigonometry",
    "tag": "Triangles + ratios",
    "minute": 2,
    "hook": "Sine, cosine and tangent are just three ways to compare sides of a right triangle.",
    "tiny": "For a RIGHT-ANGLED triangle, first choose the acute angle θ, then compare its opposite side, adjacent side and hypotenuse.",
    "rules": [
      "SOH: sin θ = P/H; CAH: cos θ = B/H; TOA: tan θ = P/B.",
      "cosec θ = H/P; sec θ = H/B; cot θ = B/P.",
      "sin²θ + cos²θ = 1; 1 + tan²θ = sec²θ; 1 + cot²θ = cosec²θ."
    ],
    "example": {
      "q": "A right triangle has perpendicular 3 cm, base 4 cm and hypotenuse 5 cm. Let θ be the acute angle BETWEEN the base and hypotenuse (opposite the 3 cm side). Find sin θ, cos θ and tan θ.",
      "steps": [
        "θ is specified BETWEEN the base (4 cm) and hypotenuse (5 cm), so opposite P = 3 cm, adjacent B = 4 cm, and hypotenuse H = 5 cm.",
        "sin θ = P/H = 3/5.",
        "cos θ = B/H = 4/5.",
        "tan θ = P/B = 3/4."
      ],
      "answer": "sin θ = 3/5; cos θ = 4/5; tan θ = 3/4"
    },
    "trap": "P and B CHANGE when the chosen angle changes. H is always opposite 90°. tan 90° and sec 90° are undefined.",
    "formula": "SOH–CAH–TOA; sin²θ + cos²θ = 1",
    "practice": [
      {
        "q": "For an acute θ, opposite = 8 cm, adjacent = 15 cm. Find sin θ, cos θ, tan θ.",
        "a": "sin = 8/17; cos = 15/17; tan = 8/15",
        "work": "H = √(8² + 15²) = 17. Apply SOH–CAH–TOA."
      },
      {
        "q": "If sin θ = 3/5 for an acute angle, find cos θ and tan θ.",
        "a": "cos θ = 4/5; tan θ = 3/4",
        "work": "P = 3, H = 5. By Pythagoras B = √(25 − 9) = 4. Hence cos = 4/5 and tan = 3/4."
      }
    ]
  },
  {
    "id": "coordinate",
    "code": "07",
    "title": "Coordinate Geometry",
    "tag": "Distance + midpoint",
    "minute": 2,
    "hook": "Coordinates are addresses on a graph. Formulas measure the gap or find points between them.",
    "tiny": "Write x₁,y₁ and x₂,y₂ above the given points before substituting.",
    "rules": [
      "Distance: √[(x₂ − x₁)² + (y₂ − y₁)²].",
      "Midpoint: ((x₁ + x₂)/2, (y₁ + y₂)/2).",
      "Internal section m:n: ((mx₂ + nx₁)/(m+n), (my₂ + ny₁)/(m+n)).",
      "Area of triangle = ½ |x₁(y₂−y₃)+x₂(y₃−y₁)+x₃(y₁−y₂)|."
    ],
    "example": {
      "q": "Find distance and midpoint between A(1,2) and B(4,6).",
      "steps": [
        "x difference = 4 − 1 = 3; y difference = 6 − 2 = 4.",
        "Distance = √(3² + 4²) = √25 = 5.",
        "Midpoint = ((1 + 4)/2, (2 + 6)/2)."
      ],
      "answer": "Distance = 5 units; midpoint = (2.5, 4)"
    },
    "trap": "In the distance formula, SQUARE the entire differences. A negative difference becomes positive after squaring.",
    "formula": "d = √[(x₂−x₁)²+(y₂−y₁)²]",
    "practice": [
      {
        "q": "Find distance and midpoint for A(−2,3) and B(4,11).",
        "a": "Distance 10; midpoint (1,7)",
        "work": "Δx = 6, Δy = 8; d = √(36 + 64) = 10. Midpoint = ((−2+4)/2, (3+11)/2) = (1,7)."
      },
      {
        "q": "Point P divides A(1,2) and B(7,8) internally in ratio AP:PB = 2:1. Find P.",
        "a": "(5,6)",
        "work": "P = ((2×7 + 1×1)/3, (2×8 + 1×2)/3) = (5,6)."
      }
    ]
  },
  {
    "id": "mensuration",
    "code": "08",
    "title": "Surface Areas & Volumes",
    "tag": "3D shapes",
    "minute": 2,
    "hook": "Surface area means wrapping the outside. Volume means filling the inside.",
    "tiny": "Draw the solid, label r/h/l, then choose area or volume. Keep units squared or cubed.",
    "rules": [
      "Cylinder: curved area = 2πrh, total area = 2πr(h+r), volume = πr²h.",
      "Cone: slant height l = √(r²+h²), curved area = πrl, volume = πr²h/3.",
      "Sphere: area = 4πr², volume = 4πr³/3.",
      "Hemisphere: curved area = 2πr², total area = 3πr², volume = 2πr³/3.",
      "Cube: total area = 6a², volume = a³; cuboid volume = lbh."
    ],
    "example": {
      "q": "A cylinder has radius 3 cm and height 7 cm. Find volume.",
      "steps": [
        "Volume of a cylinder = πr²h.",
        "Substitute r = 3, h = 7.",
        "V = π × 3² × 7 = 63π cm³.",
        "Using π = 22/7: V = 198 cm³."
      ],
      "answer": "198 cm³ (when π = 22/7)"
    },
    "trap": "A cylinder's height is NOT the cone's slant height. For open/combined solids, only include the EXPOSED surface.",
    "formula": "Cylinder V = πr²h; Cone V = πr²h/3; Sphere V = 4πr³/3",
    "practice": [
      {
        "q": "Cylinder r = 7 cm, h = 10 cm. Find volume and curved surface area using π = 22/7.",
        "a": "Volume 1540 cm³; curved area 440 cm²",
        "work": "V = πr²h = (22/7)(49)(10) = 1540. CSA = 2πrh = 2(22/7)(7)(10) = 440."
      },
      {
        "q": "A solid hemisphere has radius 3 cm. Find its total surface area and volume in terms of π.",
        "a": "TSA = 27π cm²; volume = 18π cm³",
        "work": "TSA = 3πr² = 3π×9 = 27π. Volume = (2/3)πr³ = (2/3)π×27 = 18π."
      }
    ]
  },
  {
    "id": "statistics",
    "code": "09",
    "title": "Statistics",
    "tag": "Tables + averages",
    "minute": 2,
    "hook": "Statistics turns a long table into its centre: mean, median or mode.",
    "tiny": "For grouped data, write class intervals, frequencies, and midpoints before calculating.",
    "rules": [
      "Grouped mean: x̄ = Σ(fᵢxᵢ) / Σfᵢ, where xᵢ is the class midpoint.",
      "Median: l + [(N/2 − cf)/f]h. Pick class where cumulative frequency first reaches/exceeds N/2.",
      "For equal-width, consecutive grouped classes, Mode = l + [(f₁ − f₀)/(2f₁ − f₀ − f₂)]h. Pick the class with the highest frequency."
    ],
    "example": {
      "q": "Class 0–10 has frequency 2; 10–20 has 5; 20–30 has 3. Find mean.",
      "steps": [
        "Midpoints are 5, 15, and 25.",
        "Σfx = 2×5 + 5×15 + 3×25 = 160.",
        "Σf = 2 + 5 + 3 = 10.",
        "Mean = 160/10 = 16."
      ],
      "answer": "Mean = 16"
    },
    "trap": "For median, cf is cumulative frequency BEFORE the median class, not including it.",
    "formula": "Mean = Σfx/Σf; Median = l+[(N/2−cf)/f]h",
    "practice": [
      {
        "q": "For 0–10: f=2, 10–20: f=5, 20–30: f=3, find mean and median.",
        "a": "Mean = 16; median = 16",
        "work": "Mean = (2×5 + 5×15 + 3×25)/10 = 16. N/2 = 5; median class = 10–20. l=10, cf=2, f=5, h=10: median = 10 + (5−2)/5×10 = 16."
      },
      {
        "q": "For grouped classes 10–20, 20–30, 30–40 with respective frequencies 6, 10, 4, find the MODE using the grouped-data formula.",
        "a": "Mode = 24",
        "work": "l = 20, h = 10, f₁ = 10, f₀ = 6, f₂ = 4. Mode = 20 + [(10−6)/(20−6−4)]10 = 20 + 4 = 24."
      }
    ]
  },
  {
    "id": "probability",
    "code": "10",
    "title": "Probability",
    "tag": "Chance",
    "minute": 1,
    "hook": "Probability tells you how likely an event is: 0 is impossible, 1 is certain.",
    "tiny": "Count all equally likely outcomes, then count the ones you want.",
    "rules": [
      "P(event) = favourable outcomes / total equally likely outcomes.",
      "P(not A) = 1 − P(A).",
      "One fair die has 6 outcomes; two fair dice have 36 ordered outcomes."
    ],
    "example": {
      "q": "A fair die is rolled once. What is the probability of an even number?",
      "steps": [
        "All outcomes: {1,2,3,4,5,6} → 6.",
        "Favourable outcomes: {2,4,6} → 3.",
        "P(even) = 3/6 = 1/2."
      ],
      "answer": "1/2"
    },
    "trap": "When rolling TWO dice, (1,2) and (2,1) are different outcomes.",
    "formula": "P(E) = favourable / total; P(not E) = 1 − P(E)",
    "practice": [
      {
        "q": "A bag contains 5 red, 3 blue and 2 green identical balls. One ball is selected uniformly at random. Find the probability that it is NOT red.",
        "a": "1/2",
        "work": "Total = 10. Not red = 3 + 2 = 5. P = 5/10 = 1/2."
      },
      {
        "q": "Two fair dice are rolled. Find probability their sum equals 7.",
        "a": "1/6",
        "work": "Six ordered pairs: (1,6),(2,5),(3,4),(4,3),(5,2),(6,1). Total 36. P = 6/36 = 1/6."
      }
    ]
  }
];
