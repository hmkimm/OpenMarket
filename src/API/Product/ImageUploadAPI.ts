const imageUploadAPI = () => {
  const otherURL = "https://api.mandarin.weniv.co.kr/";

  const handleImg = async (files: FileList) => {
    const formData = new FormData();
    Array.from(files).forEach((file) => {
      formData.append("image", file);
    });
    console.log(formData);
    try {
      const res = await fetch(`${otherURL}image/uploadfiles`, {
        method: "POST",
        body: formData,
      });
      const result = await res.json();
      
      let filenames: string[] = [];
      for (let item of result) {
        filenames.push(item["filename"]);
      }

      return filenames.length > 1 ? filenames.join(",") : filenames[0];
    } catch (error) {
      console.error("api err", error);
      throw error;
    }
  };
  return handleImg;
};

export default imageUploadAPI;
