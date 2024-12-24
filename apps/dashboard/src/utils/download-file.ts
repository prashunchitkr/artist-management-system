export const downloadFile = (blob: Blob) => {
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "artists.csv";
  a.click();
};
