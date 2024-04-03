const getWindowDimension = () => {
  const width =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
  const height =
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight;
  return { width, height };
};

const DeviceWidthObject = {
  MobileSmall: { max: 320, min: 0 },
  MobileMedium: { max: 375, min: 321 },
  MobileLarge: { max: 767, min: 376 },
  Tablet: { max: 991, min: 768 },
  LaptopSmall: { max: 1024, min: 992 },
  LaptopLarge: { max: 1440, min: 1025 },
  LargerThanLaptop: { max: 2560, min: 1441 },
  LargeScreenMax: { max: 999999, min: 2561 },
};
const IdDeviceBreakpointsByWidth = {
  laptop_max: 1440,
  laptop_min: 992,
  tablet_min: 768,
  tablet_max: 991,
  mobile_max: 767,
  default_min: 768, // Unrecognized device
};
const IdMobileHeight = {
  mobileLandscape_min: 320,
  mobileLandscape_max: 425,
};

export {
  getWindowDimension,
  DeviceWidthObject,
  IdDeviceBreakpointsByWidth,
  IdMobileHeight,
};
