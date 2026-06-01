import React from "react";
import {
  Text,
  Image,
  StyleSheet,
  Pressable,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";

import { COLORS } from "../../constants/colors";

const STARS = [
  { top: "8%",  left: "12%", size: 7,  opacity: 0.35 },
  { top: "14%", left: "78%", size: 5,  opacity: 0.25 },
  { top: "22%", left: "55%", size: 4,  opacity: 0.20 },
  { top: "6%",  left: "45%", size: 8,  opacity: 0.30 },
  { top: "31%", left: "88%", size: 5,  opacity: 0.25 },
  { top: "38%", left: "6%",  size: 6,  opacity: 0.30 },
  { top: "18%", left: "32%", size: 4,  opacity: 0.20 },
  { top: "28%", left: "68%", size: 7,  opacity: 0.25 },
  { top: "44%", left: "22%", size: 5,  opacity: 0.20 },
  { top: "10%", left: "90%", size: 4,  opacity: 0.30 },
];

export default function SplashScreen({ navigation }: any) {
  return (
    <Pressable
      style={{ flex: 1 }}
      onPress={() => navigation.replace("Login")}
    >
      <StatusBar style="light" />

      <LinearGradient
        colors={["#5CC8FF", "#29B6F6"]}
        style={styles.container}
      >

        {/* Background stars */}
        <View style={styles.starsContainer} pointerEvents="none">
          {STARS.map((s, i) => (
            <View
              key={i}
              style={[
                styles.star,
                {
                  top: s.top,
                  left: s.left,
                  width: s.size,
                  height: s.size,
                  opacity: s.opacity,
                },
              ]}
            />
          ))}
        </View>

        {/* Main content */}
        <View style={styles.content}>

          {/* Logo */}
          <Image
            source={require("../../assets/images/logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />

          {/* Frosted text card */}
          <View style={styles.textCard}>
            <Text style={styles.title}>Welcome!</Text>
            <Text style={styles.subtitle}>
              Let's continue your child's{"\n"}
              amazing journey together
            </Text>
          </View>

          {/* Mascots */}
          <Image
            source={require("../../assets/images/both_mascots.png")}
            style={styles.mascots}
            resizeMode="contain"
          />

        </View>

        {/* Tap pill */}
        <View style={styles.tapPill}>
          <Text style={styles.tapText}>✦  Tap anywhere to continue  ✦</Text>
        </View>

      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  /* Stars */
  starsContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  star: {
    position: "absolute",
    backgroundColor: COLORS.white,
    borderRadius: 99,
  },

  /* Layout */
  content: {
    flex: 1,
    alignItems: "center",
    paddingTop: 55,
    paddingBottom: 90,           // clears the tap pill
    justifyContent: "space-between",
  },

  /* Logo */
  logo: {
    width: 300,
    height: 130,
  },

  /* Text card */
  textCard: {
    backgroundColor: "rgba(255, 255, 255, 0.18)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.30)",
    borderRadius: 24,
    paddingHorizontal: 32,
    paddingVertical: 20,
    alignItems: "center",
    marginHorizontal: 28,
  },
  title: {
    fontSize: 40,
    fontWeight: "800",
    color: COLORS.white,
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: COLORS.white,
    lineHeight: 26,
    opacity: 0.92,
  },

  /* Mascots */
  mascots: {
    width: 310,
    height: 290,
  },

  /* Tap pill */
  tapPill: {
    position: "absolute",
    bottom: 34,
    alignSelf: "center",
    backgroundColor: "rgba(255, 255, 255, 0.18)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.35)",
    borderRadius: 99,
    paddingHorizontal: 22,
    paddingVertical: 9,
  },
  tapText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
});