import PropTypes from 'prop-types';
import styles from './imageGalleryItem.module.scss';

const ImageGalleryItem = ({ id, webformatURL }) => {
  return (
    <li className={styles.item}>
      <img className={styles.image} src={webformatURL} alt={id} />
    </li>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  webformatURL: PropTypes.string.isRequired,
};
