import { ScrollView, StatusBar, Text, View } from "react-native";

export default function SettingScreen() {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#F5F6FA" }}>
      <StatusBar
        backgroundColor={"#e3e3e3"}
        hidden={false}
        barStyle={"dark-content"}
        translucent={false}
        showHideTransition={"none"}
      />
      <View
        style={{ height: 50, justifyContent: "center", alignItems: "center" }}
      >
        <Text style={{ fontWeight: "600" }}>MY PROFILE</Text>
      </View>

      <View style={{ flex: 1 }}>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#ececec",
            padding: 8,
            height: 160,
          }}
        >
          <View
            style={{
              backgroundColor: "#FEE2E2",
              height: 50,
              width: 50,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 25,
            }}
          >
            <Text style={{ color: "#991B1B", fontWeight: "700" }}>
              {"Eldiro".slice(0, 2).toUpperCase()}
            </Text>
          </View>
          <Text style={{ marginTop: 12, color: "#991B1B", fontWeight: "700" }}>
            {"Eldiro"}
          </Text>
          <Text style={{ color: "#991B1B", fontWeight: "700" }}>
            {"0813101817161"}
          </Text>
        </View>

        <View
          style={{
            gap: 8,
            justifyContent: "center",
            flexDirection: "row",
            alignItems: "center",
            paddingTop: 8,
          }}
        >
          <View
            style={{
              backgroundColor: "#ececec",
              height: 80,
              width: "30%",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 8,
            }}
          >
            <Text style={{ color: "#000000", fontSize: 18, fontWeight: "700" }}>
              120
            </Text>
            <Text style={{ fontSize: 14, fontWeight: "600", color: "#575656" }}>
              Customer Aktif
            </Text>
          </View>
          <View
            style={{
              backgroundColor: "#ececec",
              height: 80,
              width: "30%",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 8,
            }}
          >
            <Text style={{ color: "#046d29", fontSize: 18, fontWeight: "700" }}>
              80
            </Text>
            <Text style={{ fontSize: 14, fontWeight: "600", color: "#575656" }}>
              Berhasil Apr
            </Text>
          </View>
          <View
            style={{
              backgroundColor: "#ececec",
              height: 80,
              width: "30%",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 8,
            }}
          >
            <Text style={{ color: "#04226d", fontSize: 18, fontWeight: "700" }}>
              86%
            </Text>
            <Text style={{ fontSize: 14, fontWeight: "600", color: "#575656" }}>
              Target Bulan Ini
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
