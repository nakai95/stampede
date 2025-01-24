import { Canvas, Image, SkImage } from "@shopify/react-native-skia";

type Props = {
  imgSource: SkImage;
  selectedImage?: SkImage;
};

export default function ImageViewer({ imgSource, selectedImage }: Props) {
  const imageSource = selectedImage || imgSource;

  return <Image image={imageSource} x={0} y={0} width={320} height={440} />;
}
