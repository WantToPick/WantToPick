import React, { useState } from 'react';
import { AiOutlineCheck } from 'react-icons/ai';
import { IoIosArrowForward } from 'react-icons/io';
import { saveName } from '../api';

const Step1 = ({ nextStep }) => {
  const [name, setName] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [nameValid, setNameValid] = useState(true);

  const handleNext = async () => {
    if (name) {
      try {
        // 이름을 서버에 저장
        await saveName(name);
        // 저장이 성공하면 다음 단계로 이동
        nextStep();
      } catch (error) {
        // 에러 처리: 사용자에게 피드백 제공
        setNameValid(false);
      }
    } else {
      setNameValid(false);
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    setNameValid(true);
  };

  return (
    <div className="step">
      <div className="w-full text-left">
        <h2 className="text-lg font-bold my-1">이름을 입력하세요.</h2>
        <p className="text-sm text-gray-500 mb-4">원활한 캐스팅을 위해 정확한 정보를 입력해주세요.</p>
      </div>
      <div className="relative w-full mb-1">
        <input
          type="text"
          placeholder="ex. 홍길동"
          value={name}
          onChange={handleNameChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`px-4 py-2 border rounded-xl w-full ${isFocused ? 'border-2 border-[#526DF8]' : 'border-gray-300'}`}
          style={{ outline: 'none' }}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          <AiOutlineCheck className={name ? 'text-[#526DF8]' : 'text-gray-300'} size={20} />
        </div>
      </div>
      {!nameValid && <p className="text-red-500 text-sm mt-1">이름을 입력하세요.</p>}
      <div className="flex justify-end mt-6">
        <button onClick={handleNext} className={`flex items-center ${name ? 'bg-white text-[#526DF8]' : 'bg-white text-gray-300'}`}>
          다음
          <IoIosArrowForward className="ml-2" />
        </button>
      </div>
    </div>
  );
};

export default Step1;