export default function SearchBar ()  { 
  return ( 
    <div>
    <div className="container">
    <div className="row mt-4 d-flex align-items-center">
      <input
        type="text"
        placeholder="Get your five-day forecast"
        className="col-md-10 mx-2"
      />
      <button className="btn btn-primary btn-sm col-md-1">Search</button>
    </div>
  </div></div>
  )
}