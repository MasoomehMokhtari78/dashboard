const DB_NAME = "dashboardDB";
const DB_VERSION = 1;

export async function openDB() {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains("transactions")) {
        db.createObjectStore("transactions");
      }
      if (!db.objectStoreNames.contains("users")) {
        db.createObjectStore("users");
      }
      if (!db.objectStoreNames.contains("systemReports")) {
        db.createObjectStore("systemReports");
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export type StoreName = "transactions" | "users" | "systemReports";

export async function getCachedData<T>(
  storeName: StoreName,
  key: string
): Promise<T | undefined> {
  const db = await openDB();
  return new Promise<T | undefined>((resolve, reject) => {
    const tx = db.transaction(storeName, "readonly");
    const store = tx.objectStore(storeName);
    const req = store.get(key);
    req.onsuccess = () => {
      if (req.result) resolve(req.result.data as T);
      else resolve(undefined);
    };
    req.onerror = () => reject(req.error);
  });
}

export async function setCachedData<T>(
  storeName: StoreName,
  key: string,
  data: T
): Promise<void> {
  const db = await openDB();
  return new Promise<void>((resolve, reject) => {
    const tx = db.transaction(storeName, "readwrite");
    const store = tx.objectStore(storeName);
    store.put({ data, timestamp: Date.now() }, key);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}
