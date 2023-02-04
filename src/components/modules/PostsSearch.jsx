import { Component } from 'react';

import styles from './postsSearch.module.scss';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import LoadMoreBtn from '../shared/Button/Button';
import Loader from '../shared/Loader/Loader';
import Modal from '../shared/Modal/Modal';
import ModalImg from './ModalImg/ModalImg';

import fetchImg from '../shared/services/api';

class PostSearch extends Component {
  state = {
    search: '',
    items: [],
    isLoading: false,
    error: null,
    page: 1,
    showModal: false,
    modalImg: null,
    totalHits: 0,
  };

  componentDidUpdate(prevProps, prevState) {
    const { search, page } = this.state;
    if (prevState.search !== search || prevState.page !== page) {
      this.getImg();
    }
  }

  searchImg = ({ search }) => {
    this.setState({ search, items: [], page: 1 });
  };

  getImg = () => {
    const { search, page } = this.state;
    this.setState({ isLoading: true });
    fetchImg(search, page)
      .then(({ hits, totalHits }) => {
        this.setState(prevState => ({
          items: [...prevState.items, ...hits],
          totalHits: totalHits,
        }));
      })
      .catch(error => this.setState({ error: error.message }))
      .finally(() => this.setState({ isLoading: false }));
  };

  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  openModal = ({ largeImageURL }) => {
    this.setState({
      modalImg: {
        largeImageURL,
      },
      showModal: true,
    });
  };

  closeModal = () => {
    this.setState({ showModal: false, modalImg: null });
  };

  render() {
    const { items, isLoading, error, showModal, modalImg, totalHits } =
      this.state;
    const { searchImg, loadMore, openModal, closeModal } = this;
    return (
      <div className={styles.App}>
        <Searchbar onSubmit={searchImg} />
        {isLoading && <Loader />}
        <ImageGallery items={items} openModal={openModal} />
        {Boolean(totalHits) && totalHits !== items.length && !isLoading && (
          <LoadMoreBtn type="button" onClick={loadMore} />
        )}
        {error && <p>{error}</p>}
        {showModal && (
          <Modal close={closeModal}>
            <ModalImg {...modalImg} />
          </Modal>
        )}
      </div>
    );
  }
}

export default PostSearch;

PostSearch.defaultProps = {
  items: [],
};
