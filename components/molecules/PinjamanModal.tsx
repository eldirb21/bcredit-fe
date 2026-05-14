"use client";

import { axiosInstance } from "@/utils";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";

type Nasabah = {
  id: string;
  label: string;
  value: string;
};

type Props = {
  onClose: () => void;
  onSuccess: () => void;
};

export function PinjamanModal({ onClose, onSuccess }: Props) {
  const [nasabah, setNasabah] = useState<Nasabah[]>([]);
  const [selected, setSelected] = useState<string>("");

  const [form, setForm] = useState({
    pinjamanPokok: "",
    tipeAngsuran: "" as "harian" | "mingguan" | "",
    tenor: "",
    angsuranNominal: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchNasabah();
  }, []);

  const fetchNasabah = async () => {
    try {
      const res = await axiosInstance.get("nasabah/dropdown");
      setNasabah(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  // 🔥 HITUNG ANGSURAN
  const calculateAngsuran = (pokok: number, tipe: string, tenor: number) => {
    if (!pokok || !tenor) return "";

    let bunga = 1;

    if (tipe === "harian") bunga = 1.25;
    if (tipe === "mingguan") bunga = 1.2;

    const total = pokok * bunga;
    const angsuran = total / tenor;

    return String(Math.ceil(angsuran));
  };

  // 🔥 INPUT PINJAMAN
  const handlePokokChange = (val: string) => {
    const pokok = Number(val);
    const tenor = Number(form.tenor || 0);

    const angsuran = calculateAngsuran(pokok, form.tipeAngsuran, tenor);

    setForm((prev) => ({
      ...prev,
      pinjamanPokok: val,
      angsuranNominal: angsuran,
    }));
  };

  // 🔥 PILIH TIPE ANGSURAN
  const handleTipeChange = (value: "harian" | "mingguan") => {
    const pokok = Number(form.pinjamanPokok || 0);

    let tenor = "";

    if (value === "harian") tenor = "25";
    if (value === "mingguan") tenor = "6";

    const angsuran = calculateAngsuran(pokok, value, Number(tenor));

    setForm((prev) => ({
      ...prev,
      tipeAngsuran: value,
      tenor,
      angsuranNominal: angsuran,
    }));
  };

  // 🔥 GANTI TENOR (KHUSUS MINGGUAN)
  const handleTenorChange = (val: "6" | "8" | "10") => {
    const pokok = Number(form.pinjamanPokok || 0);

    const angsuran = calculateAngsuran(pokok, "mingguan", Number(val));

    setForm((prev) => ({
      ...prev,
      tenor: val,
      angsuranNominal: angsuran,
    }));
  };

  // 🔥 SUBMIT
  const handleSubmit = async () => {
    try {
      if (!selected) return alert("Pilih nasabah");
      if (!form.pinjamanPokok) return alert("Isi pinjaman");
      if (!form.tipeAngsuran) return alert("Pilih tipe");

      setLoading(true);

      const selectedNasabah = nasabah.find((x) => x.value === selected);

      await axiosInstance.post("pinjaman", {
        namaPeminjam: selectedNasabah?.label,
        anggotaId: selected,
        pinjamanPokok: Number(form.pinjamanPokok),
        tipeAngsuran: form.tipeAngsuran,
        tenor: Number(form.tenor),
        angsuranNominal: Number(form.angsuranNominal),
      });

      onSuccess();
      onClose();
    } catch (err) {
      console.log(err);
      alert("Gagal create pinjaman");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={overlay}>
      <View style={modal}>
        <Text style={{ fontWeight: "bold", marginBottom: 10 }}>
          Tambah Pinjaman
        </Text>

        {/* NASABAH */}
        <Dropdown
          data={nasabah}
          labelField="label"
          valueField="value"
          placeholder="Pilih Nasabah"
          searchPlaceholder="Cari Nama nasabah"
          searchPlaceholderTextColor="#cac5c5"
          selectedTextStyle={{ textTransform: "capitalize" }}
          value={selected}
          onChange={(item) => setSelected(item.value)}
          search
          style={input}
          itemTextStyle={{ textTransform: "capitalize" }}
        />

        {/* PINJAMAN */}
        <TextInput
          placeholder="Pinjaman Pokok"
          keyboardType="numeric"
          value={form.pinjamanPokok}
          onChangeText={handlePokokChange}
          style={{ ...input, textTransform: "capitalize" }}
        />

        {/* TIPE */}
        <Dropdown
          data={[
            { label: "Harian (25x)", value: "harian" },
            { label: "Mingguan (6/8/10x)", value: "mingguan" },
          ]}
          labelField="label"
          valueField="value"
          value={form.tipeAngsuran}
          onChange={(item) => handleTipeChange(item.value)}
          style={input}
        />

        {/* TENOR */}
        {form.tipeAngsuran === "harian" && (
          <TextInput
            value="25"
            editable={false}
            style={{ ...input, textTransform: "capitalize" }}
          />
        )}

        {form.tipeAngsuran === "mingguan" && (
          <Dropdown
            data={[
              { label: "6x", value: "6" },
              { label: "8x", value: "8" },
              { label: "10x", value: "10" },
            ]}
            labelField="label"
            valueField="value"
            value={form.tenor}
            onChange={(item) => handleTenorChange(item.value)}
            style={input}
          />
        )}

        {/* ANGSURAN */}
        <TextInput
          placeholder="Angsuran Nominal"
          value={form.angsuranNominal}
          editable={false}
          style={{ ...input, textTransform: "capitalize" }}
        />

        {/* ACTION */}
        <View style={{ flexDirection: "row", marginTop: 10, gap: 10 }}>
          <TouchableOpacity onPress={onClose} style={btnCancel}>
            <Text style={{ textAlign: "center" }}>Batal</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleSubmit} style={btnSave}>
            {loading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Text style={{ color: "#FFF", textAlign: "center" }}>Simpan</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

/* STYLE */
const overlay: ViewStyle = {
  flex: 1,
  backgroundColor: "rgba(0,0,0,0.4)",
  justifyContent: "center",
  padding: 16,
};

const modal = {
  backgroundColor: "#FFF",
  borderRadius: 12,
  padding: 16,
};

const input = {
  backgroundColor: "#F3F4F6",
  padding: 12,
  borderRadius: 10,
  marginBottom: 10,
  textTransform: "capitalize",
};

const btnCancel = {
  flex: 1,
  padding: 12,
  backgroundColor: "#E5E7EB",
  borderRadius: 10,
};

const btnSave = {
  flex: 1,
  padding: 12,
  backgroundColor: "#111827",
  borderRadius: 10,
};
