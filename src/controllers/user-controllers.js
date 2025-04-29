const UsersModels = require('../models/Users/users');
const jwt = require('jsonwebtoken');
exports.createUser = async (req, res) => {
    const { name, email, password } = req.body;
    const user = new UsersModels({
        name: name,
        email: email,
        password: password
    });
    //ກ່ອນຈະບັນທືກຂໍ້ມູນລົງ DB ກວດເບິ່ງວ່າມີອີເມວນີ້ຢູ່ແລ້ວບໍ?
    const checkEamail = await UsersModels.findOne({ email: email });
    if (checkEamail) {
        return res.status(400).json({
            status: 400,
            message: 'ມີອີເມວນີ້ຢູ່ແລ້ວ',
        });
    }

    await user.save();
    res.status(201).json({
        status: 'success',
        message: 'ບັນທືກຂໍ້ມູນສຳເລັດ',
        data: user,
    });
}
//ຟັງຊັນໃນການລັອກອິນ
exports.logIn = async (req, res) => {
    const { email, password } = req.body;
    //ກ່ອນຈະລັອກອິນ ກວດເບິ່ງວ່າມີອີເມວນີ້ຢູ່ໃນລະບົບແລ້ວບໍ?
    const user = await UsersModels.findOne({ email: email });

    if (!user) {
        return res.status(400).json({
            status: '400',
            message: 'ບໍ່ມີອີເມວນີ້ໃນລະບົບ ກາລຸນາ ສະໝັກສະມາຊິກກ່ອນ',
        });
    }
    //ກ່ອນຈະລັອກອິນ ກວດເບິ່ງວ່າລະຫັດຜ່ານນີ້ຖືກຕ້ອງບໍ?
    const isMatch = await user.checkPassword(password);
    if (!isMatch) {
        return res.status(400).json({
            status: '400',
            message: 'ລະຫັດຜ່ານບໍ່ຖືກຕ້ອງ',
        });
    }
    //ສ້າງ token ໃຫ້ກັບຜູ້ໃຊ້
    //expiresIn ເເມ່ນໃຫ້ token ມີອາຍຸການນຳໃຊ້ 1 ມື້
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1 second",
    });
    res.status(200).json({
        status: 'success',
        message: 'ລັອກອິນສຳເລັດ',
        access_token: token,
    });
}
exports.getAllUser = async (req, res) => {
    const users = await UsersModels.find();
    res.status(200).json({
        status: 'success',
        data: users,
    });
}
