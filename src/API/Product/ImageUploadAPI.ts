const imageUploadAPI = () => {
  const otherURL = "https://api.mandarin.weniv.co.kr/";

  const handleImg = async (formData: FormData) => {
    try {
      const res = await fetch(`${otherURL}image/uploadfile`, {
        method: "POST",
        // headers: {
        //   "Content-type": "multipart/form-data",
        // },
        body: formData,
      });
      const result = await res.json();
      console.log("이미지 응답 : ", result);
      // let filenames: string[] = [];
      // result.forEach((item: { filename: string }) => {
      //   filenames.push(item["filename"]);
      // });

      // return filenames.length > 1 ? filenames.join(",") : filenames[0];
      return result;
    } catch (error) {
      console.error("api err", error);
      throw error;
    }
  };
  return handleImg;
};

export default imageUploadAPI;
