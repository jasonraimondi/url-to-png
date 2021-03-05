import { IsBooleanString, IsNumberString, IsOptional, IsUrl } from "class-validator";

export interface IConfigAPI {
  width?: number;
  height?: number;
  viewPortWidth?: number;
  viewPortHeight?: number;
  isMobile?: boolean;
  isFullPage?: boolean;
  isDarkMode?: boolean;
  deviceScaleFactor?: number;
}

export class ConfigApi implements IConfigAPI {
  @IsUrl()
  public readonly url: string;

  @IsOptional()
  @IsBooleanString()
  public readonly forceReload?: boolean;

  @IsOptional()
  @IsNumberString()
  public readonly width?: number;

  @IsOptional()
  @IsNumberString()
  public readonly height?: number;

  @IsOptional()
  @IsNumberString()
  public readonly viewPortHeight?: number;

  @IsOptional()
  @IsNumberString()
  public readonly viewPortWidth?: number;

  @IsOptional()
  @IsBooleanString()
  public readonly isMobile?: boolean;

  @IsOptional()
  @IsBooleanString()
  public readonly isFullPage?: boolean;

  @IsOptional()
  @IsBooleanString()
  public readonly isDarkMode?: boolean;

  @IsOptional()
  @IsNumberString()
  public readonly deviceScaleFactor?: number;
}
