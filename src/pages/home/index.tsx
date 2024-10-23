import { InformationIcon } from "../../components";
import { formatNumber, getPercentageChange } from "../../lib/utils";
import positiveIcon from "../../assets/icons/statistics-up.png";
import negativeIcon from "../../assets/icons/statistics-down.png";
import { Tooltip } from "@mui/material";
import BarChart from "../../components/chart/bar";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useInnerWidth from "../../lib/hooks/use-window-width";
import { useEffect, useRef, useState } from "react";
import SlideOne from "../../assets/images/slide-1.png";
import SlideTwo from "../../assets/images/slide-2.png";
import SlideThree from "../../assets/images/slide-3.png";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

export default function Home() {
  const { isMobile } = useInnerWidth();
  const barChartLabels = isMobile ? [
    "Ja",
    "Fb",
    "Mr",
    "Ap",
    "Ma",
    "Jn",
    "Jl",
    "Au",
    "Se",
    "Oc",
    "No",
    "De"
  ] : [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ]
  return (
    <div>
      <div>

        <h2 className="text-xl  text-[17px] sm:text-[22px] leading-[118%] sm:leading-[100%] text-black dark:text-white mb-[12px] sm:mb-[24px]">Welcome! here's your summary</h2>
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-[20px]">
          {
            summary.map((item, index) => (
              <Tile key={index} {...item} />
            ))
          }
        </section>
      </div>

      <h2 className="text-[18px] leading-[17px] nsm:leading-[20px] sm:text-[22px] text-black dark:text-white mb-[12px] ">Event Registrations per month</h2>
      <div className="w-full grid grid-cols-1  lg:grid-cols-[52%_48%] gap-4 mb-[20px]">
        <section className="w-full min-h-[290px] h-[290px] sm:min-h-[320px] sm:h-[320px] border p-[16px] md:p-[30px] dark:text-white">
          <BarChart chartData={{
            labels: barChartLabels,
            datasets: [
              {
                data: [700, 930, 790, 400, 1000, 580, 840, 380, 810, 700, 980, 600],
                backgroundColor: "rgba(133, 118, 255, 1)",
                borderColor: "rgba(75, 192, 192, 0)",
                borderWidth: 1,
              }
            ],
          }} />
        </section>
        <Carousel />
      </div>
      <h2 className="text-xl  text-[17px] sm:text-[22px] leading-[118%] sm:leading-[100%] text-black dark:text-white mb-[12px] sm:mb-[24px]">Events History</h2>
      <section>

      </section>
    </div>
  )
}

