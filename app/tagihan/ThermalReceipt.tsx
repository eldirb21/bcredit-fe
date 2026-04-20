import React from "react";
import {
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import ThermalPrinterModule from "react-native-thermal-printer";

// ── Types ──────────────────────────────────────────────────────────────────
interface LoanData {
  resort: string;
  noPjm: string;
  noAgt: string;
  pjmKe: number;
  nama: string;
  alamat: string;
  rt: string;
  rw: string;
  ket: string;
  tanggal: string;
  tempatJualan: string;
  macamJualan: string;
  pinjamanPokok: number;
  bunga: number;
  jumlah: number;
  menyicil: number;
  totalAngsuran: number;
  // Tanda terima pinjaman
  pokok: number;
  wajib: number;
  sukarela: number;
  jumlahMasuk: number;
  masuk: number;
  // Angsuran yang sudah dibayar (1-based)
  angsuranDibayar: number[];
  // Angsuran yang sedang diprint sekarang
  angsuranSekarang: number;
}

// ── Sample data ─────────────────────────────────────────────────────────────
const sampleData: LoanData = {
  resort: "Jakarta Selatan",
  noPjm: "001/2026",
  noAgt: "AGT-2024",
  pjmKe: 1,
  nama: "Budi Santoso",
  alamat: "Jl. Mawar No. 12",
  rt: "003",
  rw: "005",
  ket: "Pedagang",
  tanggal: "19 April 2026",
  tempatJualan: "Pasar Minggu",
  macamJualan: "Sembako",
  pinjamanPokok: 5_000_000,
  bunga: 500_000,
  jumlah: 5_500_000,
  menyicil: 220_000,
  totalAngsuran: 25,
  pokok: 200_000,
  wajib: 10_000,
  sukarela: 5_000,
  jumlahMasuk: 215_000,
  masuk: 220_000,
  angsuranDibayar: [1], // angsuran ke-1 sudah lunas
  angsuranSekarang: 2, // sedang membayar angsuran ke-2
};

// ── Helpers ──────────────────────────────────────────────────────────────────
const rupiah = (n: number) => "Rp " + n.toLocaleString("id-ID");

// ── Thermal Receipt Component ────────────────────────────────────────────────
const ThermalReceipt: React.FC<{ data: LoanData }> = ({ data }) => {
  // Grid angsuran 25 → tampilkan dari 25 s/d 1 (sesuai formulir asli)
  const grid: number[][] = [];
  for (let row = 0; row < 5; row++) {
    const r: number[] = [];
    for (let col = 0; col < 5; col++) {
      r.push(25 - row * 5 - col);
    }
    grid.push(r);
  }

  const getBoxStyle = (n: number) => {
    if (n === data.angsuranSekarang) return styles.boxCurrent;
    if (data.angsuranDibayar.includes(n)) return styles.boxPaid;
    return styles.boxDefault;
  };

  const getTextStyle = (n: number) => {
    if (n === data.angsuranSekarang) return styles.boxTextCurrent;
    if (data.angsuranDibayar.includes(n)) return styles.boxTextPaid;
    return styles.boxTextDefault;
  };

  return (
    <View style={styles.receipt}>
      {/* Header */}
      <Text style={styles.headerOrg}>KOPERASI INDONESIA</Text>
      <Text style={styles.headerAddr}>Jl. Mayot Oking Jaya Atmajas</Text>
      <View style={styles.divider} />

      {/* Meta baris atas */}
      <View style={styles.row}>
        <Text style={styles.metaLabel}>Resort</Text>
        <Text style={styles.metaValue}>: {data.resort}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.metaLabel}>No. Pjm</Text>
        <Text style={styles.metaValue}>: {data.noPjm}</Text>
        <Text style={styles.metaLabel}> No. Agt</Text>
        <Text style={styles.metaValue}>: {data.noAgt}</Text>
        <Text style={styles.metaLabel}> Pjm Ke</Text>
        <Text style={styles.metaValue}>: {data.pjmKe}</Text>
      </View>

      <View style={styles.dividerDash} />

      {/* Info anggota */}
      <View style={styles.row}>
        <Text style={styles.fieldLabel}>Nama</Text>
        <Text style={styles.fieldValue}>: {data.nama}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.fieldLabel}>Alamat</Text>
        <Text style={styles.fieldValue}>: {data.alamat}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.fieldLabel}>RT/RW</Text>
        <Text style={styles.fieldValue}>
          : {data.rt}/{data.rw}
        </Text>
        <Text style={[styles.fieldLabel, { marginLeft: 8 }]}>Ket</Text>
        <Text style={styles.fieldValue}>: {data.ket}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.fieldLabel}>Tanggal</Text>
        <Text style={styles.fieldValue}>: {data.tanggal}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.fieldLabel}>Tempat Jualan</Text>
        <Text style={styles.fieldValue}>: {data.tempatJualan}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.fieldLabel}>Macam Jualan</Text>
        <Text style={styles.fieldValue}>: {data.macamJualan}</Text>
      </View>

      <View style={styles.dividerDash} />

      {/* Pinjaman */}
      <View style={styles.row}>
        <Text style={styles.fieldLabel}>Pinjaman Pokok</Text>
        <Text style={styles.fieldValue}>: {rupiah(data.pinjamanPokok)}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.fieldLabel}>Bunga</Text>
        <Text style={styles.fieldValue}>: {rupiah(data.bunga)}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.fieldLabel}>Jumlah</Text>
        <Text style={styles.fieldValue}>: {rupiah(data.jumlah)}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.fieldLabel}>Menyicil</Text>
        <Text style={styles.fieldValue}>
          : {rupiah(data.menyicil)} x {data.totalAngsuran} angsuran
        </Text>
      </View>

      <View style={styles.dividerDash} />

      {/* Tanda terima pinjaman */}
      <Text style={styles.sectionTitle}>TANDA TERIMA PINJAMAN</Text>
      <View style={styles.row}>
        <Text style={styles.fieldLabel}>Pokok</Text>
        <Text style={styles.fieldValue}>: {rupiah(data.pokok)}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.fieldLabel}>Wajib</Text>
        <Text style={styles.fieldValue}>: {rupiah(data.wajib)}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.fieldLabel}>Sukarela</Text>
        <Text style={styles.fieldValue}>: {rupiah(data.sukarela)}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.fieldLabel}>Jumlah</Text>
        <Text style={styles.fieldValue}>: {rupiah(data.jumlahMasuk)}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.fieldLabel}>Masuk</Text>
        <Text style={styles.fieldValue}>: {rupiah(data.masuk)}</Text>
      </View>

      <View style={styles.divider} />

      {/* Highlight angsuran sekarang */}
      <View style={styles.currentAngsuranBanner}>
        <Text style={styles.currentAngsuranLabel}>
          ★ ANGSURAN KE-{data.angsuranSekarang} ★
        </Text>
        <Text style={styles.currentAngsuranAmount}>
          {rupiah(data.menyicil)}
        </Text>
      </View>

      <View style={styles.divider} />

      {/* Grid angsuran */}
      <Text style={styles.sectionTitle}>KARTU ANGSURAN</Text>
      {grid.map((row, ri) => (
        <View key={ri} style={styles.gridRow}>
          {row.map((n) => (
            <View key={n} style={[styles.box, getBoxStyle(n)]}>
              <Text style={[styles.boxLabel, getTextStyle(n)]}>ANGSURAN</Text>
              <Text style={[styles.boxNumber, getTextStyle(n)]}>KE {n}</Text>
            </View>
          ))}
        </View>
      ))}

      <View style={styles.dividerDash} />
      <Text style={styles.legend}>■ = Lunas ★ = Sekarang □ = Belum</Text>
      <View style={styles.divider} />
      <Text style={styles.footer}>
        Terima kasih telah membayar tepat waktu.{"\n"}
        Koperasi Indonesia — Bersama Kita Sejahtera
      </Text>
    </View>
  );
};

