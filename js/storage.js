let db;

export function initDB() {
  return new Promise(resolve => {
    const req = indexedDB.open("sliderDB", 1);

    req.onupgradeneeded = e => {
      db = e.target.result;
      db.createObjectStore("images", { autoIncrement: true });
    };

    req.onsuccess = e => {
      db = e.target.result;
      resolve();
    };
  });
}

export function saveImage(file) {
  const tx = db.transaction("images", "readwrite");
  tx.objectStore("images").add(file);
}

export function loadImages() {
  return new Promise(resolve => {
    const tx = db.transaction("images", "readonly");
    const req = tx.objectStore("images").getAll();
    req.onsuccess = () => resolve(req.result);
  });
}
