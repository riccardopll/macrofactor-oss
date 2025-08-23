import React from "react";
import { Image } from "react-native";

interface GoogleIconProps {
  size?: number;
}

const GoogleIcon: React.FC<GoogleIconProps> = ({ size = 20 }) => {
  return (
    <Image
      source={require("../../assets/images/google.svg")}
      style={{ width: size, height: size }}
      resizeMode="contain"
    />
  );
};

export default GoogleIcon;
