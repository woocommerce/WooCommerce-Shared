import AsyncStorage from "@react-native-async-storage/async-storage";

/*
 * Depenencies Key definitions.
 */
export enum Dependency {
  _none = "", // Fill with values when needed
}

/*
 * Stores a dependency into the local storage.
 */
export async function storeDependency(key: Dependency, value: string) {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.log(`Error storing ${key}`, error);
  }
}

/*
 * Reads a previously stored dependency from the local storage.
 */
export async function readDependency(key: Dependency) {
  try {
    const item = await AsyncStorage.getItem(key);
    if (item !== null) {
      return item;
    } else {
      console.log(`Value for ${key} not found`);
    }
  } catch (error) {
    console.log(`Error retrieving ${key}`, error);
  }
}
