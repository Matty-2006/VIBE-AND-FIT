export type ProcessedPhoto = {
  /** Base64 sin prefijo (lo que viaja al servidor). */
  base64: string;
  /** Data URL para previsualizar en la web. */
  dataUrl: string;
};

/**
 * Abre una foto del dispositivo, la ajusta al tamaño razonable (máx. 1200px
 * en el lado largo) y la convierte a WebP para que pese poco en el repo.
 * Se usa en el formulario de productos del panel de administración.
 */
export function processPhoto(file: File): Promise<ProcessedPhoto> {
  const MAX = 1200;
  return new Promise((resolve, reject) => {
    const objectUrl = URL.createObjectURL(file);
    const img = new Image();

    img.onload = () => {
      try {
        let { width, height } = img;
        const longest = Math.max(width, height);
        if (longest > MAX) {
          const scale = MAX / longest;
          width = Math.round(width * scale);
          height = Math.round(height * scale);
        }
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("No se pudo procesar la foto");
        // Fondo blanco: evita que al aplanar a JPEG/WebP salgan transparencias negras.
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);
        URL.revokeObjectURL(objectUrl);

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error("No se pudo procesar la foto"));
              return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
              const dataUrl = String(reader.result ?? "");
              resolve({ dataUrl, base64: dataUrl.split(",")[1] ?? "" });
            };
            reader.onerror = () => reject(new Error("No se pudo leer la foto"));
            reader.readAsDataURL(blob);
          },
          "image/webp",
          0.82
        );
      } catch (err) {
        URL.revokeObjectURL(objectUrl);
        reject(err instanceof Error ? err : new Error("No se pudo procesar la foto"));
      }
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("No se pudo abrir la foto. Prueba con otra imagen."));
    };

    img.src = objectUrl;
  });
}