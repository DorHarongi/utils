// Balanced wall defense - meaningful at all levels but doesn't make attacking impossible
// Old values doubled each level (2x), making high-level walls impenetrable
// New values use polynomial scaling: roughly level * 50 + level² * 10
export const wallDefenseByLevel = [0, 60, 140, 240, 360, 500, 660, 840, 1040, 1260, 1500];