const Carousel = () => {
  const sliderRef = useRef<Slider>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const handleNext = () => {
    sliderRef.current.slickNext();
  };

  const handlePrev = () => {
    sliderRef.current.slickPrev();
  };

  const handleDotClick = (index) => {
    sliderRef.current.slickGoTo(index);
  };
  useEffect(() => {
    if (sliderRef.current)
      sliderRef.current?.slickPlay();
  }, [])
  return (
    <section className=" w-full min-w-full h-[284px] md:h-[320px] max-h-[284px] md:max-h-[320px] overflow-hidden border relative">
      <Slider
        autoPlay={true}
        autoplaySpeed={2000}
        speed={300}
        slidesToShow={1}
        slidesToScroll={1}
        cssEase="linear"
        arrows={false}
        beforeChange={(_: number, next: number) => setCurrentIndex(next)}
        infinite
        dots={false}
        ref={sliderRef}
        className="!relative !w-full !h-full "
      >
        <section className=" w-full min-wfull h-[284px] md:h-[320px] border relative">
          <img src={SlideOne} alt="slide-1" className="absolute top-0 left-0 w-full h-full object-cover z-10 no-repeat" />
        </section>
        <section className=" w-full min-wfull h-[284px] md:h-[320px] border relative">
          <img src={SlideTwo} alt="slide-2" className="absolute top-0 left-0 w-full h-full object-cover z-1" />
        </section>
        <section className=" w-full min-wfull h-[284px] md:h-[320px] border relative">
          <img src={SlideThree} alt="slide-3" className="absolute top-0 left-0 w-full h-full object-cover" />
        </section>
      </Slider>

      <button onClick={handlePrev} className="absolute top-[50%] left-[10px] -translate-y-[50%] bg-white rounded-full p-[10px] w-[24px] h-[24px] flex items-center justify-center text-black dark:text-black">
        <ChevronLeft />
      </button>
      <button onClick={handleNext} className="absolute top-[50%] right-[10px] -translate-y-[50%] bg-white rounded-full p-[10px] w-[24px] h-[24px] flex items-center justify-center text-black dark:text-black">
        <ChevronRight />
      </button>
      <div className="flex flex-col absolute bottom-[16px] left-[50%] translate-x-[-50%] flex items-center gap-[10px] w-[95%] ">
        <article className="w-full text-white">
          <h3 className="text-[12px] sm:text-[14px]">Latest News &amp; Updates</h3>
          <p className="text-[10px] sm:text-[12px] leading-[130%]">Turpis interdum nunc varius ornare dignissim pretium. Massa ornare quis aliquet sed vitae. Sed velit nisi, fermentum erat. Fringilla purus, erat fringilla tincidunt quisque non. Pellentesque in ut tellus.</p>
        </article>
        <div className="flex gap-1 text-black dark:text-black">
          {Array(3).fill(null).map((_, index) => (
            <button key={index} onClick={() => handleDotClick(index)} className={`h-[3px] w-[12px] ${currentIndex === index ? "bg-white" : "bg-[#fff9]"} rounded-full`}>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

const Tile = ({
  title,
  previousValue,
  currentValue,
  information,
  currency,
}: {
  title: string;
  previousValue: number;
  currentValue: number;
  information: string;
  currency?: string;
}) => {
  const change = getPercentageChange(previousValue, currentValue);
  const ChangeIcon = change >= 0 ? (
    <span className="text-[#10b981] flex items-center">
      <img src={positiveIcon} width={16} height={16} className="max-w-[16px] max-h-[16px]" />
      <span className="text-[10px] leading-[120%]">+{change.toFixed(1)}%</span>
    </span>) : (
    <span className="text-[#f43f5e] flex items-center">
      <img src={negativeIcon} width={16} height={16} className="max-w-[16px] max-h-[16px]" />
      <span className="text-[10px] leading-[120%]">-{(change * -1).toFixed(1)}%</span>
    </span>
  );
  return (
    <div className="flex flex-col p-[16px] w-full h-[88px]  items-start border border-[#f2f2f7] dark:border-none dark:bg-[#484554]">
      <div className="text-[#64748b] dark:text-[#fcf7ff] flex items-center">
        <p className="text-[16px] leading-[150%] whitespace-nowrap">{title}</p>
        <div className="w-[16px] h-[16px] ml-1">
          <Tooltip title={information} placement="right">
            <InformationIcon />
          </Tooltip>
        </div>
      </div>
      <div className="flex">
        <p className="text-[20px] leading-[160%] font-bold text-black dark:text-white">{formatNumber(currentValue, currency)}</p>
        {ChangeIcon}
      </div>
    </div>
  );
}
const summary = [
  {
    title: "Total Events",
    previousValue: 95238,
    currentValue: 100000,//5
    information: "total number of events",
  },
  {
    title: "Active Speakers",
    previousValue: 27.77,
    currentValue: 25,//-5
    information: "total number of active speakers",
  },
  {
    title: "Total Registrations",
    previousValue: 285.8,
    currentValue: 300,//+5
    information: "total number of registrations",
  },
  {
    title: "Total Revenue",
    previousValue: 476191,
    currentValue: 500000,
    information: "total number of revenue",
    currency: "USD",//+5
  },
]