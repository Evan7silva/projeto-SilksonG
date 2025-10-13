import { colors } from "@/theme/colors";
import { router } from "expo-router";
import { Button, StyleSheet, View } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <Button 
      title="Map" 
      color={colors.red[300]} 
      onPress={() => router.navigate("/map")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 200,
  },
});
