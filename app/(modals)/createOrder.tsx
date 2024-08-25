import React from 'react'
import { View, Text } from 'react-native'
import { useNavigation, useRouter, useLocalSearchParams } from "expo-router";

const CreateOrder = () => {
    const params = useLocalSearchParams();
    const { id, ticker, name, type, last_price, close_price } = params;
    console.log('CreateOrder', params);
  return (
      <View>
            <Text>{id}</Text>
          <Text>{name}</Text>
          <Text>{ticker}</Text>
          <Text>{type}</Text>
          <Text>{last_price}</Text>
          <Text>{close_price}</Text>

    </View>
  )
}

export default CreateOrder