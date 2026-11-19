"use client";

import { useRouter } from "next/navigation";
import styles from "@/app/admin/admin.module.css";

export function LogoutButton() {
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <button type="button" className={styles.danger} onClick={logout}>
      Sair
    </button>
  );
}
