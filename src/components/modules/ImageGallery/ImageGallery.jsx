import PropTypes from 'prop-types';
import styles from './imageGallery.module.scss';

const ImageGallery = ({ items, openModal }) => {
  const elements = items.map(({ id, webformatURL, tags, largeImageURL }) => {
    return (
      <li
        onClick={() => {
          openModal({ largeImageURL });
        }}
        key={id}
        className={styles.ImageGalleryItem}
      >
        <img
          className={styles.ImageGalleryItemImage}
          src={webformatURL}
          alt={tags}
        />
      </li>
    );
  });
  return <ul className={styles.ImageGallery}>{elements}</ul>;
};

export default ImageGallery;

ImageGallery.defaultProps = {
  items: [],
};

ImageGallery.propTypes = {
  openModal: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ),
};
