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

const ROLE_ROUTES: Record<string, string> = {
  PARENT: "ParentHome",
  TEACHER: "TeacherHome",
  BRANCH_HEAD: "BranchHeadHome",
  SUPER_ADMIN: "SuperAdminHome",
};

const ROLE_LABELS: Record<string, string> = {
  PARENT: "Parent",
  TEACHER: "Teacher",
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

    if (val && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (
      e.nativeEvent.key === "Backspace" &&
      !otp[index] &&
      index > 0
    ) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
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

      <LinearGradient
        colors={["#5CC8FF", "#1A90D8"]}
        style={styles.container}
      >
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>

        <Image
          source={require("../../assets/images/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.smallLabel}>
          VERIFY NUMBER
        </Text>

        <Text style={styles.heroTitle}>
          One quick step{"\n"}
          and you're in!
        </Text>

        <View style={styles.phoneCard}>
          <Text style={styles.phoneEmoji}>📱</Text>

          <View>
            <Text style={styles.phoneNumber}>
              +91 {phone}
            </Text>

            <Text style={styles.phoneRole}>
              Signing in as {ROLE_LABELS[role]}
            </Text>
          </View>
        </View>

        <View style={styles.otpCard}>
          <Text style={styles.codeLabel}>
            ENTER 6-DIGIT CODE
          </Text>

          <View style={styles.otpRow}>
            {otp.map((digit, i) => (
              <TextInput
                key={i}
                ref={(ref) => (inputs.current[i] = ref)}
                style={[
                  styles.otpBox,
                  digit
                    ? styles.otpBoxFilled
                    : {},
                  i === filledCount &&
                  filledCount < 6
                    ? styles.otpBoxActive
                    : {},
                ]}
                value={digit}
                onChangeText={(val) =>
                  handleChange(val, i)
                }
                onKeyPress={(e) =>
                  handleKeyPress(e, i)
                }
                keyboardType="number-pad"
                maxLength={1}
                selectTextOnFocus
                caretHidden
              />
            ))}
          </View>

          <View style={styles.devBadge}>
            <Text style={styles.devText}>
              🚧 Dev Mode — Any 6 Digits Work
            </Text>
          </View>

          <Pressable
            style={[
              styles.verifyBtn,
              filledCount < 6 &&
                styles.verifyBtnDisabled,
            ]}
            disabled={filledCount < 6}
            onPress={handleVerify}
          >
            <Text style={styles.verifyBtnText}>
              Verify & Continue
            </Text>
          </Pressable>

          <View style={styles.resendRow}>
            <Text style={styles.resendLabel}>
              Didn't get a code?
            </Text>

            <TouchableOpacity>
              <Text style={styles.resendLink}>
                Resend OTP
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.changeNumber}>
              ✏️ Wrong number? Change it
            </Text>
          </TouchableOpacity>
        </View>

        <Image
          source={require("../../assets/images/both_mascots.png")}
          style={styles.mascots}
          resizeMode="contain"
        />
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 24,
  },

  backBtn: {
    marginBottom: 12,
  },

  backText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "700",
  },

  logo: {
    width: 220,
    height: 90,
    alignSelf: "center",
    marginBottom: 10,
  },

  smallLabel: {
    color: "#D9F2FF",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.5,
  },

  heroTitle: {
    color: "#FFFFFF",
    fontSize: 38,
    lineHeight: 42,
    fontWeight: "900",
    marginTop: 8,
    marginBottom: 24,
  },

  phoneCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.18)",
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderRadius: 20,
    marginBottom: 24,
  },

  phoneEmoji: {
    fontSize: 24,
    marginRight: 12,
  },

  phoneNumber: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "800",
  },

  phoneRole: {
    color: "#EAF8FF",
    fontSize: 13,
    marginTop: 2,
  },

  otpCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 28,
    padding: 22,
  },

  codeLabel: {
    fontSize: 12,
    fontWeight: "800",
    color: "#7CA0C5",
    letterSpacing: 1,
    marginBottom: 18,
  },

  otpRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  otpBox: {
    width: 48,
    height: 64,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: "#C9DFF5",
    textAlign: "center",
    fontSize: 24,
    fontWeight: "900",
    color: "#1A2332",
  },

  otpBoxFilled: {
    backgroundColor: "#E8F4FF",
    borderColor: "#1A5FA8",
  },

  otpBoxActive: {
    borderWidth: 2,
    borderColor: "#29B6F6",
  },

  devBadge: {
    backgroundColor: "#FFF8E0",
    borderColor: "#FFD580",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 7,
    alignSelf: "center",
    marginTop: 18,
  },

  devText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#B07010",
  },

  verifyBtn: {
    backgroundColor: "#F4921E",
    borderRadius: 18,
    paddingVertical: 18,
    alignItems: "center",
    marginTop: 20,
  },

  verifyBtnDisabled: {
    opacity: 0.45,
  },

  verifyBtnText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "900",
  },

  resendRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 18,
  },

  resendLabel: {
    color: "#8AABCA",
    fontSize: 13,
    fontWeight: "600",
  },

  resendLink: {
    color: "#F4921E",
    fontSize: 13,
    fontWeight: "800",
    marginLeft: 4,
  },

  changeNumber: {
    marginTop: 14,
    textAlign: "center",
    color: "#8AABCA",
    fontSize: 12,
    fontWeight: "600",
  },

  mascots: {
    width: 230,
    height: 180,
    alignSelf: "center",
    marginTop: "auto",
    marginBottom: 10,
  },
});