// ── Screen ───────────────────────────────────────────────────────────────────
export default function KoperasiPrintScreen() {
  const generateReceipt = (data: LoanData) => {
    return (
      `[C]<b>KOPERASI INDONESIA</b>\n` +
      `[C]Jl. Mayot Oking Jaya Atmajas\n` +
      `[C]================================\n` +
      `[L]Resort : ${data.resort}\n` +
      `[L]No Pjm : ${data.noPjm}\n` +
      `[L]No Agt : ${data.noAgt}\n` +
      `[L]Pjm Ke : ${data.pjmKe}\n` +
      `[C]--------------------------------\n` +
      `[L]Nama   : ${data.nama}\n` +
      `[L]Alamat : ${data.alamat}\n` +
      `[L]RT/RW  : ${data.rt}/${data.rw}\n` +
      `[L]Ket    : ${data.ket}\n` +
      `[L]Tanggal: ${data.tanggal}\n` +
      `[C]--------------------------------\n` +
      `[L]Pinjaman : ${rupiah(data.pinjamanPokok)}\n` +
      `[L]Bunga    : ${rupiah(data.bunga)}\n` +
      `[L]Total    : ${rupiah(data.jumlah)}\n` +
      `[C]================================\n` +
      `[C]<b>ANGSURAN KE-${data.angsuranSekarang}</b>\n` +
      `[C]<font size='big'>${rupiah(data.menyicil)}</font>\n` +
      `[C]================================\n` +
      `[L]Pokok    : ${rupiah(data.pokok)}\n` +
      `[L]Wajib    : ${rupiah(data.wajib)}\n` +
      `[L]Sukarela : ${rupiah(data.sukarela)}\n` +
      `[L]Jumlah   : ${rupiah(data.jumlahMasuk)}\n` +
      `[C]--------------------------------\n` +
      `[C]Terima kasih\n` +
      `[C]Koperasi Indonesia\n\n\n`
    );
  };
  const handlePrint = async () => {
    try {
      console.log("press");

      const payload = generateReceipt(sampleData);

      await ThermalPrinterModule.printTcp({
        payload,
      });

      console.log("Print sukses");
    } catch (err: any) {
      console.log("Error:", err.message);
    }
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.screenTitle}>Preview Struk Thermal</Text>
      <Text style={styles.screenSub}>Lebar kertas: 58mm / 80mm</Text>

      <ThermalReceipt data={sampleData} />

      <TouchableOpacity style={styles.printBtn} onPress={handlePrint}>
        <Text style={styles.printBtnText}>🖨️ Cetak ke Printer Thermal</Text>
      </TouchableOpacity>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

// ── Styles ───────────────────────────────────────────────────────────────────
const FONT = Platform.OS === "ios" ? "Courier New" : "monospace";
const W = 280; // lebar struk simulasi

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#e8e8e8",
  },
  content: {
    alignItems: "center",
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  screenTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
    marginBottom: 4,
  },
  screenSub: {
    fontSize: 12,
    color: "#888",
    marginBottom: 16,
  },

  // Receipt paper
  receipt: {
    width: W,
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 14,
    borderRadius: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 6,
    elevation: 4,
  },

  headerOrg: {
    fontFamily: FONT,
    fontSize: 13,
    fontWeight: "700",
    textAlign: "center",
    letterSpacing: 1,
  },
  headerAddr: {
    fontFamily: FONT,
    fontSize: 9,
    textAlign: "center",
    color: "#555",
    marginBottom: 4,
  },
  divider: {
    borderBottomWidth: 1.5,
    borderColor: "#000",
    marginVertical: 6,
  },
  dividerDash: {
    borderBottomWidth: 1,
    borderStyle: "dashed",
    borderColor: "#aaa",
    marginVertical: 5,
  },

  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 2,
  },
  metaLabel: {
    fontFamily: FONT,
    fontSize: 8,
    color: "#555",
    minWidth: 40,
  },
  metaValue: {
    fontFamily: FONT,
    fontSize: 8,
    color: "#000",
    flex: 1,
  },
  fieldLabel: {
    fontFamily: FONT,
    fontSize: 9,
    color: "#555",
    minWidth: 90,
  },
  fieldValue: {
    fontFamily: FONT,
    fontSize: 9,
    color: "#000",
    flex: 1,
  },
  sectionTitle: {
    fontFamily: FONT,
    fontSize: 10,
    fontWeight: "700",
    textAlign: "center",
    letterSpacing: 0.8,
    marginVertical: 4,
  },

  // Highlight banner angsuran sekarang
  currentAngsuranBanner: {
    backgroundColor: "#1a1a1a",
    borderRadius: 4,
    paddingVertical: 8,
    alignItems: "center",
    marginVertical: 4,
  },
  currentAngsuranLabel: {
    fontFamily: FONT,
    fontSize: 13,
    fontWeight: "700",
    color: "#FFD700",
    letterSpacing: 1.5,
  },
  currentAngsuranAmount: {
    fontFamily: FONT,
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
    marginTop: 2,
  },

  // Grid angsuran
  gridRow: {
    flexDirection: "row",
    marginBottom: 2,
  },
  box: {
    flex: 1,
    marginHorizontal: 1,
    paddingVertical: 5,
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 2,
  },
  boxDefault: {
    backgroundColor: "#f5f5f5",
    borderColor: "#ccc",
  },
  boxPaid: {
    backgroundColor: "#2d6a4f",
    borderColor: "#1b4332",
  },
  boxCurrent: {
    backgroundColor: "#FFD700",
    borderColor: "#e6a800",
    borderWidth: 2,
  },
  boxLabel: {
    fontFamily: FONT,
    fontSize: 6,
    fontWeight: "600",
    letterSpacing: 0.3,
  },
  boxNumber: {
    fontFamily: FONT,
    fontSize: 11,
    fontWeight: "700",
  },
  boxTextDefault: { color: "#333" },
  boxTextPaid: { color: "#fff" },
  boxTextCurrent: { color: "#1a1a1a" },

  legend: {
    fontFamily: FONT,
    fontSize: 8,
    textAlign: "center",
    color: "#666",
    marginVertical: 3,
  },
  footer: {
    fontFamily: FONT,
    fontSize: 8,
    textAlign: "center",
    color: "#555",
    lineHeight: 13,
    marginTop: 2,
  },

  // Print button
  printBtn: {
    marginTop: 20,
    backgroundColor: "#0077b6",
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 10,
    shadowColor: "#0077b6",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 6,
  },
  printBtnText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
});
