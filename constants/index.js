export const navLinks = [
    {
        label: "Home",
        route: "/",
        icon: "/assets/home.png",
    },
    {
      label: "Image Restore",
      route: "/transformation/add/restore",
      icon: "/assets/image.png",
    },
    {
      label: "Generate",
      route: "/transformation/add/fill",
      icon: "/assets/chip.png",
    },
    {
      label: "Object Remove",
      route: "/transformation/add/remove",
      icon: "/assets/scan.png",
    },
    {
      label: "Object Recolor",
      route: "/transformation/add/recolor",
      icon: "/assets/adjustments.png",
    },
    {
      label: "BG Remove",
      route: "/transformation/add/removeBackground",
      icon: "/assets/camera.png",
    },
    {
      label: "Profile",
      route: "/profile",
      icon: "/assets/profile.png",
    },
    {
      label: "Buy Credits",
      route: "/credits",
      icon: "/assets/Home.png",
    },
  ];
  

  export const transformationTypes = {
    restore: {
      type: "restore",
      title: "Restore Image",
      subTitle: "Refine images by removing noise and imperfections",
      config: { restore: true },
      icon: "image.svg",
    },
    removeBackground: {
      type: "removeBackground",
      title: "Background Remove",
      subTitle: "Removes the background of the image using AI",
      config: { removeBackground: true },
      icon: "camera.svg",
    },
    fill: {
      type: "fill",
      title: "Generative Fill",
      subTitle: "Enhance an image's dimensions using AI outpainting",
      config: { fillBackground: true },
      icon: "stars.svg",
    },
    remove: {
      type: "remove",
      title: "Object Remove",
      subTitle: "Identify and eliminate objects from images",
      config: {
        remove: { prompt: "", removeShadow: true, multiple: true },
      },
      icon: "scan.svg",
    },
    recolor: {
      type: "recolor",
      title: "Object Recolor",
      subTitle: "Identify and recolor objects from the image",
      config: {
        recolor: { prompt: "", to: "", multiple: true },
      },
      icon: "filter.svg",
    },
  };
  export const aspectRatioOptions = {
    "1:1": {
      aspectRatio: "1:1",
      label: "Square (1:1)",
      width: 1000,
      height: 1000,
    },
    "3:4": {
      aspectRatio: "3:4",
      label: "Standard Portrait (3:4)",
      width: 1000,
      height: 1334,
    },
    "9:16": {
      aspectRatio: "9:16",
      label: "Phone Portrait (9:16)",
      width: 1000,
      height: 1778,
    },
  };

export const defaultValues = {
  title: '',
  aspectRatio: '',
  color:'',
  prompt:'',
  publicId:'',
}