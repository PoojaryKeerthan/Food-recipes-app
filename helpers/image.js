import { useEffect, useState } from "react";
import { Image } from "react-native";
import * as FileSystem from "expo-file-system";

export const CachedImage = ({ uri, ...props }) => {
  const [localUri, setLocalUri] = useState(null);

  useEffect(() => {
    const getCachedImage = async () => {
      try {
        const filename = uri.split("/").pop(); // Get filename from URL
        const path = `${FileSystem.cacheDirectory}${filename}`; // Cache directory
       
        
        // Check if file exists
        const fileInfo = await FileSystem.getInfoAsync(path);
        if (fileInfo.exists) {
          setLocalUri(path); // Use cached file
        } else {
          // Download and cache the image
          const downloaded = await FileSystem.downloadAsync(uri, path);
          setLocalUri(downloaded.uri);
        }
      } catch (error) {
        console.log("Error caching image:", error);
        setLocalUri(uri); // Fallback to original URI if caching fails
      }
    };

    getCachedImage();
  }, [uri]);

  return <Image {...props} source={{ uri: localUri || uri }} />;
};
