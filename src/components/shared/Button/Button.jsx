import PropTypes from 'prop-types';

import styles from './button.module.scss';

const LoadMoreBtn = ({ onClick, type }) => {
  return (
    <div className={styles.ButtonContainer} onClick={onClick}>
      <button type="button" className={styles.Button}>
        Load more
      </button>
    </div>
  );
};

export default LoadMoreBtn;

LoadMoreBtn.propTypes = {
  onClick: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['button', 'submit', 'reset']).isRequired,
};
