// Balanced wall defense - meaningful at all levels but doesn't make attacking impossible
// Old exponential (2x per level) made max walls impenetrable (12,800 defense)
// New scaling: strong progression but beatable with a real army investment
export const wallDefenseByLevel = [0, 50, 130, 270, 480, 800, 1250, 1850, 2650, 3700, 5000];