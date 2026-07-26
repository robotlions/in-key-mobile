export const NOTES = [
  "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B",
];

export const MODES = [
  {
    name: "Major (Ionian)",
    intervals: [2, 2, 1, 2, 2, 2, 1],
    qualities: ["M", "m", "m", "M", "M", "m", "dim"],
  },
  {
    name: "Dorian",
    intervals: [2, 1, 2, 2, 2, 1, 2],
    qualities: ["m", "dim", "M", "M", "m", "m", "M"],
  },
  {
    name: "Phrygian",
    intervals: [1, 2, 2, 2, 1, 2, 2],
    qualities: ["dim", "M", "m", "m", "m", "M", "M"],
  },
  {
    name: "Lydian",
    intervals: [2, 2, 2, 1, 2, 2, 1],
    qualities: ["M", "M", "m", "dim", "M", "m", "m"],
  },
  {
    name: "Mixolydian",
    intervals: [2, 2, 1, 2, 2, 1, 2],
    qualities: ["M", "m", "dim", "M", "m", "m", "M"],
  },
  {
    name: "Minor (Aeolian)",
    intervals: [2, 1, 2, 2, 1, 2, 2],
    qualities: ["m", "dim", "M", "m", "m", "M", "M"],
  },
  {
    name: "Locrian",
    intervals: [1, 2, 2, 1, 2, 2, 2],
    qualities: ["dim", "M", "m", "m", "M", "M", "m"],
  },
  {
    name: "Harmonic Minor",
    intervals: [2, 1, 2, 2, 1, 3, 1],
    qualities: ["m", "dim", "aug", "m", "M", "M", "dim"],
  },
];

export const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII"];

export const QUALITY_SUFFIX = { M: "", m: "m", dim: "dim", aug: "aug" };
export const QUALITY_SYMBOL = { M: "maj", m: "m", dim: "dim", aug: "aug" };

const LETTER_NAMES = ["C", "D", "E", "F", "G", "A", "B"];
const LETTER_NATURAL = [0, 2, 4, 5, 7, 9, 11];
const CHROMATIC_TO_LETTER = [0, 0, 1, 1, 2, 3, 3, 4, 4, 5, 5, 6];

export function getScaleNotes(rootNote, mode) {
  const intervals = MODES[mode].intervals;
  const notes = [rootNote];
  let current = rootNote;
  for (let i = 0; i < 6; i++) {
    current = (current + intervals[i]) % 12;
    notes.push(current);
  }
  return notes;
}

export function spellNote(chromaticIndex, letterIndex) {
  const letter = LETTER_NAMES[letterIndex];
  const natural = LETTER_NATURAL[letterIndex];
  const diff = (chromaticIndex - natural + 12) % 12;
  if (diff === 1) return letter + "#";
  if (diff === 11) return letter + "b";
  return letter;
}

export function spellScale(rootNote, mode) {
  const rootLetter = CHROMATIC_TO_LETTER[rootNote];
  const scaleNotes = getScaleNotes(rootNote, mode);
  return scaleNotes.map((note, i) => spellNote(note, (rootLetter + i) % 7));
}

export function getTriads(rootNote, mode) {
  const qualities = MODES[mode].qualities;
  const scaleNotes = getScaleNotes(rootNote, mode);
  const spelled = spellScale(rootNote, mode);

  return scaleNotes.map((note, i) => {
    const third = (i + 2) % 7;
    const fifth = (i + 4) % 7;
    const quality = qualities[i];
    const roman =
      quality === "M" || quality === "dim" || quality === "aug"
        ? ROMAN[i]
        : ROMAN[i].toLowerCase();

    const seventh = (i + 6) % 7;

    return {
      numeral:
        quality === "dim"
          ? roman + "\u00B0"
          : quality === "aug"
            ? roman + "+"
            : roman,
      root: spelled[i],
      name: spelled[i] + QUALITY_SUFFIX[quality],
      notes: [spelled[i], spelled[third], spelled[fifth]],
      seventh: spelled[seventh],
      quality,
      qualityLabel: QUALITY_SYMBOL[quality],
    };
  });
}
