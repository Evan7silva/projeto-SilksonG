import { Button } from "@/components/Button";
import { ImageLogo } from "@/components/ImageLogo";
import { router } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <ImageLogo/>
      <View style={styles.content}>
        <Button title="Brasões" onPress={() => router.navigate("/blazon")}/>
        <Button title="Mapa" onPress={() => router.navigate("/map")} />
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    //paddingBottom: 200,
  },
});
