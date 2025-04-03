import * as authServices from "../service/auth.js";
// register
export const register = async (req, res) => {
  const { email, password, name, phone, birthday,address } = req.body
  try {
    if (!email || !password || !name || !phone || !birthday|| !address) {
      return res.status(400).json({ message: "Vui lòng nhập đủ thông tin!" })
    }
    const response = await authServices.registerService(req.body)
    return res.status(201).json(response)

  } catch (error) {
    res.status(500).json({ ["Fail at auth:"]: error.message });
  }
};
// login 
export const login = async (req, res) => {
  const { password,phone } = req.body
  try {
    if ( !password || !phone ) {
      return res.status(400).json({ message: "Vui lòng nhập đủ thông tin!" })
    }
    const response = await authServices.loginService(req.body)
    return res.status(201).json(response)

  } catch (error) {
    res.status(500).json({ ["Fail at auth:"]: error.message });
  }
};
//get one 
export const getOneUser = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await authServices.getOneUserService(id)
    return res.status(200).json(response)
  } catch (error) {
    res.status(500).json({ ["Fail at get one user:"]: error.message });
  }
};