import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";

import { COLORS } from "../../constants/colors";

const ROLE_ROUTES: Record<string, string> = {
  PARENT:      "ParentHome",
  TEACHER:     "TeacherHome",
  BRANCH_HEAD: "BranchHeadHome",
  SUPER_ADMIN: "SuperAdminHome",
};

const ROLE_LABELS: Record<string, string> = {
  PARENT:      "Parent",
  TEACHER:     "Teacher",
  BRANCH_HEAD: "Branch Head",
  SUPER_ADMIN: "Super Admin",
};

export default function OtpVerifyScreen({ route, navigation }: any) {
  const { phone, role } = route.params;

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputs = useRef<Array<TextInput | null>>([]);
  const filledCount = otp.filter(Boolean).length;

  const handleChange = (val: string, index: number) => {
    if (!/^\d*$/.test(val)) return;
    const updated = [...otp];
    updated[index] = val.slice(-1);
    setOtp(updated);
    if (val && index < 5) inputs.current[index + 1]?.focus();
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    // 🚧 DEV MODE: any 6 digits works, routes by role
    const destination = ROLE_ROUTES[role];
    navigation.reset({
      index: 0,
      routes: [{ name: destination }],
    });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <StatusBar style="light" />

      {/* Header */}
      <LinearGradient colors={["#5CC8FF", "#1a90d8"]} style={styles.topBg}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Image
          source={require("../../assets/images/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </LinearGradient>

      {/* Card */}
      <View style={styles.card}>

        <View style={styles.iconCircle}>
          <Text style={{ fontSize: 26 }}>📱</Text>
        </View>

        <Text style={styles.heading}>Verify your number</Text>

        <Text style={styles.subheading}>
          Code sent to{" "}
          <Text style={styles.phoneHighlight}>+91 {phone}</Text>
          {"\n"}
          <Text style={styles.roleChip}>
            Signing in as {ROLE_LABELS[role]}
          </Text>
        </Text>

        {/* OTP boxes */}
        <View style={styles.otpRow}>
          {otp.map((digit, i) => (
            <TextInput
              key={i}
              ref={(ref) => (inputs.current[i] = ref)}
              style={[
                styles.otpBox,
                digit       ? styles.otpBoxFilled : {},
                i === filledCount && filledCount < 6 ? styles.otpBoxActive : {},
              ]}
              value={digit}
              onChangeText={(val) => handleChange(val, i)}
              onKeyPress={(e) => handleKeyPress(e, i)}
              keyboardType="number-pad"
              maxLength={1}
              selectTextOnFocus
              caretHidden
            />
          ))}
        </View>

        {/* Dev hint */}
        <View style={styles.devBadge}>
          <Text style={styles.devText}>🚧 Dev mode — any 6 digits works</Text>
        </View>

        {/* Verify button */}
        <Pressable
          style={[styles.verifyBtn, filledCount < 6 && styles.verifyBtnDisabled]}
          onPress={handleVerify}
          disabled={filledCount < 6}
        >
          <Text style={styles.verifyBtnText}>Verify & Continue ✓</Text>
        </Pressable>

        {/* Resend (UI only) */}
        <View style={styles.resendRow}>
          <Text style={styles.resendLabel}>Didn't get a code? </Text>
          <TouchableOpacity>
            <Text style={styles.resendLink}>Resend OTP</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.wrongNumber}>✏️ Wrong number? Change it</Text>
        </TouchableOpacity>

        <Image
          source={require("../../assets/images/both_mascots.png")}
          style={styles.mascots}
          resizeMode="contain"
        />

      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  topBg: {
    height: 160,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 20,
    position: "relative",
    overflow: "hidden",
  },
  backBtn: {
    position: "absolute",
    top: 52,
    left: 20,
  },
  backText: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 14,
    fontWeight: "700",
  },
  logo: {
    width: 180,
    height: 72,
  },

  card: {
    flex: 1,
    backgroundColor: "#f0f7ff",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    marginTop: -20,
    padding: 28,
    paddingTop: 24,
    alignItems: "center",
    gap: 14,
  },

  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#e8f4ff",
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontSize: 22,
    fontWeight: "900",
    color: "#1a2332",
    letterSpacing: -0.3,
  },
  subheading: {
    fontSize: 14,
    color: "#6b8baa",
    textAlign: "center",
    lineHeight: 22,
  },
  phoneHighlight: {
    fontWeight: "800",
    color: "#1a5fa8",
    fontSize: 15,
  },
  roleChip: {
    fontSize: 12,
    fontWeight: "700",
    color: "#f4921e",
  },

  otpRow: {
    flexDirection: "row",
    gap: 10,
    marginVertical: 4,
  },
  otpBox: {
    width: 44,
    height: 54,
    borderRadius: 14,
    backgroundColor: "#fff",
    borderWidth: 1.5,
    borderColor: "#c9dff5",
    textAlign: "center",
    fontSize: 22,
    fontWeight: "900",
    color: "#1a2332",
  },
  otpBoxFilled: {
    borderColor: "#1a5fa8",
    backgroundColor: "#e8f4ff",
  },
  otpBoxActive: {
    borderColor: "#29B6F6",
    borderWidth: 2,
  },

  devBadge: {
    backgroundColor: "#fff8e0",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: "#ffd580",
  },
  devText: {
    fontSize: 11,
    color: "#b07010",
    fontWeight: "700",
  },

  verifyBtn: {
    backgroundColor: "#f4921e",
    borderRadius: 16,
    paddingVertical: 15,
    width: "100%",
    alignItems: "center",
  },
  verifyBtnDisabled: {
    opacity: 0.45,
  },
  verifyBtnText: {
    fontSize: 16,
    fontWeight: "900",
    color: "#fff",
  },

  resendRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  resendLabel: {
    fontSize: 13,
    color: "#8aabca",
    fontWeight: "600",
  },
  resendLink: {
    fontSize: 13,
    fontWeight: "800",
    color: "#f4921e",
  },
  wrongNumber: {
    fontSize: 12,
    color: "#8aabca",
    fontWeight: "600",
  },

  mascots: {
    width: 160,
    height: 130,
    marginTop: "auto",
  },
});