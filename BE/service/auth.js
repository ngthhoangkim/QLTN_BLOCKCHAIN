import db from "../models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
require("dotenv").config();

const hashPassword = (password) => {
  if (!password) throw new Error("Password chưa được truyền vào!");
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};
//register for customer
export const registerService = ({ email, name, phone, password, birthday,address }) =>
  new Promise(async (resolve, reject) => {
    try {
      const role = await db.Role.findOne({
        where: { name: "user" },
      });
      const response = await db.User.findOrCreate({
        where: { phone: phone },
        defaults: {
          email: email, 
          password: hashPassword(password),
          name: name,
          phone: phone,
          birthday: birthday,
          address:address,
          roleID: role.id,
        },
      });
      const token =
        response[1] &&
        jwt.sign(
          { id: response[0].id, phone: response[0].phone },
          process.env.JWT_SECRET,
          { expiresIn: "2d" }
        );
      resolve({
        err: token ? 0 : 2,
        msg: token ? "Đăng ký thành công!" : "Tài khoản đã tồn tại!",
        token: token || null,
      });
    } catch (error) {
      reject(error);
    }
  });
// login
export const loginService = async ({ phone, password }) => {
  try {
    let response = await db.User.findOne({
      where: { phone: phone },
      include: [{ model: db.Role, as: "role", attributes: ["name"] }],
      nest: true,
      raw: true,
    });

    // Nếu vẫn không tìm thấy, trả lỗi
    if (!response) {
      return { err: 1, msg: "Số điện thoại bạn nhập không tồn tại. Hãy nhập lại!" };
    }

    // Kiểm tra mật khẩu
    const isCorrectPassword = bcrypt.compareSync(password, response.password);
    if (!isCorrectPassword) {
      return { err: 2, msg: "Bạn nhập sai mật khẩu. Hãy nhập lại nhé!" };
    }

    // Tạo token
    const token = jwt.sign(
      {
        id: response.id,
        phone: response.phone,
        role: response.role.name,
      },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    return {
      err: 0,
      msg: "Đăng nhập thành công!",
      token,
      role: response.role.name,
      id: response.id, 
    };
  } catch (error) {
    throw new Error(error.message);
  }
};
