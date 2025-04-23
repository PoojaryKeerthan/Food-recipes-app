import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Animated ,{ FadeInDown, FadeOut } from 'react-native-reanimated';


type CategoriesProps = {
    activeCategory: string;
    categories:Category[];
    Handlecategory: (category: string) => void;
  };

type Category={
    strCategory:string;
    strCategoryThumb: string;
}

  const Categories: React.FC<CategoriesProps> = ({categories, activeCategory, Handlecategory })  => {

    return (
        <Animated.View entering={FadeInDown.duration(500).springify()}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className='space-x-4'
                contentContainerStyle={{ paddingHorizontal: 15 }}
            >
            {
                categories.map((category, index) => {
                    let isActive = category.strCategory === activeCategory;
                    let activeClassname = isActive? 'bg-amber-400' : 'bg-black/10';
                    return(
                    <TouchableOpacity
                        key={index}
                        onPress={() => Handlecategory(category.strCategory)} 
                        className='flex items-center pt-2 pr-4'
                    >
                        <View className={`rounded-full  p-[6px] ${activeClassname}`}>
                            <Image source={{ uri: category.strCategoryThumb }} style={{ width: hp(8), height: hp(8) }}
                                className='rounded-full'
                            />
                        </View>
                        <Text className='text-neutral-600' style={{fontSize:hp(1.6)}}>
                            {category.strCategory}
                        </Text>
                    </TouchableOpacity>
                    )
                })
            }
        </ScrollView>
    </Animated.View >
  )
}

export default Categories