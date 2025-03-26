import { Sparklines, SparklinesLine, SparklinesReferenceLine } from "react-sparklines"

export default function ChartCard ( {dataArray, title, color}) { 
  return ( 
    <div className="m-5 card bg-secondary text-white " style={{width: '55rem'}}>
      <div className="card-header">
        <div className="card-body">
        <h3 className="card-title text-center m-3">{title} </h3>
        <Sparklines data={dataArray}>  
            <SparklinesLine color={color}  />
            <SparklinesReferenceLine type='mean' /> 
          </Sparklines>
        </div>
      </div>
    </div>
  )
}
