import Carousel from 'react-bootstrap/Carousel';

interface IImageCarouselProps {
  images: string[];
}

export const ImageCarousel = ({ images }: IImageCarouselProps) => (
  <Carousel>
    {
      images.map((image) => (
        <Carousel.Item key={image}>
          <img
            height="500"
            width="auto"
            className="d-block mx-auto"
            src={image}
          />
        </Carousel.Item>
      ))
    }
  </Carousel>
);
