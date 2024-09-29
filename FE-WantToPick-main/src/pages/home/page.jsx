import React from 'react';
import Section1 from './_components/section1';
import Section2 from './_components/section2';
import Section3 from './_components/section3';
import Section4 from './_components/section4';
import Section5 from './_components/section5';

export default function HomePage() {
    return (
        <main>
            <Section1 />
            <div id="section2">
                <Section2 />
            </div>
            <Section3 />
            <Section4 />
            <Section5 />
        </main>
    );
}