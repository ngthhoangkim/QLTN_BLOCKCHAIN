import Web3 from "web3";

let web3 = null;
let contracts = {};
let account = null;

export const connectWeb3 = async (contractAddress, abi) => {
  if (!contractAddress || !abi) {
    throw new Error("❌ Vui lòng cung cấp đầy đủ địa chỉ hợp đồng và ABI!");
  }

  if (web3 && contracts[contractAddress] && account) {
    return { web3, contract: contracts[contractAddress], account };
  }

  if (window.ethereum) {
    try {
      web3 = new Web3(window.ethereum);
      await window.ethereum.request({ method: "eth_requestAccounts" });

      const accounts = await web3.eth.getAccounts();
      account = accounts[0];

      contracts[contractAddress] = new web3.eth.Contract(abi, contractAddress);
      return { web3, contract: contracts[contractAddress], account };
    } catch (error) {
      // console.error("❌ Lỗi kết nối Web3:", error);
      throw new Error("Lỗi kết nối Web3!");
    }
  } else {
    throw new Error("Vui lòng cài đặt MetaMask!");
  }
};

export const getWeb3Instance = (contractAddress) => {
  if (!contractAddress) {
    throw new Error("❌ Vui lòng cung cấp địa chỉ hợp đồng!");
  }
  if (!web3 || !contracts[contractAddress] || !account) {
    throw new Error(
      `❌ Web3 chưa được khởi tạo cho hợp đồng ${contractAddress}! Hãy gọi connectWeb3(contractAddress, abi) trước.`
    );
  }
  return { web3, contract: contracts[contractAddress], account };
};
