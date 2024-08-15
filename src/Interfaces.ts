export interface IBounds {
  x: number;
  y: number;
  width: number;
  height: number;
  cellId?: number;
  [x: string | symbol]: unknown;
}
export interface IPoint {
  x: number;
  y: number;
}
