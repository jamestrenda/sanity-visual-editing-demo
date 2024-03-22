const Stripes = () => {
  return (
    <div className="grid grid-cols-12 grid-rows-10 -skew-y-6 absolute bottom-0 origin-[0] w-full h-[40vw] ml-0 1mb-[25vw] md:-mb-[24vw] md:-skew-y-12 first:-mb-[24vw] first:md:-mb-[15.5vw] md:h-[48vw] pointer-events-none">
      <div className="stripes-bg"></div>
      <span className="col-start-1 col-span-1 row-start-1 row-span-1 border-solid border-2 border-l-0"></span>
      <span className="col-start-3 col-span-3 row-start-4 bg-secondary-yellow-500"></span>
      <span className="col-span-2 row-start-5 bg-secondary-green-500"></span>
      <span className="col-start-11 col-span-2 row-start-5 bg-secondary-green-500"></span>
      <span className="col-start-8 col-span-3 row-start-6 bg-secondary-yellow-500"></span>
      <span className="col-start-10 col-span-3 row-start-9 bg-secondary-green-500"></span>
      <span className="col-start-11 col-span-2 row-start-10 bg-primary-orange-500"></span>
    </div>
  )
}

export default Stripes
