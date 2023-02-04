import PropTypes from 'prop-types';
import styles from './modalImg.module.scss';

const ModalImg = ({ largeImageURL, tags }) => {
  return (
    <div className={styles.ImgContainer}>
      <img className={styles.Img} src={largeImageURL} alt={tags}></img>
    </div>
  );
};

export default ModalImg;

ModalImg.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string,
};
