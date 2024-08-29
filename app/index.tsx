import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { defaultStyles } from "@/constants/Styles";
import { Video, ResizeMode } from "expo-av";
import { useAssets } from "expo-asset";
import { Link } from "expo-router";

const StartPage = () => {
  const [assets] = useAssets([require("@/assets/videos/intro.mp4")]);

  return (
    <View style={styles.container}>
      {assets && (
        <Video
          resizeMode={ResizeMode.COVER}
          isMuted
          isLooping
          shouldPlay
          source={{ uri: assets[0].uri }}
          style={styles.video}
        />
      )}
      <View style={styles.headerContainer}>
        <Text style={styles.header}>
          ¿Listo para cambiar cómo manejas tu dinero?
        </Text>
      </View>

      <View style={styles.buttons}>
        <Link href={"/home"} style={styles.link} asChild>
          <TouchableOpacity>
            <Text style={styles.buttonText}>Comenzar</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  video: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  headerContainer: {
    marginTop: 80,
    padding: 20,
  },
  header: {
    fontSize: 32,
    fontWeight: "900",
    textTransform: "uppercase",
    color: "white",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    marginBottom: 60,
    paddingHorizontal: 20,
  },
  link: {
    flex: 1,
    backgroundColor: "#fff",
    ...defaultStyles.pillButton,
  },
  buttonText: {
    fontSize: 22,
    fontWeight: "500",
  },
});

export default StartPage;
