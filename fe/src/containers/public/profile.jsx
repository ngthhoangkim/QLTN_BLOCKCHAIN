import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as Tabs from "@radix-ui/react-tabs";
import * as Dialog from "@radix-ui/react-dialog";
import * as action from "../../store/actions";
import * as card from "../../components/card";

const Profile = () => {
    const dispatch = useDispatch();
    const { id } = useSelector(state => state.auth);
    const posts = useSelector(state => state.postHouse.rentals);
    const rentalContracts = useSelector(state => state.contact.rentalContracts) || [];

    const [selectedImages, setSelectedImages] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);



    useEffect(() => {
        dispatch(action.getAllRentals());
    }, [dispatch]);

    useEffect(() => {

        if (posts.length > 0) {
            posts.forEach(post => {
                let rentalId = Number(post.id);

                if (!isNaN(rentalId) && rentalId >= 0) {
                    dispatch(action.getRentalContract(rentalId.toString()));
                } else {
                    console.warn("⚠ rentalId không hợp lệ:", rentalId, "| Giá trị gốc:", post.id);
                }
            });
        }
    }, [posts, dispatch]);

    const myPosts = posts.filter(post => Number(post.userId) === Number(id));

    const getStatusText = (status) => {
        switch (status) {
            case 0:
                return "⏳ Đang chờ duyệt";
            case 1:
                return "✅ Đã duyệt";
            case 2:
                return "📞 Đã có liên hệ thuê";
            default:
                return "❓ Không xác định";
        }
    };

    const openModal = (images, index = 0) => {
        setSelectedImages(images);
        setCurrentIndex(index);
    };

    const closeModal = () => {
        setSelectedImages([]);
        setCurrentIndex(0);
    };

    //đã ký hợp đồng
    const handleContractSigned = async (rentalId) => {
        if (!window.confirm("Xác nhận: Người thuê đã ký hợp đồng?")) return;

        try {
            // Xóa bài đăng sau khi ký hợp đồng
            dispatch(action.deleteRental(rentalId, id));
            dispatch(action.deleteRentalContract(rentalId));
            alert("Hợp đồng đã được ký và bài đăng đã bị xóa!");
            dispatch(action.getAllRentals()); 
        } catch (error) {
            console.error("Lỗi khi cập nhật hợp đồng:", error);
            alert("Có lỗi xảy ra, vui lòng thử lại!");
        }
    };

    //chưa ký hợp đồng 
    const handleContractNotSigned = async (rentalId) => {
        if (!window.confirm("Xác nhận: Người thuê chưa ký hợp đồng?")) return;
    
        try {
            dispatch(action.updateRentalStatus(rentalId, 1, id, "user", true));
            dispatch(action.deleteRentalContract(rentalId));
            alert("Bài đăng đã được cập nhật lại trạng thái có sẵn!");
            dispatch(action.getAllRentals()); 
        } catch (error) {
            console.error("Lỗi khi cập nhật bài đăng:", error);
            alert("Có lỗi xảy ra, vui lòng thử lại!");
        }
    };
    

    return (
        <div className="mt-38 p-6">
            <h2 className="text-3xl text-center font-bold mb-6 text-[#2f6690]">Quản lý bài đăng</h2>

            <Tabs.Root defaultValue="myPosts">
                <Tabs.List className="flex border-b bg-gray-100 rounded-md overflow-hidden">
                    <Tabs.Trigger value="myPosts" className="flex-1 px-4 py-3 text-base font-medium text-center bg-white hover:bg-gray-200 data-[state=active]:bg-[#2f6690] data-[state=active]:text-white">Bài đăng của tôi</Tabs.Trigger>
                    <Tabs.Trigger value="receivedContacts" className="flex-1 px-4 py-3 text-base font-medium text-center bg-white hover:bg-gray-200 data-[state=active]:bg-[#2f6690] data-[state=active]:text-white">Người thuê đã liên hệ</Tabs.Trigger>
                </Tabs.List>

                <Tabs.Content value="myPosts" className="p-4 bg-white rounded-b-md shadow">
                    {myPosts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {myPosts.map(post => (
                                <card.Card key={post.id} className="p-4 border rounded-xl shadow-lg">
                                    <card.CardContent>
                                        <h3 className="text-xl font-semibold mb-4 text-[#2f6690]">{post.description}</h3>
                                        <div className="relative grid grid-cols-3 gap-2 mb-4">
                                            {post.imageUrls?.slice(0, 3).map((img, index) => (
                                                <img
                                                    key={index}
                                                    src={img}
                                                    alt={`Hình ảnh ${index + 1}`}
                                                    className="w-full h-24 object-cover rounded-md cursor-pointer"
                                                    onClick={() => openModal(post.imageUrls, index)}
                                                />
                                            ))}
                                            {post.imageUrls?.length > 3 && (
                                                <div
                                                    className="w-full h-24 flex items-center justify-center bg-gray-300 text-white font-semibold text-lg rounded-md cursor-pointer"
                                                    onClick={() => openModal(post.imageUrls)}
                                                >
                                                    +{post.imageUrls.length - 3}
                                                </div>
                                            )}
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <p className="text-gray-600"><span className="font-bold text-[#2f6690]">Loại nhà:</span> {post.houseType}</p>
                                            <p className="text-gray-600"><span className="font-bold text-[#2f6690]">Giá thuê:</span> {post.price} VNĐ / 1 tháng</p>
                                            <p className="text-gray-600"><span className="font-bold text-[#2f6690]">Diện tích:</span> {post.width * post.length}m²</p>
                                            <p className="text-gray-600"><span className="font-bold text-[#2f6690]">Chủ cho thuê:</span> {post.username}</p>
                                            <p className="text-gray-600"><span className="font-bold text-[#2f6690]">Phòng ngủ:</span> {post.bedrooms}</p>
                                            <p className="text-gray-600"><span className="font-bold text-[#2f6690]">Nhà vệ sinh:</span> {post.bathrooms}</p>
                                            <p className="text-gray-600"><span className="font-bold text-[#2f6690]">Liên lạc:</span> {post.username} - {post.contactNumber}</p>
                                            <p className="text-gray-600">
                                                <span className="font-bold text-[#2f6690]">Trạng thái bài đăng:</span> {getStatusText(Number(post.status))}
                                            </p>
                                        </div>
                                        <p className="text-gray-600 mt-4"><span className="font-bold text-[#2f6690]">Địa chỉ:</span> {post.addressLocation}</p>
                                    </card.CardContent>
                                </card.Card>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-600 text-center">Bạn chưa có bài đăng nào.</p>
                    )}
                </Tabs.Content>


                <Tabs.Content value="receivedContacts" className="p-4 bg-white rounded-b-md shadow">
                    {Array.isArray(rentalContracts) && rentalContracts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {rentalContracts
                                .filter(contract => contract !== null && contract !== undefined) // Lọc hợp lệ
                                .map(contract => {
                                    if (!contract) return null;

                                    // Tìm bài đăng thuộc về chủ nhà (id) và trùng rentalId
                                    const relatedPost = posts.find(
                                        post => Number(post.id) === Number(contract.rentalId) && Number(post.userId) === Number(id)
                                    );

                                    // Nếu không tìm thấy bài đăng phù hợp, bỏ qua
                                    if (!relatedPost) {
                                        return null;
                                    }

                                    return (
                                        <div key={contract.rentalId} className="p-4 border rounded-lg shadow">
                                            <p><strong>Tên người thuê:</strong> {contract.name || "Không có thông tin"}</p>
                                            <p><strong>CCCD:</strong> {contract.cccd || "Không có thông tin"}</p>
                                            <p><strong>Số điện thoại:</strong> {contract.phoneNumber || "Không có thông tin"}</p>
                                            <p><strong>Bài đăng liên hệ:</strong> {relatedPost.description}</p>

                                            {/* Các nút hành động */}
                                            <div className="flex flex-wrap gap-2 mt-4">
                                                <button
                                                    className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-all"
                                                    onClick={() => handleContractSigned(contract.rentalId)}
                                                >
                                                    Đã ký hợp đồng
                                                </button>

                                                <button
                                                    className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-all"
                                                    onClick={() => handleContractNotSigned(contract.rentalId)}
                                                >
                                                    Chưa ký hợp đồng
                                                </button>

                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
                    ) : (
                        <p className="text-gray-600 text-center">Chưa có ai liên hệ thuê nhà của bạn.</p>
                    )}
                </Tabs.Content>

            </Tabs.Root>

            <Dialog.Root open={selectedImages.length > 0} onOpenChange={closeModal}>
                {/* Lớp phủ trong suốt với hiệu ứng mờ */}
                <Dialog.Overlay className="fixed inset-0 bg-transparent backdrop-blur-md z-40" />

                <Dialog.Content className="fixed inset-0 flex items-center justify-center p-4 z-50">
                    <div className="relative w-auto max-w-md max-h-[70vh] flex flex-col items-center">
                        {selectedImages.length > 0 && (
                            <img
                                src={selectedImages[currentIndex]}
                                alt="Ảnh"
                                className="w-full h-auto max-h-[60vh] object-contain rounded-lg shadow-lg"
                            />
                        )}

                        {/* Hiển thị ảnh trước & ảnh sau */}
                        {selectedImages.length > 1 && (
                            <div className="flex mt-3 space-x-2">
                                {selectedImages.map((img, index) => (
                                    <img
                                        key={index}
                                        src={img}
                                        alt={`Ảnh ${index + 1}`}
                                        className={`w-14 h-14 object-cover rounded-md cursor-pointer transition-all ${currentIndex === index ? "border-2 border-white shadow-lg" : "opacity-50"
                                            }`}
                                        onClick={() => setCurrentIndex(index)}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Nút đóng modal */}
                    <button
                        className="absolute top-32 right-4 text-white text-xl font-bold bg-gray-800 bg-opacity-50 px-2 py-1 rounded-md"
                        onClick={closeModal}
                    >
                        ✕
                    </button>
                </Dialog.Content>
            </Dialog.Root>
        </div>
    );
};

export default Profile;
