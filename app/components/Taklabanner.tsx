const Taklabanner = () => {
  return (
    <div>
      <div
        style={{
          backgroundImage: "url('/taklapc.png')"
        }}
        className="lg:block hidden h-[680px] bg-no-repeat bg-cover bg-center"
      />
      <div
        style={{
          backgroundImage: "url('/taklamobile.png')"
        }}
        className="lg:hidden block h-[520px] bg-no-repeat bg-cover bg-center rounded-2xl"
      />
    </div>
  )
}

export default Taklabanner
