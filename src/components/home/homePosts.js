import {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import Masonry from "react-masonry-css";
import {Button, Spinner} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import Moment from "react-moment";

import {fetchPosts} from "../../store/utils/thunks";

const HomePosts = () => {
  const homePosts = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  const renderPosts = () => {
    return homePosts.articles.items.map((item) => (
      <div key={item.id}>
        <img
          style={{width: "100%", height: "200px"}}
          src={`${item.image}?${item.id}`}
          alt="some pic"
        />
        <div className="author">
          <span>{item.author} -</span>
          <Moment format="DD MMMM">{item.createdAt}</Moment>
        </div>
        <div className="content">
          <div className="title">{item.title}</div>
          <div className="excerpt">{item.excerpt}</div>
          <LinkContainer to={`/article/${item.id}`} className="mt-3">
            <Button variant="light">Read more</Button>
          </LinkContainer>
        </div>
      </div>
    ));
  };

  const loadMorePosts = () => {
    dispatch(
      fetchPosts({page: homePosts.articles.page + 1, order: "desc", limit: 6})
    );
  };

  useEffect(() => {
    if (homePosts.articles.items.length <= 0) {
      dispatch(fetchPosts({page: 1, order: "desc", limit: 6}));
    }
  }, [dispatch, homePosts.articles.items.length]);

  return (
    <>
      <Masonry
        breakpointCols={{default: 3, 800: 2, 400: 1}}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {homePosts.articles ? renderPosts() : null}
      </Masonry>
      {homePosts.loading ? (
        <div style={{textAlign: "center"}}>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : null}
      {!homePosts.articles.end && !homePosts.loading ? (
        <Button
          variant="outline-dark posts"
          onClick={() => {
            // loadMorePosts();
            console.log("TAP");
          }}
        >
          Load more posts
        </Button>
      ) : null}
    </>
  );
};

export default HomePosts;
