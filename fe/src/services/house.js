import { connectWeb3, getWeb3Instance } from "../ultils/connectWeb3";
import houseABI from "../../abi/houseABI";

const address = "0x7d742c572aAb268Af1EB1242210B553892654b75";

export const addHouseTypeService = async (name) => {
  try {
    await connectWeb3(address, houseABI);
    const { contract, account } = getWeb3Instance(address);
    await contract.methods.addHouseType(name).send({ from: account });
    return { success: true, message: "Loại nhà đã được thêm thành công." };
  } catch (error) {
    console.error("Lỗi khi thêm loại nhà:", error);
    return { success: false, message: "Lỗi khi thêm loại nhà." };
  }
};

export const getHouseTypesService = async () => {
  try {
    await connectWeb3(address, houseABI);
    const { contract } = getWeb3Instance(address);
    const types = await contract.methods.getAllHouseTypes().call();
    console.log("type", types);
    return types || [];
  } catch (error) {
    console.error("Lỗi lấy danh sách loại nhà:", error);
    return [];
  }
};

export const updateHouseTypeService = async (id, newName) => {
  try {
    await connectWeb3(address, houseABI);
    const { contract, account } = getWeb3Instance(address);
    await contract.methods.updateHouseType(id, newName).send({ from: account });
    console.log(`Đã cập nhật loại nhà: ID ${id} -> ${newName}`);
    return { success: true, message: "Loại nhà đã được cập nhật thành công." };
  } catch (error) {
    console.error("Lỗi khi cập nhật loại nhà:", error);
    return { success: false, message: "Lỗi khi cập nhật loại nhà." };
  }
};

export const deleteHouseTypeService = async (id) => {
  try {
    await connectWeb3(address, houseABI);
    const { contract, account } = getWeb3Instance(address);
    await contract.methods.deleteHouseType(id).send({ from: account });
    console.log(`Đã xóa loại nhà: ID ${id}`);
    return { success: true, message: "Loại nhà đã được xóa thành công." };
  } catch (error) {
    console.error("Lỗi khi xóa loại nhà:", error);
    return { success: false, message: "Lỗi khi xóa loại nhà." };
  }
};