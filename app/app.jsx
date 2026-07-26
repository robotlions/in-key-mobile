import { Image } from "expo-image";
import { useState } from "react";
import {
  Dimensions,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

import { getTriads, MODES, NOTES, spellScale } from "../data/ScaleObjects";

const QUALITY_BORDER = {
  M: { borderColor: "#2850a0", borderStyle: "solid" },
  m: { borderColor: "#888", borderStyle: "solid" },
  dim: { borderColor: "#888", borderStyle: "dashed" },
  aug: { borderColor: "#2850a0", borderStyle: "dotted" },
};

export default function App() {
  const [rootNote, setRootNote] = useState(0);
  const [mode, setMode] = useState(0);
  const [show7th, setShow7th] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const { height, width } = useWindowDimensions();
  const isPortrait = height > width;
  const screenWidth = Dimensions.get("screen").width;

  const triads = getTriads(rootNote, mode);
  const spelled = spellScale(rootNote, mode);

  const KeyButton = ({ index }) => {
    const isActive = rootNote === index;
    return (
      <Pressable
        style={isActive ? styles.pressableActive : styles.pressableInactive}
        onPress={() => setRootNote(index)}
      >
        <ThemedText type="default">{NOTES[index]}</ThemedText>
      </Pressable>
    );
  };

  const ModeButton = ({ index }) => {
    const isActive = mode === index;
    return (
      <Pressable
        style={isActive ? styles.pressableActive : styles.pressableInactive}
        onPress={() => setMode(index)}
      >
        <ThemedText type="default">{MODES[index].name}</ThemedText>
      </Pressable>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Image
          source={require("@/assets/images/inKeyBanner_600.jpg")}
          style={{
            width: isPortrait ? screenWidth : 0,
            height: isPortrait ? screenWidth * 0.5 : 0,
            display: !isPortrait && "none",
          }}
          contentFit="cover"
        />
        <View
          style={{
            backgroundColor: "#E08000",
            width: screenWidth,
            height: 50,
            display: isPortrait && "none",
            justifyContent: "flex-end",
          }}
        >
          <Text
            style={{
              color: "white",
              fontFamily: "FigtreeSemiBold",
              fontSize: 20,
              marginLeft: 20,
            }}
          >
            In Key Chord Finder
          </Text>
        </View>

        <View style={styles.changeKeyRow}>
          <Pressable
            style={styles.changeKeyBtn}
            onPress={() => setModalVisible(true)}
          >
            <ThemedText type="default">Change Key</ThemedText>
          </Pressable>
        </View>

        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle" style={{ textAlign: "center" }}>
            Notes in {NOTES[rootNote]} {MODES[mode].name}
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.stepContainer}>
          <View style={styles.buttonRow}>
            {spelled.map((note, i) => (
              <ThemedText
                key={i}
                style={{
                  fontFamily: "FigtreeRegular",
                  fontSize: 18,
                  paddingHorizontal: 8,
                }}
              >
                {note}
              </ThemedText>
            ))}
          </View>
        </ThemedView>

        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle" style={{ textAlign: "center" }}>
            Triads in {NOTES[rootNote]} {MODES[mode].name}
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.triadsContainer}>
          {triads.map((triad) => {
            const border = QUALITY_BORDER[triad.quality];
            return (
              <View
                key={triad.numeral}
                style={[
                  styles.triadCard,
                  {
                    borderColor: border.borderColor,
                    borderStyle: border.borderStyle,
                    borderWidth: 2,
                  },
                ]}
              >
                <ThemedText style={styles.triadNumeral}>
                  {triad.numeral}
                </ThemedText>
                <ThemedText style={styles.triadName}>{triad.name}</ThemedText>
                <ThemedText style={styles.triadNotes}>
                  {triad.notes.join(" - ")}
                  {show7th && (
                    <Text style={{ color: "#a04040" }}> - {triad.seventh}</Text>
                  )}
                </ThemedText>
              </View>
            );
          })}
        </ThemedView>
        <View style={styles.toggleRow}>
          <ThemedText style={{ marginRight: 8 }}>Show 7th</ThemedText>
          <Switch value={show7th} onValueChange={setShow7th} />
        </View>

        <View style={styles.legendRow}>
          <View style={styles.legendItem}>
            <View
              style={[
                styles.legendSwatch,
                {
                  borderColor: "#2850a0",
                  borderWidth: 2,
                  borderStyle: "solid",
                },
              ]}
            />
            <ThemedText style={styles.legendLabel}>Major</ThemedText>
          </View>
          <View style={styles.legendItem}>
            <View
              style={[
                styles.legendSwatch,
                { borderColor: "#888", borderWidth: 2, borderStyle: "solid" },
              ]}
            />
            <ThemedText style={styles.legendLabel}>Minor</ThemedText>
          </View>
          <View style={styles.legendItem}>
            <View
              style={[
                styles.legendSwatch,
                { borderColor: "#888", borderWidth: 2, borderStyle: "dashed" },
              ]}
            />
            <ThemedText style={styles.legendLabel}>Diminished</ThemedText>
          </View>
          <View style={styles.legendItem}>
            <View
              style={[
                styles.legendSwatch,
                {
                  borderColor: "#2850a0",
                  borderWidth: 2,
                  borderStyle: "dotted",
                },
              ]}
            />
            <ThemedText style={styles.legendLabel}>Augmented</ThemedText>
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      <Modal
        visible={modalVisible}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <ThemedText type="subtitle">Change Key</ThemedText>
            <Pressable
              style={styles.doneBtn}
              onPress={() => setModalVisible(false)}
            >
              <ThemedText
                type="default"
                style={{ fontFamily: "FigtreeSemiBold" }}
              >
                Done
              </ThemedText>
            </Pressable>
          </View>

          <ScrollView contentContainerStyle={styles.modalScroll}>
            <ThemedText type="subtitle" style={{ textAlign: "center" }}>
              Tonic Root
            </ThemedText>
            <View style={styles.buttonRow}>
              {NOTES.map((_, i) => (
                <KeyButton key={i} index={i} />
              ))}
            </View>

            <ThemedText
              type="subtitle"
              style={{ textAlign: "center", marginTop: 20 }}
            >
              Mode
            </ThemedText>
            <View style={styles.buttonRow}>
              {MODES.map((_, i) => (
                <ModeButton key={i} index={i} />
              ))}
            </View>

            <Pressable
              style={styles.closeBtn}
              onPress={() => setModalVisible(false)}
            >
              <ThemedText
                type="default"
                style={{ fontFamily: "FigtreeSemiBold" }}
              >
                Close
              </ThemedText>
            </Pressable>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  stepContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 10,
  },
  pressableActive: {
    padding: 10,
    backgroundColor: "#E08000",
    borderRadius: 5,
  },
  pressableInactive: {
    padding: 10,
    borderRadius: 5,
  },
  toggleRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
  },
  triadsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 12,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  triadCard: {
    alignItems: "center",
    borderRadius: 6,
    padding: 10,
    minWidth: 100,
    maxWidth: 140,
  },
  triadNumeral: {
    fontSize: 14,
    marginBottom: 2,
  },
  triadName: {
    fontFamily: "FigtreeSemiBold",
    fontSize: 18,
    marginBottom: 4,
  },
  triadNotes: {
    fontSize: 12,
    textAlign: "center",
  },
  legendRow: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 16,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  legendSwatch: {
    width: 14,
    height: 14,
    borderRadius: 3,
  },
  changeKeyRow: {
    alignItems: "center",
    paddingVertical: 10,
  },
  changeKeyBtn: {
    backgroundColor: "#E08000",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  modalContainer: {
    flex: 1,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  doneBtn: {
    padding: 10,
  },
  modalScroll: {
    padding: 20,
    gap: 10,
  },
  closeBtn: {
    backgroundColor: "#E08000",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: "center",
    marginTop: 20,
  },
  legendLabel: {
    fontSize: 12,
  },
});
