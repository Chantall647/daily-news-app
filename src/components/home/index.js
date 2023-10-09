import React, {useEffect} from "react";

import NewsLetter from "../utils/Newsletter";
import HomePosts from "./homePosts";

const Home = () => {
  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      console.log("YOLO", e.key);
    });
  }, []);

  return (
    <div>
      <HomePosts />
      <NewsLetter />
    </div>
  );
};

export default Home;
