const formatRupiah = (num: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(num);

const formatDate = (date: string) => {
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

const PAYMENT_METHODS = [
  { label: "Cash", value: "cash" },
  { label: "Transfer Bank", value: "transfer" },
  { label: "GoPay", value: "gopay" },
  { label: "ShopeePay", value: "shopeepay" },
  { label: "DANA", value: "dana" },
  { label: "OVO", value: "ovo" },
];

export { formatDate, formatRupiah, PAYMENT_METHODS };

