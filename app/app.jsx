import { Image } from "expo-image";
import { useState } from "react";
import {
  Dimensions, Pressable,
  ScrollView,
  StyleSheet, Text,
  useWindowDimensions,
  View
} from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

import {
  intervalSteps,
  intToKey,
  intToScale,
  keyArray,
  minorSteps,
  scaleArray,
} from "../data/ScaleObjects";

export default function App() {
  const [currentKey, setCurrentKey] = useState(1);
  const [active, setActive] = useState(1);
  const [activeScale, setActiveScale] = useState(1);
  const [scaleDegree, setScaleDegree] = useState(1);
  let currentScaleArray = [];

  const intervalWidth = Dimensions.get("window").width / 6;
  const screenWidth = Dimensions.get("screen").width;

  const {height, width} = useWindowDimensions();
  const isPortrait = height > width;

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
        style={isActive ? styles.pressableActive : styles.pressableInactive}
        onPress={() => {
          setCurrentKey(Number(value));
          setActive(Number(value));
          currentScaleArray = [];
        }}
      >
        <ThemedText type="default">{keyName}</ThemedText>
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
        style={isActiveScale ? styles.pressableActive : styles.pressableInactive }
        onPress={(e) => {
          // setCurrentScale(Number(e.target.value));
          setActiveScale(Number(value));
          setScaleDegree(scaleDegree);
          currentScaleArray = [];
        }}
      >
        <ThemedText type="default">{scaleName}</ThemedText>
      </Pressable>
    );
  };


  return (
    <ScrollView
    contentContainerStyle={{flexGrow:1}}
    >
        <Image
          source={require("@/assets/images/inKeyBanner_600.jpg")}
          style={{width: isPortrait ? screenWidth : 0, height: isPortrait ? screenWidth*.5 : 0, display: !isPortrait && "none"}}
          contentFit="cover"
        />
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle" style={{ textAlign: "center"}}>
          Tonic Root
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "center",
            flexWrap: "wrap",
           
          }}
        >
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
        <ThemedText type="subtitle" style={{ textAlign: "center"}}>
          Mode
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "center",
            flexWrap: "wrap",
           
          }}
        >
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

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle" style={{ textAlign: "center" }}>
          Chords in {intToKey[currentKey]} {intToScale[activeScale]}
        </ThemedText>
      </ThemedView>
      {/* <ThemedView
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <ThemedText
          style={[styles.intervalContainer, { width: intervalWidth }]}
        >
          1
        </ThemedText>
        <ThemedText
          style={[styles.intervalContainer, { width: intervalWidth }]}
        >
          2
        </ThemedText>
        <ThemedText
          style={[styles.intervalContainer, { width: intervalWidth }]}
        >
          3
        </ThemedText>
        <ThemedText
          style={[styles.intervalContainer, { width: intervalWidth }]}
        >
          4
        </ThemedText>
        <ThemedText
          style={[styles.intervalContainer, { width: intervalWidth }]}
        >
          5
        </ThemedText>
        <ThemedText
          style={[styles.intervalContainer, { width: intervalWidth }]}
        >
          6
        </ThemedText>
        <ThemedText
          style={[styles.intervalContainer, { width: intervalWidth }]}
        >
          7
        </ThemedText>
      </ThemedView> */}
      <ThemedView
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "center",
          flexWrap:"wrap",
          gap:20,
        }}
      >
       
        
       
        <ThemedText
          style={[styles.intervalContainer, { width: intervalWidth, fontSize:20 }]}
        >
          <ThemedText>1</ThemedText>{"\n"}
          {intToKey[currentKey]}
          {minorSteps[convertScaleIntervals(0)]}
          {pushToCurrentScaleArray(0)}
        </ThemedText>
      
        <ThemedText
          style={[styles.intervalContainer, { width: intervalWidth, fontSize:20 }]}
        >
          <ThemedText>2</ThemedText>{"\n"}
          {intToKey[convertKey(applyIntervalSteps(1))]}
          {minorSteps[convertScaleIntervals(1)]}
          {pushToCurrentScaleArray(1)}
        </ThemedText>
        <ThemedText
          style={[styles.intervalContainer, { width: intervalWidth, fontSize:20 }]}
        >
           <ThemedText>3</ThemedText>{"\n"}
          {intToKey[convertKey(applyIntervalSteps(2))]}
          
          {minorSteps[convertScaleIntervals(2)]}
          {pushToCurrentScaleArray(2)}
        </ThemedText>
        <ThemedText
          style={[styles.intervalContainer, { width: intervalWidth, fontSize:20 }]}
        >
           <ThemedText>4</ThemedText>{"\n"}
          {intToKey[convertKey(applyIntervalSteps(3))]}
          
          {minorSteps[convertScaleIntervals(3)]}
          {pushToCurrentScaleArray(3)}
        </ThemedText>
        <ThemedText
          style={[styles.intervalContainer, { width: intervalWidth, fontSize:20 }]}
        >
          <ThemedText>5</ThemedText>{"\n"}
          {intToKey[convertKey(applyIntervalSteps(4))]}
         
          {minorSteps[convertScaleIntervals(4)]}
          {pushToCurrentScaleArray(4)}
        </ThemedText>
        <ThemedText
         style={[styles.intervalContainer, { width: intervalWidth, fontSize:20 }]}
        >
           <ThemedText>6</ThemedText>{"\n"}
          {intToKey[convertKey(applyIntervalSteps(5))]}
         
          {minorSteps[convertScaleIntervals(5)]}
          {pushToCurrentScaleArray(5)}
        </ThemedText>
        <ThemedText
          style={[styles.intervalContainer, { width: intervalWidth, fontSize:20 }]}
        >
           <ThemedText>7</ThemedText>{"\n"}
          {intToKey[convertKey(applyIntervalSteps(6))]}
          
          {minorSteps[convertScaleIntervals(6)]}
          {pushToCurrentScaleArray(6)}
        </ThemedText>
      </ThemedView>
      <View><Text style={{height:100}}></Text></View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
  
          flex: 1,
          flexDirection: "row",
          justifyContent: "center",
          flexWrap:"wrap",
          gap:20,
  },
  bannerImage: {
    height: 300,
    width: 550,
  },
  intervalContainer: {
    textAlign: "center",
    paddingTop:10,
    paddingBottom:10,
    borderRadius:5,
  },

  pressableActive:{
    padding:10,
   backgroundColor: "#E08000",
    borderRadius:5,
  },
  pressableInactive:{
    padding:10,
    borderRadius:5,
  }
});
