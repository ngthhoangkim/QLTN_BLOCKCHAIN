const uploadImagesToCloudinary = async (images) => {
    const urls = [];

    for (let image of images) {
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", "qltn2025"); 
        formData.append("cloud_name", "dtam6pna4"); 

        try {
            const response = await fetch("https://api.cloudinary.com/v1_1/dtam6pna4/image/upload", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();
            urls.push(data.secure_url);
        } catch (error) {
            console.error("Lỗi khi upload ảnh:", error);
        }
    }

    return urls;
};

export default uploadImagesToCloudinary