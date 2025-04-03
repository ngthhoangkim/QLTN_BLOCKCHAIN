import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as card from "../../components/card";
import { CiCircleCheck, CiTrash } from "react-icons/ci";
import { Search } from "../../components";
import * as Tabs from "@radix-ui/react-tabs";
import * as Dialog from "@radix-ui/react-dialog";
import * as action from '../../store/actions'


const BrowsePost = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.postHouse.rentals);
  const { role } = useSelector((state) => state.auth);
  const [selectedImages, setSelectedImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    dispatch(action.getAllRentals());
  }, [dispatch]);

  const openModal = (images, index = 0) => {
    setSelectedImages(images);
    setCurrentIndex(index);
  };

  const closeModal = () => {
    setSelectedImages([]);
    setCurrentIndex(0);
  };

  const handleDelete = (rentalId, userId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa bài đăng này không?")) {
      dispatch(action.deleteRental(rentalId, userId));
    }
  };

  const handleApprove = (post) => {
    if (window.confirm("Bạn có chắc chắn muốn duyệt bài đăng này không?")) {
      dispatch(action.updateRentalStatus(post.id, post.status, post.userId, role));
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl text-center font-bold mb-6 text-[#2f6690]">Duyệt bài đăng</h2>

      <div className="flex justify-center mb-6">
        <Search placeholder="Tìm kiếm..." />
      </div>

      <Tabs.Root defaultValue="pending">
        <Tabs.List className="flex border-b bg-gray-100 rounded-md overflow-hidden">
          <Tabs.Trigger value="pending" className="flex-1 px-4 py-3 text-base font-medium text-center bg-white hover:bg-gray-200 data-[state=active]:bg-[#2f6690] data-[state=active]:text-white">Đang chờ duyệt</Tabs.Trigger>
          <Tabs.Trigger value="approved" className="flex-1 px-4 py-3 text-base font-medium text-center bg-white hover:bg-gray-200 data-[state=active]:bg-[#2f6690] data-[state=active]:text-white">Đã duyệt</Tabs.Trigger>
        </Tabs.List>

        {["pending", "approved"].map((tab) => (
          <Tabs.Content key={tab} value={tab} className="p-4 bg-white rounded-b-md shadow">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              {posts.filter((post) =>
                (tab === "pending" ? ![1, 2].includes(Number(post.status)) : [1, 2].includes(Number(post.status)))
                && post.price > 0
                && post.bedrooms >= 0
                && post.addressLocation
              ).map((post) => (

                <card.Card key={post.id} className="p-4 border rounded-xl shadow-lg">
                  <card.CardContent>
                    <h3 className="text-xl font-semibold mb-4 text-[#2f6690] flex items-center">{post.description}
                      {Number(post.status) === 1 && <CiCircleCheck className="ml-2 text-green-500" size={24} />}
                    </h3>

                    <div className="relative grid grid-cols-3 gap-2 mb-4">
                      {post.imageUrls?.slice(0, 2).map((img, index) => (
                        <img
                          key={index}
                          src={img}
                          alt={`Hình ảnh ${index + 1}`}
                          className="w-full h-24 object-cover rounded-md cursor-pointer"
                          onClick={() => openModal(post.imageUrls, index)}
                        />
                      ))}
                      {post.imageUrls?.length > 2 && (
                        <div
                          className="w-full h-24 flex items-center justify-center bg-gray-300 text-white font-semibold text-lg rounded-md cursor-pointer"
                          onClick={() => openModal(post.imageUrls)}
                        >
                          +{post.imageUrls.length - 2}
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <p className="text-gray-600"><span className="font-bold text-[#2f6690]">Loại nhà:</span> {post.houseType}</p>
                      <p className="text-gray-600"><span className="font-bold text-[#2f6690]">Giá thuê:</span> {post.price} VNĐ</p>
                      <p className="text-gray-600"><span className="font-bold text-[#2f6690]">Diện tích:</span> {post.width * post.length}m²</p>
                      <p className="text-gray-600"><span className="font-bold text-[#2f6690]">Chủ cho thuê:</span> {post.username}</p>
                      <p className="text-gray-600"><span className="font-bold text-[#2f6690]">Phòng ngủ:</span> {post.bedrooms}</p>
                      <p className="text-gray-600"><span className="font-bold text-[#2f6690]">Nhà vệ sinh:</span> {post.bathrooms}</p>
                    </div>
                    <p className="text-gray-600 mt-4"><span className="font-bold text-[#2f6690]">Địa chỉ:</span> {post.addressLocation}</p>

                    <div className="flex items-center justify-between mt-4">
                      {tab === "pending" && role === "admin" && (
                        <button
                          onClick={() => handleApprove(post)}
                          className="px-4 py-2 text-white bg-[#2f6690] rounded-lg hover:bg-blue-500"
                        >
                          Duyệt bài
                        </button>
                      )}
                      <button onClick={() => handleDelete(post.id, post.userId)} className="text-red-500 hover:text-red-700">
                        <CiTrash size={28} />
                      </button>
                    </div>
                  </card.CardContent>
                </card.Card>
              ))}
            </div>
          </Tabs.Content>
        ))}
      </Tabs.Root>

      {/* Modal xem ảnh */}
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
            className="absolute top-2 right-2 text-white text-xl font-bold bg-gray-800 bg-opacity-50 px-2 py-1 rounded-md"
            onClick={closeModal}
          >
            ✕
          </button>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
};

export default BrowsePost;
