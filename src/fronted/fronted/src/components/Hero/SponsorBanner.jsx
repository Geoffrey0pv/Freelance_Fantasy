import React from 'react';

const SponsorBanner = () => {
    return (
        <div className="flex flex-wrap justify-center items-center gap-10 p-6 lg:px-20 lg:py-12 bg-white bg-opacity-0 w-full">
            <img src={"img_2.png"} alt="sponsor" className="w-40 md:w-52 lg:w-64 xl:w-72 object-contain" />
            <img src={"img.png"} alt="sponsor" className="w-40 md:w-52 lg:w-64 xl:w-72 object-contain" />
            <img src={"image.png"} alt="sponsor" className="w-40 md:w-52 lg:w-64 xl:w-72 object-contain" />
        </div>
    );
};

export default SponsorBanner;
