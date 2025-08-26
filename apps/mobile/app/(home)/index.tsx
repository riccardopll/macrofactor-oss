import { useUser } from "@clerk/clerk-expo";
import { Text, View, StyleSheet } from "react-native";
import SignOutButton from "@/app/components/SignOutButton";
import { trpc } from "../trpc";

export default function HomePage() {
  const { user } = useUser();
  const foodQuery = trpc.foodList.useInfiniteQuery(
    { limit: 20 },
    { getNextPageParam: (last) => last.nextCursor },
  );
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.welcome}>Welcome to macrofactor-oss!</Text>
        <Text style={styles.userInfo}>Hello, {user?.firstName}</Text>
        <SignOutButton />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    padding: 20,
  },
  content: {
    alignItems: "center",
  },
  welcome: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  userInfo: {
    fontSize: 16,
    color: "#666",
    marginBottom: 32,
    textAlign: "center",
  },
});
