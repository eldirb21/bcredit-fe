import { PinjamanModal } from "@/components/molecules";
import { router } from "expo-router";
import React from "react";

type Props = {};

const AjukanPinjaman = (props: Props) => {
  return (
    <PinjamanModal
      onClose={() => router.back()}
      onSuccess={() => {
        alert("Berhasil");
      }}
    />
  );
};

export default AjukanPinjaman;
