export default function Section2() {
    return (
        <section className="py-32 px-32 bg-white">
            <div className="text-left mb-8">
                <h2 className="text-4xl font-bold">Training Room</h2>
            </div>
            <div className="space-y-8">
                <div className="bg-gradient-to-r from-white to-[#EFF3FF] rounded-full p-8 w-4/12">
                    <h3 className="text-xl font-bold text-[#526DF8]">Vocal Training</h3>
                    <p className="text-lg">내 맞춤 음악대 보컬을 픽 !</p>
                </div>
                <div className="bg-gradient-to-r from-white to-[#EFF3FF] rounded-full p-8 w-6/12">
                    <h3 className="text-xl font-bold text-[#526DF8]">Dance Training</h3>
                    <p className="text-lg">내 춤이 정확한가 ? 정밀한 댄스분석 !</p>
                </div>
            </div>
        </section>
    );
}
