const formatRupiah = (num: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(num);
const formatDateTime = (date: string | Date) => {
  const d = new Date(date);
  return (
    d.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
    }) +
    " • " +
    d.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    })
  );
};
const formatDate = (date: string | Date) => {
  const d = new Date(date);
  return d.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};
const getCurrentMonthYear = () => {
  return new Date().toLocaleDateString("id-ID", {
    month: "long",
    year: "numeric",
  });
};

const PAYMENT_METHODS = [
  { label: "Cash", value: "cash" },
  { label: "Transfer Bank", value: "transfer" },
  { label: "GoPay", value: "gopay" },
  { label: "ShopeePay", value: "shopeepay" },
  { label: "DANA", value: "dana" },
  { label: "OVO", value: "ovo" },
];
const TENOR_TYPE = [
  { label: "Harian", value: "harian" },
  { label: "Mingguan", value: "mingguan" },
];
const ANGSUR_TYPE = [
  { label: "6 minggu", value: "6" },
  { label: "8 minggu", value: "8" },
  { label: "10 minggu", value: "10" },
];

const parseRupiah = (value: string): number =>
  Number(value.replace(/[^0-9]/g, ""));

const formatDiscount = (pct: number): string => (pct > 0 ? `-${pct}%` : "-");

const isSameToday = (date: string | Date) => {
  const d1 = new Date(date);
  const d2 = new Date();

  return (
    d1.getDate() === d2.getDate() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getFullYear() === d2.getFullYear()
  );
};

export {
  ANGSUR_TYPE,
  formatDate,
  formatDiscount,
  formatRupiah,
  getCurrentMonthYear, isSameToday, parseRupiah,
  PAYMENT_METHODS,
  TENOR_TYPE
};

