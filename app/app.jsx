import { Image } from "expo-image";
import { useState } from "react";
import { Pressable, StyleSheet, Text } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

import { intervalSteps, intToKey, intToScale, keyArray, scaleArray } from "../data/ScaleObjects";

export default function App() {
  const [currentKey, setCurrentKey] = useState(1);
  const [active, setActive] = useState(1);
  const [activeScale, setActiveScale] = useState(1);
  const [scaleDegree, setScaleDegree] = useState(1);
  let currentScaleArray = [];

  function convertKey(interval) {
    let x = currentKey + interval;
    if (x > 12) {
      x = x - 12;
    }
    return x;
  }

  function convertScaleIntervals(interval) {
    let x = scaleDegree + interval;
    if (x > 7) {
      x = x - 7;
    }
    return x;
  }

  function applyIntervalSteps(numOfDegrees) {
    let x = 0;
    for (let i = 0; i < numOfDegrees; i++) {
      let sdi = scaleDegree + i;
      if (sdi > 7) {
        sdi = sdi - 7;
      }
      x = x + intervalSteps[sdi];
    }
    return x;
  }

  function pushToCurrentScaleArray(degree) {
    currentScaleArray.push(
      String(intToKey[convertKey(applyIntervalSteps(degree))])
    );
  }

  const KeyButton = ({ id, keyName, isActive, value }) => {
    return (
      <Pressable
        id={id}
        value={value}
        type="button"
        className={
          isActive
            ? "keyButton btn btn-secondary buttonActive rounded-0"
            : "keyButton btn btn-secondary rounded-0"
        }
        onPress={(e) => {
          setCurrentKey(Number(e.target.value));
          setActive(Number(e.target.value));
          currentScaleArray = [];
        }}
      >
        <Text>{keyName}</Text>
      </Pressable>
    );
  };

  const ScaleButton = ({
    id,
    scaleName,
    isActiveScale,
    value,
    scaleDegree,
  }) => {
    return (
      <Pressable
        id={id}
        value={value}
        type="button"
        className={
          isActiveScale
            ? "scaleButton btn btn-secondary buttonActive rounded-0"
            : "scaleButton btn btn-secondary rounded-0"
        }
        onPress={(e) => {
          // setCurrentScale(Number(e.target.value));
          setActiveScale(Number(e.target.value));
          setScaleDegree(scaleDegree);
          currentScaleArray = [];
        }}
      >
        <Text>{scaleName}</Text>
      </Pressable>
    );
  };

  const currentDate = new Date();
  let currentYear = currentDate.getFullYear();
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">In Key</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Musical scale finder</ThemedText>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">
          {keyArray.map((item) => (
            <KeyButton
              isActive={active === item.idNo}
              keyName={item.keyName}
              value={item.idNo}
              key={item.idNo}
            />
          ))}
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">
          {scaleArray.map((item) => (
            <ScaleButton
              isActiveScale={activeScale === item.idNo}
              scaleName={item.scaleName}
              value={item.idNo}
              scaleDegree={item.scaleDegree}
              key={item.idNo}
            />
          ))}
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.stepContainer}><ThemedText type="subtitle">Chords in {intToKey[currentKey]} {intToScale[activeScale]}</ThemedText></ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
