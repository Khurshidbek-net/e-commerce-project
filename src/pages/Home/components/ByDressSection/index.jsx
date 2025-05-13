import './ByDress.scss';
import { GoArrowLeft, GoArrowRight } from 'react-icons/go';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { mockReviews } from '../../../../components/Reviews/reviews';
import ReviewCard from '../../../../components/Reviews';


function ByDress() {
  return (
    <div className='container'>
      <div className='dress-wrapper'>
        <h3>BROWSE BY DRESS STYLE</h3>
        <div className='img-wrapper'>
          <div className='img-row'>
            <img style={{width: "408px", height: "289px"}} src="/src/assets/bd1_item.png" alt="bd1" />
            <img style={{width: "684px", height: "289px"}} src="/src/assets/bd2_item.png" alt="bd2" />
          </div>
          <div className='img-row'>
            <img style={{width: "684px", height: "289px"}} src="/src/assets/bd3_item.png" alt="bd3" />
            <img style={{width: "408px", height: "289px"}} src="/src/assets/bd4_item.png" alt="bd4" />
          </div>
        </div>
      </div>

      {/*------------------------------- OUR HAPPY CUSTOMERS--------------------------------------- */}
      
      <div className='coments'>
        <div className='customers'>
          <h3>OUR HAPPY CUSTOMERS</h3>
          <div className='icons'>
            <div className='swiper-button-prev-custom'><GoArrowLeft /></div>
            <div className='swiper-button-next-custom'><GoArrowRight /></div>
          </div>
        </div>

        <div className='our-happy-customers'>
          <Swiper
            modules={[Navigation]}
            navigation={{
              nextEl: '.swiper-button-next-custom',
              prevEl: '.swiper-button-prev-custom'
            }}
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className='review-swiper'
          >
            {mockReviews.map((review, index) => (
              <SwiperSlide key={index}>
                <ReviewCard reviews={review} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

    </div>
  );
}

export default ByDress;