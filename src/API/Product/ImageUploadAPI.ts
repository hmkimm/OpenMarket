

const imageUploadAPI = () => {
  const otherURL = "https://api.mandarin.weniv.co.kr/";

  const handleImg = async (file: File) => {


    const formData = new FormData();
    formData.append("image", file);
    try {
      const res = await fetch(`${otherURL}image/uploadfile`, {
        method: "POST",
        // headers: {
        //   "Content-type": "multipart/form-data",
        // },
        body: formData,
      });
      const result = await res.json();
      console.log(result);
      return result;
    } catch (error) {
      console.error("api err", error);
      throw error;
    }
  };
  return handleImg;
};

export default imageUploadAPI;
