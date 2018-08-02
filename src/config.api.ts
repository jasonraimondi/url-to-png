export interface IConfigAPI {
  width?: number;
  height?: number;
  viewPortWidth?: number;
  viewPortHeight?: number;
  isMobile?: boolean;
  isFullPage?: boolean;
}

export class ConfigApi implements IConfigAPI {
  public readonly url: string;
  public readonly forceReload?: boolean;
  public readonly width?: number;
  public readonly height?: number;
  public readonly viewPortHeight?: number;
  public readonly viewPortWidth?: number;
  public readonly isMobile?: boolean;
  public readonly isFullPage?: boolean;
}
