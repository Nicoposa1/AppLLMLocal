import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";

const TypingAnimation = () => {
  const dot1 = useRef(new Animated.Value(0)).current;
  const dot2 = useRef(new Animated.Value(0)).current;
  const dot3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animateDot = (dot: Animated.Value, delay: number) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(dot, {
            toValue: 1,
            duration: 300,
            delay,
            useNativeDriver: true,
          }),
          Animated.timing(dot, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    animateDot(dot1, 0);
    animateDot(dot2, 300);
    animateDot(dot3, 600);
  }, [dot1, dot2, dot3]);

  return (
    <View style={styles.dotContainer}>
      <Animated.View
        style={[styles.dot, { opacity: dot1 }]}
      />
      <Animated.View
        style={[styles.dot, { opacity: dot2 }]}
      />
      <Animated.View
        style={[styles.dot, { opacity: dot3 }]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  dotContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#58a0ed",
    marginHorizontal: 4,
  },
});

export default TypingAnimation;
