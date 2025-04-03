import { connectWeb3, getWeb3Instance } from "../ultils/connectWeb3";
import postHouseABI from "../../abi/postHouseABI";

const address = "0x3C2B511036dE273ee79B0F853BD605A5A06748CE";

export const addRentalService = async (rentalData) => {
  try {
    await connectWeb3(address, postHouseABI);
    const { contract, account } = getWeb3Instance(address);
    await contract.methods.listRental(rentalData).send({ from: account });
    return { success: true, message: "Bài đăng đã được thêm thành công." };
  } catch (error) {
    console.error("Lỗi khi thêm bài đăng:", error);
    return { success: false, message: "Lỗi khi thêm bài đăng." };
  }
};

export const getRentalService = async (rentalId) => {
  try {
    await connectWeb3(address, postHouseABI);
    const { contract } = getWeb3Instance(address);
    const rental = await contract.methods.getRental(rentalId).call();
    return rental;
  } catch (error) {
    console.error("Lỗi lấy bài đăng:", error);
    return null;
  }
};

export const getAllRentalsService = async () => {
  try {
    await connectWeb3(address, postHouseABI);
    const { contract } = getWeb3Instance(address);
    const totalRentals = await contract.methods.nextRentalId().call();

    const rentals = [];
    for (let i = 0; i < totalRentals; i++) {
      const rental = await contract.methods.getRental(i).call();
      rentals.push({ id: i, ...rental });
    }

    return rentals;
  } catch (error) {
    console.error("Lỗi khi lấy tất cả bài đăng:", error);
    return [];
  }
};

export const updateRentalStatusService = async (rentalId, status, userId) => {
  try {
    await connectWeb3(address, postHouseABI);
    const { contract, account } = getWeb3Instance(address);

    // Chuẩn hóa status về chữ cái đầu viết hoa
    const formattedStatus =
      status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
    console.log("Formatted Status:", formattedStatus);

    // Chuyển đổi trạng thái từ string sang enum của Solidity
    const statusEnum = {
      Pending: 0,
      Available: 1,
      Rented: 2,
    };

    if (!(formattedStatus in statusEnum)) {
      return { success: false, message: "Trạng thái không hợp lệ." };
    }

    await contract.methods
      .updateRentalStatus(rentalId, statusEnum[formattedStatus], userId)
      .send({ from: account });

    return {
      success: true,
      message: `Trạng thái bài đăng đã được cập nhật thành ${formattedStatus}.`,
    };
  } catch (error) {
    console.error("Lỗi khi cập nhật trạng thái bài đăng:", error);
    return { success: false, message: "Lỗi khi cập nhật trạng thái bài đăng." };
  }
};

export const deleteRentalService = async (rentalId, userId) => {
  try {
    await connectWeb3(address, postHouseABI);
    const { contract, account } = getWeb3Instance(address);

    console.log("🔍 Gửi transaction xóa bài đăng:", { rentalId, userId, from: account });

    const tx = await contract.methods.deleteRental(rentalId, userId).send({ from: account });

    console.log("✅ Transaction hash:", tx.transactionHash);
    return { success: true, message: "Xóa bài đăng thành công." };
  } catch (error) {
    console.error("❌ Lỗi khi xóa bài đăng:", error);
    return { success: false, message: error.message || "Lỗi khi xóa bài đăng." };
  }
};

