import { View, ScrollView, TouchableOpacity, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { CachedImage } from '../../helpers/image';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/index'// ✅ Import the correct type
import { ChevronLeftIcon, ClockIcon, FireIcon, Square2StackIcon, Square3Stack3DIcon, UsersIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import axios from 'axios';
import Loading from '../components/Loading';
import YoutubeIframe from 'react-native-youtube-iframe';
// ✅ Correctly apply the type for props
type RecipieDetailsProps = NativeStackScreenProps<RootStackParamList, "RecipieDetails">;

const RecipieDetails: React.FC<RecipieDetailsProps> = ({ route, navigation }) => {
  const [isFav, setisFav] = useState(false);
  const [recipieDetails, setRecipieDetails] = useState(null);
  const [loading, setisloading] = useState(true);
  const navigations = useNavigation();

  const getRecipieDetails = async (id) => {
    try {
      const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      if (response && response.data) {
        setRecipieDetails(response.data.meals[0]);
        setisloading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const IngredientsIndexes = (recipies) => {
    if (!recipies) return [];
    let indexes = [];
    for (let i = 1; i <= 20; i++) {
      if (recipies[`strIngredient${i}`]) {
        indexes.push(i);
      }
    }
    return indexes;
  }

  const getyoutubeid =url=>{
    const regex  = /[?&]v=([^&]+)/;
    const match  = url.match(regex);
    
    
    if(match && match[1]){
      return match[1];
    }
    return null;
  }

  useEffect(() => {
    getRecipieDetails(route.params.idMeal)
  }, [])

  return (
    <ScrollView
      className="bg-white flex-1"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ padding: 30 }}
    >
      <StatusBar style="light" />
      <View className="flex-row justify-center">
        <CachedImage
          uri={route.params.strMealThumb}
          sharedTransitionTag={route.params.strMeal}
          style={{ width: wp(98), height: hp(50), borderBottomLeftRadius: 40, borderBottomRightRadius: 40, marginTop: 4 }}
        />
      </View>
      <Animated.View entering={FadeIn.delay(200).duration(1000)} className='w-full absolute flex-row justify-between items-center pt-10'>
        <TouchableOpacity onPress={() => navigations.goBack()} className='p-2 rounded-full ml-5 bg-white mt-14'>
          <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color="#fbbf24" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setisFav(!isFav)} className='p-2 rounded-full bg-white mt-14 flex left-10'>
          <HeartIcon size={hp(3.5)} strokeWidth={4.5} color={isFav === true ? 'red' : 'gray'} />
        </TouchableOpacity>
      </Animated.View>
      {
        loading ? (<Loading size="large" className='mt-16' />) : (
          <View className=' flex justify-between space-y-4 pt-6'>
            <Animated.View entering={FadeInDown.duration(700).springify().damping(12)} className='space-y-2'>
              <Text style={{ fontSize: hp(3.5) }} className="font-bold flex-1 text-neutral-700">
                {recipieDetails?.strMeal}
              </Text>
              <Text style={{ fontSize: hp(2) }} className="font-medium flex-1 text-neutral-500">
                {recipieDetails?.strArea}
              </Text>
            </Animated.View>
            <Animated.View entering={FadeInDown.delay(100).duration(700).springify().damping(12)} className='flex-row justify-around pt-2'>
              <View className='flex rounded-full bg-amber-300 p-2'>
                <View style={{ height: hp(6.5), width: hp(6.5) }}
                  className='bg-white rounded-full flex items-center justify-center'
                >
                  <ClockIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
                </View>
                <View className='flex items-center py-2 space-y-1'>
                  <Text style={{ fontSize: hp(2) }} className='font-bold text-neutral-700'>
                    35
                  </Text>
                  <Text style={{ fontSize: hp(1.3) }} className='font-bold text-neutral-700'>
                    Mins
                  </Text>
                </View>
              </View>
              <View className='flex rounded-full bg-amber-300 p-2'>
                <View style={{ height: hp(6.5), width: hp(6.5) }}
                  className='bg-white rounded-full flex items-center justify-center'
                >
                  <UsersIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
                </View>
                <View className='flex items-center py-2 space-y-1'>
                  <Text style={{ fontSize: hp(2) }} className='font-bold text-neutral-700'>
                    3
                  </Text>
                  <Text style={{ fontSize: hp(1.3) }} className='font-bold text-neutral-700'>
                    Servings
                  </Text>
                </View>
              </View>
              <View className='flex rounded-full bg-amber-300 p-2'>
                <View style={{ height: hp(6.5), width: hp(6.5) }}
                  className='bg-white rounded-full flex items-center justify-center'
                >
                  <FireIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
                </View>
                <View className='flex items-center py-2 space-y-1'>
                  <Text style={{ fontSize: hp(2) }} className='font-bold text-neutral-700'>
                    103
                  </Text>
                  <Text style={{ fontSize: hp(1.3) }} className='font-bold text-neutral-700'>
                    Cal
                  </Text>
                </View>
              </View>
              <View className='flex rounded-full bg-amber-300 p-2'>
                <View style={{ height: hp(6.5), width: hp(6.5) }}
                  className='bg-white rounded-full flex items-center justify-center'
                >
                  <Square3Stack3DIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
                </View>
                <View className='flex items-center py-2 space-y-1'>
                  <Text style={{ fontSize: hp(2) }} className='font-bold text-neutral-700'>

                  </Text>
                  <Text style={{ fontSize: hp(1.3) }} className='font-bold text-neutral-700'>
                    Easy
                  </Text>
                </View>
              </View>
            </Animated.View>
            <Animated.View entering={FadeInDown.delay(200).duration(700).springify().damping(12)} className='space-y-4 pt-2 '>
              <Text style={{ fontSize: hp(2.5) }} className="font-bold flex-1 text-neutral-700 ">
                Ingredients
              </Text>
              <View className='space-y-2 mt-3'>
                {
                  IngredientsIndexes(recipieDetails).map(i => {
                    return (
                      <View key={i} className='flex-row space-x-4'>
                        <View style={{ height: hp(1.5), width: hp(1.5) }}
                          className='bg-amber-300 rounded-full mr-2'>
                        </View>
                        <View className='flex-row'>
                          <Text style={{ fontSize: hp(2.5) }} className='font-extrabold text-neutral-700 '>{recipieDetails[`strMeasure${i}`]}</Text>
                          <Text style={{ fontSize: hp(2.5) }} className='font-medium text-neutral-600'>{"  " + recipieDetails[`strIngredient${i}`]}</Text>
                        </View>
                      </View>
                    )
                  })
                }
              </View>
            </Animated.View>

            <Animated.View entering={FadeInDown.delay(300).duration(700).springify().damping(12)} className='space-y-4 pt-3 ' >
              <Text style={{ fontSize: hp(2.5) }} className="font-bold flex-1 text-neutral-700 ">
                Instructions
              </Text>
              <Text style={{ fontSize: hp(2.2) }} className='text-neutral-700 pt-2'>
                {
                  recipieDetails?.strInstructions
                }
              </Text>
            </Animated.View>
            {
              recipieDetails.strYoutube && (
                <Animated.View  className=" pt-2 space-y-4">
                  <Text style={{ fontSize: hp(2.5) }} className="font-bold flex-1 text-neutral-700 ">
                    Recipie Video
                  </Text>
                  <View>
                    <YoutubeIframe
                    videoId={getyoutubeid(recipieDetails.strYoutube)}
                    height={hp(30)}
                    />
                  </View>
                </Animated.View>
              )
            }
          </View>
        )
      }
    </ScrollView>
  );
};

export default RecipieDetails;
