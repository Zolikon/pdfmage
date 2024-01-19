import pdfMake from "pdfmake/build/pdfmake";

const qualityTypes = {
  LOW: 0.1,
  NORMAL: 0.5,
  ORIGINAL: 1,
};

async function rotateImage(base64data, compression) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const img = new Image();

  return new Promise((resolve) => {
    img.onload = function () {
      canvas.width = img.width;
      canvas.height = img.height;

      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.drawImage(img, -img.width / 2, -img.height / 2);

      canvas.toBlob(
        (blob) => {
          const reader = new FileReader();
          reader.onloadend = function () {
            resolve(reader.result);
          };
          reader.readAsDataURL(blob);
        },
        "image/jpeg",
        compression // Compression quality (0.0 - 1.0)
      );
    };

    img.src = base64data;
  });
}

async function preProcessFiles(images, quality) {
  const files = images.map((image) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = async function () {
        const base64data = reader.result;

        try {
          const rotatedImage = await rotateImage(base64data, qualityTypes[quality]);
          resolve({
            rotatedImage: rotatedImage,
          });
        } catch (error) {
          reject(error);
        }
      };
      fetch(image.url)
        .then((response) => response.blob())
        .then((blob) => {
          reader.readAsDataURL(blob);
        });
    });
  });

  return Promise.all(files);
}

export async function generatePDF(images, quality) {
  const docDefinition = {
    content: [],
  };
  const processedImages = await preProcessFiles(images, quality);
  for (const image of processedImages) {
    const base64data = image.rotatedImage;

    if (docDefinition.content.length !== 0) {
      docDefinition.content.push({ text: "", pageBreak: "after" });
    }

    docDefinition.content.push({
      image: base64data,
      width: 570,
      height: 821,
      absolutePosition: { x: 10, y: 10 },
    });

    if (images.length === 1 || docDefinition.content.length === images.length * 2 - 1) {
      pdfMake.createPdf(docDefinition).download(`magic_by_pdf_mage_${getCurrentTime()}.pdf`);
    }
  }
}

function getCurrentTime() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  return `${year}_${month}_${day}_${hours}_${minutes}_${seconds}`;
}
