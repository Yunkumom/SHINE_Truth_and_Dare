import { redirect } from "next/navigation";

export default function Home() {
  // Bypass stale Safari service-worker navigation entries while the recovery
  // worker activates and removes the affected cache.
  redirect("/preview/index.html?recovery=20260730-1");
}
