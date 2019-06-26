import { FilesystemDirectory, Plugins, FilesystemEncoding } from '@capacitor/core';
const { Filesystem } = Plugins;

export const writeBlobToFile = (to, data: Blob) => {

  convertBlobToBase64(data).then((str: string) => {
    Filesystem.writeFile({
      data: str,
      path: to,
      directory: FilesystemDirectory.Data,
    });
  });
};

const convertBlobToBase64 = blob => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onloadend = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });
};

export const writeJsonToFile = (to, data) => {
  Filesystem.writeFile({
    data,
    path: to,
    directory: FilesystemDirectory.Data,
    encoding: FilesystemEncoding.UTF8,
  });
};

export const convertF = (webview): Promise<string> => {
  return new Promise(resolve => {
    Filesystem.getUri({
      directory: FilesystemDirectory.Data,
      path: 'EN-1.mp3',
    }).then(res => {
      resolve(webview.convertFileSrc(res.uri));
    });
  });
};
