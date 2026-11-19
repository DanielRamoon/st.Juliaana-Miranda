import { Suspense } from "react";
import { LoginForm } from "@/components/admin/LoginForm";
import styles from "../admin.module.css";

export default function AdminLoginPage() {
  return (
    <div className={styles.loginWrap}>
      <Suspense fallback={<p>Carregando…</p>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
