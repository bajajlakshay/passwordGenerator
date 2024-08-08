import { StyleSheet, Text, View, TextInput, Pressable, Modal, SafeAreaView } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
// import { Slider } from '@miblanchard/react-native-slider';
import Slider from '@react-native-community/slider';




const App = () => {

  const [length, setLength] = useState(10)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")
  const [numberColor, setNumberColor] = useState('#ffffff')
  const [charColor, setCharColor] = useState('#ffffff')
  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUUVWXYZabcdedfghijklmnopqrstuvwxyz"
    if (numberAllowed) {
      str += "1234567890"
    }
    if (charAllowed) {
      str += "!@#$%^&*(){}:?></,.';;][=-~`"
    }
    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)
  }, [length, numberAllowed, charAllowed, setPassword])
  useEffect(() => {
    passwordGenerator()
  }, [length, charAllowed, numberAllowed, passwordGenerator])

  return (

    <SafeAreaView style={styles.container}>
      <SafeAreaView style={styles.subContainer}>
        <Slider
         thumbTintColor="#ffffff"
         style={{
          backgroundColor:"#1d222e",
          width:'100%',
          height:100,
         }}
         shouldRasterizeIOS={true}
          minimumValue={6}
          maximumValue={100}
          value={length}
          onValueChange={(value) => setLength(value)}
          minimumTrackTintColor='#f29e74'
          maximumTrackTintColor='#c4fb80'
          
        />

        <Text style={styles.passwordTxt} selectable={true}>{password}</Text>

        <View style={styles.numberContainer}>

          <Text style={styles.numberTxt}>add number</Text>

          <View>
            <Pressable onPress={() => {
              setNumberAllowed(!numberAllowed)

              if (numberAllowed) {
                setNumberColor('#b15359')
              }
              else {

                setNumberColor('#c9e65b')

              }
            }}
              style={[styles.numberBtn, { backgroundColor: numberColor }]}>

              <Text>            </Text>

            </Pressable>
          </View>

        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ color: "#d99fbc", fontSize: 30 }}>add Characters</Text>

          <Pressable onPress={() => {
            { setCharAllowed(!charAllowed) }

            charAllowed ? setCharColor("#b15359") : setCharColor('#c9e65b')

          }}
            style={[styles.charBtn, { backgroundColor: charColor }]}>

            <Text>            </Text>

          </Pressable>

        </View>
      </SafeAreaView>
    </SafeAreaView>
  )
}

export default App

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1f2430' },
  subContainer: { paddingHorizontal: 5 },
  passwordTxt: { fontSize: 20, color: '#ffb252' },
  numberContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  numberTxt: { color: '#d99fbc', fontSize: 30 },
  numberBtn: { margin: 3, borderRadius: 50, width: 50, height: 50 },
  charBtn: { margin: 3, borderRadius: 50, width: 50, height: 50 }
})