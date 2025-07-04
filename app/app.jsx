import { Image } from "expo-image";
import { useState } from "react";
import { Dimensions, Pressable, StyleSheet, View } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

import { intervalSteps, intToKey, intToScale, keyArray, minorSteps, scaleArray } from "../data/ScaleObjects";



export default function App() {
  const [currentKey, setCurrentKey] = useState(1);
  const [active, setActive] = useState(1);
  const [activeScale, setActiveScale] = useState(1);
  const [scaleDegree, setScaleDegree] = useState(1);
  let currentScaleArray = [];

  const intervalWidth = Dimensions.get("window").width/8


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
        onPress={() => {
          setCurrentKey(Number(value));
          setActive(Number(value));
          currentScaleArray = [];
        }}
      >
        <ThemedText type="subtitle">{keyName}</ThemedText>
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
          setActiveScale(Number(value));
          setScaleDegree(scaleDegree);
          currentScaleArray = [];
        }}
      >
        <ThemedText type="subtitle">{scaleName}</ThemedText>
      </Pressable>
    );
  };

  const currentDate = new Date();
  let currentYear = currentDate.getFullYear();
  
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#ffffff", dark: "#000000" }}
      headerImage={
        <Image
          source={require("@/assets/images/inKeyBanner_600.jpg")}
          style={styles.bannerImage}
        />
      }
    >
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="title" style={{textAlign:"center", marginTop:40}}>Tonic Root</ThemedText>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <View style={{flex:1, flexDirection:"row", justifyContent:"center", flexWrap:"wrap", gap:20}}>
          {keyArray.map((item) => (
            <KeyButton
              isActive={active === item.idNo}
              keyName={item.keyName}
              value={item.idNo}
              key={item.idNo}
            />
          ))}
        </View>
      </ThemedView>

       <ThemedView style={styles.stepContainer}>
        <ThemedText type="title" style={{textAlign:"center", marginTop:40}}>Mode</ThemedText>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
         <View style={{flex:1, flexDirection:"row", justifyContent:"center", flexWrap:"wrap", gap:20}}>
          {scaleArray.map((item) => (
            <ScaleButton
              isActiveScale={activeScale === item.idNo}
              scaleName={item.scaleName}
              value={item.idNo}
              scaleDegree={item.scaleDegree}
              key={item.idNo}
            />
          ))}
        </View>
      </ThemedView>

      <ThemedView style={styles.stepContainer}><ThemedText type="title" style={{textAlign:"center", marginTop:40}}>Chords in {intToKey[currentKey]} {intToScale[activeScale]}</ThemedText></ThemedView>
    <ThemedView style={{flex:1, flexDirection:"row", justifyContent:"space-between"}}>
          <ThemedText style={[styles.intervalContainer, {width:intervalWidth}]}>1</ThemedText>
          <ThemedText style={[styles.intervalContainer, {width:intervalWidth}]}>2</ThemedText>
          <ThemedText style={[styles.intervalContainer, {width:intervalWidth}]}>3</ThemedText>
          <ThemedText style={[styles.intervalContainer, {width:intervalWidth}]}>4</ThemedText>
          <ThemedText style={[styles.intervalContainer, {width:intervalWidth}]}>5</ThemedText>
          <ThemedText style={[styles.intervalContainer, {width:intervalWidth}]}>6</ThemedText>
          <ThemedText style={[styles.intervalContainer, {width:intervalWidth}]}>7</ThemedText>

    </ThemedView>
    <ThemedView style={{flex:1, flexDirection:"row", justifyContent:"space-between"}}>
    <ThemedText style={[styles.intervalContainer, {width:intervalWidth}]}>{intToKey[currentKey]} {"\n"}
              {minorSteps[convertScaleIntervals(0)]}
              {pushToCurrentScaleArray(0)}</ThemedText>
               <ThemedText style={[styles.intervalContainer, {width:intervalWidth}]}>{intToKey[convertKey(applyIntervalSteps(1))]}{"\n"}
              {minorSteps[convertScaleIntervals(1)]}
              {pushToCurrentScaleArray(1)}</ThemedText>
               <ThemedText style={[styles.intervalContainer, {width:intervalWidth}]}>{intToKey[convertKey(applyIntervalSteps(2))]}{"\n"}
              {minorSteps[convertScaleIntervals(2)]}
              {pushToCurrentScaleArray(2)}</ThemedText>
               <ThemedText style={[styles.intervalContainer, {width:intervalWidth}]}>{intToKey[convertKey(applyIntervalSteps(3))]}{"\n"}
              {minorSteps[convertScaleIntervals(3)]}
              {pushToCurrentScaleArray(3)}</ThemedText>
               <ThemedText style={[styles.intervalContainer, {width:intervalWidth}]}>{intToKey[convertKey(applyIntervalSteps(4))]}{"\n"}
              {minorSteps[convertScaleIntervals(4)]}
              {pushToCurrentScaleArray(4)}</ThemedText>
               <ThemedText style={[styles.intervalContainer, {width:intervalWidth}]}>{intToKey[convertKey(applyIntervalSteps(5))]}{"\n"}
              {minorSteps[convertScaleIntervals(5)]}
              {pushToCurrentScaleArray(5)}</ThemedText>
               <ThemedText style={[styles.intervalContainer, {width:intervalWidth}]}>{intToKey[convertKey(applyIntervalSteps(6))]}{"\n"}
              {minorSteps[convertScaleIntervals(6)]}
              {pushToCurrentScaleArray(6)}</ThemedText>
              </ThemedView>
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
  bannerImage: {
    height: 300,
    width: 550,
  },
intervalContainer:{
  textAlign:"center"
}
 
});
