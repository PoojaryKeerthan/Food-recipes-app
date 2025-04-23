import { View, Text, Pressable, Image, FlatList } from 'react-native';
import React, { useCallback } from 'react';
import { heightPercentageToDP as hp,widthPercentageToDP as wp  } from 'react-native-responsive-screen';
import Animated, { FadeInDown } from 'react-native-reanimated';
import Loading from './Loading';
import { CachedImage } from '../../helpers/image';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';


type RecipieType = {
  strMeal: string;
  strMealThumb: string;
  idMeal: number;
};

type RecipiesProps = {
  recipies: RecipieType[];
};

const Recipies: React.FC<RecipiesProps> = ({ recipies = [] }) => {
  const navigation = useNavigation<NavigationProp>();
  const renderItem = useCallback(({ item, index }: { item: RecipieType; index: number }) => <RecipieCard items={item} index={index} navigation={navigation} />, []);
  
  return (
    <View className=" mx-4 space-y-3">
      <Text style={{ fontSize: hp(3) }} className="font-semibold text-neutral-600">Recipies</Text>

      <View style={{ flex: 1 }}>
        {recipies.length === 0 ? (
          <Loading size="large" className='mt-20' />
        ) : (
          <FlatList
            data={recipies}
            keyExtractor={(item) => item.idMeal.toString()}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            renderItem={renderItem} // ✅ Now properly typed
            getItemLayout={(data, index) => ({
              length: hp(40),
              offset: hp(20) * index,
              index,
            })}
            initialNumToRender={20}
            maxToRenderPerBatch={15}
            windowSize={10}
            removeClippedSubviews={false}
            contentContainerStyle={{ paddingBottom: 50 }}
          />
        )}
      </View>
    </View>
  );
};

export default React.memo(Recipies); // ✅ Memoized for better performance

type RootStackParamList = {
  RecipieDetails: RecipieType;
};
type NavigationProp = NativeStackNavigationProp<RootStackParamList, "RecipieDetails">;
type CardProps = {
  items: RecipieType;
  index: number;
  navigation: NavigationProp;
};

const RecipieCard: React.FC<CardProps> = React.memo(({ items,index,navigation }) => {
  let isEven = index % 2 === 0;
  return (
    <Animated.View entering={FadeInDown.delay(index*50).duration(600).springify().damping(12)}>
      <Pressable
        style={{ width: '100%', paddingLeft: isEven ? 0 : 0, paddingRight: isEven ? 15 : 0 }}
        className="flex justify-center mb-4 space-y-1"
        onPress={()=>navigation.navigate('RecipieDetails', {...items})}
      >
        {/* <Image
          source={{ uri: items.strMealThumb, cache: 'only-if-cached' }}
          style={{ height: hp(30), width: wp(44) , borderRadius: 35 }}
          className="bg-black/5 "
          resizeMode="cover"
        /> */}
        <CachedImage
        uri={items.strMealThumb}
         style={{ height: hp(30), width: wp(44) , borderRadius: 35 }}
         className="bg-black/5 "
         resizeMode="cover"
         sharedTransitionTag={items.strMeal}
        />
        <Text style={{ fontSize: hp(2) }} className="font-semibold ml-2 text-neutral-600">
          {items.strMeal.length > 20 ? items.strMeal.substring(0, 20) + '...' : items.strMeal}
        </Text>
      </Pressable>
    </Animated.View>
  );
});
