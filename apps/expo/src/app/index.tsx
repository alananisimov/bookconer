import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, Stack } from "expo-router";
import { FlashList } from "@shopify/flash-list";

import type { RouterOutputs } from "~/utils/api";
import { api } from "~/utils/api";

function PostCard(props: { book: RouterOutputs["book"]["all"][number] }) {
  return (
    <View className="flex flex-row rounded-lg bg-muted p-4">
      <View className="flex-grow">
        <Link
          asChild
          href={{
            pathname: "/book/[id]",
            params: { id: props.book.id },
          }}
        >
          <Pressable className="">
            <Text className=" text-xl font-semibold text-primary">
              {props.book.title}
            </Text>
            <Text className="mt-2 text-foreground">
              {props.book.description}
            </Text>
          </Pressable>
        </Link>
      </View>
      <Pressable>
        <Text className="font-bold uppercase text-primary">Delete</Text>
      </Pressable>
    </View>
  );
}

export default function Index() {
  const utils = api.useUtils();

  const postQuery = api.book.all.useQuery();

  return (
    <SafeAreaView className=" bg-background">
      {/* Changes page title visible on the header */}
      <Stack.Screen options={{ title: "Home Page" }} />
      <View className="h-full w-full bg-background p-4">
        <Text className="pb-2 text-center text-5xl font-bold text-foreground">
          Create <Text className="text-primary">T3</Text> Turbo
        </Text>

        <Pressable
          onPress={() => void utils.book.all.invalidate()}
          className="flex items-center rounded-lg bg-primary p-2"
        >
          <Text className="text-foreground"> Refresh posts</Text>
        </Pressable>

        <View className="py-2">
          <Text className="font-semibold italic text-primary">
            Press on a post
          </Text>
        </View>

        <FlashList
          data={postQuery.data}
          estimatedItemSize={20}
          ItemSeparatorComponent={() => <View className="h-2" />}
          renderItem={(p) => <PostCard book={p.item} />}
        />
      </View>
    </SafeAreaView>
  );
}
