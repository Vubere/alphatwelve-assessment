import { InformationIcon } from "../../components";
import { formatNumber, getPercentageChange } from "../../lib/utils";
import positiveIcon from "../../assets/icons/statistics-up.png";
import negativeIcon from "../../assets/icons/statistics-down.png";
import {
  Tooltip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Collapse,
} from "@mui/material";
import BarChart from "../../components/chart/bar";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useInnerWidth from "../../lib/hooks/use-window-width";
import { useEffect, useRef, useState } from "react";
import SlideOne from "../../assets/images/slide-1.png";
import SlideTwo from "../../assets/images/slide-2.png";
import SlideThree from "../../assets/images/slide-3.png";
import { ChevronLeft, ChevronRight, KeyboardArrowDown, KeyboardArrowRight } from "@mui/icons-material";
import TablePagination from '@mui/material/TablePagination';
import { rows } from "../../lib/utils/fake-data";
import { startCase } from "lodash";



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
        <section className="w-full h-[260px] min-h-[260px] sm:min-h-[290px] sm:h-[290px] md:min-h-[320px] md:h-[320px] border p-[16px] md:p-[30px] dark:text-white">
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
      <TableSection />
    </div>
  )
}

const TableSection = () => {
  const [tableFilter, setTableFilter] = useState({
    search: "",
    status: "",
    date: "",
  })
  const [page, setPage] = useState(0);
  const [tableRows, setTableRows] = useState(rows);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { isMobile } = useInnerWidth();
  const headers = isMobile ? ["Event Name", "Status"] : ["Event Name", "Date", "Status", "Speaker"];

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleInputChange = (e) => {
    setTableFilter({
      ...tableFilter,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    setPage(0);
    let tempFilterRows = rows;
    if (tableFilter.search)
      tempFilterRows = tempFilterRows.filter(row => row.eventName.toLowerCase().includes(tableFilter.search.toLowerCase()) || row.speaker.toLowerCase().includes(tableFilter.search.toLowerCase()))
    if (tableFilter.status)
      tempFilterRows = tempFilterRows.filter(row => row.status === tableFilter.status)
    setTableRows(tempFilterRows);
  }, [tableFilter.search, tableRows.length, tableFilter.status])

  return (
    <div className="text-[#64748b] dark:text-[#fcf7ff]">
      <div className="mb-3">
        <div>
          <div className="flex gap-2 flex-col sm:flex-row">
            <div className="grid grid-cols-[28px_1fr] border h-[30px] w-full sm:max-w-[150px] ">
              <span className="h-full w-full flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.0417 16.0416L12.9167 12.9166M3.95834 9.16659C3.95834 6.2901 6.29019 3.95825 9.16668 3.95825C12.0432 3.95825 14.375 6.2901 14.375 9.16659C14.375 12.0431 12.0432 14.3749 9.16668 14.3749C6.29019 14.3749 3.95834 12.0431 3.95834 9.16659Z" stroke="#94A3B8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </span>
              <input className="border-none outline-none w-full h-full placeholder:text-[#cbcdda] text-black dark:text-white bg-white dark:bg-[#383544]" value={tableFilter.search} onChange={handleInputChange} name="search" placeholder="search..." />
            </div>
            <div className="border h-[30px] px-2 sm:max-w-[100px]">
              <select className="border-none outline-none w-full h-full text-black dark:text-white bg-white dark:bg-[#383544] placeholder:text-[#cbcdca]" value={tableFilter.status} onChange={handleInputChange} name="status" >
                <option value=""></option>
                <option value="completed">Completed</option>
                <option value="in progress">In progress</option>
              </select>
            </div>
          </div>

        </div>
      </div>
      <TableContainer >
        <Table className={`min-w-[100%]`}>
          <TableHead>
            <TableRow className="bg-[#f1f5f9] dark:bg-[#484554] dark:text-white">
              {
                headers.map((header, index) => (
                  <TableCell key={index} className={`min-w-[100%] dark:text-white`}>{header}</TableCell>
                ))
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Table rows */}
            {
              isMobile ?
                tableRows?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)?.map((row, i) => (
                  <EventRowMobile key={i} {...row} />
                ))
                : tableRows?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)?.map((row, i) => (
                  <TableRow key={i} >
                    <TableCell className="w-auto dark:text-white">{row.eventName}</TableCell>
                    <TableCell className="dark:text-white">{row.date}</TableCell>
                    <TableCell className="dark:text-white">{row.speaker}</TableCell>
                    <TableCell ><StatusDisplay status={row.status} /></TableCell>
                  </TableRow>
                ))
            }
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[10, 20, 30]}
          component="div"
          className="dark:text-white"
          count={tableRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

    </div>
  )
}

const StatusDisplay = ({ status }: { status: string }) => {
  const classes = status === "completed" ? "text-[#10b981] bg-[#10b98155]" : "text-[#3b82f6] bg-[#3b82f655]";
  return (
    <span className={`${classes} flex  items-center nowrap whitespace-nowrap rounded-full justify-center w-[100px] h-[24px] min-w-[100px] text-[12px]`}>
      <svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="8" cy="8" r="3" fill="currentColor" />
      </svg>
      <span className="block h-[16px]">
        {startCase(status)}
      </span>
    </span>
  )
}
interface EventRowProps {
  eventName: string;
  date: string;
  speaker: string;
  status: string;
}

const EventRowMobile: React.FC<EventRowProps> = ({ eventName, date, speaker, status }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow className={"text-[#334155] dark:text-white " + (open && "bg-gray-200 dark:bg-gray-600")}>
        <td className="flex items-center">
          <button
            onClick={() => setOpen(!open)}
            className="inline outline-none border-none bg-transparent"
          >
            {open ? <KeyboardArrowDown /> : <KeyboardArrowRight />}
          </button>
          <span className="inline-block max-w-full text-[14px] text-[#334155] dark:text-white py-1">{eventName}</span>
        </td>
        <td className="text-[14px]">
          <StatusDisplay status={status} />
        </td>
      </TableRow>
      <TableRow className="bg-gray-100 dark:bg-gray-800 px-1">
        <td className="text-[14px] px-2">
          <Collapse in={open} timeout="auto" unmountOnExit>
            {date}
          </Collapse>
        </td>
        <td className="text-[14px]">
          <Collapse in={open} timeout="auto" unmountOnExit>
            {speaker}
          </Collapse>
        </td >
      </TableRow >
    </>
  );
};
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
    <section className=" w-full min-w-full h-[284px] md:h-[320px] max-h-[284px] md:max-h-[320px] overflow-hidden  relative">
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
        <section className=" w-full min-wfull h-[284px] md:h-[320px] relative">
          <img src={SlideOne} alt="slide-1" className="absolute top-0 left-0 w-full h-full object-cover z-10 no-repeat" />
        </section>
        <section className=" w-full min-wfull h-[284px] md:h-[320px] relative">
          <img src={SlideTwo} alt="slide-2" className="absolute top-0 left-0 w-full h-full object-cover z-1" />
        </section>
        <section className=" w-full min-wfull h-[284px] md:h-[320px] relative">
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
      <span className="text-[10px] leading-[120%] !text-[#10b981]">+{change.toFixed(1)}%</span>
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