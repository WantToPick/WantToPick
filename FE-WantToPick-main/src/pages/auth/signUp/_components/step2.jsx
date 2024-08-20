import React, { useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { saveBirthDate } from '../api'; // API 호출 함수 가져오기

const Step2 = ({ nextStep, prevStep }) => {
  const [birthdate, setBirthdate] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [birthdateValid, setBirthdateValid] = useState(true);

  const handleNext = async () => {
    console.log('현재 생년월일:', birthdate); // 생년월일 값 확인

    if (birthdate && validateDate(birthdate)) {
      try {
        // 생년월일을 서버에 저장
        await saveBirthDate(birthdate);
        nextStep(); // 저장이 성공하면 다음 단계로 이동
      } catch (error) {
        // 에러 처리: 사용자에게 피드백 제공
        setBirthdateValid(false);
      }
    } else {
      setBirthdateValid(false);
    }
  };

  const validateDate = (date) => {
    const re = /^\d{4}-\d{2}-\d{2}$/;
    return re.test(date);
  };

  const handleBirthdateChange = (e) => {
    setBirthdate(e.target.value);
    setBirthdateValid(true);
  };

  return (
    <div className="step">
      <div className="w-full text-left">
        <h2 className="text-lg font-bold my-1">생년월일을 입력하세요.</h2>
        <p className="text-sm text-gray-500 mb-4">원활한 캐스팅을 위해 정확한 정보를 입력해주세요.</p>
      </div>
      <div className="relative w-full mb-1">
        <input
          type="date"
          value={birthdate}
          onChange={handleBirthdateChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`px-4 py-2 border rounded-xl w-full ${isFocused ? 'border-2 border-[#526DF8]' : 'border-gray-300'}`}
          style={{ outline: 'none' }}
        />
      </div>

      {!birthdateValid && <p className="text-red-500 text-sm mt-1">생년월일을 형식에 맞게 입력하세요.</p>}
      <div className="flex justify-between mt-6">
        <button onClick={prevStep} className="flex items-center bg-white text-gray-400">
          <IoIosArrowBack className="mr-2" />
          이전
        </button>
        <button onClick={handleNext} className={`flex items-center ${birthdate ? 'bg-white text-[#526DF8]' : 'bg-white text-gray-300'}`}>
          다음
          <IoIosArrowForward className="ml-2" />
        </button>
      </div>
    </div>
  );
};

export default Step2;
