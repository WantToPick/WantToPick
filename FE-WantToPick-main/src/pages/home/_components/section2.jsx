import section2Image from '../../../assets/images/home/section2.png';

export default function Section2() {
    return (
        <section className="py-16 sm:py-24 md:py-32 bg-white">
            <div className="text-left mb-16 px-4 sm:px-10 md:px-32">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">Vocal Training Room</h2> {/* 반응형 텍스트 크기 */}
            </div>
            <div>
                <img src={section2Image} alt="Vocal Training Room Image" className='w-full h-auto' /> {/* 이미지 비율 유지 */}
            </div>
        </section>
    );
}
