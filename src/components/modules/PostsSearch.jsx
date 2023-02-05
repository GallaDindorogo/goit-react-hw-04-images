import { useState, useEffect } from 'react';

import styles from './postsSearch.module.scss';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import LoadMoreBtn from '../shared/Button/Button';
import Loader from '../shared/Loader/Loader';
import Modal from '../shared/Modal/Modal';
import ModalImg from './ModalImg/ModalImg';

import fetchImg from '../shared/services/api';

const PostSearch = () => {
  const [search, setSearch] = useState('');
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalImg, setModalImg] = useState(null);

  useEffect(() => {
    if (search) {
      const getImg = async () => {
        try {
          setIsLoading(true);
          const data = await fetchImg(search, page);
          setItems(prevItems => [...prevItems, ...data.hits]);
          setTotalHits(data.totalHits);
        } catch (error) {
          setError(error.message);
        } finally {
          setIsLoading(false);
        }
      };
      getImg();
    }
  }, [search, page]);

  const searchImg = ({ search }) => {
    setSearch(search);
    setItems([]);
    setPage(1);
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const openModal = largeImageURL => {
    setModalImg(largeImageURL);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalImg(null);
  };

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
};

export default PostSearch;

PostSearch.defaultProps = {
  items: [],
};
