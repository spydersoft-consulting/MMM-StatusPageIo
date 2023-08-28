export interface DataConfig {
  pageId: string;
  componentsToIgnore: string[];
  updateInterval: number;
}

export const isDataConfig = (obj: unknown): boolean => {
  if (typeof obj === "object" && obj) {
    return "pageId" in obj && "updateInterval" in obj && "componentsToIgnore" in obj;
  }
  return false;
};

export interface AppearanceConfig {
  useHeader: boolean;
  headerText?: string;
  maxWidth?: string;
  animationSpeed?: number;
  initialLoadDelay?: number;
  showComponents: boolean;
}

export interface Config extends DataConfig, AppearanceConfig {}
