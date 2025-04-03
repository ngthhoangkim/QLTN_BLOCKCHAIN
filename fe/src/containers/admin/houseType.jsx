import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as houseService from "../../services/house"
import * as action from "../../store/actions"

const HouseType = () => {
  const dispatch = useDispatch();

  const houseTypes = useSelector((state) => state.houseType.houseTypes || []);
  const { role } = useSelector(state => state.auth)
  const [houseType, setHouseType] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [newHouseName, setNewHouseName] = useState("");

  useEffect(() => {
    const fetchHouseTypes = async () => {
      const types = await houseService.getHouseTypesService();
      // Chuyển đổi dữ liệu từ blockchain về đúng format
      const formattedTypes = types.map((type) => ({
        id: Number(type.id),
        name: type.name,
      }));
      dispatch(action.setHouseTypes(formattedTypes));
    };
    fetchHouseTypes();
  }, [dispatch]);

  //thêm chỉ có admin mới có quyền thêm
  const handleAdd = async () => {
    if (role !== "admin") {
      alert("Bạn không có quyền thêm loại nhà!");
      return;
    }

    if (!houseType.trim()) return;
    const response = await houseService.addHouseTypeService(houseType);
    if (response.success) {
      dispatch(action.addHouseType({ id: response.id, name: houseType }));
      setHouseType("");
      alert("Thêm loại nhà thành công!");
    }
  };

  //sửa 
  const handleEdit = (id, name) => {
    if (editingId === id) {
      setEditingId(null);
      setNewHouseName("");
    } else {
      setEditingId(id);
      setNewHouseName(name);
    }
  };
  const handleUpdate = async () => {
    if (!newHouseName.trim() || editingId === null) return;

    const confirmEdit = window.confirm("Bạn có chắc muốn chỉnh sửa loại nhà này không?");
    if (!confirmEdit){
      setEditingId(null);
      setNewHouseName("");
      return;
    }; 

    const response = await houseService.updateHouseTypeService(editingId, newHouseName);

    if (response.success) {
      dispatch(action.updateHouseType(editingId, newHouseName));
      setEditingId(null);
      setNewHouseName("");
    }
  };


  //xóa
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa loại nhà này không?");
    if (!confirmDelete) return;

    const response = await houseService.deleteHouseTypeService(id);
    if (response.success) {
      dispatch(action.removeHouseType(id));
      alert("Xóa thành công!");
    }
  };

  return (
    <div className="max-w m-5 p-6 bg-white">
      <h2 className="text-2xl text-[#2f6690] font-bold text-center mb-4">Quản lý loại nhà</h2>
      <div className="flex gap-3 mb-4">
        <input
          type="text"
          value={houseType}
          onChange={(e) => setHouseType(e.target.value)}
          placeholder="Nhập loại nhà"
          className="flex-grow p-2 border rounded-md focus:ring focus:ring-blue-300"
        />
        <button onClick={handleAdd} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
          Thêm
        </button>
      </div>
      <div className="overflow-hidden rounded-lg shadow-md">
        <table className="w-full border-collapse bg-white">
          <thead>
            <tr className="bg-[#2f6690] text-white text-lg">
              <th className="py-3 px-4 border border-gray-300">STT</th>
              <th className="py-3 px-4 border border-gray-300">Loại Nhà</th>
              <th className="py-3 px-4 border border-gray-300">Hành Động</th>
            </tr>
          </thead>
          <tbody>
            {houseTypes.length > 0 ? (
              houseTypes.map((type, index) => (
                <tr key={type.id} className="hover:bg-gray-100 transition">
                  <td className="py-3 px-4 border border-gray-300 text-center font-semibold">{index + 1}</td>
                  <td className="py-3 px-4 border border-gray-300 text-center">
                    {editingId === type.id ? (
                      <input
                        type="text"
                        value={newHouseName}
                        onChange={(e) => setNewHouseName(e.target.value)}
                        className="border p-1 rounded"
                      />
                    ) : (
                      type.name
                    )}
                  </td>
                  <td className="py-3 px-4 border border-gray-300 flex gap-2 justify-center">
                    {editingId === type.id ? (
                      <>
                        <button
                          onClick={handleUpdate}
                          className="bg-green-500 text-white px-3 py-2 rounded-md hover:bg-green-600 transition"
                        >
                          Lưu
                        </button>
                        <button
                          onClick={() => handleEdit(type.id, type.name)}
                          className="bg-gray-500 text-white px-3 py-2 rounded-md hover:bg-gray-600 transition"
                        >
                          Hủy
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEdit(type.id, type.name)}
                          className="bg-yellow-500 text-white px-3 py-2 rounded-md hover:bg-yellow-600 transition"
                        >
                          Sửa
                        </button>
                        <button
                          onClick={() => handleDelete(type.id)}
                          className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600 transition"
                        >
                          Xóa
                        </button>
                      </>
                    )}
                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="py-4 px-4 text-center text-gray-500 font-semibold">
                  Chưa có dữ liệu
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HouseType;