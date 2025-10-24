import React, { useEffect, useRef, useState } from "react";
import { View, Text, Animated, StyleSheet, Dimensions, ImageBackground, TextInput, Button, Alert, Switch} from "react-native";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

const { height } = Dimensions.get("window");

export default function Repaso() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [showMain, setShowMain] = useState(false);
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [mensaje, setMensaje] = useState("");
  const fadeLogo = useRef(new Animated.Value(0)).current;
  const scaleLogo = useRef(new Animated.Value(0.5)).current;
  const rotateLogo = useRef(new Animated.Value(0)).current;
  const slideText = useRef(new Animated.Value(height / 2)).current;
  const fadeOut = useRef(new Animated.Value(1)).current;
  const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const Registrarse = () => {
    if (nombre.trim() === "" ||correo.trim() === "" || !regexEmail.test(correo) || !isEnabled
    ) {
      Alert.alert("Error","Por favor completa todos los campos y usa un correo válido");
      alert('Error: Por favor completa todos los campos');
      setMensaje("Faltan datos o el correo no es válido");
    } else {
      Alert.alert("Registro exitoso",`Nombre: ${nombre}Correo: ${correo}`);
      alert('¡Éxito! Datos enviados correctamente');
      setMensaje(`Registro exitoso:${nombre} (${correo})`);
    }
  };

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeLogo, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: false,
      }),
      Animated.spring(scaleLogo, {
        toValue: 1,
        friction: 5,
        useNativeDriver: false,
      }),
      Animated.timing(rotateLogo, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: false,
      }),
    ]).start();

    Animated.timing(slideText, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: false,
      delay: 800,
    }).start();

    const timer = setTimeout(async () => {
      Animated.timing(fadeOut, {
        toValue: 0,
        duration: 800,
        useNativeDriver: false,
      }).start(async () => {
        await SplashScreen.hideAsync();
        setShowMain(true);
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const rotateInterpolate = rotateLogo.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "10deg"],
  });

  if (showMain) {
    return (
      <ImageBackground
        source={require("../assets/ws7oQ8.jpg")}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.Registro}>
          <Text style={styles.title}>Registro de Usuario</Text>
          <TextInput
            style={styles.input}
            placeholder="Nombre completo"
            placeholderTextColor="#ccc"
            value={nombre}
            onChangeText={setNombre}
          />
          <TextInput
            style={styles.input}
            placeholder="Correo electrónico"
            placeholderTextColor="#ccc"
            keyboardType="email-address"
            value={correo}
            onChangeText={setCorreo}
          />
          <Text style={styles.mensaje}>Aceptas términos y condiciones
            <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
          </Text>
          <Button title="Registrarse" onPress={Registrarse} />
          <Text style={styles.mensaje}>{mensaje}</Text>
        </View>
      </ImageBackground>
    );
  }

  return (
    <Animated.View style={[styles.container, { opacity: fadeOut }]}>
      <Animated.Image
        source={require("../assets/63706.webp")}
        resizeMode="contain"
        style={[
          styles.logoImage,
          {
            opacity: fadeLogo,
            transform: [{ scale: scaleLogo }, { rotate: rotateInterpolate }],
          },
        ]}
      />
      <Animated.Text
        style={[styles.text, { transform: [{ translateY: slideText }] }]}
      ></Animated.Text>
      <Animated.View
        style={[
          styles.loader,
          {
            opacity: fadeLogo,
            transform: [
              {
                translateX: slideText.interpolate({
                  inputRange: [0, height / 2],
                  outputRange: [0, -50],
                }),
              },
            ],
          },
        ]}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#007bff",
    justifyContent: "center",
    alignItems: "center",
  },
  loader: {
    width: 60,
    height: 6,
    backgroundColor: "#fff",
    borderRadius: 3,
  },
  logoImage: {
    width: 300,
    height: 300,
    marginBottom: 5,
  },
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  Registro: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    gap: 10,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#fff",
  },
  input: {
    width: "80%",
    borderWidth: 3,
    borderColor: "#f5f5f5",
    padding: 12,
    borderRadius: 9,
    color: "#fff",
  },
  mensaje: {
    marginTop: 20,
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
  },
});
