import Form from 'next/form'
import { CgSearchLoading } from 'react-icons/cg'

const Search = () => {
  return (
    <section className="flex lg:flex-row flex-col justify-between gap-1.5 px-10 items-center">
      {/* title segment of search component for decstop view */}
      <h3 className="hidden lg:block font-bold text-size5 text-black">
        All Offers from McDonald’s East London
      </h3>

      {/* serch bar */}
      <Form
        action="/menu"
        className="p-4 border-[1px] border-txt2 rounded-4xl flex justify-start gap-3.5 items-center flex-row-reverse"
      >
        <input
          name="search"
          className="font-semibold text-txt2 text-size3 outline-0 focus:outline-0 border-0 focus:border-0 focus:bg-transparent bg-transparent placeholder:font-semibold placeholder:text-txt2 placeholder:text-size3"
          placeholder="Search from menu..."
        />
        <button type="submit" className="cursor-pointer">
          <CgSearchLoading />
        </button>
      </Form>
      {/* title segment of search component for mobile view */}
      <h4 className="font-semibold text-black text-size3 lg:hidden text-center my-4">
        Order from Tandoori Pizza London
      </h4>
    </section>
  )
}

export default Search
