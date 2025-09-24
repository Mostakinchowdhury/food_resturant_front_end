import { FaMapMarkerAlt } from 'react-icons/fa'
import { IoTime } from 'react-icons/io5'
import { MdContactPhone } from 'react-icons/md'
const Contact = () => {
  return (
    <section className="flex flex-col lg:flex-row lg:justify-between items-stretch justify-stretch rounded-lg md:rounded-xl bg-[#FBFBFB] shadow-box overflow-hidden">
      {/* div number 1 */}
      <div className="flex flex-col gap-3 justify-start items-start basis-1/3 grow py-8 px-2.5 lg:px-8 lg:py-10">
        {/* heading */}
        <h3 className="font-bold text-txt2 text-xl text-size5 mb-4 flex justify-center items-center gap-3">
          <FaMapMarkerAlt /> <p>Delivery information</p>
        </h3>
        <p className="font-normal lg:text-size3 text-sizehalf">
          <span className="font-bold text-sizehalf text-black md:text-size3">Monday</span>: 12:00
          AM–3:00 AM, 8:00 AM–3:00 AM
        </p>
        <p className="font-normal lg:text-size3 text-sizehalf">
          <span className="font-bold text-sizehalf text-black md:text-size3">Tuesday</span>: 8:00
          AM–3:00 AM
        </p>
        <p className="font-normal lg:text-size3 text-sizehalf">
          <span className="font-bold text-sizehalf text-black md:text-size3">Wednesday</span>: 8:00
          AM–3:00 AM
        </p>
        <p className="font-normal lg:text-size3 text-sizehalf">
          <span className="font-bold text-sizehalf text-black md:text-size3">Thursday</span>: 8:00
          AM–3:00 AM
        </p>
        <p className="font-normal lg:text-size3 text-sizehalf">
          <span className="font-bold text-sizehalf text-black md:text-size3">Friday:</span>8:00
          AM–3:00 AM
        </p>
        <p className="font-normal lg:text-size3 text-sizehalf">
          <span className="font-bold text-sizehalf text-black md:text-size3">Saturday:</span> 8:00
          AM–3:00 AM
        </p>
        <p className="font-normal lg:text-size3 text-sizehalf">
          <span className="font-bold text-sizehalf text-black md:text-size3">Sunday:</span> 8:00
          AM–12:00 AM
        </p>
        <p className="font-normal lg:text-size3 text-sizehalf">
          <span className="font-bold text-sizehalf text-black md:text-size3">
            Estimated time until delivery:{' '}
          </span>
          20 min
        </p>
      </div>
      {/* div number 2 */}
      <div className="flex flex-col gap-3 justify-start items-start basis-1/3 grow py-8 px-2.5 lg:px-8 lg:py-10">
        {/* heading */}
        <h3 className="font-bold text-txt2 text-xl text-size5 mb-4 flex justify-center items-center gap-3">
          <MdContactPhone /> <p>Contact information</p>
        </h3>
        {/* paragraf */}
        <p className="font-normal text-black text-xl lg:text-size3">
          If you have allergies or other dietary restrictions, please contact the restaurant. The
          restaurant will provide food-specific information upon request.
        </p>
        <h3 className="font-bold text-xl lg:text-size3 text-txt">Phone number</h3>
        <p className="font-normal text-black text-xl lg:text-size3">+934443-43</p>
        <h3 className="font-bold text-xl lg:text-size3 text-txt">Website</h3>
        <p className="font-normal text-black text-xl lg:text-size3">http://mcdonalds.uk/</p>
      </div>
      {/* div number 3 */}
      <div className="flex flex-col gap-3 justify-start items-start bg-txt2 basis-1/3 grow py-8 px-2.5 lg:px-8 lg:py-10">
        {/* heading */}
        <h3 className="font-bold text-white text-xl text-size5 mb-4 flex gap-3 justify-center items-center">
          <IoTime size={45} /> <p>Contact information</p>
        </h3>
        <p className="font-normal lg:text-size3 text-sizehalf">
          <span className="font-bold text-size2 text-white">Monday:</span> 12:00 AM–3:00 AM, 8:00
          AM–3:00 AM
        </p>
        <p className="font-normal text-size2 text-white">
          <span className="font-bold text-size2 text-white">Tuesday</span>: 8:00 AM–3:00 AM
        </p>
        <p className="font-normal text-size2 text-white">
          <span className="font-bold text-size2 text-white">Wednesday</span>: 8:00 AM–3:00 AM
        </p>
        <p className="font-normal text-size2 text-white">
          <span className="font-bold text-size2 text-white">Thursday</span>: 8:00 AM–3:00 AM
        </p>
        <p className="font-normal text-size2 text-white">
          <span className="font-bold text-size2 text-white">Friday:</span>8:00 AM–3:00 AM
        </p>
        <p className="font-normal text-size2 text-white">
          <span className="font-bold text-size2 text-white">Saturday:</span> 8:00 AM–3:00 AM
        </p>
        <p className="font-normal text-size2 text-white">
          <span className="font-bold text-size2 text-white">Sunday:</span> 8:00 AM–12:00 AM
        </p>
      </div>
    </section>
  )
}

export default Contact
