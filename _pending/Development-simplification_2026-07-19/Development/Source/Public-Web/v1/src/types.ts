export type Language='zh'|'en'|'bilingual'; export type Mode='truth'|'dare'|'random'; export type Level=1|2|3|4|5
export interface Card {id:string;level:Level;mode:'truth'|'dare';titleZh:string;titleEn:string;questionZh:string;questionEn:string;blessingZh:string;blessingEn:string;image:string;region?:'Taiwan'|'Australia';attribution?:string;sourceUrl?:string;visualRestrictions?:string}
export type InteractionPhase='idle'|'dragging'|'drawing'|'revealed'|'changing'; export interface DragVector{x:number;y:number;speed:number}
