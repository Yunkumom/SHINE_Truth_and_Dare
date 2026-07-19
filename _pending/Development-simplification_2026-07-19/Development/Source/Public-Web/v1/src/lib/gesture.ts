import type {DragVector} from '../types'; export type ReleaseAction='draw'|'next'|'previous'|'snap'
export function releaseAction(revealed:boolean,d:DragVector):ReleaseAction{const distance=Math.hypot(d.x,d.y);if(!revealed)return distance>=58?'draw':'snap';if(distance>=68||(d.speed>=.65&&distance>=30))return d.x<0?'previous':'next';return 'snap'}
