declare module "h5p-standalone" {
  export type H5PDataType = "state" | string;

  export interface H5PContentUserDataItem {
    dataType: H5PDataType;
    subContentId?: string | "*";
    previousState?: string | null;
    data?: string;
  }

  export interface H5PAjaxOptions {
    setFinishedUrl?: string;
    contentUserDataUrl?: string;
  }

  export interface H5PUser {
    name: string;
    mail: string;
  }

  export interface H5POptions {
    id?: string;
    h5pJsonPath: string;

    // falls content.json nicht im gleichen Ordner liegt:
    contentJsonPath?: string;
    librariesPath?: string;

    frameJs: string;
    frameCss: string;

    saveFreq?: number | false;
    contentUserData?: H5PContentUserDataItem[];

    ajax?: H5PAjaxOptions;
    user?: H5PUser;

    // weitere Optionen:
    [key: string]: unknown;
  }

  //best guess according to documentation
  export type H5PPlayerInstance = unknown;
  export const H5P: {
    new (el: HTMLElement, options: H5POptions): Promise<H5PPlayerInstance>;
  };
}
