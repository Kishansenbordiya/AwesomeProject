import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native';

const Login = () => {
const [newArry, setNewArray] = useState('')

  useEffect(() => {

    // var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
    // let val = arr.filter((num)=>{
    //   for (var i=2; i <= Math.sqrt(num); i++) {
    //     if (num % i === 0) return false;
    //   }
    //   return true;
    // })
    // console.log(val)


    // const even = [];
    // const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    // for (const num of arr) {
    //   if (num % 2 === 0) {
    //     even.push(num);
    //   }
    // }
    // console.log(even);



    // let str = "JanuaryNamanFebruaryKishanVijayMarchAjayAprilPriyankaMayNikitaJuneSanjayJulyRamanLoveAugustJaySeptemberShanOctoberRamNovemberShyamandDevDecemberRahul"
    // let arr = ["January,February,March,April,May,June,July,August,September,October,November,December"]
    // var newArry = []
    // for (let i = 0; i <= arr.length; i++) {
    //   if (str.match(arr[i])) {
    //     newArry.push(arr[i])
    //   }
    // }
    // console.log("NewArray=====>>>>", newArry)

    const str = ["JanuaryNamanFebruaryKishanVijayMarchAjayAprilPriyankaMayNikitaJuneSanjayJulyRamanLoveAugustJaySeptemberShanOctoberRamNovemberShyamandDevDecemberRahul"]
    const arr = ["January,February,March,April,May,June,July,August,September,October,November,December"]
    const newArry = arr.filter(function (obj) {
      return str.indexOf(obj) === -1;
    });
    setNewArray(newArry)
    console.log("NewArray=====>>>>", newArry)
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{newArry}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
    marginHorizontal:10
  },
});
export default Login;


