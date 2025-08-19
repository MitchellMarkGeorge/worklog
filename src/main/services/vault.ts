import Store from "electron-store";
import { safeStorage } from "electron";

export class VaultService {
  private store: Store<Record<string, string>>;
  constructor() {
    this.store = new Store<Record<string, string>>({
      name: import.meta.env.MAIN_VITE_VAULT_NAME,
      encryptionKey: import.meta.env.MAIN_VITE_VAULT_KEY,
    });
  }
  
  public set(key: string, password: string) {
    const buffer = safeStorage.encryptString(password);
    this.store.set(key, buffer.toString("base64"));
  }
  
  public get(key: string): string | null {
    if (!this.store.has(key)) return null;
    const buffer = Buffer.from(this.store.get(key), "base64");
    return safeStorage.decryptString(buffer);
  }

  public delete(key: string) {
    if (!this.store.has(key)) return;
    this.store.delete(key);
  }
}
