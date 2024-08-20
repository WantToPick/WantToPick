import React, { useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { saveGender } from '../api'; // API 호출 함수 가져오기


const Step3 = ({ nextStep, prevStep }) => {
  const [gender, setGender] = useState('');
  const [genderSelected, setGenderSelected] = useState(true);

  const handleNext = async () => {
    if (gender) {
      try {
        // 성별을 서버에 저장
        await saveGender(gender);
        nextStep(); // 저장이 성공하면 다음 단계로 이동
      } catch (error) {
        // 에러 처리: 사용자에게 피드백 제공
        setGenderSelected(false);
      }
    } else {
      setGenderSelected(false);
    }
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
    setGenderSelected(true);
  };

  return (
    <div className="step">
      <div className="w-full text-left">
        <h2 className="text-lg font-bold my-1">성별을 선택하세요.</h2>
        <p className="text-sm text-gray-500 mb-4">원활한 캐스팅을 위해 정확한 정보를 입력해주세요.</p>
      </div>
      <div className="flex justify-center gap-4 mb-4">
        <div className="flex items-center">
          <input
            type="radio"
            id="male"
            name="gender"
            value="남자"
            onChange={handleGenderChange}
            className="hidden"
          />
          <label
            htmlFor="male"
            className={`flex items-center cursor-pointer ${gender === '남자' ? 'text-[#526DF8]' : 'text-gray-700'}`}
          >
            <span
              className={`w-4 h-4 inline-block mr-2 border rounded-full flex items-center justify-center ${gender === '남자' ? 'border-[#526DF8]' : 'border-gray-300'}`}
            >
              {gender === '남자' && <span className="w-2 h-2 bg-[#526DF8] rounded-full"></span>}
            </span>
            남자
          </label>
        </div>
        <div className="flex items-center">
          <input
            type="radio"
            id="female"
            name="gender"
            value="여자"
            onChange={handleGenderChange}
            className="hidden"
          />
          <label
            htmlFor="female"
            className={`flex items-center cursor-pointer ${gender === '여자' ? 'text-[#526DF8]' : 'text-gray-700'}`}
          >
            <span
              className={`w-4 h-4 inline-block mr-2 border rounded-full flex items-center justify-center ${gender === '여자' ? 'border-[#526DF8]' : 'border-gray-300'}`}
            >
              {gender === '여자' && <span className="w-2 h-2 bg-[#526DF8] rounded-full"></span>}
            </span>
            여자
          </label>
        </div>
      </div>

      {!genderSelected && <p className="text-red-500 text-sm mt-1">성별을 선택하세요.</p>}
      <div className="flex justify-between mt-6">
        <button onClick={prevStep} className="flex items-center bg-white text-gray-400">
          <IoIosArrowBack className="mr-2" />
          이전
        </button>
        <button onClick={handleNext} className={`flex items-center ${gender ? 'bg-white text-[#526DF8]' : 'bg-white text-gray-300'}`}>
          다음
          <IoIosArrowForward className="ml-2" />
        </button>
      </div>
    </div>
  );
};

export default Step3;
