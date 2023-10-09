import {useRef, useEffect} from "react";
import {useDispatch} from "react-redux";
import {Form, Button, FormControl} from "react-bootstrap";

import {addToNewsletter} from "../../store/utils/thunks";
import {showToast} from "./tool";
import {clearNewsletter} from "../../store/reducers/users";

const NewsLetter = () => {
  const textInput = useRef();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    //avoid page refresh
    e.preventDefault();
    const value = textInput.current.value;

    dispatch(addToNewsletter({email: value}))
      .unwrap()
      .then((data) => {
        console.log("data", data.newsletter);
        if (data.newsletter === "added") {
          textInput.current.value = "";
          showToast("success", `Thanks for subscribing`);
        }
        if (data.newsletter === "failed") {
          textInput.current.value = "";
          showToast("error", `You are already subscribed`);
        }
      });
  };

  useEffect(() => {
    return () => {
      dispatch(clearNewsletter());
    };
  }, [dispatch]);

  return (
    <div className="newsletter_container">
      <h1>Join out newsletter</h1>
      <div className="form">
        <Form className="mt-4" onSubmit={handleSubmit}>
          <Form.Group>
            <FormControl
              type="text"
              placeholder="EXAMPLE: youremail@gmail.com"
              name="email"
              ref={textInput}
            />
          </Form.Group>
          <Button className="mt-2" variant="primary" type="submit">
            Add me to the list
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default NewsLetter;
