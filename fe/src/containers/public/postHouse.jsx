import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as houseService from "../../services/house"
import * as action from "../../store/actions"
import axios from 'axios';
import uploadImagesToCloudinary from '../../ultils/upload';
import { addRentalService } from '../../services/postHouse';
import { useNavigate } from 'react-router-dom';

export const Card = ({ children, className }) => {
  return (
    <div className={`bg-white shadow-md rounded-lg ${className}`}>
      {children}
    </div>
  );
}

export const CardContent = ({ children, className }) => {
  return <div className={`p-4 ${className}`}>{children}</div>;
}

const PostHouse = () => {
  const [step, setStep] = useState(1);
  const dispatch = useDispatch();
  const { id,role } = useSelector(state => state.auth);

  const navigate = useNavigate();
  
  useEffect(() => {
    if (!id) {
      alert('Vui lòng đăng nhập để tiếp tục!');
      navigate('/login');
    }
    if(role === "admin"){
      alert('Bạn không được quyền đăng tin thuê nhà!');
      navigate('/admin');
    }
  }, [id, navigate,role]);

  // Lấy danh sách loại nhà từ Redux store
  const houseTypes = useSelector(state => state.houseType.houseTypes || []);
  const [selectedHouseType, setSelectedHouseType] = useState('');

  // Chỉ gọi API nếu houseTypes chưa có dữ liệu
  useEffect(() => {
    if (!houseTypes.length) {
      (async () => {
        const types = await houseService.getHouseTypesService();
        dispatch(action.setHouseTypes(types.map(type => ({ id: Number(type.id), name: type.name }))));
      })();
    }
  }, [dispatch, houseTypes.length]);

  // State chứa dữ liệu địa chỉ
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  // Địa chỉ được chọn
  const [houseNumber, setHouseNumber] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedWard, setSelectedWard] = useState('');

  // Lấy danh sách tỉnh/thành phố
  useEffect(() => {
    axios.get('https://provinces.open-api.vn/api/?depth=1')
      .then(response => setProvinces(response.data))
      .catch(console.error);
  }, []);

  // Xử lý chọn tỉnh
  const handleProvinceChange = async (event) => {
    const provinceCode = event.target.value;
    setSelectedProvince(provinceCode);
    setSelectedDistrict('');
    setSelectedWard('');
    setWards([]);

    if (provinceCode) {
      try {
        const response = await axios.get(`https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`);
        setDistricts(response.data.districts);
      } catch (error) {
        console.error('Lỗi khi lấy danh sách quận/huyện:', error);
      }
    } else setDistricts([]);
  };

  // Xử lý chọn quận/huyện
  const handleDistrictChange = async (event) => {
    const districtCode = event.target.value;
    setSelectedDistrict(districtCode);
    setSelectedWard('');

    if (districtCode) {
      try {
        const response = await axios.get(`https://provinces.open-api.vn/api/d/${districtCode}?depth=2`);
        setWards(response.data.wards);
      } catch (error) {
        console.error('Lỗi khi lấy danh sách phường/xã:', error);
      }
    } else setWards([]);
  };

  // Thông tin nhà
  const [description, setDescription] = useState('');
  const [requirements, setRequirements] = useState('');
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [bedrooms, setBedrooms] = useState(1);
  const [bathrooms, setBathrooms] = useState(1);
  const [price, setPrice] = useState('');

  const handleIncrement = (setter, value) => setter(value + 1);
  const handleDecrement = (setter, value) => setter(value > 1 ? value - 1 : 1);

  // Thông tin bài đăng
  const [selectedImages, setSelectedImages] = useState([]);
  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedImages(prevImages => [...prevImages, ...files]);
  };

  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);

  // Cập nhật step dựa trên dữ liệu
  useEffect(() => {
    if (selectedImages.length > 0) setStep(5);
    else if (description && length && width && bedrooms && bathrooms) setStep(4);
    else if (houseNumber && selectedProvince && selectedDistrict && selectedWard) setStep(3);
  }, [houseNumber, selectedProvince, selectedDistrict, selectedWard, description, length, width, bedrooms, bathrooms, , selectedImages]);

  // Kiểm tra hoàn thành
  useEffect(() => {
    setIsCompleted(
      phone && email && selectedImages.length > 0 && description && length && width && bedrooms > 0 && bathrooms > 0 && houseNumber && selectedProvince && selectedDistrict && selectedWard
    );
  }, [phone, email, , selectedImages, description, length, width, bedrooms, bathrooms, houseNumber, selectedProvince, selectedDistrict, selectedWard]);

  // Lấy user từ Redux
  const { user } = useSelector(state => state.user);

  // Lấy thông tin user
  useEffect(() => {
    if (id) {
      dispatch(action.getOneUser(id));
    }
    if (user?.phone) setPhone(user.phone);
    if (user?.email) setEmail(user.email);
  }, [id, dispatch, user]);

  // Xử lý đăng bài
  const handleSubmit = async () => {
    if (!selectedImages.length) return alert('Vui lòng chọn ít nhất một ảnh!');
    try {
      const urls = await uploadImagesToCloudinary(selectedImages);
      const rentalData = {
        userId: user.id,
        username: user.name,
        price: Number(price),
        houseType: houseTypes.find(type => type.id === Number(selectedHouseType))?.name || '',
        addressLocation: `${houseNumber}, ${wards.find(w => w.code === Number(selectedWard))?.name}, ${districts.find(d => d.code === Number(selectedDistrict))?.name}, ${provinces.find(p => p.code === Number(selectedProvince))?.name}`,
        contactNumber: phone,
        bedrooms: Number(bedrooms),
        bathrooms: Number(bathrooms),
        width: Number(width),
        length: Number(length),
        description,
        imageUrls: urls,
      };

      const response = await addRentalService(rentalData);
      if (response.success) {
        dispatch(action.addRental(rentalData));
        alert(response.message);

        // Reset state 
        setSelectedHouseType('');
        setSelectedProvince('');
        setSelectedDistrict('');
        setSelectedWard('');
        setHouseNumber('');
        setPrice('');
        setBedrooms(1);
        setBathrooms(1);
        setWidth('');
        setLength('');
        setDescription('');
        setRequirements('');
        setSelectedImages([]);
        setStep(1);

      } else alert('Lỗi khi thêm bài đăng!');
    } catch (error) {
      console.error('Lỗi khi đăng bài:', error);
      alert('Có lỗi xảy ra khi đăng bài!');
    }
  };


  return (
    <div className='mt-36 max-w-2xl mx-auto p-4'>
      <h2 className='text-2xl text-[#0077b6] font-bold text-center mb-8'>Tạo tin đăng mới</h2>

      {/* Bước 1: Chọn danh mục */}
      <Card className='mb-8 border border-[#0077b6] relative'>
        <h3 className='absolute -top-5 left-1/2 transform -translate-x-1/2 bg-white px-3 py-1 text-xl font-semibold text-[#0077b6]'>
          Chọn loại nhà muốn cho thuê
        </h3>
        <CardContent className='p-4'>
          <select
            className='w-full mt-3 p-2 border border-[#0077b6] rounded'
            value={selectedHouseType}
            onChange={(e) => {
              setSelectedHouseType(e.target.value);
              setStep(2);
            }}>
            <option value=''>Chọn danh mục</option>
            {houseTypes.map((type) => (
              <option key={type.id} value={type.id}>{type.name}</option>
            ))}
          </select>
        </CardContent>
      </Card>
      {/* Bước 2: Nhập thông tin địa điểm */}
      {step >= 2 && (
        <Card className='mb-8 border border-[#0077b6] relative'>
          <h3 className='absolute -top-5 left-1/2 transform -translate-x-1/2 bg-white px-3 py-1 text-xl font-semibold text-[#0077b6]'>
            Nhập thông tin địa điểm
          </h3>
          <CardContent className='p-4'>
            {/* Chọn tỉnh/thành phố */}
            <select className='w-full mt-3 p-2 border rounded' value={selectedProvince} onChange={handleProvinceChange}>
              <option value=''>Chọn Tỉnh/Thành</option>
              {provinces.map((province) => (
                <option key={province.code} value={province.code}>
                  {province.name}
                </option>
              ))}
            </select>

            {/* Chọn quận/huyện */}
            <select className='w-full mt-3 p-2 border rounded' value={selectedDistrict} onChange={handleDistrictChange} disabled={!selectedProvince}>
              <option value=''>Chọn Quận/Huyện</option>
              {districts.map((district) => (
                <option key={district.code} value={district.code}>
                  {district.name}
                </option>
              ))}
            </select>

            {/* Chọn phường/xã */}
            <select className='w-full mt-3 p-2 border rounded' value={selectedWard} onChange={(e) => setSelectedWard(e.target.value)} disabled={!selectedDistrict}>
              <option value=''>Chọn Phường/Xã</option>
              {wards.map((ward) => (
                <option key={ward.code} value={ward.code}>
                  {ward.name}
                </option>
              ))}
            </select>
            <input
              type='text'
              className='w-full mt-3 p-2 border rounded'
              placeholder='Nhập số nhà (VD: 123A đường ABC)'
              value={houseNumber}
              onChange={(e) => setHouseNumber(e.target.value)} />
          </CardContent>
        </Card>
      )}
      {/* Bước 3: Nhập thông tin nhà muốn cho thuê */}
      {step >= 3 && (
        <Card className='mb-8 border border-[#0077b6] relative'>
          <h3 className='absolute -top-5 left-1/2 transform -translate-x-1/2 bg-white px-3 py-1 text-xl font-semibold text-[#0077b6]'>
            Nhập thông tin chi tiết
          </h3>
          <CardContent className='p-4'>

            {/* Mô tả và yêu cầu */}
            <textarea
              className='w-full p-2 border rounded mt-3'
              placeholder='Tiêu đề bài đăng'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              type='number'
              className='w-full p-2 border rounded'
              placeholder='Giá tiền cho thuê'
              value={price}
              onChange={(e) => {
                const value = e.target.value;
                if (value === "" || Number(value) >= 0) {
                  setPrice(value);
                }
              }}
            />

            {/* Chiều dài & Chiều rộng */}
            <div className='flex gap-4 mt-3'>
              <input
                type='number'
                className='w-1/2 p-2 border rounded'
                placeholder='Chiều dài (m)'
                value={length}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === "" || Number(value) >= 1) {
                    setLength(value);
                  }
                }}
              />
              <input
                type='number'
                className='w-1/2 p-2 border rounded'
                placeholder='Chiều rộng (m)'
                value={width}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === "" || Number(value) >= 1) {
                    setWidth(value);
                  }
                }}
              />
            </div>

            {/* Số phòng ngủ & Số nhà vệ sinh */}
            <div className='flex gap-4 mt-3'>
              {/* Phòng ngủ */}
              <div className='flex items-center border rounded px-3 py-2 w-1/2 justify-between'>
                <span className='font-semibold text-[#0077b6]'>Phòng ngủ</span>
                <div className='flex items-center gap-2'>
                  <button
                    className='px-2 py-1 border rounded text-[#0077b6] font-bold'
                    onClick={() => handleDecrement(setBedrooms, bedrooms)}
                  >
                    -
                  </button>
                  <span className='px-3'>{bedrooms}</span>
                  <button
                    className='px-2 py-1 border rounded text-[#0077b6] font-bold'
                    onClick={() => handleIncrement(setBedrooms, bedrooms)}
                  >
                    +
                  </button>
                </div>
              </div>
              {/* Nhà vệ sinh */}
              <div className='flex items-center border rounded px-3 py-2 w-1/2 justify-between'>
                <span className='font-semibold text-[#0077b6]'>Nhà vệ sinh</span>
                <div className='flex items-center gap-2'>
                  <button
                    className='px-2 py-1 border rounded text-[#0077b6] font-bold'
                    onClick={() => handleDecrement(setBathrooms, bathrooms)}
                  >
                    -
                  </button>
                  <span className='px-3'>{bathrooms}</span>
                  <button
                    className='px-2 py-1 border rounded text-[#0077b6] font-bold'
                    onClick={() => handleIncrement(setBathrooms, bathrooms)}
                  >
                    +
                  </button>
                </div>
              </div>

            </div>

          </CardContent>
        </Card>
      )}
      {/* Bước 4: Tải ảnh nhà lên */}
      {step >= 4 && (
        <Card className='mb-8 border border-[#0077b6] relative'>
          <h3 className='absolute -top-5 left-1/2 transform -translate-x-1/2 bg-white px-3 py-1 text-xl font-semibold text-[#0077b6]'>
            Tải ảnh nhà lên
          </h3>
          <CardContent className='p-4'>

            <input type="file" multiple accept="image/*" onChange={handleImageChange} className="mb-3" />

            {/* Xem trước ảnh đã chọn */}
            <div className="grid grid-cols-3 gap-2">
              {selectedImages.map((file, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(file)}
                  alt="preview"
                  className="w-full h-24 object-cover rounded border"
                />
              ))}
            </div>
          </CardContent>
        </Card>
      )}
      {/* Bước 5: Nhập thông tin liên hệ */}
      {step >= 5 && (
        <Card className='mb-5 border border-[#0077b6] relative'>
          <h3 className='absolute -top-5 left-1/2 transform -translate-x-1/2 bg-white px-3 py-1 text-xl font-semibold text-[#0077b6]'>
            Nhập thông tin liên hệ
          </h3>
          <CardContent className='p-4'>

            {/*Số điện thoại và email*/}
            <input
              type='phone'
              className='w-full p-2 border rounded mt-3'
              placeholder='Số điện thoại'
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <input
              type='email'
              className='w-full p-2 border rounded mt-3'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </CardContent>
        </Card>
      )}
      {isCompleted && (
        <div className="flex justify-center">
          <button
            className="w-1/3 p-3 bg-[#0077b6] text-white rounded font-semibold"
            onClick={handleSubmit}>
            Đăng tin
          </button>
        </div>
      )}
    </div>
  );
};

export default PostHouse;