import { Button } from "@/components/Button";
import { router } from "expo-router";
import { Image, StyleSheet, View } from "react-native";

const imageLogo = require("@/assets/images/silksong_logo_white-fs8.png")

export default function Index() {
  return (
    <View style={styles.container}>
      <Image style={{width: "auto", height: 200, marginTop: 20}} source={imageLogo}/>
      <View style={styles.content}>
        <Button title="MAPA" onPress={() => router.navigate("/map")} />
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
