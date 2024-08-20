import React from 'react';
import sercurity from '../../../assets/images/home/security.png';

export default function Section4() {
    return (
        <section className="py-32 px-44 bg-gradient-to-b from-[#FFEAEB] to-white mt-10">
            <div className="container mx-auto flex items-center">
                <div className="w-1/2 relative">
                    <img src={sercurity} alt="Sercurity Image" className='w-[520px]'/>
                </div>
                <div className="w-1/2 pl-16">
                    <h2 className="text-4xl font-bold mb-4">Picker’s 엔터테인먼트 기업 <br></br> 완전인증</h2>
                    <p className="mb-4">
                        원투픽만의 완전인증 시스템을 통해 엔터테인먼트 전문성과 신뢰도를 높이고 <br />
                        Pick과 Picker가 더욱 안심하고 매칭을 진행할 수 있어요. <br />
                        안전한 서비스를 위한 노력들도 계속 되고요.
                    </p>
                    <p>
                        이 외에도 연습생과 엔터의 관계를 안전하게 보호할 수 있는<br />
                        서비스를 지속적으로 준비하고 있어요.
                    </p>
                </div>
            </div>
        </section>
    );
}
