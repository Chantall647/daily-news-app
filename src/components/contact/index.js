import {useFormik} from "formik";
import * as Yup from "yup";
import {Alert} from "react-bootstrap";
import {useDispatch} from "react-redux";

import {sendMessages} from "../../store/utils/thunks";
import LoadingSpinner from "../utils/LoadingSpinner";
import {showToast} from "../utils/tool";

const Contact = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
      firstName: "",
      lastName: "",
      message: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Required").email("Invalid email address"),
      firstName: Yup.string().required("Sorry, the first name is required"),
      lastName: Yup.string().required("Sorry, the last name is required"),
      message: Yup.string()
        .required("Sorry, the message is required")
        .max(500, "Sorry, the message is too long"),
    }),
    onSubmit: (values, {setSubmitting, resetForm}) => {
      setSubmitting(true);
      dispatch(sendMessages(values))
        .unwrap()
        .then((response) => {
          if (response) {
            showToast("success", "We will contact you soon");
            resetForm();
            setSubmitting(false);
          }
        })
        .catch((err) => {
          showToast("error", "Sorry, something went wrong");
          setSubmitting(false);
        });
    },
  });
  return (
    <div>
      <h1>Contact us</h1>
      <form className="mt-3" onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            className="form-control"
            id="email"
            type="email"
            placeholder="Enter email"
            name="email"
            {...formik.getFieldProps("email")}
          />
          {formik.errors.email && formik.touched.email ? (
            <Alert variant="danger">{formik.errors.email}</Alert>
          ) : null}
        </div>
        <div className="form-group mt-2">
          <label htmlFor="name">First name</label>
          <input
            className="form-control"
            id="firstName"
            type="firstName"
            placeholder="Enter your first name"
            name="firstName"
            {...formik.getFieldProps("firstName")}
          />
          {formik.errors.firstName && formik.touched.firstName ? (
            <Alert variant="danger">{formik.errors.firstName}</Alert>
          ) : null}
        </div>
        <div className="form-group mt-2">
          <label htmlFor="name">Last name</label>
          <input
            className="form-control"
            id="lastName"
            type="lastName"
            placeholder="Enter your last name"
            name="lastName"
            {...formik.getFieldProps("lastName")}
          />
          {formik.errors.lastName && formik.touched.lastName ? (
            <Alert variant="danger">{formik.errors.lastName}</Alert>
          ) : null}
        </div>
        <div className="form-group mt-2">
          <label htmlFor="name">Message</label>
          <textarea
            className="form-control"
            id="message"
            type="message"
            placeholder="Enter your message"
            name="message"
            {...formik.getFieldProps("message")}
          />
          {formik.errors.message && formik.touched.message ? (
            <Alert variant="danger">{formik.errors.message}</Alert>
          ) : null}
        </div>
        <button type="submit" className="btn btn-primary mt-2">
          {formik.isSubmitting ? <LoadingSpinner /> : "Send message"}
        </button>
      </form>
    </div>
  );
};

export default Contact;
