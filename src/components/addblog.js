import React from "react";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Axios from "axios";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import RichEditor from "./editor";
import { Editor, EditorState, convertFromRaw, convertToRaw } from "draft-js";

const AddBlog = (props) => {
  document.title = "ExamWiz-AddBlog";
  let currentDate = new Date(); //use your date here
  let cDate = currentDate.toLocaleDateString("en-US");

  const [tresponse, setTresponse] = useState("");
  const [response, setResponse] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies(["uToken"]);
  const [isLoading, setIsloading] = useState(false);
  const [udata, setUdata] = useState({
    heading: "",
    bimg: "",
    subheading: "",
    contents: "",
    fb: "",
    insta: "",
    linked: "",
    author: "",
    tags: "",
    date: cDate,
  });

  const handlesubmit = (e) => {
    e.preventDefault();
    // setIsloading(true);
    udata.contents == "null" &&
      toast((t) => (
        <span className="fw-bold d-flex align-items-center gap-2">
          <i className="fa fa-exclamation-triangle text-warning fs-3"></i> Add Content
        </span>
      ));
    udata.contents == "" &&
      toast((t) => (
        <span className="fw-bold d-flex align-items-center gap-2">
          <i className="fa fa-exclamation-triangle text-warning fs-3"></i> Add Content
        </span>
      ));

    if (udata.contents !== "" || udata.contents !== "null") {
      console.log(udata.contents);
      const FD = new FormData();
      let stringDat = JSON.stringify(udata);
      // console.log(JSON.parse(stringDat));
      FD.append("data", stringDat);
      console.log([...FD.entries()]);

      Axios.post(`https://blogproapi.000webhostapp.com/apiPhp/myFiles/uploadFile.php?blog=1&token=` + cookies.uToken, FD)
        .then((response) => {
          console.log(response);
          // setResponse(response.data.statusText);
          // setCookie("uToken", response.data.rtoken.token, { path: "/" });
          // props.udata(response.data.userData);
          // setUdata({ course: "", batch: "" });
          // e.target.FileUp.value = "";
          setIsloading(false);
          toast.success("Blog Added");
        })
        .catch((error) => {
          console.log(error);
          setResponse(error.message);
          setIsloading(false);
        });
    }
  };
  // useEffect =
  //   (() => {
  //     const content = window.localStorage.getItem("contents");
  //     setEditorState();
  //     //     if (content !== "") {
  //     //       console.log(content);
  //     //       EditorState.createWithContent(convertFromRaw(JSON.parse(content)));
  //     //     } else {
  //     //       EditorState.createEmpty();
  //     //     }
  //   },
  //   []);

  return (
    <motion.div
      className="card"
      style={{ background: "transparent", border: "none" }}
      initial={{ top: "-100%" }}
      animate={{ top: "auto" }}
      transition={{
        type: "spring",
        stiffness: 100,
        delay: 0,
        duration: 0.5,
      }}
    >
      {/* {console.log(convertToRaw(editorState.getCurrentContent()))} */}
      <div className="d-flex h-100 align-items-center justify-content-center">
        <Toaster />
        {isLoading && (
          <div className="position-absolute top-50 start-50 translate-middle" style={{ backgroundColor: "rgba(0,0,0,0.5)", height: "100%", width: "100%", zIndex: "98" }}>
            <img src="dogcur.gif" className="spinner display-1 position-absolute top-50 start-50 translate-middle" />
          </div>
        )}

        <form id="uform" onSubmit={handlesubmit} className="row g-3 w-100 ms-auto p-4 my-5 text-light rounded" style={{ background: "#36393f" }}>
          <div className="d-flex justify-content-between align-items-center">
            <h3 className="fw-bold">Add Blog</h3>
            <button
              type="button"
              onClick={() =>
                toast((t) => (
                  <span>
                    <b>Log Out? </b>
                    <a
                      className="btn bg-info text-light  mx-2"
                      onClick={() => {
                        removeCookie("uToken");
                        toast.dismiss(t.id);
                      }}
                    >
                      <i className="fa-solid fa-check"></i>
                    </a>
                    <a className="btn bg-dark text-light" onClick={() => toast.dismiss(t.id)}>
                      <i className="fa-solid fa-xmark"></i>
                    </a>
                  </span>
                ))
              }
              className="btn bg-dark text-light text-center fs-5 rounded"
            >
              <i className="fa-solid fa-right-from-bracket p-2"></i>
            </button>
          </div>
          {tresponse.length !== 0 && <p className="fw-bold text-info">{tresponse}</p>}
          <hr />
          <div className="col-12 col-md-6">
            <label for="Heading" className="form-label d-block">
              Heading
            </label>
            <input
              type="text"
              className="form-text bg-dark text-light border-0 p-3 w-100"
              id="Heading"
              name="Heading"
              value={udata.heading}
              onChange={(e) =>
                e.target.value == ""
                  ? toast((t) => (
                      <span className="fw-bold d-flex align-items-center gap-2">
                        <i className="fa fa-exclamation-triangle text-warning fs-3"></i> Add Heading
                      </span>
                    ))
                  : setUdata({ ...udata, heading: e.target.value })
              }
              required
            />
          </div>
          <div className="col-12 col-md-6">
            <label for="SubHeading" className="form-label d-block">
              Sub-Heading
            </label>
            <input
              type="text"
              className="form-text bg-dark text-light border-0 p-3 w-100"
              id="SubHeading"
              name="SubHeading"
              value={udata.subheading}
              onChange={(e) =>
                e.target.value == ""
                  ? toast((t) => (
                      <span className="fw-bold d-flex align-items-center gap-2">
                        <i className="fa fa-exclamation-triangle text-warning fs-3"></i> Add a Subheading
                      </span>
                    ))
                  : setUdata({ ...udata, subheading: e.target.value })
              }
              required
            />
          </div>
          <div className="col-12">
            <label for="bimg" className="form-label d-block">
              Blog Image <i className="fa fa-link ps-1 text-info"></i>
            </label>
            <input
              type="text"
              className="form-text bg-dark text-light border-0 p-3 w-100"
              id="bimg"
              name="bimg"
              value={udata.bimg}
              onChange={(e) =>
                e.target.value == ""
                  ? toast((t) => (
                      <span className="fw-bold d-flex align-items-center gap-2">
                        <i className="fa fa-exclamation-triangle text-warning fs-3"></i> Add a Blog Image
                      </span>
                    ))
                  : setUdata({ ...udata, bimg: e.target.value })
              }
              required
            />
          </div>
          <div className="col-12">
            <label for="bimg" className="form-label d-block">
              Blog Tags <i className="ps-1 fs-4 text-info fw-bold">#</i>
            </label>
            <span className="bg-info text-white p-2 rounded w-100"> Use "," for multiple tags</span>

            <input
              type="text"
              className="form-text bg-dark text-light border-0 p-3 w-100"
              id="tags"
              name="tags"
              value={udata.tags}
              onChange={(e) =>
                e.target.value == ""
                  ? toast((t) => (
                      <span className="fw-bold d-flex align-items-center gap-2">
                        <i className="fa fa-exclamation-triangle text-warning fs-3"></i> Add a Blog tags{" "}
                      </span>
                    ))
                  : setUdata({ ...udata, tags: e.target.value })
              }
              required
            />
          </div>
          <div className="col-12">
            <label for="Content" className="form-label">
              Add Content
            </label>
            <RichEditor viewState={""} viewBox={true} onChange={(e) => setUdata({ ...udata, contents: e })} />
          </div>
          <div className="col-12">
            <label for="author" className="form-label">
              Author
            </label>
            <input
              type="text"
              className="form-text bg-dark text-light border-0 p-3 w-100"
              id="author"
              name="author"
              value={udata.author}
              onChange={(e) =>
                e.target.value == ""
                  ? toast((t) => (
                      <span className="fw-bold d-flex align-items-center gap-2">
                        <i className="fa fa-exclamation-triangle text-warning fs-3"></i> Mention Author{" "}
                      </span>
                    ))
                  : setUdata({ ...udata, author: e.target.value })
              }
              required
            />
          </div>
          <div className="col-12 col-md-4">
            <label for="fb" className="form-label">
              Facebook <i className="fa fa-link ps-1 text-info"></i>
            </label>
            <input
              type="text"
              className="form-text bg-dark text-light border-0 p-3 w-100"
              id="fb"
              name="fb"
              placeholder="optional"
              value={udata.fb}
              onChange={(e) => setUdata({ ...udata, fb: e.target.value })}
              required
            />
          </div>
          <div className="col-12 col-md-4">
            <label for="insta" className="form-label">
              Instagram <i className="fa fa-link ps-1 text-info"></i>
            </label>
            <input
              type="text"
              className="form-text bg-dark text-light border-0 p-3 w-100"
              id="insta"
              name="insta"
              value={udata.insta}
              placeholder="optional"
              onChange={(e) => setUdata({ ...udata, insta: e.target.value })}
            />
          </div>
          <div className="col-12 col-md-4">
            <label for="linked" className="form-label">
              LinkedIn <i className="fa fa-link ps-1 text-info"></i>
            </label>
            <input
              type="text"
              className="form-text bg-dark text-light border-0 p-3 w-100"
              id="linked"
              name="linked"
              placeholder="optional"
              value={udata.linked}
              onChange={(e) => setUdata({ ...udata, linked: e.target.value })}
            />
          </div>

          <div className="col-12 py-2">
            <button type="submit" className="btn w-100 fw-bold py-2 btn-lg btn-primary">
              Continue
            </button>
          </div>
        </form>
      </div>

      {/* <RichEditor
        viewState={EditorState.createWithContent(convertFromRaw(JSON.parse(localStorage.getItem("contents"))))}
        viewBox={false}
        readOnly={true}
      /> */}
    </motion.div>
  );
};

export default AddBlog;
