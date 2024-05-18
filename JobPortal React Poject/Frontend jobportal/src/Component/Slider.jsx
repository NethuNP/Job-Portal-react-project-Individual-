import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';
import { FreeMode, Pagination } from 'swiper/modules';
import { RxArrowTopRight, RxDesktop, RxPencil2 } from 'react-icons/rx';
import { GiHealthPotion } from 'react-icons/gi';
import { MdOutlineHotelClass, MdBusinessCenter } from 'react-icons/md';
import Aos from 'aos';
import 'aos/dist/aos.css';

const Slider = () => {
  useEffect(() => {
    Aos.init({ duration: 3000 });
  }, []);

  return (
    <div className='flex items-center justify-center flex-col bg-blue-500 mt-24' data-aos="fade-down">
      <h1 className='font-bold text-blue justify-center flex-col text-4xl mb-14'>Categories</h1>
      <Swiper
        breakpoints={{
          340: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          700: {
            slidesPerView: 3,
            spaceBetween: 15, // Space value adjusted to a more reasonable number
          },
        }}
        freeMode={true}

        pagination={{
          clickable: true
        }}
        modules={[FreeMode, Pagination]}
        className='max-w-[90%] lg:max-w-[80%]'
      >
        {ServiceData.map((item) => (
          <SwiperSlide key={item.title}>
            <div
              className='relative shadow-3xl text-white rounded-xl overflow-hidden cursor-pointer group'
              style={{ backgroundImage: `url(${item.backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
              <div className='absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-50 transition duration-300'></div>
              <div className='relative flex flex-col items-center justify-center h-full lg:p-8'>
                {item.icon === RxPencil2 && <RxPencil2 className='text-3xl lg:text-6xl mb-4 group-hover:scale-105 transition duration-300' />}
                {item.icon === GiHealthPotion && <GiHealthPotion className='text-3xl lg:text-6xl mb-4 group-hover:scale-105 transition duration-300' />}
                {item.icon === RxDesktop && <RxDesktop className='text-3xl lg:text-6xl mb-4 group-hover:scale-105 transition duration-300' />}
                {item.icon === MdOutlineHotelClass && <MdOutlineHotelClass className='text-3xl lg:text-6xl mb-4 group-hover:scale-105 transition duration-300' />}
                {item.icon === MdBusinessCenter && <MdBusinessCenter className='text-3xl lg:text-6xl mb-4 group-hover:scale-105 transition duration-300' />}
                <h2 className='text-xl lg:text-2xl font-bold mb-2 group-hover:underline transition duration-300'>{item.title}</h2>
                <p className='text-sm lg:text-base text-center mt-3'>{item.content}</p>
              </div>
              <RxArrowTopRight className='absolute bottom-1 left-5 w-[30px] h-[30px] text-white group-hover:text-blue-500 group-hover:rotate-45 duration-100'></RxArrowTopRight>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export const ServiceData = [
  {
    icon: RxPencil2,
    title: "Educational",
    content: "Educational job opportunities, including positions in schools, colleges and etc.",
    backgroundImage: "/images/2947.jpg"
  },
  {
    icon: GiHealthPotion,
    title: "Healthcare",
    content: "Highlight job openings in the healthcare industry, covering a wide range of roles.",
    backgroundImage: "/images/2947.jpg"
  },
  {
    icon: RxDesktop,
    title: "IT",
    content: "Feature job listings in the IT sector, encompassing various technology related roles.",
    backgroundImage: "/images/2947.jpg"
  },
  {
    icon: MdOutlineHotelClass,
    title: "Restaurant",
    content: "Job opportunities within the restaurant and hospitality industry, catering to positions in restaurants.",
    backgroundImage: "/images/2947.jpg"
  },
  {
    icon: MdBusinessCenter,
    title: "Marketing",
    content: "Job openings in the marketing field, covering diverse roles involved in promoting products and services.",
    backgroundImage: "/images/2947.jpg"
  }
]

export default Slider;
