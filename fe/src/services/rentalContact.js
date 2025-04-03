import { connectWeb3, getWeb3Instance } from "../ultils/connectWeb3";
import rentalContactABI from "../../abi/rentalContactABI";

const contractAddress = "0xfF77DF256fE6096d3Bddfa3C2eBe7bfbA25Ede47";

export const registerTenantService = async (rentalId, tenantData) => {
  try {
    await connectWeb3(contractAddress, rentalContactABI);
    const { contract, account } = getWeb3Instance(contractAddress);

    await contract.methods
      .registerTenant(
        rentalId,
        tenantData.cccd,
        tenantData.phoneNumber,
        tenantData.name
      )
      .send({ from: account });

    return { success: true, message: "Hợp đồng thuê đã được tạo thành công." };
  } catch (error) {
    console.error("Lỗi khi tạo hợp đồng thuê:", error);
    return { success: false, message: "Lỗi khi tạo hợp đồng thuê." };
  }
};

export const getRentalContractService = async (rentalId) => {
  try {
    await connectWeb3(contractAddress, rentalContactABI);
    const { contract } = getWeb3Instance(contractAddress);

    const rentalContract = await contract.methods
      .getRentalContract(Number(rentalId))
      .call();

    // Chuyển đổi từ mảng Solidity sang object chuẩn
    const formattedContract = {
      rentalId: Number(rentalContract[0]), // Chuyển từ BigInt sang Number
      cccd: rentalContract[1],
      phoneNumber: rentalContract[2],
      name: rentalContract[3],
      tenantAddress: rentalContract[4],
    };

    return formattedContract;
  } catch (error) {
    // console.error("❌ Lỗi khi lấy hợp đồng thuê:", error);
    return null;
  }
};

export const deleteRentalContractService = async (rentalId) => {
  try {
    await connectWeb3(contractAddress, rentalContactABI);
    const { contract, account } = getWeb3Instance(contractAddress);

    await contract.methods.deleteRentalContract(Number(rentalId)).send({ from: account });

    return { success: true, message: "Hợp đồng thuê đã được xóa thành công." };
  } catch (error) {
    console.error("Lỗi khi xóa hợp đồng thuê:", error);
    return { success: false, message: "Lỗi khi xóa hợp đồng thuê." };
  }
};
