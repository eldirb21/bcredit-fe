import { PermissionsAndroid, Platform } from "react-native";

const requestBluetoothPermission = async () => {
  if (Platform.OS === "android" && Platform.Version >= 31) {
    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
    ]);

    return (
      granted["android.permission.BLUETOOTH_CONNECT"] === "granted" &&
      granted["android.permission.BLUETOOTH_SCAN"] === "granted"
    );
  }
  return true;
};

export { requestBluetoothPermission };
