export function checktype(url: string) {
  const copy_url = url;
  const index = copy_url.lastIndexOf('.');
  const ext = copy_url.slice(index + 1);

  switch (ext) {
    case 'jpeg':
      return 'image';
    case 'png':
      return 'image';
    case 'jpg':
      return 'image';
    case 'gif':
      return 'image';
    case 'avif':
      return 'image';
    case 'mp4':
      return 'video';
    case 'mov':
      return 'video';
    case 'webm':
      return 'video';
    default:
      return '';
  }
}
