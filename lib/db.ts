export async function openDB() {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open("dashboardDB", 1);
    request.onupgradeneeded = (e) => {
      const db = request.result;
      if (!db.objectStoreNames.contains("transactions")) {
        db.createObjectStore("transactions");
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function getCachedData(key: string) {
  const db = await openDB();
  return new Promise<any>((resolve, reject) => {
    const tx = db.transaction("transactions", "readonly");
    const store = tx.objectStore("transactions");
    const req = store.get(key);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export async function setCachedData(key: string, data: any) {
  const db = await openDB();
  return new Promise<void>((resolve, reject) => {
    const tx = db.transaction("transactions", "readwrite");
    const store = tx.objectStore("transactions");
    store.put({ data, timestamp: Date.now() }, key);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}
