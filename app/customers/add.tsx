import { SelectInput } from "@/components/atoms";
import { ANGSUR_TYPE, axiosInstance, TENOR_TYPE } from "@/utils";
import Icons from "@expo/vector-icons/Feather";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AddCustomerScreen() {
  const [form, setForm] = useState({
    nama: "",
    pekerjaan: "",
    tempatUsaha: "",
    jenisUsaha: "",
    phone: "",
    alamat: "",
    anggota: "",
    resort: "",

    noPinjaman: generateNoPinjaman(),

    pinjamanPokok: "",
    tipeAngsuran: "harian",
    tenor: "25",
    angsuranNominal: "",
  });

  const [errors, setErrors] = useState<any>({});

  /* ================= HELPERS ================= */

  function generateNoPinjaman() {
    return "PJM-" + Date.now().toString().slice(-6);
  }

  const formatRupiah = (num: number) =>
    new Intl.NumberFormat("id-ID").format(num);

  const setField = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev: any) => ({ ...prev, [key]: "" }));
  };

  /* ================= CALCULATION ================= */

  useEffect(() => {
    calculateAngsuran();
  }, [form.tenor, form.tipeAngsuran, form.pinjamanPokok]);

  const calculateAngsuran = () => {
    const pokok = Number(form.pinjamanPokok);
    const tenor = Number(form.tenor);

    if (!pokok || !tenor) {
      setForm((prev) => ({ ...prev, angsuranNominal: "" }));
      return;
    }

    const bunga = form.tipeAngsuran === "harian" ? 25 : 20;

    const bungaNominal = (pokok * bunga) / 100;
    const total = pokok + bungaNominal;
    const angsuran = total / tenor;

    setForm((prev) => ({
      ...prev,
      angsuranNominal: formatRupiah(Math.round(angsuran)),
    }));
  };

  /* ================= SUBMIT ================= */

  const handleSubmit = async () => {
    try {
      const result = await axiosInstance.post("api/nasabah", form);
      console.log("DATA:", result.data?.success);
      console.log("DATA:", result.data?.message);
      router.replace("/(tabs)/customer");
    } catch (error) {
      console.log("DATA error:", error);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.container}>
          {/* HEADER */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()}>
              <Icons name="arrow-left" size={20} />
            </TouchableOpacity>
            <Text style={styles.title}>Tambah Nasabah</Text>
            <View style={{ width: 20 }} />
          </View>

          {/* DATA NASABAH */}
          <Section title="Data Nasabah">
            <Input
              label="Nama"
              value={form.nama}
              onChange={(v) => setField("nama", v)}
            />
            <Input
              label="Pekerjaan"
              value={form.pekerjaan}
              onChange={(v) => setField("pekerjaan", v)}
            />
            <Input
              label="Tempat Usaha"
              value={form.tempatUsaha}
              onChange={(v) => setField("tempatUsaha", v)}
            />
            <Input
              label="Jenis Usaha"
              value={form.jenisUsaha}
              onChange={(v) => setField("jenisUsaha", v)}
            />
            <Input
              label="No Anggota"
              value={form.anggota}
              onChange={(v) => setField("anggota", v)}
            />
            <Input
              label="Resort"
              value={form.resort}
              onChange={(v) => setField("resort", v)}
            />
            <Input
              label="No HP"
              value={form.phone}
              onChange={(v) => setField("phone", v)}
              keyboard="phone-pad"
            />
            <Input
              label="Alamat"
              value={form.alamat}
              onChange={(v) => setField("alamat", v)}
              multiline
            />
          </Section>

          {/* DATA PINJAMAN */}
          <Section title="Data Pembiayaan">
            <Input
              label="No Pinjaman"
              value={form.noPinjaman}
              onChange={() => {}}
              editable={false}
            />

            <Input
              label="Pinjaman Pokok"
              value={form.pinjamanPokok}
              onChange={(v) => setField("pinjamanPokok", v)}
              keyboard="numeric"
            />

            <View style={{ flexDirection: "row", gap: 12 }}>
              <SelectInput
                label="Tipe Angsuran"
                value={form.tipeAngsuran}
                options={TENOR_TYPE}
                onSelect={(val) => {
                  setForm((prev) => ({
                    ...prev,
                    tipeAngsuran: val,
                    tenor: val === "harian" ? "25" : "",
                    angsuranNominal: "",
                  }));
                }}
              />

              {form.tipeAngsuran === "harian" ? (
                <Input
                  label="Total Angsuran"
                  value={form.tenor}
                  onChange={(v) => setField("tenor", v)}
                  keyboard="numeric"
                />
              ) : (
                <SelectInput
                  label="Total Minggu"
                  value={form.tenor}
                  options={ANGSUR_TYPE}
                  onSelect={(val) => setField("tenor", val)}
                />
              )}
            </View>

            <Input
              label={`Angsuran ${form.tipeAngsuran}`}
              value={String(form.angsuranNominal)}
              onChange={() => {}}
              editable={false}
            />
          </Section>

          {/* BUTTON */}
          <TouchableOpacity onPress={handleSubmit} style={styles.submitBtn}>
            <Text style={styles.submitText}>Simpan Nasabah</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

/* ================= COMPONENT ================= */

const Section = ({ title, children }: any) => (
  <View style={{ marginBottom: 16 }}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <View style={{ gap: 10 }}>{children}</View>
  </View>
);

const Input = ({
  label,
  value,
  onChange,
  keyboard,
  multiline,
  editable = true,
}: any) => (
  <View>
    {label && <Text style={styles.label}>{label}</Text>}
    <TextInput
      value={value}
      onChangeText={onChange}
      keyboardType={keyboard}
      multiline={multiline}
      editable={editable}
      style={[
        styles.input,
        multiline && { height: 80 },
        !editable && { backgroundColor: "#F3F4F6" },
      ]}
      placeholder={`Masukkan ${label || ""}`}
    />
  </View>
);

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F5F6FA" },

  container: {
    padding: 16,
    paddingBottom: 40,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  title: {
    fontSize: 16,
    fontWeight: "700",
  },

  sectionTitle: {
    fontWeight: "700",
    marginBottom: 6,
    color: "#374151",
  },

  label: {
    fontSize: 12,
    marginBottom: 4,
    color: "#6B7280",
  },

  input: {
    backgroundColor: "#FFF",
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  submitBtn: {
    backgroundColor: "#111827",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },

  submitText: {
    color: "#FFF",
    fontWeight: "600",
  },
});
