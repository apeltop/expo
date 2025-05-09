import { router, useGlobalSearchParams } from 'expo-router';
import { Pressable, Text } from 'react-native';

export default function Hash() {
  const { '#': hash } = useGlobalSearchParams();
  console.error(useGlobalSearchParams());
  return (
    <>
      <Pressable testID="e2e-set-hash" onPress={() => router.setParams({ '#': 'world' })}>
        <Text>{hash}</Text>
      </Pressable>
      <Pressable testID="e2e-remove-hash" onPress={() => router.setParams({ '#': 'world' })}>
        <Text>{hash}</Text>
      </Pressable>
    </>
  );
}
