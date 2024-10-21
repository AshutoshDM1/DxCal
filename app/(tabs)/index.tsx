import { Text, View, TouchableOpacity, ImageBackground } from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";

const buttons = [
  ["C", "+/-", "%", "/"],
  ["7", "8", "9", "x"],
  ["4", "5", "6", "-"],
  ["1", "2", "3", "+"],
  ["0", ".", "="],
];

const RootLayout = () => {
  const [currentValue, setCurrentValue] = useState("0");
  const [operator, setOperator] = useState<any>(null);
  const [previousValue, setPreviousValue] = useState("");

  const handleTap = (value: string) => {
    if (["+", "-", "x", "/"].includes(value)) {
      handleOperator(value);
    } else if (value === "C") {
      handleClear();
    } else if (value === "+/-") {
      handleToggleSign();
    } else if (value === "%") {
      handlePercentage();
    } else if (value === "=") {
      handleEquals();
    } else {
      handleNumber(value);
    }
  };

  const handleClear = () => {
    setCurrentValue("0");
    setOperator(null);
    setPreviousValue("");
  };

  const handleToggleSign = () => {
    if (currentValue.startsWith("-")) {
      setCurrentValue(currentValue.substring(1));
    } else {
      setCurrentValue("-" + currentValue);
    }
  };

  const handlePercentage = () => {
    setCurrentValue((parseFloat(currentValue) / 100).toString());
  };

  const handleNumber = (value: string) => {
    if (currentValue === "0") {
      setCurrentValue(value);
    } else {
      setCurrentValue(currentValue + value);
    }
  };

  const handleOperator = (value: string) => {
    setOperator(value);
    setPreviousValue(currentValue);
    setCurrentValue("0");
  };

  const handleEquals = () => {
    const current = parseFloat(currentValue);
    const previous = parseFloat(previousValue);

    if (operator === "+") {
      setCurrentValue((previous + current).toString());
    } else if (operator === "-") {
      setCurrentValue((previous - current).toString());
    } else if (operator === "x") {
      setCurrentValue((previous * current).toString());
    } else if (operator === "/") {
      setCurrentValue((previous / current).toString());
    }
    setOperator(null);
    setPreviousValue("");
  };

  return (
    <View className="h-screen w-full flex justify-end  ">
      <StatusBar style="dark" />
      <View className="h-[40%] w-full  justify-end px-5 py-10">
        <Text className="text-right text-black text-5xl">{currentValue}</Text>
      </View>
      <View className="h-fit w-full rounded-tr-[25px] rounded-tl-[25px] p-4 pt-10 ">
        {buttons.map((row, rowIndex) => (
          <View key={rowIndex} className="flex flex-row justify-between mb-4">
            {row.map((button, buttonIndex) => (
              <TouchableOpacity
                onPress={() => handleTap(button)}
                key={buttonIndex}
                className={`w-[20%] h-[60px] bg-[#186dff] rounded-full flex items-center justify-center ${
                  button === "=" ||
                  button === "+" ||
                  button === "-" ||
                  button === "x" ||
                  button === "/"
                    ? "bg-orange-500"
                    : ""
                } ${button === "=" ? "w-[40%]" : ""} `}
              >
                <Text className="text-white text-center text-xl">{button}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
};

export default RootLayout;
