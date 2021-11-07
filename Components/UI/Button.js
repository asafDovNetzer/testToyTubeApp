import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default Button = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View
        style={{
          backgroundColor: props.backgroundColor || `transparent`,
          padding: 4,
          width: props.width || `100%`,
          height: props.height || `100%`,
          justifyContent: `center`,
          alignItems: `center`,
        }}
      >
        <Text
          style={{
            color: props.color || `black`,
            fontSize: props.fontSize || 20,
            textAlign: `center`,
          }}
        >
          {props.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
