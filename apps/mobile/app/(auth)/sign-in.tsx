import { useSSO } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import React from "react";
import GoogleIcon from "../components/GoogleIcon";

export default function SignIn() {
  const { startSSOFlow } = useSSO();
  const router = useRouter();
  const onGoogleSignIn = React.useCallback(async () => {
    const { createdSessionId, setActive } = await startSSOFlow({
      strategy: "oauth_google",
    });
    if (createdSessionId) {
      setActive!({ session: createdSessionId });
      router.replace("/(home)");
    }
  }, [startSSOFlow, router]);
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Sign in to macrofactor-oss</Text>
        <Text style={styles.subtitle}>
          Welcome back! Please sign in to continue
        </Text>
        <TouchableOpacity style={styles.googleButton} onPress={onGoogleSignIn}>
          <View style={styles.googleButtonContent}>
            <GoogleIcon size={20} />
            <Text style={styles.googleButtonText}>Continue with Google</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a1a",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    backgroundColor: "#2a2a2a",
    borderRadius: 12,
    padding: 32,
    width: "100%",
    maxWidth: 400,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#3a3a3a",
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#ffffff",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#9ca3af",
    marginBottom: 32,
    textAlign: "center",
    lineHeight: 22,
  },
  googleButton: {
    backgroundColor: "#ffffff",
    borderRadius: 6,
    paddingVertical: 12,
    paddingHorizontal: 16,
    width: "100%",
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  googleButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  googleButtonText: {
    color: "#374151",
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 12,
  },
});
