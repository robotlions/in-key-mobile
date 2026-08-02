import { StyleSheet, Text, useWindowDimensions, View } from "react-native";

import { noteToChromatic } from "../data/ScaleObjects";

const WHITE_SEMITONES = [0, 2, 4, 5, 7, 9, 11];
const WHITE_LETTERS = ["C", "D", "E", "F", "G", "A", "B"];
const BLACK_DEFS = [
  { afterWhite: 0, offset: 1 },
  { afterWhite: 1, offset: 3 },
  { afterWhite: 3, offset: 6 },
  { afterWhite: 4, offset: 8 },
  { afterWhite: 5, offset: 10 },
];

const PRESSED = "#888888";
const WHITE_COUNT = 8;

export default function PianoChord({ triad, show7th }) {
  const { width } = useWindowDimensions();

  const rootChrom = noteToChromatic(triad.root);
  const notes = triad.notes.map(noteToChromatic);
  const seventhChrom = noteToChromatic(triad.seventh);
  const offsets = notes.map((c) => (c - rootChrom + 12) % 12);
  const seventhOffset = (seventhChrom - rootChrom + 12) % 12;

  const startWhiteIdx = (() => {
    let idx = 0;
    for (let i = 0; i < WHITE_SEMITONES.length; i++) {
      if (WHITE_SEMITONES[i] <= rootChrom) idx = i;
    }
    return idx;
  })();

  const pressed = new Set([
    rootChrom,
    rootChrom + offsets[1],
    rootChrom + offsets[2],
  ]);
  if (show7th) pressed.add(rootChrom + seventhOffset);

  const labelBySemitone = {
    [rootChrom]: triad.root,
    [rootChrom + offsets[1]]: triad.notes[1],
    [rootChrom + offsets[2]]: triad.notes[2],
  };
  if (show7th) labelBySemitone[rootChrom + seventhOffset] = triad.seventh;

  const chordTones = show7th ? [...triad.notes, triad.seventh] : triad.notes;
  const useFlats = chordTones.some((n) => n.includes("b"));

  const KEY_W = Math.max(24, Math.floor((width * 0.8) / WHITE_COUNT));
  const KEY_H = 160;
  const BLACK_W = Math.floor(KEY_W * 0.6);
  const BLACK_H = 100;

  const whiteKeys = [];
  for (let k = 0; k < WHITE_COUNT; k++) {
    const oct = Math.floor((startWhiteIdx + k) / 7);
    const within = (startWhiteIdx + k) % 7;
    const semitone = oct * 12 + WHITE_SEMITONES[within];
    whiteKeys.push({
      semitone,
      letter: labelBySemitone[semitone] ?? WHITE_LETTERS[within],
      pressed: pressed.has(semitone),
    });
  }

  const blackKeys = [];
  for (let k = 0; k < WHITE_COUNT; k++) {
    const oct = Math.floor((startWhiteIdx + k) / 7);
    const within = (startWhiteIdx + k) % 7;
    const black = BLACK_DEFS.find((b) => b.afterWhite === within);
    if (!black) continue;
    const semitone = oct * 12 + WHITE_SEMITONES[within] + 1;
    blackKeys.push({
      x: (k + 1) * KEY_W - BLACK_W / 2,
      semitone,
      letter:
        labelBySemitone[semitone] ??
        (useFlats
          ? WHITE_LETTERS[(within + 1) % 7] + "b"
          : WHITE_LETTERS[within] + "#"),
      pressed: pressed.has(semitone),
    });
  }

  const totalWidth = WHITE_COUNT * KEY_W;

  return (
    <View style={[styles.keyboard, { width: totalWidth, height: KEY_H }]}>
      <View style={{ flexDirection: "row" }}>
        {whiteKeys.map((wk, i) => (
          <View
            key={`w${i}`}
            style={[
              styles.whiteKey,
              {
                width: KEY_W,
                height: KEY_H,
                backgroundColor: wk.pressed ? PRESSED : "#ffffff",
              },
            ]}
          >
            <Text
              style={[
                styles.whiteLabel,
                { color: wk.pressed ? "#ffffff" : "#000000" },
              ]}
            >
              {wk.letter}
            </Text>
          </View>
        ))}
      </View>
      {blackKeys.map((bk, i) => (
        <View
          key={`b${i}`}
          style={[
            styles.blackKey,
            {
              left: bk.x,
              width: BLACK_W,
              height: BLACK_H,
              backgroundColor: bk.pressed ? PRESSED : "#111111",
            },
          ]}
        >
          <Text style={styles.blackLabel}>{bk.letter}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  keyboard: {
    position: "relative",
    alignSelf: "center",
  },
  whiteKey: {
    borderRadius: 3,
    borderColor: "#333",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 10,
  },
  whiteLabel: {
    fontFamily: "FigtreeSemiBold",
    fontSize: 13,
  },
  blackKey: {
    position: "absolute",
    top: 0,
    borderRadius: 2,
    borderColor: "#000",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 8,
    zIndex: 10,
    elevation: 10,
  },
  blackLabel: {
    fontFamily: "FigtreeSemiBold",
    fontSize: 11,
    color: "#ffffff",
  },
});
