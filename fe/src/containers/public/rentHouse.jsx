import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as card from "../../components/card";
import * as action from "../../store/actions";


const RentHouse = () => {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.postHouse.rentals);
    const { id, role } = useSelector(state => state.auth)

    const [showForm, setShowForm] = useState(false);
    const [rentalId, setRentalId] = useState(null);
    const [tenantData, setTenantData] = useState({ name: "", cccd: "", phoneNumber: "" });

    useEffect(() => {
        dispatch(action.getAllRentals());
    }, [dispatch]);

    const handleRentClick = (post) => {
        if (Number(post.userId) === id) {
            alert("Bạn không thể thuê nhà của chính mình!");
            return;
        }
        setRentalId(post.id);
        setShowForm(true);
    };

    const handleChange = (e) => {
        setTenantData({ ...tenantData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        if (!tenantData.name || !tenantData.cccd || !tenantData.phoneNumber) {
            alert("Vui lòng điền đầy đủ thông tin!");
            return;
        }

        if (!window.confirm("Bạn có chắc chắn muốn để lại thông tin để chủ nhà liên lạc không?")) {
            return;
        }

        const post = posts.find(p => p.id === rentalId);
        if (!post) {
            alert("Không tìm thấy bài đăng!");
            return;
        }
        
        dispatch(action.registerTenant(rentalId, tenantData));
        dispatch(action.updateRentalStatus(rentalId, post.status, post.userId, role));
        setShowForm(false);
        alert("Bạn đã thuê nhà thành công!");
    };


    return (
        <div className="mt-38 ml-5">
            <h2 className="text-3xl text-center font-bold mb-8 text-[#2f6690]">Hãy tìm kiếm ngôi nhà phù hợp với bạn!</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.filter((post) => Number(post.status) === 1).map((post) => (
                    <card.Card key={post.id} className="p-4 border rounded-xl shadow-lg">
                        <card.CardContent>
                            <h3 className="text-xl font-semibold mb-4 text-[#2f6690]">{post.description}</h3>

                            <div className="relative grid grid-cols-3 gap-2 mb-4">
                                {post.imageUrls?.slice(0, 2).map((img, index) => (
                                    <img
                                        key={index}
                                        src={img}
                                        alt={`Hình ảnh ${index + 1}`}
                                        className="w-full h-24 object-cover rounded-md"
                                    />
                                ))}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <p className="text-gray-600"><span className="font-bold text-[#2f6690]">Loại nhà:</span> {post.houseType}</p>
                                <p className="text-gray-600"><span className="font-bold text-[#2f6690]">Giá thuê:</span> {post.price} VNĐ</p>
                                <p className="text-gray-600"><span className="font-bold text-[#2f6690]">Diện tích:</span> {post.width * post.length}m²</p>
                                <p className="text-gray-600"><span className="font-bold text-[#2f6690]">Chủ cho thuê:</span> {post.username}</p>
                                <p className="text-gray-600"><span className="font-bold text-[#2f6690]">Phòng ngủ:</span> {post.bedrooms}</p>
                                <p className="text-gray-600"><span className="font-bold text-[#2f6690]">Nhà vệ sinh:</span> {post.bathrooms}</p>
                                <p className="text-gray-600"><span className="font-bold text-[#2f6690]">Liên lạc:</span> {post.username} - {post.contactNumber}</p>
                            </div>
                            <p className="text-gray-600 mt-4"><span className="font-bold text-[#2f6690]">Địa chỉ:</span> {post.addressLocation}</p>

                            {/* Nút Thuê Nhà */}
                            <button
                                onClick={() => handleRentClick(post)}
                                className="mt-4 w-full bg-[#2f6690] text-white py-2 px-4 rounded-lg hover:bg-[#1f4e6f]"
                            >
                                Thuê nhà
                            </button>
                        </card.CardContent>
                    </card.Card>
                ))}
            </div>
            {showForm && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h3 className="text-lg font-bold mb-4">Nhập thông tin thuê nhà</h3>
                        <input type="text" name="name" placeholder="Tên" className="border p-2 w-full mb-2" onChange={handleChange} />
                        <input type="text" name="cccd" placeholder="CCCD" className="border p-2 w-full mb-2" onChange={handleChange} />
                        <input type="text" name="phoneNumber" placeholder="Số điện thoại" className="border p-2 w-full mb-2" onChange={handleChange} />
                        <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded">Xác nhận</button>
                        <button onClick={() => setShowForm(false)} className="ml-2 bg-gray-400 text-white px-4 py-2 rounded">Hủy</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RentHouse;
