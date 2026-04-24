import { BLEPrinter } from "react-native-thermal-receipt-printer";
import { requestBluetoothPermission } from "./permissions";

export const initPrinter = async () => {
  requestBluetoothPermission();

  try {
    await BLEPrinter.init();

    const devicesed = await BLEPrinter.getDeviceList();

    return devicesed;
  } catch (error) {
    console.log("initPrinter: ", error);
  }
};

export const connectPrinter = async (mac: string) => {
  try {
    await BLEPrinter.connectPrinter(mac);
  } catch (error) {
    console.log("connectPrinter:", error);
  }
};

const formatRp = (val: number | string) => {
  return "Rp " + Number(val).toLocaleString("id-ID");
};

const LINE_WIDTH = 32;

const leftRight = (left: string, right: string) => {
  const l = left.slice(0, 16);
  const r = right.slice(0, 16);
  const space = LINE_WIDTH - l.length - r.length;
  return l + " ".repeat(space > 0 ? space : 1) + r;
};

const line = "-".repeat(LINE_WIDTH);

// 🔥 auto wrap text panjang (alamat dll)
const wrapText = (text: string, width = LINE_WIDTH) => {
  const words = text.split(" ");
  let lines: string[] = [];
  let current = "";

  words.forEach((w) => {
    if ((current + w).length > width) {
      lines.push(current);
      current = w + " ";
    } else {
      current += w + " ";
    }
  });

  if (current) lines.push(current);
  return lines;
};

export const printStruk = async (data: any) => {
  const alamatLines = wrapText(data.alamat);
  const usahaLines = wrapText(data.jenisUsaha);

  const text = `
<CM>KOPERASI INDONESIA</CM>
<C>Jl. Mayot Oking Jaya Atmajas</C>
<C>================================</C>

${leftRight("Resort", data.resort)}
${leftRight("No Anggota", data.anggotaId)}
${leftRight("No Pinjaman", data.noPinjaman)}
${line}
${leftRight("Nama", data.nama)}
Alamat :
${alamatLines.map((l) => l).join("\n")}
Jenis Usaha :
${usahaLines.map((l) => l).join("\n")}
${leftRight("Tempat Usaha", data.tempatUsaha)}

${line}
${leftRight("Pinjaman", formatRp(data.pokok))}
${leftRight("Cicilan Ke", String(data.cicilanKe))}
${leftRight("Tgl Bayar", data.tanggalBayar)}
${leftRight("Dibayar", formatRp(data.angsuran))}
${line}
${leftRight("STATUS", data.status?.toUpperCase())}
<C>================================</C>

<C>TERIMA KASIH</C>
<C>Pembayaran diterima</C>
<C>Koperasi Indonesia</C>`;

  try {
    await BLEPrinter.printText(text);
  } catch (error) {
    console.log(error);
  }
};
