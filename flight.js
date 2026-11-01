// Positions are percentages of the arena, so pace is consistent across screens.
export const FLIGHT_SPEED=26;
export const STEER_SPEED=66;
export const FLIGHT_START_DELAY=.9;

export function stepFlight(state,dt){
  const time=Math.max(0,dt);
  const flightTime=Math.max(0,time-(state.flightDelay||0));
  const delay=Math.max(0,(state.flightDelay||0)-time);
  let {x,vx}=state;
  if(state.pointer===null){
    const desired=state.pressed*STEER_SPEED;
    // Exact exponential damping keeps steering consistent at different frame rates.
    const decay=Math.exp(-12*time);
    x+=desired*time+(vx-desired)*(1-decay)/12;
    vx=desired+(vx-desired)*decay;
    x=Math.max(7,Math.min(93,x));
  }
  return {x,vx,y:state.y-FLIGHT_SPEED*flightTime,flightDelay:delay};
}

export function flightCollision(x,previousY,y,clouds){
  return clouds.find(c=>previousY>=c.y&&y<=c.y&&Math.abs(x-c.x)<=c.halfWidth)?.answer??null;
}
