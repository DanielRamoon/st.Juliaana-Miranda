import Link from "next/link";
import styles from "../admin.module.css";
import { LogoutButton } from "@/components/admin/LogoutButton";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.shell}>
      <header className={styles.topbar}>
        <div className={styles.brand}>Juliana Miranda · Admin</div>
        <div className={styles.topActions}>
          <Link className={styles.ghost} href="/admin">
            Seções
          </Link>
          <Link className={styles.ghost} href="/admin/contato">
            Contato
          </Link>
          <Link className={styles.ghost} href="/" target="_blank">
            Ver site
          </Link>
          <LogoutButton />
        </div>
      </header>
      <main className={styles.main}>{children}</main>
    </div>
  );
}
