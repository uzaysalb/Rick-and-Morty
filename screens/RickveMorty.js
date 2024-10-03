import React, { useRef, useEffect } from "react";
import { View, Image, StyleSheet, Animated, SafeAreaView, Text, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native'; 
import Icon from 'react-native-vector-icons/Ionicons';
import blue from "../src/assets/rickmorty.jpeg";

const RickveMorty = () => {
  const rotationValue = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation(); 

  useEffect(() => {
    startRotationAnimation();
  }, []);

  const startRotationAnimation = () => {
    Animated.loop(
      Animated.timing(rotationValue, {
        toValue: 1,
        duration: 5000,
        useNativeDriver: true,
      })
    ).start();
  };

  const interpolatedRotation = rotationValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <SafeAreaView style={styles.container}>
      <Animated.Image
        source={blue}
        resizeMode="stretch"
        style={[styles.image, { transform: [{ rotate: interpolatedRotation }] }, styles.rounded]}
      />
      <Text style={styles.title}>RICK AND MORTY</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.cardContainer}>
        <View style={styles.card}>
        <Text style={styles.cardTitle}>Kozmik İroni: 
        </Text>
          <Text style={styles.cardContent}>
        Rick, evrenin en zeki adamı olarak kendini tanıtıyor, ama çoğu zaman yaptıklarıyla tam bir kaos yaratıyor. İronik olarak, tüm bu zeka, sık sık sorunlarının daha da kötüleşmesine neden oluyor!
          </Text>
        </View>
        <View style={styles.card}>
        <Text style={styles.cardTitle}> Sınırsız Sezonlar: 
        </Text>
          <Text style={styles.cardContent}>
         Dizi, çoklu evren konsepti sayesinde sonsuz hikaye olanağı sunuyor. Bu da demektir ki, Rick ve Morty, her bölümde yeni bir evrende yeni ve tuhaf maceralara atılabilirler. Sonsuz olasılıklar, sonsuz eğlence!
          </Text>
        </View>
        <View style={styles.card}>
        <Text style={styles.cardTitle}>Efsanevi Cümle:
        </Text>
          <Text style={styles.cardContent}> Rick'in sık sık söylediği "Wubba Lubba Dub Dub!" ifadesi, ilk başta komik bir şarkı gibi görünüyor, ancak aslında "Ben acı çekiyorum!" anlamına geliyor. Rick’in karmaşık ruh halini yansıtıyor!
          </Text>
        </View>
        <View style={styles.card}>
        <Text style={styles.cardTitle}>Dünyanın Sonu: 
        </Text>
          <Text style={styles.cardContent}>"The Ricklantis Mixup" bölümünde, Rick’lerin dünyası hakkında daha fazla bilgi edinirken, çoğu Rick'in içindeki cehennem gibi yaşam koşullarını görüyoruz. Hem komik hem de düşündürücü bir bakış açısı!
          </Text>
        </View>
        <View style={styles.card}>
        <Text style={styles.cardTitle}>İlk Sözler:
        </Text>
          <Text style={styles.cardContent}> Rick, ilk bölümde Morty'ye "Yetenekli çocuk" diye hitap ediyor. Bu, izleyicilere Rick’in Morty’ye olan saygısız ama bir o kadar da koruyucu tavrını hemen gösteriyor.
          </Text>
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Bölümler', { screen: 'Home' })}>
        <View style={styles.buttonContent}>
          <Text style={styles.buttonText}>İZLE</Text>
          <Icon name="play-outline" size={22} color="white" style={styles.icon} />
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
  },
  image: {
    marginTop: 20,
    width: 240,
    height: 240,
  },
  rounded: {
    borderRadius: 150,
  },
  title: {
    fontSize: 34,
    fontWeight: "500",
    letterSpacing: 9,
    textAlign: "center",
    marginTop: 10,
    color: "white",
  },
  cardContainer: {
    marginTop: 20,
    paddingLeft: 10,
  },
  card: {
    width: 180,
    padding: 15,
    height: 240,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 10,
    marginRight: 15,
    borderWidth: 2,
    borderColor: "grey",
    borderStyle: "solid",
  },
  cardTitle: {
    fontSize: 18,
    bottom:5,
    color: "#ddd",
    textAlign:"center",
    fontWeight:"600"
  },
  cardContent: {
    fontSize: 14,
    color: "#ddd",
    textAlign:"center",
  },
  button: {
    marginBottom: 20,
    paddingVertical: 20,
    paddingHorizontal: 80,
    backgroundColor: 'green',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "lightgrey",
    borderStyle: "solid",
    shadowColor: 'white',
    shadowOffset: { width: 0, height: 0 }, 
    shadowOpacity: 0.5, 
    shadowRadius: 10, 
    elevation: 10, 
},
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 22,
    color: 'white',
    fontWeight: "700",
    letterSpacing: 5,
  },
  icon: {
    marginLeft: 10,
  },
});

export default RickveMorty;
