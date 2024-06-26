import { SafeAreaView, Text, View } from "react-native";
import { Image } from "expo-image";
import { Stack, useGlobalSearchParams } from "expo-router";

import { api } from "~/utils/api";

export default function Post() {
  const { id } = useGlobalSearchParams();
  if (!id || typeof id !== "string") throw new Error("unreachable");
  const { data } = api.book.byId.useQuery({ id: parseInt(id) });

  if (!data) return null;

  return (
    <SafeAreaView className="bg-background">
      <Stack.Screen options={{ title: data.title }} />
      <View className="h-full w-full p-4">
        <Image source={data.imageLink} style={{ width: 100, height: 100 }} />
        <Text className="py-2 text-3xl font-bold text-primary">
          {data.title}
        </Text>
        <Text className="py-4 text-foreground">{data.description}</Text>
      </View>
    </SafeAreaView>
  );
}
