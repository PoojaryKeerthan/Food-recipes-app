import { View, ActivityIndicator, ActivityIndicatorProps } from 'react-native';
import React from 'react';

interface LoadingProps extends ActivityIndicatorProps {}

const Loading: React.FC<LoadingProps> = (props) => {
  return (
    <View className="flex-1 flex justify-center items-center">
      <ActivityIndicator {...props} />
    </View>
  );
};

export default Loading;
