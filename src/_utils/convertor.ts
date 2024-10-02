/**
 * dataURL(base64 형식)를 Blob으로 변환한 후 File 객체로 변환하는 함수
 * @param dataurl - base64 형식의 Data URL (예: "data:image/jpeg;base64,....")
 * @param filename - 변환될 파일의 이름 (예: "snapshot.jpg")
 * @returns File - 변환된 File 객체
 */
export const convertDataURLToFile = (
  dataurl: string,
  filename: string
): File => {
  // Data URL에서 메타데이터와 base64 데이터 분리
  const arr = dataurl?.split(",");
  const mime = arr[0].match(/:(.*?);/)?.[1] || "";
  const bstr = atob(arr[1]); // base64 데이터를 이진 데이터로 디코딩
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n); // 각 문자의 charCode를 사용해 U8 배열에 저장
  }

  // Blob 객체를 File 객체로 변환
  return new File([u8arr], filename, { type: mime });
};
