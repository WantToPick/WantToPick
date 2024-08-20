import React, { useState } from 'react';
import Step1 from './_components/step1';
import Step2 from './_components/step2';
import Step3 from './_components/step3';
import Step4 from './_components/step4';
import Step5 from './_components/step5';
import logoImg from '../../../assets/images/logo.png';

const SignupForm = () => {
  const [step, setStep] = useState(1);

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Step1 nextStep={nextStep} />;
      case 2:
        return <Step2 nextStep={nextStep} prevStep={prevStep} />;
      case 3:
        return <Step3 nextStep={nextStep} prevStep={prevStep} />;
      case 4:
        return <Step4 nextStep={nextStep} prevStep={prevStep} />;
      case 5:
        return <Step5 prevStep={prevStep} />;
      default:
        return <Step1 nextStep={nextStep} />;
    }
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <img src={logoImg} alt="로고" className="my-3 w-16" />
      <h1 className="text-2xl font-bold mb-2">회원가입</h1>
      <p className="text-base text-gray-500 mb-8">원투픽에 오신 걸 환영합니다!</p>
      <div className="w-full max-w-xl p-16 bg-white border border-gray-300 rounded-2xl">
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs font-medium text-gray-500">{step}/5</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
          <div className="bg-[#526DF8] h-2.5 rounded-full" style={{ width: `${(step / 5) * 100}%` }}></div>
        </div>
        {renderStep()}
      </div>
    </div>
  );
};

export default SignupForm;
