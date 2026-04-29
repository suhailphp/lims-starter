import 'yet-another-react-lightbox/styles.css';
import { Lightbox as YetAnotherLightbox } from 'yet-another-react-lightbox';
import type { Slide } from 'yet-another-react-lightbox';
import Video from 'yet-another-react-lightbox/plugins/video';

interface LightboxProps {
  open?: boolean;
  close?: () => void;
  slides?: Slide[];
  index?: number;
}

const Lightbox = ({ open, close, slides, index }: LightboxProps) => {
  return (
    <>
      {open && (
        <YetAnotherLightbox
          open={open}
          close={() => close?.()}
          slides={slides || []}
          index={index || 0}
          plugins={[Video]}
        />
      )}
    </>
  );
};

export default Lightbox;
