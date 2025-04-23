import { View, Text, Image, TextInput, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { heightPercentageToDP as hp,widthPercentageToDP as wp  } from 'react-native-responsive-screen';
import { BellIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import axios from 'axios';
import Categories from '../components/Categories';
import Recipies from '../components/Recipies';

type RecipieType = {
  strMeal: string;
  strMealThumb: string;
  idMeal: number;
};
const HomeScreen = () => {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('Starter');
  const [recipie, setRecipie] = useState<RecipieType[]>([]);

  useEffect(() => {
    getCategories();
    getRecipies();
  }, []);

  const getCategories = async () => {
    try {
      const response = await axios.get('https://www.themealdb.com/api/json/v1/1/categories.php');
      if (response && response.data) {
        setCategories(response.data.categories);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getRecipies = async (category = 'Starter') => {
    try {
      const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
      if (response && response.data) {
        setRecipie(response.data.meals);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const HandleCategory = (category: string) => {
    getRecipies(category);
    setActiveCategory(category);
    setRecipie([]);
  };

  return (
    <View className="flex-1 bg-white">
      <StatusBar style="dark" />
      
      {/* ✅ FlatList Handles Scrolling */}
      <FlatList
        data={recipie}
        keyExtractor={(item) => item.idMeal.toString()}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View className="space-y-6 pt-14">
            {/* Header */}
            <View className="mx-4 flex-row justify-between items-center mb-2">
              <Image source={require('../../assets/user.png')} style={{ width: hp(5.5), height: hp(5.5) }} />
              <BellIcon size={hp(4)} color="gray" />
            </View>

            {/* Title */}
            <View className="mx-4 my-3 space-y-4 mb-4">
              <Text style={{ fontSize: hp(2) }} className="text-neutral-600 font-bold mb-2 mt-2">Hello, Kee2!</Text>
              <Text style={{ fontSize: hp(3.8) }} className="font-semibold text-neutral-600">
                Make Your Own Food,
              </Text>
              <Text style={{ fontSize: hp(3.8) }} className="font-semibold text-neutral-600">
                Stay at <Text className="text-amber-400">Home</Text>
              </Text>
            </View>

            {/* Search Bar */}
            <View className="mx-4 flex-row items-center rounded-full bg-black/5 p-[6px]">
              <TextInput
                placeholder="Search for recipies"
                placeholderTextColor={"gray"}
                style={{ fontSize: hp(1.7) }}
                className="flex-1 text-base mb-1 pl-3 tracking-wider"
              />
              <View className="bg-white rounded-full p-3">
                <MagnifyingGlassIcon size={hp(2.5)} strokeWidth={3} color="gray" />
              </View>
            </View>

            {/* Categories */}
            {categories.length > 0 && <Categories categories={categories} activeCategory={activeCategory} Handlecategory={HandleCategory} />}
          </View>
        }
        renderItem={null} // Recipes will be handled separately in Recipies.tsx
        ListFooterComponent={<Recipies recipies={recipie} />}
        contentContainerStyle={{ paddingBottom: 50 }}
        nestedScrollEnabled={true}
      />
    </View>
  );
};

export default HomeScreen;
