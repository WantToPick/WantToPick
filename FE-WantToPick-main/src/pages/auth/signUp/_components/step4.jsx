import React, { useState } from 'react';
import { AiOutlineCheck } from 'react-icons/ai';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { saveEmail } from '../api'; // API 호출 함수 가져오기


const Step4 = ({ nextStep, prevStep }) => {
  const [email, setEmail] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);

  const handleNext = async () => {
    if (validateEmail(email)) {
      try {
        // 이메일을 서버에 저장
        await saveEmail(email);
        nextStep(); // 저장이 성공하면 다음 단계로 이동
      } catch (error) {
        // 에러 처리: 사용자에게 피드백 제공
        setIsEmailValid(false);
      }
    } else {
      setIsEmailValid(false);
    }
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setIsEmailValid(true);
  };

  return (
    <div className="step">
      <div className="w-full text-left">
        <h2 className="text-lg font-bold my-1">이메일을 입력하세요.</h2>
        <p className="text-sm text-gray-500 mb-4">원활한 캐스팅을 위해 정확한 정보를 입력해주세요.</p>
      </div>
      <div className="relative w-full mb-1">
        <input
          type="email"
          placeholder="ex. abc1234@naver.com"
          value={email}
          onChange={handleEmailChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`px-4 py-2 border rounded-xl w-full ${isFocused ? 'border-2 border-[#526DF8]' : 'border-gray-300'}`}
          style={{ outline: 'none' }}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          <AiOutlineCheck className={validateEmail(email) ? 'text-[#526DF8]' : 'text-gray-300'} size={20} />
        </div>
      </div>
      {!isEmailValid && <p className="text-red-500 text-sm mt-1">올바른 이메일 형식을 입력하세요.</p>}
      <div className="flex justify-between mt-6">
        <button onClick={prevStep} className="flex items-center bg-white text-gray-400">
          <IoIosArrowBack className="mr-2" />
          이전
        </button>
        <button onClick={handleNext} className={`flex items-center ${validateEmail(email) ? 'bg-white text-[#526DF8]' : 'bg-white text-gray-300'}`}>
          다음
          <IoIosArrowForward className="ml-2" />
        </button>
      </div>
    </div>
  );
};

export default Step4;
