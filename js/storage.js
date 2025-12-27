const DB_NAME = "sliderDB";
const STORE = "images";
let db;

export function initDB() {
  return new Promise(resolve => {
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = e => {
      db = e.target.result;
      db.createObjectStore(STORE, { autoIncrement: true });
    };
    req.onsuccess = e => {
      db = e.target.result;
      resolve();
    };
  });
}

export function saveImage(blob) {
  const tx = db.transaction(STORE, "readwrite");
  tx.objectStore(STORE).add(blob);
}

export function getImages() {
  return new Promise(resolve => {
    const tx = db.transaction(STORE, "readonly");
    const req = tx.objectStore(STORE).getAll();
    req.onsuccess = () => resolve(req.result);
  });
}
